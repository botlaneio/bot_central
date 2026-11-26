"use client";

import { useEffect, useRef, useState } from "react";
import { Check as CheckIcon, FileText, Phone } from "lucide-react";
import { AnimatePresence, MotionConfig, motion, useInView } from "motion/react";
import Orb, { wave } from "./orb";
import styles from "./capability-tiles.module.css";

/*
 * The six capability tiles, each its own animated scene. A scene plays its story when the tile scrolls into
 * view, holds on the final frame, and replays after the tile has left the screen completely and come back. Fixed-size stages, transform
 * and opacity only, so nothing shifts. Everything shown is demo data. Reduced motion shows the final frame.
 */

const ease = [0.2, 0.7, 0.1, 1] as const;

/** Advances 0..last every `ms` while in view; resets when the tile leaves the viewport. */
function useStory(last: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  // Reset only once the tile is fully off screen, so a tile half in view never jumps back to its first frame.
  const anyVisible = useInView(ref, { amount: 0 });
  const [step, setStep] = useState(0);
  useEffect(() => { if (!anyVisible) setStep(0); }, [anyVisible]);
  useEffect(() => {
    if (!inView) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setStep(last); return; }
    if (step >= last) return;
    const t = setTimeout(() => setStep(s => s + 1), step === 0 ? 350 : ms);
    return () => clearTimeout(t);
  }, [inView, step, last, ms]);
  return [ref, step] as const;
}

// Icons from Lucide (ISC).
const Check = () => <CheckIcon aria-hidden="true" />;

/* 1. Customer Acquisition: enquiries from three channels land in the CRM, qualified */
function Acquisition() {
  const [ref, step] = useStory(7, 650);
  const leads = [
    ["Website form", "3-bedroom apartment, viewing this week", "Qualified", "coral"],
    ["Landing page", "RFQ · 500 steel brackets", "Sent to sales", "orange"],
    ["Google profile", "New patient, checkup", "Booked", "violet"],
  ] as const;
  return <div ref={ref} className={styles.acq}>
    <div className={styles.form}>
      <small>Enquiry form</small>
      {["Name", "What do you need?", "When?"].map((f, i) => <div key={f} className={styles.input}>
        <motion.span initial={false} animate={{ scaleX: step > i ? 1 : 0 }} transition={{ duration: 0.45, ease }} />{f}
      </div>)}
      <motion.b className={styles.send} initial={false} animate={{ scale: step === 3 ? 0.94 : 1 }} transition={{ duration: 0.2 }}>Send enquiry</motion.b>
    </div>
    <div className={styles.flow} aria-hidden="true">{[0, 1, 2].map(i => <motion.i key={i} initial={false} animate={{ opacity: step >= 3 ? [0, 1, 0] : 0, x: step >= 3 ? [0, 28] : 0 }} transition={{ duration: 0.9, delay: i * 0.15, repeat: step >= 3 && step < 7 ? Infinity : 0 }} />)}</div>
    <div className={styles.crm}>
      <header><strong>CRM · New leads</strong><em>Demo</em></header>
      {leads.map(([source, what, status, tone], i) => {
        const shown = step >= 4 + i;
        return <motion.div key={source} className={styles.lead} initial={false} animate={{ opacity: shown ? 1 : 0, x: shown ? 0 : -14 }} transition={{ duration: 0.45, ease }}>
          <span><small>{source}</small>{what}</span>
          <b data-tone={tone}>{status}</b>
        </motion.div>;
      })}
    </div>
  </div>;
}

/* 2. AI Front Office: a call is answered and routed, the week's bars grow */
function FrontOffice() {
  const [ref, step] = useStory(3, 900);
  const bars = [28, 45, 31, 55, 42, 67, 57, 80, 70, 87, 92, 70, 95, 86, 100];
  return <div ref={ref} className={styles.card}>
    <div className={styles.call}>
      <span className={styles.callIcon} data-ring={step < 2}><Phone aria-hidden="true" /></span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={step < 1 ? "a" : step < 2 ? "b" : "c"} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
          <small>{step < 1 ? "Incoming call · 7:48 PM" : step < 2 ? "Answering" : "Answered by AI receptionist"}</small>
          <b>{step < 2 ? "+1 (512) 555 0142" : "Routed to Sales · summary sent"}</b>
        </motion.span>
      </AnimatePresence>
      {step === 1 && <Orb state="listening" color={wave.coral} />}
    </div>
    <div className={styles.barsHead}><b>Enquiries handled</b><small>Demo</small></div>
    <div className={styles.bars}>{bars.map((h, i) => <motion.i key={i} style={{ height: `${h}%` }} initial={false}
      animate={{ scaleY: step >= 2 ? 1 : 0 }} transition={{ duration: 0.5, ease, delay: step >= 2 ? i * 0.04 : 0 }} />)}</div>
  </div>;
}

/* 3. Business Operations: a purchase order read, checked, entered and confirmed */
function Operations() {
  const [ref, step] = useStory(5, 700);
  const stages = ["Read", "Checked", "Entered", "Confirmed"];
  return <div ref={ref} className={styles.card}>
    <div className={styles.doc}>
      <span className={styles.docIcon}><FileText aria-hidden="true" /></span>
      <span><small>Purchase order</small><b>PO-7731 · 500 × SB-40</b></span>
      {step >= 1 && step < 4 && <Orb state="working" color={wave.pink} />}
    </div>
    <ol className={styles.steps}>
      {stages.map((s, i) => <li key={s} data-done={step > i}>
        <motion.span initial={false} animate={{ scale: step === i + 1 ? [1, 1.25, 1] : 1 }} transition={{ duration: 0.35 }}>{step > i ? <Check /> : i + 1}</motion.span>{s}
      </li>)}
      <motion.i className={styles.stepsFill} initial={false} animate={{ scaleX: Math.min(step, 4) / 4 }} transition={{ duration: 0.5, ease }} />
    </ol>
    <motion.div className={styles.result} initial={false} animate={{ opacity: step >= 5 ? 1 : 0, y: step >= 5 ? 0 : 8 }} transition={{ duration: 0.4, ease }}>
      <b>Order created in ERP</b><span><Check /> Customer notified</span>
    </motion.div>
  </div>;
}

