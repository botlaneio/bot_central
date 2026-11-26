/*
 * Sends the contact form to the site's own endpoint, POST /api/enquiry (worker/index.ts), which forwards it to the
 * CRM. The CRM key never reaches the browser. On the local dev server (or before the CRM secrets are set) the
 * endpoint doesn't exist or answers "not_configured", and the form tells the visitor nothing was sent.
 */
export type Enquiry = Record<string, string | string[] | boolean>;
export type SubmitResult = "sent" | "not_configured" | "invalid" | "failed";

export async function submitEnquiry(enquiry: Enquiry): Promise<SubmitResult> {
  try {
    const response = await fetch("/api/enquiry", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(enquiry) });
    if (response.ok) return "sent";
    const body = await response.json().catch(() => ({}));
    if (response.status === 404 || response.status === 405 || body.error === "not_configured") return "not_configured";
    if (response.status === 422) return "invalid";
    return "failed";
  } catch {
    return "failed";
  }
}
