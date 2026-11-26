/*
 * Cloudflare Worker for bot-central. Serves the static site from ./out and handles one API route:
 *
 *   POST /api/enquiry  ->  validates the contact form and records it in the CRM.
 *
 * The CRM is botLane's self-hosted Comp AI CRM (github.com/trycompai/crm). Its REST bridge lives at
 * https://ops-api.botlane.io/rest (Swagger at https://ops-api.botlane.io/) and takes an `x-api-key` header.
 * For each enquiry the Worker finds the contact by email or creates it (with the company, if given), then adds
 * a NOTE activity on the contact holding everything the visitor sent.
 *
 * The key lives only here, as a Worker secret (never in the browser, the repo or a chat):
 *   npx wrangler secret put CRM_API_KEY    # created in the CRM: Settings -> API keys (starts with crm_)
 * Optional var CRM_API_URL overrides the base URL. Until the key is set the route answers 503 "not_configured"
 * and the form tells the visitor nothing was sent.
 */

declare class HTMLRewriter {
  on(selector: string, handlers: { element?: (element: { append(content: string, options?: { html: boolean }) : void }) => void }): HTMLRewriter;
  transform(response: Response): Response;
}

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  CRM_API_URL?: string;
  CRM_API_KEY?: string;
  ALLOWED_ORIGINS?: string; // comma-separated, e.g. "https://botlane.io,https://www.botlane.io"
}

type Enquiry = Record<string, unknown>;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" } });

const text = (value: unknown, max = 200) => (typeof value === "string" ? value.trim().slice(0, max) : "");

function validate(input: Enquiry) {
  const e = {
    topic: ["assessment", "support", "general"].includes(text(input.topic)) ? text(input.topic) : "general",
    name: text(input.name, 120),
    email: text(input.email, 200),
    company: text(input.company, 160),
    phone: text(input.phone, 40),
    industry: text(input.industry, 40),
    country: text(input.country, 40),
    size: text(input.size, 20),
    areas: Array.isArray(input.areas) ? input.areas.map(a => text(a, 60)).filter(Boolean).slice(0, 10) : [],
    tools: text(input.tools, 300),
    message: text(input.message, 5000),
    consent: input.consent === "on" || input.consent === true,
  };
  const errors: string[] = [];
  if (!e.name) errors.push("name");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.email)) errors.push("email");
  if (!e.message) errors.push("message");
  if (!e.consent) errors.push("consent");
  return { e, errors };
}

type Lead = ReturnType<typeof validate>["e"];

const FREE_MAIL = /@(gmail|googlemail|yahoo|outlook|hotmail|live|icloud|me|aol|proton|protonmail|rediffmail|zoho)\./i;

class Crm {
  constructor(private base: string, private key: string) {}

