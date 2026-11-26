"use client";

import { useEffect, useRef, useState } from "react";
import { BedDouble, CalendarCheck, Check, Clock3, MapPin, UserCheck, Wallet } from "lucide-react";
import { MotionConfig, motion, useInView } from "motion/react";
import { ForRegion } from "../../region";
import styles from "./real-estate.module.css";

/*
 * Hero "after-hours desk": a property enquiry arrives at 9:41 PM. The assistant says it is automated, asks the
 * buyer's stated requirements, suggests listings that match them, holds a viewing, and the lead card fills in beside
 * the chat. In the morning an agent confirms. Every message is rendered from the start and only fades in, so the
 * card never changes size (no layout shift). Transform and opacity only. Demo data, labelled. Icons: Lucide (ISC).
 */

const ease = [0.2, 0.7, 0.1, 1] as const;
const LAST = 9;

function useSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || new URLSearchParams(location.search).has("still")) { setStep(LAST); return; }
    const t = setTimeout(() => setStep(s => (s >= LAST ? 0 : s + 1)), step >= LAST ? 3800 : step === 0 ? 600 : 1000);
    return () => clearTimeout(t);
  }, [inView, step]);
  return [ref, step] as const;
}

function Msg({ on, me, children, time }: { on: boolean; me?: boolean; children: React.ReactNode; time?: string }) {
  return <motion.div className={styles.msg} data-me={me ? "true" : undefined} initial={false}
    animate={{ opacity: on ? 1 : 0, y: on ? 0 : 8 }} transition={{ duration: 0.35, ease }}>
    {children}{time && <time>{time}</time>}
  </motion.div>;
}

export default function LeadChat() {
  const [ref, step] = useSteps();
  const card: [typeof Wallet, string, React.ReactNode, number][] = [
    [Wallet, "Budget", <ForRegion key="b" us="Up to $650k" in="Up to ₹1.5 Cr" />, 3],
    [MapPin, "Area", "Lakeview", 3],
    [Clock3, "Timing", "Within 3 months", 3],
    [BedDouble, "Interested in", "3-bed, Lakeview Court", 5],
    [CalendarCheck, "Viewing", "Saturday, 11:00 held", 6],
  ];
  return <MotionConfig reducedMotion="user">
    <div ref={ref} className={styles.desk} aria-hidden="true">
      <header className={styles.deskBar}><i /><i /><i /><span>After-hours desk</span><small>Office closed</small><em>Demo</em></header>

      <div className={styles.deskGrid}>
        <div className={styles.chat}>
          <div className={styles.chatHead}><b>Messages</b><span>Lakeview Court enquiry</span></div>
          <div className={styles.thread}>
            <Msg on={step >= 1} me time="9:41 PM">Hi, is the 3-bed at Lakeview Court still available? Could I see it this weekend?</Msg>
            <Msg on={step >= 2} time="9:41 PM">Hi! I’m the automated assistant for Northgate Homes. It is available. What budget, area and timing do you have in mind?</Msg>
            <Msg on={step >= 3} me time="9:43 PM"><ForRegion us="Up to $650k" in="Up to ₹1.5 Cr" />, Lakeview, moving within 3 months.</Msg>
            <motion.div className={styles.listings} initial={false} animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 8 }} transition={{ duration: 0.35, ease }}>
              {[["Lakeview Court", "3 bed · 2 bath", <ForRegion key="a" us="$640k" in="₹1.45 Cr" />], ["Harbour Row", "3 bed · 2 bath", <ForRegion key="b" us="$615k" in="₹1.38 Cr" />]].map(([n, d, p], i) =>
                <div key={i} data-pick={i === 0 && step >= 5 ? "true" : undefined}><i className={styles.house} data-v={i} /><b>{n}</b><small>{d}</small><span>{p}</span></div>)}
              <p>Suggested from your budget, area and size.</p>
            </motion.div>
            <Msg on={step >= 5} me time="9:44 PM">The first one. Saturday morning?</Msg>
            <Msg on={step >= 6} time="9:45 PM">Saturday at 11:00 is held for you. An agent will confirm first thing tomorrow.</Msg>
          </div>
        </div>

        <aside className={styles.lead}>
          <h4>Lead for agent</h4>
          <dl>{card.map(([Icon, k, v, at]) => <div key={k} data-on={step >= at}>
            <dt><Icon />{k}</dt>
            <motion.dd initial={false} animate={{ opacity: step >= at ? 1 : 0, x: step >= at ? 0 : 6 }} transition={{ duration: 0.3, ease }}>{v}</motion.dd>
          </div>)}</dl>
          <div className={styles.confirm} data-state={step >= 8 ? "done" : step >= 7 ? "wait" : "idle"}>
            <motion.span initial={false} animate={{ opacity: step >= 7 && step < 8 ? 1 : 0 }} transition={{ duration: 0.3 }}>Waiting for agent <i>Confirm</i></motion.span>
            <motion.span initial={false} animate={{ opacity: step >= 8 ? 1 : 0, y: step >= 8 ? 0 : 6 }} transition={{ duration: 0.3, ease }}><UserCheck />Confirmed by agent · 8:10 AM</motion.span>
          </div>
          <motion.p className={styles.after} initial={false} animate={{ opacity: step >= 9 ? 1 : 0 }} transition={{ duration: 0.3 }}><Check />Reminder Friday · CRM updated</motion.p>
        </aside>
      </div>

      <ol className={styles.deskSteps}>
        {["Enquiry", "Qualified", "Matched", "Viewing held", "Confirmed"].map((s, i) => {
          const at = [1, 3, 4, 6, 8][i];
          return <li key={s} data-on={step >= at}><i />{s}</li>;
        })}
      </ol>
    </div>
  </MotionConfig>;
}
