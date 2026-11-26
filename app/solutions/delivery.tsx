"use client";

import { useRef } from "react";
import { Code, PencilRuler, RefreshCw, Rocket, Search, ShieldCheck, type LucideIcon } from "lucide-react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import styles from "./delivery.module.css";

/*
 * "How we deliver it" on the solution pages: a vertical timeline whose line fills as the visitor scrolls. Steps sit
 * on alternating sides (one column on phones); each lights up as the line reaches it and says what the step means
 * for this particular solution. The homepage keeps its own interactive version (method.tsx). Icons from Lucide (ISC).
 */

const steps: { name: string; icon: LucideIcon; get: string }[] = [
  { name: "Discover", icon: Search, get: "A map of how work arrives today" },
  { name: "Design", icon: PencilRuler, get: "A blueprint you approve" },
  { name: "Implement", icon: Code, get: "The working system, connected" },
  { name: "Validate", icon: ShieldCheck, get: "Tested on realistic cases" },
  { name: "Launch", icon: Rocket, get: "Live with your team" },
  { name: "Manage & improve", icon: RefreshCw, get: "Monitoring and a monthly report" },
];

// What each step means for each solution (keyed by capability id).
const specific: Record<string, string[]> = {
  payments: [
    "We look at where enquiries come from, what they're missing and how long they wait for a reply.",
    "We decide what each form asks, where each lead goes and what counts as qualified.",
    "Pages, forms and lead routing are built and connected to your CRM.",
    "We send test enquiries through every channel and check each one lands with the right person.",
    "The new pages go live and your team starts receiving complete enquiries.",
    "We watch which channels bring work in and improve the pages that don't.",
  ],
  billing: [
    "We listen to how calls and messages are handled today and which questions come up most.",
    "We write what the assistant may answer, and exactly when it hands over to a person.",
    "The assistant is set up on your phone line, website and WhatsApp, using your approved information.",
    "We run through realistic calls, including awkward and sensitive ones, before anyone real calls.",
    "It starts with out-of-hours calls first, then takes on more as your team is comfortable.",
    "We review conversations, update answers when things change and tighten the hand-overs.",
  ],
  radar: [
    "We follow one piece of work from start to finish and note every time it is retyped or waits.",
    "We map each step: what's automated, who approves, and what happens when something is missing.",
    "Documents, tasks and your systems are connected so details are entered once.",
    "We process real past documents and check every field and exception against what your team did.",
    "One workflow goes live first, with your team watching the exceptions closely.",
    "We keep integrations working as your tools change and add the next workflow.",
  ],
  issuing: [
    "We look at how quotes and invoices are put together today, and how payments are chased.",
    "We set your pricing rules, approval limits and reminder schedule in the blueprint.",
    "Quotes, invoices and reminders are connected to your price lists and accounting tools.",
    "We rebuild recent quotes and invoices and check every total against the originals.",
    "Drafts start going to you for approval; nothing is sent without it.",
    "We keep price lists in sync and refine reminders based on what gets paid on time.",
  ],
  crypto: [
    "We list every moment a customer waits without hearing from you.",
    "We write each message, choose its channel and timing, and agree when to stop.",
    "Confirmations, reminders and feedback requests are connected to your booking or order system.",
    "We send every message to test customers and check timing, wording and opt-outs.",
    "Messages start going to real customers, one journey at a time.",
    "We read the replies and feedback and adjust messages that don't land.",
  ],
  connect: [
    "We ask which questions about the business you can't answer quickly today.",
    "We choose the few numbers that matter and where each one comes from.",
    "Your systems are connected to a single dashboard and a weekly summary.",
    "We check every figure against your own records before you rely on it.",
    "You get the dashboard and the first weekly summary.",
    "We add views as new questions come up and keep the data flowing as tools change.",
  ],
};

function Step({ i, total, progress, children }: { i: number; total: number; progress: MotionValue<number>; children: React.ReactNode }) {
  const at = (i + 0.5) / total;
  const on = useTransform(progress, [at - 0.06, at], [0, 1]);
  const scale = useTransform(on, [0, 1], [0.85, 1]);
  return <li className={styles.step} data-side={i % 2 ? "right" : "left"}>
    <motion.span className={styles.dotOn} style={{ opacity: on, scale }} aria-hidden="true" />
    <motion.div className={styles.card} style={{ opacity: useTransform(on, [0, 1], [0.45, 1]) }}>{children}</motion.div>
  </li>;
}

export default function Delivery({ id }: { id: string }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });
  const lines = specific[id] ?? specific.payments;
  return <ol ref={ref} className={styles.timeline}>
    <span className={styles.rail} aria-hidden="true"><motion.i style={{ scaleY: progress }} /></span>
    {steps.map((s, i) => <Step key={s.name} i={i} total={steps.length} progress={progress}>
      <header><span className={styles.icon}><s.icon aria-hidden /></span><small>Step {i + 1}</small></header>
      <h3>{s.name}</h3>
      <p>{lines[i]}</p>
      <span className={styles.get}>You get: {s.get}</span>
    </Step>)}
  </ol>;
}
