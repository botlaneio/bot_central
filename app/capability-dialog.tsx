"use client";

import { useEffect, useRef } from "react";
import { ChartLine, Headset, HeartHandshake, Receipt, ShieldCheck, Target, Workflow, X, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";
import styles from "./capability-dialog.module.css";

/*
 * Detail panel for a capability tile: what it is, what's included, how it shows up in each industry, and where a
 * person stays in control. Opens as a modal <dialog> (Escape and backdrop click close it).
 */

type Tone = "orange" | "coral" | "pink" | "violet" | "sky";
const info: Record<string, { name: string; tone: Tone; icon: LucideIcon; lede: string; includes: string[]; examples: [string, string][]; control: string }> = {
  payments: { name: "Customer Acquisition", tone: "orange", icon: Target,
    lede: "Premium websites and landing pages that capture complete enquiries and hand them straight to the systems that follow up.",
    includes: ["Websites and landing pages", "Lead capture", "Inquiry management", "CRM integration", "Conversion tracking"],
    examples: [["Manufacturing", "RFQ landing pages that collect drawings and quantities"], ["Real Estate", "Property pages that qualify and route enquiries"], ["Clinics", "Treatment pages with online booking"]],
    control: "You decide which leads go to whom, and nothing is sent in your name without your rules." },
  billing: { name: "AI Front Office", tone: "coral", icon: Headset,
    lede: "Calls and messages answered day and night, sorted and routed to the right person, with a summary attached.",
    includes: ["AI receptionists", "Conversational assistants", "Missed-call recovery", "Inquiry classification and routing", "Human escalation"],
    examples: [["Manufacturing", "Distributor price requests routed to sales"], ["Real Estate", "After-hours property enquiries answered"], ["Clinics", "Missed calls returned, clinical questions sent to staff"]],
    control: "Sensitive or urgent conversations are always handed to a person." },
  radar: { name: "Business Operations", tone: "pink", icon: Workflow,
    lede: "The work between the enquiry and the invoice: documents read, steps scheduled and systems kept in sync.",
    includes: ["Workflow orchestration", "Scheduling", "Document processing", "Task management", "Customer onboarding", "System integrations"],
    examples: [["Manufacturing", "Purchase orders checked and entered into the ERP"], ["Real Estate", "Client documents collected for onboarding"], ["Clinics", "Intake forms sent and filed before the visit"]],
    control: "Exceptions are flagged to your team, and every step is logged." },
  issuing: { name: "Financial Administration", tone: "violet", icon: Receipt,
    lede: "Quotations and invoices prepared from your own price lists, then followed up until they're paid.",
    includes: ["Quotation workflows", "Invoice preparation", "Payment reminders", "Payment system integrations", "Reconciliation assistance"],
    examples: [["Manufacturing", "Quotes drafted from price lists and lead times"], ["Real Estate", "Booking fees and deposits tracked"], ["Clinics", "Invoices and payment reminders after visits"]],
    control: "Every quote, discount and payment action follows your approval rules." },
  crypto: { name: "Customer Experience", tone: "sky", icon: HeartHandshake,
    lede: "Customers kept informed at every step, then asked how it went.",
    includes: ["Automated follow-ups", "Appointment reminders", "Customer notifications", "Feedback collection", "Review requests"],
    examples: [["Manufacturing", "Order status updates for buyers and dealers"], ["Real Estate", "Viewing confirmations and reminders"], ["Clinics", "Appointment and recall reminders"]],
    control: "Messages respect consent and stop the moment a customer asks." },
  connect: { name: "Business Intelligence", tone: "orange", icon: ChartLine,
    lede: "One clear view of how the business is running: what came in, what's stuck and what it's worth.",
    includes: ["Operational dashboards", "Performance reporting", "Plain-language business summaries", "Workflow monitoring", "Acquisition analytics"],
    examples: [["Manufacturing", "Open, quoted and won RFQs"], ["Real Estate", "Pipeline and agent dashboards"], ["Clinics", "Bookings, no-shows and recall rates"]],
    control: "Your data stays yours, and access follows each person's role." },
};

const ease = [0.2, 0.7, 0.1, 1] as const;

export default function CapabilityDialog({ id, onClose, onAssess }: { id: string; onClose: () => void; onAssess: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { ref.current?.showModal(); }, []);
  const c = info[id];
  if (!c) return null;
  return <dialog ref={ref} className={styles.dialog} data-tone={c.tone} onClose={onClose} aria-labelledby="cap-title"
    onClick={e => { if (e.target === e.currentTarget) e.currentTarget.close(); }}>
    <motion.div className={styles.inner} initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3, ease }}>
      <header className={styles.head}>
        <span className={styles.icon}><c.icon aria-hidden="true" /></span>
        <div><small>Capability</small><h2 id="cap-title">{c.name}</h2></div>
        <button className={styles.close} aria-label="Close" onClick={() => ref.current?.close()}>
          <X aria-hidden="true" />
        </button>
      </header>
      <p className={styles.lede}>{c.lede}</p>

      <h3>What's included</h3>
      <ul className={styles.includes}>{c.includes.map((x, i) => <motion.li key={x} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.1 + i * 0.04 }}>{x}</motion.li>)}</ul>

      <h3>In each industry</h3>
      <div className={styles.examples}>{c.examples.map(([ind, text]) => <div key={ind}><small>{ind}</small><span>{text}</span></div>)}</div>

      <p className={styles.control}><ShieldCheck aria-hidden="true" />{c.control}</p>

      <footer className={styles.foot}>
        <button className={styles.primary} onClick={() => { ref.current?.close(); onAssess(); }}>Get an automation assessment <span aria-hidden="true">→</span></button>
        <button className={styles.secondary} onClick={() => ref.current?.close()}>Close</button>
      </footer>
    </motion.div>
  </dialog>;
}
