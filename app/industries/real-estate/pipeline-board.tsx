"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarCheck, FileSignature, MessageSquare, ListChecks, type LucideIcon } from "lucide-react";
import { LayoutGroup, motion, useInView } from "motion/react";
import styles from "./real-estate.module.css";

/*
 * Pipeline board: one enquiry travels across the columns on its own while on screen (New → Qualified → Viewing →
 * Offer); tapping a column moves it there and stops the loop. Under each column, what the automation does at that
 * stage. Columns have a fixed height, and the card moves with Motion's layout (transform) animation, so nothing
 * else on the page shifts. Demo data, labelled. Icons: Lucide (ISC).
 */

const ease = [0.2, 0.7, 0.1, 1] as const;

const columns: { name: string; icon: LucideIcon; does: string; cards: [string, string][]; lead: string }[] = [
  { name: "New enquiry", icon: MessageSquare, does: "Every message answered, day and night, on the channel it came from.",
    cards: [["2-bed rental", "Website"], ["Plot enquiry", "Phone"]], lead: "Answered at 9:41 PM" },
  { name: "Qualified", icon: ListChecks, does: "The same questions every time: budget, area, size and timing.",
    cards: [["4-bed villa", "Listing portal"]], lead: "Budget, area, timing" },
  { name: "Viewing booked", icon: CalendarCheck, does: "Slots offered from the agent’s calendar, with confirmations and reminders.",
    cards: [["Studio, city centre", "WhatsApp"]], lead: "Sat 11:00 · confirmed" },
  { name: "Offer", icon: FileSignature, does: "Documents requested and tracked until nothing is outstanding.",
    cards: [["3-bed townhouse", "Referral"]], lead: "2 of 3 documents in" },
];

export default function PipelineBoard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [at, setAt] = useState(0);
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    if (!inView || pinned) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || new URLSearchParams(location.search).has("still")) { setAt(2); return; }
    const t = setTimeout(() => setAt(a => (a + 1) % columns.length), at === columns.length - 1 ? 3400 : 2400);
    return () => clearTimeout(t);
  }, [inView, pinned, at]);

  return <div ref={ref} className={styles.board}>
    <div className={styles.boardBar}><b>Pipeline</b><span>All channels · this week</span><em>Demo</em></div>
    <LayoutGroup>
      <ol className={styles.cols}>
        {columns.map((c, i) => <li key={c.name} data-here={i === at}>
          <button type="button" aria-pressed={i === at} onClick={() => { setPinned(true); setAt(i); }}>
            <c.icon aria-hidden="true" /><b>{c.name}</b><small>{c.cards.length + (i === at ? 1 : 0)}</small>
          </button>
          <div className={styles.cards} aria-hidden="true">
            {i === at && <motion.div layoutId="lead" className={styles.card} data-lead="true" transition={{ duration: 0.55, ease }}>
              <b>3-bed apartment</b><small>WhatsApp · Lakeview Court</small>
              <motion.span key={at} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.35 }}>{c.lead}</motion.span>
            </motion.div>}
            {c.cards.map(([t, s]) => <motion.div layout="position" key={t} className={styles.card} transition={{ duration: 0.55, ease }}><b>{t}</b><small>{s}</small></motion.div>)}
          </div>
          <p>{c.does}</p>
        </li>)}
      </ol>
    </LayoutGroup>
  </div>;
}
