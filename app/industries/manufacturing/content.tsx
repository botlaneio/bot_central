"use client";

import {
  ArrowRight, Boxes, Calculator, ClipboardCheck, Copy, CreditCard, EyeOff, FileCheck, FolderOpen, FolderSearch, Globe,
  Inbox, LayoutDashboard, Mail, MessageCircle, MessagesSquare, ShieldCheck, Timer, Unplug, Users, Warehouse, type LucideIcon,
} from "lucide-react";
import { Faq, Flow, IndustryPage, Process } from "../blocks";
import type { FlowConfig } from "../../workflow";
import OrderDesk from "./order-desk";
import OrderPath from "./order-path";
import page from "./manufacturing.module.css";

/*
 * Manufacturing: the flagship industry page. Its own hero (coloured artwork like the homepage, and a live order desk), then the
 * commercial story from inquiry to order. Demo data is labelled; no invented results, clients or certifications.
 * Icons from Lucide (ISC).
 */

const challenges: [LucideIcon, string, string][] = [
  [Inbox, "Manual RFQ processing", "Requests arrive by email, phone and web form, each in a different format."],
  [Copy, "Repetitive quotations", "Sales and engineering re-key the same specifications into the same templates."],
  [FileCheck, "Purchase order handling", "POs are checked against quotes and typed into the ERP by hand."],
  [Timer, "Slow customer responses", "Buyers wait days for a price or an order status while competitors reply first."],
  [Unplug, "Disconnected procurement", "Supplier requests, approvals and documents live in separate inboxes."],
  [MessagesSquare, "Scattered dealer communication", "Distributors ask the same questions by phone, WhatsApp and email."],
  [FolderSearch, "Document handling", "Drawings, certificates and delivery notes are filed and searched by hand."],
  [EyeOff, "Limited visibility", "Nobody can see how many RFQs are open, quoted or won this week."],
];

const x = (i: number) => 60 + i * 320;
const flow: FlowConfig = {
  heading: "An RFQ, from inbox to order.",
  sub: "Rules handle the predictable steps, AI reads the documents, and a person approves every price.",
  barTitle: "RFQ to order",
  barSub: "Manufacturing · standard and custom items",
  label: "Demo workflow: an RFQ email arrives, AI reads the items and quantities, custom items go to engineering review, a quote is drafted from the price list, a sales manager approves it, it is sent, the purchase order is matched and entered in the ERP, and the result is reported.",
  path: [
    { x: x(0), y: 190, kind: "trigger", tag: "Trigger", title: "RFQ received", detail: "Email with drawing and quantities", time: "9:04 AM" },
    { x: x(1), y: 190, kind: "ai", tag: "AI agent", title: "RFQ read and classified", detail: "Items, finish and deadline captured", time: "9:04 AM" },
    { x: x(2), y: 190, kind: "condition", tag: "Condition", title: "Custom specification?", detail: "One item has a custom finish", time: "9:05 AM" },
    { x: x(3), y: 70, kind: "action", tag: "Escalate", title: "Engineering review", detail: "Assigned to a person, with the drawing", time: "10:30 AM" },
    { x: x(4), y: 190, kind: "action", tag: "Quote", title: "Quote drafted", detail: "From your price list and lead times", time: "10:32 AM" },
    { x: x(5), y: 190, kind: "action", tag: "Approval", title: "Approved by sales manager", detail: "Nothing is sent without it", time: "11:15 AM" },
    { x: x(6), y: 190, kind: "action", tag: "Notify", title: "Quote sent and followed up", detail: "Reminder after three days", time: "11:15 AM" },
    { x: x(7), y: 190, kind: "action", tag: "Order", title: "Purchase order matched", detail: "Order created in your ERP", time: "Day 3" },
    { x: x(8), y: 190, kind: "goal", tag: "Goal", title: "Reported on the dashboard", detail: "Win rate and response time", time: "Day 3" },
  ],
  noBranch: { x: x(3), y: 320, kind: "action", tag: "Price", title: "Standard items priced", detail: "Straight from the catalogue", dim: true },
};

const tools: [LucideIcon, string, string][] = [
  [Boxes, "ERP", "Orders, items and stock"], [Users, "CRM", "Accounts and opportunities"], [Warehouse, "Inventory", "Availability and lead times"],
  [Calculator, "Accounting", "Invoices and payments"], [Mail, "Email", "RFQ and order inboxes"], [MessageCircle, "WhatsApp Business", "Dealer and buyer messages"],
  [Globe, "Web forms", "Catalogue and RFQ pages"], [FolderOpen, "Document storage", "Drawings and certificates"], [CreditCard, "Payments", "Deposits and settlement"],
  [LayoutDashboard, "Dashboards", "Open, quoted and won"],
];