  async call<T>(path: string, body: unknown): Promise<T> {
    const response = await fetch(this.base + path, {
      method: "POST",
      headers: { "content-type": "application/json", "x-api-key": this.key },
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(`CRM ${path} ${response.status}: ${(await response.text()).slice(0, 300)}`);
    return response.json() as Promise<T>;
  }

  async findContact(email: string) {
    const { rows } = await this.call<{ rows: { id: string; email: string | null }[] }>("/contacts/search", { q: email, pageSize: 10 });
    return rows.find(row => row.email?.toLowerCase() === email.toLowerCase())?.id;
  }

  async findOrCreateCompany(name: string, email: string) {
    const { rows } = await this.call<{ rows: { id: string; name: string }[] }>("/companies/search", { q: name, pageSize: 10 });
    const match = rows.find(row => row.name.trim().toLowerCase() === name.toLowerCase());
    if (match) return match.id;
    const domain = FREE_MAIL.test(email) ? undefined : email.split("@")[1];
    return (await this.call<{ id: string }>("/companies", { name, ...(domain ? { domain } : {}) })).id;
  }
}

function noteBody(e: Lead) {
  const lines = [
    ["Request", e.topic === "assessment" ? "Automation assessment" : e.topic === "support" ? "Support" : "General question"],
    ["Name", e.name], ["Email", e.email], ["Phone", e.phone], ["Company", e.company],
    ["Industry", e.industry], ["Country", e.country], ["Team size", e.size],
    ["Where work slows down", e.areas.join(", ")], ["Tools used today", e.tools],
  ].filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`);
  return `${lines.join("\n")}\n\n${e.message}\n\nConsent to be contacted: yes. Sent from the botlane.io contact form.`;
}

async function record(e: Lead, crm: Crm) {
  let contactId = await crm.findContact(e.email);
  if (!contactId) {
    const companyId = e.company ? await crm.findOrCreateCompany(e.company, e.email) : undefined;
    const [firstName, ...rest] = e.name.split(/\s+/);
    contactId = (await crm.call<{ id: string }>("/contacts", {
      firstName, lastName: rest.join(" ") || undefined, email: e.email, phone: e.phone || undefined, companyId,
    })).id;
  }
  const subject = e.topic === "assessment" ? "Website: assessment request" : e.topic === "support" ? "Website: support request" : "Website: enquiry";
  await crm.call("/activities", { type: "NOTE", subject, body: noteBody(e), occurredAt: new Date().toISOString(), contactId });
}

async function enquiry(request: Request, env: Env) {
  const origin = request.headers.get("origin") ?? "";
  const allowed = (env.ALLOWED_ORIGINS ?? "").split(",").map(s => s.trim()).filter(Boolean);
  if (allowed.length && !allowed.includes(origin)) return json({ ok: false, error: "forbidden" }, 403);
  if (!(request.headers.get("content-type") ?? "").includes("application/json")) return json({ ok: false, error: "bad_request" }, 400);

  let body: Enquiry;
  try { body = await request.json(); } catch { return json({ ok: false, error: "bad_request" }, 400); }
  if (text(body.website)) return json({ ok: true }); // honeypot filled: quietly drop bots

  const { e, errors } = validate(body);
  if (errors.length) return json({ ok: false, error: "invalid", fields: errors }, 422);
  if (!env.CRM_API_KEY) return json({ ok: false, error: "not_configured" }, 503);

  try {
    await record(e, new Crm((env.CRM_API_URL || "https://ops-api.botlane.io/rest").replace(/\/$/, ""), env.CRM_API_KEY));
  } catch (error) {
    console.error("CRM write failed", error instanceof Error ? error.message : error);
    return json({ ok: false, error: "upstream" }, 502);
  }
  return json({ ok: true });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/enquiry") {
      if (request.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);
      return enquiry(request, env);
    }
    return withRegionLinks(await env.ASSETS.fetch(request), url);
  },
};

/*
 * botlane.io (US) and botlane.in (India) serve the same pages; the page itself picks prices and legal details from
 * the hostname. For search engines, each HTML page says which site it belongs to (canonical, always without www)
 * and points to its twin on the other domain (hreflang), so the two aren't treated as duplicates.
 */
const SITES = { us: "https://botlane.io", in: "https://botlane.in" } as const;
function withRegionLinks(response: Response, url: URL) {
  if (!(response.headers.get("content-type") ?? "").includes("text/html")) return response;
  const host = url.hostname.replace(/^www\./, "");
  if (host !== "botlane.io" && host !== "botlane.in") return response;
  const path = url.pathname;
  const own = host === "botlane.in" ? SITES.in : SITES.us;
  const links = `<link rel="canonical" href="${own}${path}">` +
    `<link rel="alternate" hreflang="en-US" href="${SITES.us}${path}">` +
    `<link rel="alternate" hreflang="en-IN" href="${SITES.in}${path}">` +
    `<link rel="alternate" hreflang="x-default" href="${SITES.us}${path}">`;
  return new HTMLRewriter().on("head", { element: head => { head.append(links, { html: true }); } }).transform(response);
}
