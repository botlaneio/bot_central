"use client";

import { Checklist, Chips, Faq, Flow, Hero, IndustryPage, NumberedGrid, Process, Section, Stages, TwoCol } from "../blocks";
import type { FlowConfig } from "../../workflow";
import styles from "../industry.module.css";

const challenges = [
  ["Manual RFQ processing", "Requests arrive by email, phone and web form, each in a different format."],
  ["Repetitive quotations", "Engineers and sales re-key the same specifications into the same templates."],
  ["Purchase order handling", "POs are checked against quotes and typed into the ERP by hand."],
  ["Slow customer responses", "Buyers wait days for a price or an order status while competitors reply first."],
  ["Disconnected procurement", "Supplier requests, approvals and documents live in separate inboxes."],
  ["Scattered dealer communication", "Distributors ask the same questions by phone, WhatsApp and email."],
  ["Document handling", "Drawings, certificates and delivery notes are filed and searched manually."],
  ["Limited visibility", "Nobody can see how many RFQs are open, quoted or won this week."],
] as const;

const stages = [
  { name: "Inquiry", items: ["Automated RFQ intake and classification", "Customer inquiry management", "RFQ-focused landing pages", "Digital product catalogues"] },
  { name: "Quotation", items: ["AI-assisted quotation preparation", "Approval workflows for pricing", "Sales follow-up automation", "Document extraction from drawings and specs"] },
  { name: "Order", items: ["Purchase order processing", "ERP and CRM integrations", "Inventory system integrations", "Order status notifications"] },
  { name: "After the order", items: ["Invoice and payment workflows", "Dealer and distributor portals", "Operational reporting", "Business intelligence dashboards"] },
] as const;

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

const digital = [
  ["Corporate website", "A premium site that explains what you make and who you make it for."],
  ["Product catalogue", "Searchable products and specifications, connected to RFQ forms."],
  ["RFQ landing pages", "Focused pages for campaigns and trade shows that capture complete requests."],
  ["Customer and dealer portals", "Quotes, orders, documents and status in one login."],
  ["Custom business applications", "Built only where off-the-shelf tools fall short."],
] as const;

const safeguards = [
  ["Pricing approval", "Quotes and discounts are approved by the people you choose before anything is sent."],
  ["Financial authorisation", "Invoices, credits and payment actions follow your existing authorisation rules."],
  ["Role-based access", "Sales, engineering, finance and dealers see only what their role needs."],
  ["Audit logs", "Every automated step and every approval is recorded."],
  ["Your data stays yours", "Customer, pricing and product data remain your business information."],
] as const;

const faq = [
  ["Do you automate machinery or the production line?", "No. We focus on the commercial and administrative side: inquiries, quotations, orders, documents, dealers and reporting. We don't work on factory machinery, industrial robotics or safety-critical production systems."],
  ["Will AI set our prices?", "No. AI can read RFQs and draft a quote from your own price lists and rules, but a person you choose approves every quote before it goes out."],
  ["We already have an ERP. Do we need to replace it?", "Usually not. We integrate with the ERP, CRM, accounting and inventory systems you already use, and only build custom components where there is a real gap."],
  ["Does this work for both the US and India?", "Yes. The core workflows are the same. We adapt communication channels such as WhatsApp, currency, tax documents, accounting software and data protection requirements to each market."],
  ["Where should we start?", "Usually with RFQ intake and quotation preparation, because that is where response time is won or lost. Other modules can follow once the first one proves its value."],
] as const;

export default function Content() {
  return <IndustryPage hero={onDemo => <Hero onDemo={onDemo} eyebrow="Manufacturing"
    title={<>From inquiry to order, <em>intelligently connected.</em></>}
    lede="Streamline quotations, customer inquiries, document processing and operational workflows with intelligent systems built around your manufacturing business."
    panel={<>
      <div className={styles.mockCard}>
        <small>RFQ inbox · today</small>
        <strong>4 new requests</strong>
        <div className={styles.mockRow}><span>500 steel brackets SB-40</span><span className={styles.pill}>Quote drafted</span></div>
        <div className={styles.mockRow}><span>Custom enclosure, 40 units</span><span className={styles.pill} data-tone="grey">Engineering review</span></div>
        <div className={styles.mockRow}><span>Hinge assemblies, repeat order</span><span className={styles.pill} data-tone="ink">PO matched</span></div>
        <div className={styles.mockRow}><span>Distributor price request</span><span className={styles.pill} data-tone="grey">Classified</span></div>
      </div>
      <div className={styles.mockCard}>
        <small>Needs your approval</small>
        <strong>Quote Q-2041 · 500 × SB-40 · $4,820</strong>
        <div className={styles.mockButtons}><span>Edit</span><span>Approve and send</span></div>
      </div>
    </>} />}>

    <Section title="Where commercial work slows down." sub="Common challenges for small and mid-sized manufacturers, industrial suppliers and distributors.">
      <NumberedGrid items={challenges} />
    </Section>

    <Flow flow={flow} />

    <Section tone="soft" title="Automation modules, along the order path." sub="Start with one stage. Each module runs on the same shared infrastructure, so the next one connects to it.">
      <Stages stages={stages} />
    </Section>

    <Section title="The digital front end, connected to the back office." sub="Websites and apps are part of the system, not a separate project.">
      <TwoCol intro={<><h3>Built for buyers and dealers</h3><p>Every page and portal feeds the same workflows: a catalogue enquiry becomes a classified RFQ, a dealer order becomes an ERP entry.</p></>}>
        <Checklist items={digital} />
      </TwoCol>
    </Section>

    <Section tone="navy" title="Fits the systems you already run." sub="We connect what is there before building anything new.">
      <Chips items={["ERP", "CRM", "Inventory", "Accounting", "Email", "WhatsApp Business", "Web forms", "Document storage", "Payment systems", "Dashboards"]} />
    </Section>

    <Section title="What it can change." sub="Potential benefits. Every business is different, and we agree measurable goals during the assessment rather than promise numbers up front.">
      <NumberedGrid columns={3} items={[
        ["Faster responses", "RFQs acknowledged and classified as they arrive, so buyers hear back sooner."],
        ["Less re-keying", "Details captured once from emails and documents, then reused for quotes and orders."],
        ["Clear visibility", "Open, quoted and won requests on one dashboard."],
      ]} />
    </Section>

    <Section tone="soft" title="Supervised, not autonomous." sub="Commercial and financial actions keep a person in the loop.">
      <Checklist items={safeguards} />
    </Section>

    <Section title="How implementation works.">
      <Process />
    </Section>

    <Section tone="soft" title="Questions manufacturers ask.">
      <Faq items={faq} />
    </Section>
  </IndustryPage>;
}