const safeguards: [string, string][] = [
  ["Pricing approval", "Quotes and discounts are approved by the people you choose before anything is sent."],
  ["Financial authorisation", "Invoices, credits and payment actions follow your existing authorisation rules."],
  ["Role-based access", "Sales, engineering, finance and dealers see only what their role needs."],
  ["Audit logs", "Every automated step and every approval is recorded."],
  ["Your data stays yours", "Customer, pricing and product data remain your business information."],
];

const faq = [
  ["Do you automate machinery or the production line?", "No. We focus on the commercial and administrative side: inquiries, quotations, orders, documents, dealers and reporting. We don't work on factory machinery, industrial robotics or safety-critical production systems."],
  ["Will AI set our prices?", "No. AI can read RFQs and draft a quote from your own price lists and rules, but a person you choose approves every quote before it goes out."],
  ["We already have an ERP. Do we need to replace it?", "Usually not. We integrate with the ERP, CRM, accounting and inventory systems you already use, and only build custom components where there is a real gap."],
  ["Does this work for both the US and India?", "Yes. The core workflows are the same. We adapt communication channels such as WhatsApp, currency, tax documents, accounting software and data protection requirements to each market."],
  ["Where should we start?", "Usually with RFQ intake and quotation preparation, because that is where response time is won or lost. Other modules can follow once the first one proves its value."],
] as const;

function Hero({ onDemo }: { onDemo: (label: string) => void }) {
  return <section className={page.hero} aria-labelledby="mfg-title">
    <img className={page.streak} src="/media/streaks/manufacturing.svg" alt="" aria-hidden="true" fetchPriority="high" />
    <div className={`frame ${page.heroGrid}`}>
      <div className={page.heroCopy}>
        <p className={page.crumb}><a href="/#business">Industries</a><span aria-hidden="true">/</span>Manufacturing<em>Flagship</em></p>
        <h1 id="mfg-title">From inquiry to order, <span>intelligently connected.</span></h1>
        <p className={page.lede}>Quotations, customer inquiries, purchase orders and dealer communication, connected into one system built around your manufacturing business, with a person approving every price.</p>
        <div className={page.actions}>
          <button type="button" className={page.primary} onClick={() => onDemo("Get an automation assessment")}>Get an automation assessment <ArrowRight aria-hidden="true" /></button>
          <a className={page.secondary} href="#workflow">See an RFQ become an order</a>
        </div>
        <ul className={page.for}><li>Manufacturers</li><li>Industrial suppliers</li><li>Distributors</li></ul>
      </div>
      <OrderDesk />
    </div>
  </section>;
}

