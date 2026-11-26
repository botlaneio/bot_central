"use client";

import { useEffect, useRef, useState } from "react";
import {
  BarChart3, Bell, BellRing, Bot, CalendarCheck, CalendarClock, ChartLine, ClipboardList, CreditCard, FileSearch, FileText,
  Gauge, Globe, Headset, Inbox, Link2, ListChecks, MessageSquareText, MessagesSquare, PhoneForwarded, Plug, Receipt, Scale,
  Send, Sparkles, Star, Target, UserCheck, UserPlus, Users, Workflow, type LucideIcon,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import styles from "./modules.module.css";
import { midSentence } from "./data";

/*
 * "What's included": each module gets its own icon and card. A chain above the cards shows the modules as one
 * connected system. Hover or focus a card and its node lights up with the pieces it hands work to (its neighbours);
 * "Connect all" lights the whole chain. Icons from Lucide (ISC).
 */

const icons: Record<string, LucideIcon> = {
  "Websites and landing pages": Globe, "Lead capture": Target, "Inquiry management": Inbox, "CRM integration": Users, "Conversion tracking": BarChart3,
  "AI receptionists": Headset, "Conversational assistants": MessagesSquare, "Missed-call recovery": PhoneForwarded, "Inquiry classification and routing": Send, "Human escalation": UserCheck,
  "Workflow orchestration": Workflow, "Scheduling": CalendarClock, "Document processing": FileSearch, "Task management": ListChecks, "Customer onboarding": UserPlus, "System integrations": Plug,
  "Quotation workflows": FileText, "Invoice preparation": Receipt, "Payment reminders": Bell, "Payment system integrations": CreditCard, "Reconciliation assistance": Scale,
  "Automated follow-ups": MessageSquareText, "Appointment reminders": CalendarCheck, "Customer notifications": BellRing, "Feedback collection": ClipboardList, "Review requests": Star,
  "Operational dashboards": Gauge, "Performance reporting": ChartLine, "Plain-language business summaries": Sparkles, "Workflow monitoring": Bot, "Acquisition analytics": Link2,
};

export default function Modules({ items }: { items: [string, string][] }) {
  const [active, setActive] = useState<number | null>(null);
  const [all, setAll] = useState(false);
  // Plays on its own once on screen: each piece lights up in turn with its neighbours, then the whole chain connects
  // and stays connected. Hovering, focusing or the switch take over at any point.
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { amount: 0.3, once: true });
  const [auto, setAuto] = useState<number | null>(null);
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (!seen || touched || all) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setAll(true); return; }
    const next = auto === null ? 0 : auto + 1;
    const t = setTimeout(() => { if (next >= items.length) { setAuto(null); setAll(true); } else setAuto(next); }, auto === null ? 500 : 750);
    return () => clearTimeout(t);
  }, [seen, touched, all, auto, items.length]);
  const take = () => { if (!touched) { setTouched(true); setAuto(null); } };
  const current = active ?? auto;
  const lit = (i: number) => all || current === i || (current !== null && Math.abs(current - i) === 1);
  const linkLit = (i: number) => all || (current !== null && (current === i || current === i + 1)); // link between i and i+1

  return <div ref={ref} className={styles.wrap} onMouseLeave={() => setActive(null)}>
    <div className={styles.chainBar}>
      <ol className={styles.chain} aria-hidden="true">
        {items.map(([title], i) => { const Icon = icons[title] ?? Sparkles; return <li key={title}>
          <span className={styles.node} data-lit={lit(i)} data-on={current === i}><Icon /></span>
          {i < items.length - 1 && <span className={styles.link}><motion.i initial={false} animate={{ scaleX: linkLit(i) ? 1 : 0 }} transition={{ duration: 0.35, ease: [0.2, 0.7, 0.1, 1], delay: all ? i * 0.08 : 0 }} /></span>}
        </li>; })}
      </ol>
      <button type="button" className={styles.toggle} aria-pressed={all} onClick={() => { take(); setAll(a => !a); }}>
        <span className={styles.knob} data-on={all} />{all ? "Connected" : "Connect all"}
      </button>
    </div>

    <ul className={styles.grid}>
      {items.map(([title, text], i) => { const Icon = icons[title] ?? Sparkles; return <li key={title}>
        <button type="button" className={styles.card} data-lit={lit(i)} data-dim={active !== null && !all && !lit(i)}
          onMouseEnter={() => { take(); setActive(i); }} onFocus={() => { take(); setActive(i); }} onBlur={() => setActive(null)}>
          <span className={styles.top}><span className={styles.icon}><Icon aria-hidden /></span><small>{String(i + 1).padStart(2, "0")}</small></span>
          <h3>{title}</h3>
          <p>{text}</p>
          <span className={styles.works}>
            {[i - 1, i + 1].filter(j => j >= 0 && j < items.length).map(j => <em key={j}>Works with {midSentence(items[j][0])}</em>)}
          </span>
        </button>
      </li>; })}
    </ul>
  </div>;
}
