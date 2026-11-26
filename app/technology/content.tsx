"use client";

import { Calculator, CalendarDays, CreditCard, FileText, Globe, KeyRound, Lock, Logs, Mail, MessageCircle, Phone, ScrollText, Server, Stethoscope, Users, Boxes } from "lucide-react";
import { Checklist, Section } from "../industries/blocks";
import { IconCards, PageHero, SitePage } from "../site/kit";

const tools = [
  { icon: Globe, tone: "orange", title: "Websites and forms", text: "Your site, landing pages and enquiry forms." },
  { icon: Mail, tone: "coral", title: "Email and inboxes", text: "Shared mailboxes, RFQ inboxes and outgoing mail." },
  { icon: Phone, tone: "pink", title: "Phone and SMS", text: "Call answering, missed-call recovery and text messages." },
  { icon: MessageCircle, tone: "violet", title: "WhatsApp and chat", text: "WhatsApp Business and website chat." },
  { icon: Users, tone: "sky", title: "CRM", text: "Leads, contacts, deals and activity history." },
  { icon: Boxes, tone: "orange", title: "ERP and inventory", text: "Orders, items, stock and purchase orders." },
  { icon: CalendarDays, tone: "coral", title: "Calendars and booking", text: "Viewings, appointments and site visits." },
  { icon: Calculator, tone: "pink", title: "Accounting", text: "Quotes, invoices and reconciliation." },
  { icon: CreditCard, tone: "violet", title: "Payments", text: "Payment links, deposits and reminders." },
  { icon: Stethoscope, tone: "sky", title: "Practice software", text: "Clinic scheduling and patient administration systems." },
  { icon: FileText, tone: "orange", title: "Documents and storage", text: "PDFs, drawings, forms and shared drives." },
  { icon: Server, tone: "coral", title: "Your own systems", text: "Internal databases and tools, through an API or secure export." },
] as const;

const security = [
  ["Role-based access", "Each person sees and does only what their role allows, in the automation and its dashboards."],
  ["Least-privilege connections", "Integrations use the narrowest access that does the job, with credentials stored securely, never in documents or email."],
  ["Audit logs", "Every automated step and every human approval is recorded with a time and an owner."],
  ["Encryption in transit", "Data moving between your tools and the automation is sent over encrypted connections."],
  ["Data minimisation", "We process only the information a workflow needs, and agree retention periods with you."],
  ["Exception handling", "When an integration fails or data looks wrong, the workflow stops and alerts a person instead of guessing."],
] as const;

const how = [
  { icon: KeyRound, tone: "violet", title: "Official connections first", text: "We use each tool's official API or integration wherever one exists." },
  { icon: Logs, tone: "sky", title: "Monitored, not forgotten", text: "Every connection is watched as part of the monthly service, so failures are caught early." },
  { icon: Lock, tone: "pink", title: "You own your data", text: "Your data stays in your systems and accounts. If you leave, access is handed back or removed." },
  { icon: ScrollText, tone: "orange", title: "Documented", text: "You get a plain-language record of what is connected, why, and with what access." },
] as const;

export default function Content() {
  return <SitePage hero={<PageHero crumb={["How it works", "/how-it-works"]} title={<>Technology that fits your business. <em>We connect the tools you already use.</em></>}
    lede="Most businesses don't need new software. They need the software they already pay for to work together. We integrate your website, inbox, phone, CRM, ERP, calendar and accounting tools into one connected system." />}>
    <Section title="What we connect." sub="Common examples. If you use something else, ask us.">
      <IconCards items={tools} columns={4} />
    </Section>
    <Section tone="soft" title="How we connect it.">
      <IconCards items={how} columns={4} />
    </Section>
    <Section title="Security built in." sub="The same safeguards in every system we build.">
      <Checklist items={security} />
    </Section>
  </SitePage>;
}