export default function Content() {
  return <IndustryPage hero={onDemo => <Hero onDemo={onDemo} />}>

    <section className={page.band} aria-label="What we cover">
      <div className={`frame ${page.bandGrid}`}>
        <div><strong>The commercial side of the factory</strong><span>Inquiries, quotes, orders, documents, dealers and reporting.</span></div>
        <div><strong>Never the production line</strong><span>No machinery, robotics or safety-critical systems.</span></div>
        <div><strong>United States and India</strong><span>Channels, currency and tax documents for each market.</span></div>
      </div>
    </section>

    <section className={page.chapter} aria-labelledby="mfg-slow">
      <div className="frame">
        <header className={page.heading}>
          <h2 id="mfg-slow">Where commercial work slows down.</h2>
          <p>Common challenges for small and mid-sized manufacturers, industrial suppliers and distributors.</p>
        </header>
        <ul className={page.challenges}>{challenges.map(([Icon, title, text]) => <li key={title}>
          <span className={page.cIcon}><Icon aria-hidden="true" /></span><h3>{title}</h3><p>{text}</p>
        </li>)}</ul>
      </div>
    </section>

    <section className={`${page.chapter} ${page.tinted}`} aria-labelledby="mfg-path">
      <div className="frame">
        <header className={page.heading}>
          <h2 id="mfg-path">Automation along the order path.</h2>
          <p>Start with one stage. Each module runs on the same shared infrastructure, so the next one connects to it.</p>
        </header>
        <OrderPath />
      </div>
    </section>

    <div className={page.workflow}><Flow flow={flow} /></div>

    <section className={page.chapter} aria-labelledby="mfg-spot">
      <div className="frame">
        <header className={page.heading}>
          <h2 id="mfg-spot">What your team sees.</h2>
          <p>The same work, without the retyping. Every screen here is a sample.</p>
        </header>
        <div className={page.spots}>
          <article className={page.spot}>
            <div className={page.spotCopy}><small>RFQ intake</small><h3>One queue for every request.</h3><p>Emails, web forms and WhatsApp messages are read, sorted by type and urgency, and assigned with the details already filled in.</p></div>
            <div className={page.mock}>
              <div className={page.mockHead}><b>RFQ inbox</b><em>Demo</em></div>
              {[["500 × steel bracket SB-40", "Quote drafted", "ok"], ["Custom enclosure, 40 units", "Engineering review", "warn"], ["Hinge assemblies, repeat order", "PO matched", "ink"], ["Distributor price request", "Classified", "soft"]].map(([t, s, k]) => <div key={t} className={page.mockRow}><span>{t}</span><i data-k={k}>{s}</i></div>)}
            </div>
          </article>
          <article className={page.spot} data-flip="true">
            <div className={page.spotCopy}><small>Quotation</small><h3>Quotes you review, not rebuild.</h3><p>A draft is prepared from your price lists, lead times and rules. It waits for the person you choose, and nothing goes out without approval.</p></div>
            <div className={page.mock}>
              <div className={page.mockHead}><b>Quote Q-2041</b><em>Demo</em></div>
              {[["500 × SB-40 bracket", "$4,250"], ["Powder coating", "$420"], ["Freight", "$150"]].map(([t, v]) => <div key={t} className={page.mockRow}><span>{t}</span><b>{v}</b></div>)}
              <div className={page.mockTotal}><span>Total</span><b>$4,820</b></div>
              <div className={page.mockActions}><span>Edit</span><span>Approve and send</span></div>
            </div>
          </article>
          <article className={page.spot}>
            <div className={page.spotCopy}><small>Dealer portal</small><h3>Dealers check status themselves.</h3><p>Quotes, orders, documents and delivery status in one login, so the same questions stop arriving by phone.</p></div>
            <div className={page.mock}>
              <div className={page.mockHead}><b>Dealer portal · Westfield Supply</b><em>Demo</em></div>
              <div className={page.timeline}>
                {[["Order confirmed", "ERP #44102", true], ["In production", "Expected 9 Jan", true], ["Dispatched", "Delivery note attached", false], ["Delivered", "", false]].map(([t, d, on]) => <div key={String(t)} data-on={on as boolean}><i /><span><b>{t as string}</b><small>{d as string}</small></span></div>)}
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section className={`${page.chapter} ${page.tinted}`} aria-labelledby="mfg-people">
      <div className={`frame ${page.split}`}>
        <figure className={page.photo}>
          <img src="/media/stock/faq-industries.jpg" alt="Industrial worker at a machinery control panel" loading="lazy" decoding="async" />
          <figcaption>Stock photo. Not a botLane customer.</figcaption>
        </figure>
        <div>
          <h2 id="mfg-people">Built for the people around the machines.</h2>
          <p className={page.big}>Your production line stays exactly as it is. We take the commercial admin off sales, engineering and finance, so the people who know your products spend their time on customers and quotes that matter.</p>
          <ul className={page.ticks}>
            <li><ClipboardCheck aria-hidden="true" />Sales reviews drafted quotes instead of building them.</li>
            <li><ClipboardCheck aria-hidden="true" />Engineering sees only the requests that need a drawing checked.</li>
            <li><ClipboardCheck aria-hidden="true" />Finance gets invoices that already match the order.</li>
          </ul>
        </div>
      </div>
    </section>

    <section className={page.chapter} aria-labelledby="mfg-tools">
      <div className="frame">
        <header className={page.heading}>
          <h2 id="mfg-tools">Fits the systems you already run.</h2>
          <p>We connect what is there before building anything new.</p>
        </header>
        <ul className={page.tools}>{tools.map(([Icon, name, what]) => <li key={name}><Icon aria-hidden="true" /><b>{name}</b><small>{what}</small></li>)}</ul>
      </div>
    </section>

    <section className={page.safe} aria-labelledby="mfg-safe">
      <div className={`frame ${page.split}`}>
        <div>
          <ShieldCheck className={page.safeIcon} aria-hidden="true" />
          <h2 id="mfg-safe">Supervised, not autonomous.</h2>
          <p>Commercial and financial actions keep a person in the loop.</p>
          <div className={page.approval} aria-hidden="true"><span><small>Needs your approval</small><b>Quote Q-2041 · $4,820</b></span><i>Approve</i></div>
        </div>
        <dl className={page.rules}>{safeguards.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}</dl>
      </div>
    </section>

    <section className={`${page.chapter} ${page.tinted}`} aria-labelledby="mfg-how">
      <div className="frame">
        <header className={page.heading}>
          <h2 id="mfg-how">How implementation works.</h2>
          <p>Usually we start with RFQ intake and quotation, where response time is won or lost.</p>
        </header>
        <Process />
      </div>
    </section>

    <section className={page.chapter} aria-labelledby="mfg-faq">
      <div className={`frame ${page.split}`}>
        <h2 id="mfg-faq">Questions manufacturers ask.</h2>
        <Faq items={faq} />
      </div>
    </section>
  </IndustryPage>;
}