/* 4. Financial Administration: a quote waits, a person approves, the reminder is scheduled */
function Finance() {
  const [ref, step] = useStory(4, 900);
  const approved = step >= 3;
  return <div ref={ref} className={styles.finance}>
    <div className={styles.quote}>
      <small>Quotation Q-2041</small>
      <strong>$4,820.00</strong>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={approved ? "ok" : "wait"} className={styles.quoteState} data-ok={approved}
          initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
          {approved ? <><Check /> Approved by you · sent</> : "Waiting for your approval"}
        </motion.span>
      </AnimatePresence>
      <div className={styles.quoteButtons}><span>Edit</span><motion.span className={styles.approveBtn} initial={false} animate={{ scale: step === 2 ? 0.92 : 1, opacity: approved ? 0.4 : 1 }} transition={{ duration: 0.2 }}>Approve</motion.span></div>
      <motion.i className={styles.cursor} initial={false} animate={{ opacity: step >= 1 && step <= 2 ? 1 : 0, x: step >= 1 ? 0 : 40, y: step >= 1 ? 0 : 30, scale: step === 2 ? 0.8 : 1 }} transition={{ duration: 0.5, ease }} />
    </div>
    <motion.div className={styles.reminder} initial={false} animate={{ opacity: step >= 4 ? 1 : 0, y: step >= 4 ? 0 : 10 }} transition={{ duration: 0.4, ease }}>
      <span>Payment reminder</span><b>Scheduled · 7 days</b>
    </motion.div>
  </div>;
}

/* 5. Customer Experience: a reminder goes out, the customer confirms, a review request follows */
function Experience() {
  const [ref, step] = useStory(4, 850);
  return <div ref={ref} className={styles.phone}>
    <header><b>Messages</b><em>Demo</em></header>
    <motion.p className={styles.msg} data-from="us" initial={false} animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 8 }} transition={{ duration: 0.35, ease }}>Reminder: your appointment is tomorrow at 9:30. Reply YES to confirm.</motion.p>
    <motion.p className={styles.msg} data-from="them" initial={false} animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 8 }} transition={{ duration: 0.35, ease }}>YES</motion.p>
    <motion.div className={styles.confirmed} initial={false} animate={{ opacity: step >= 3 ? 1 : 0, scale: step >= 3 ? 1 : 0.95 }} transition={{ duration: 0.35, ease }}><Check /> Confirmed · calendar updated</motion.div>
    <motion.div className={styles.stars} initial={false} animate={{ opacity: step >= 4 ? 1 : 0 }} transition={{ duration: 0.3 }}>
      {[0, 1, 2, 3, 4].map(i => <motion.i key={i} initial={false} animate={{ scale: step >= 4 ? 1 : 0 }} transition={{ duration: 0.3, delay: i * 0.08, ease }} />)}<span>Review request after the visit</span>
    </motion.div>
  </div>;
}

/* 6. Business Intelligence: KPIs count up, the trend line draws, the summary writes itself */
function Count({ to, on, prefix = "" }: { to: number; on: boolean; prefix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!on) { setN(0); return; }
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(to); return; }
    let raf = 0; const start = performance.now();
    const tick = (t: number) => { const p = Math.min(1, (t - start) / 1100); setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, to]);
  return <>{prefix}{n.toLocaleString("en-US")}</>;
}
function Intelligence() {
  const [ref, step] = useStory(3, 900);
  const on = step >= 1;
  const kpis = [["Enquiries", 128, "", "orange"], ["Quotes sent", 46, "", "coral"], ["Bookings", 73, "", "violet"], ["Avg. first reply", 4, "", "sky"]] as const;
  return <div ref={ref} className={styles.dash}>
    <header><strong>Operations dashboard · this week</strong><em>Demo</em></header>
    <div className={styles.kpis}>{kpis.map(([k, v, p, tone]) => <div key={k} data-tone={tone}><small>{k}</small><b><Count to={v} on={on} prefix={p} />{k === "Avg. first reply" ? " min" : ""}</b><i /></div>)}</div>
    <div className={styles.chart}>
      <svg viewBox="0 0 400 110" preserveAspectRatio="none" aria-hidden="true">
        {[25, 55, 85].map(y => <line key={y} x1="0" x2="400" y1={y} y2={y} className={styles.grid} />)}
        <motion.path d="M0 92 C40 88 60 70 100 72 S160 58 200 52 S260 44 300 30 S360 22 400 14" className={styles.line} initial={false} animate={{ pathLength: step >= 2 ? 1 : 0 }} transition={{ duration: 1.2, ease }} />
      </svg>
    </div>
    <motion.p className={styles.summary} initial={false} animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 6 }} transition={{ duration: 0.4, ease }}>
      <b>Summary:</b> enquiries up on last week, mostly from the landing page. Three quotes are waiting for approval.
    </motion.p>
  </div>;
}

const scenes: Record<string, () => React.ReactElement> = {
  payments: Acquisition, billing: FrontOffice, radar: Operations, issuing: Finance, crypto: Experience, connect: Intelligence,
};

export default function TileScene({ id }: { id: string }) {
  const Scene = scenes[id];
  return <MotionConfig reducedMotion="user"><span className={styles.stage} data-wide={id === "payments" || id === "connect"}>{Scene && <Scene />}</span></MotionConfig>;
}
