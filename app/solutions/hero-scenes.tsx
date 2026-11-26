"use client";

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, Bell, Check, FileText, Globe, MessageCircle, Phone, PhoneIncoming, ScanLine, Send, Star, UserRound } from "lucide-react";
import { AnimatePresence, MotionConfig, motion, useInView } from "motion/react";
import styles from "./hero-scenes.module.css";

/*
 * Animated hero scenes for the six solution pages, one story each. A scene steps through its frames while on
 * screen once, then holds on the last one. The stage has a fixed size during playback.
 * Everything shown is demo data and labelled so. Reduced motion shows the final frame.
 * Icons from Lucide (ISC).
 */

const ease = [0.2, 0.7, 0.1, 1] as const;

/** Advances to the last frame while in view and keeps it visible. */
function useScene(last: number, ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView || step >= last) return;
    // Reduced motion, or ?still for previews and screenshots: show the final frame.
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || new URLSearchParams(location.search).has("still")) { setStep(last); return; }
    const t = setTimeout(() => setStep(s => Math.min(s + 1, last)), step === 0 ? 500 : ms);
    return () => clearTimeout(t);
  }, [inView, step, last, ms]);
  return [ref, step] as const;
}

const pop = { initial: { opacity: 0, y: 10, scale: 0.97 }, animate: { opacity: 1, y: 0, scale: 1 }, exit: { opacity: 0, y: -6 }, transition: { duration: 0.35, ease } };

function Frame({ title, children, tone, stageRef }: { title: string; children: React.ReactNode; tone: string; stageRef: React.Ref<HTMLDivElement> }) {
  return <MotionConfig reducedMotion="user">
    <div ref={stageRef} className={styles.frame} data-tone={tone} aria-hidden="true">
      <header className={styles.bar}><i /><i /><i /><span>{title}</span><em>Demo</em></header>
      <div className={styles.body}>{children}</div>
    </div>
  </MotionConfig>;
}

/* 1. Customer Acquisition: a landing-page form fills in, is sent, and arrives in the CRM as a qualified lead. */
function Acquisition() {
  const [ref, step] = useScene(7, 700);
  const fields: [string, string][] = [["Name", "Ravi Menon"], ["Company", "Menon Fabrication"], ["Need", "RFQ · 500 steel brackets"]];
  return <Frame title="Landing page → CRM" tone="orange" stageRef={ref}>
    <div className={styles.page}>
      <div className={styles.pageHead}><Globe /><span>menonfab.example/rfq</span></div>
      {fields.map(([label, value], i) => <div key={label} className={styles.field}>
        <small>{label}</small>
        <span>{step > i && <Typed key={`${value}-${step > i}`} text={value} />}{step === i && <motion.i className={styles.caret} animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />}</span>
      </div>)}
      <motion.div className={styles.submit} animate={{ scale: step === 3 ? [1, 0.94, 1] : 1 }}>{step >= 4 ? <><Check /> Sent</> : "Request a quote"}</motion.div>
    </div>
    <div className={styles.crm}>
      <small>CRM · new leads</small>
      <AnimatePresence>
        {step >= 5 && <motion.div key="lead" className={styles.lead} initial={{ opacity: 0, x: -40, scale: 0.9 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.5, ease }}>
          <span className={styles.avatar}>RM</span><span><b>Ravi Menon</b><small>RFQ · 500 brackets · from landing page</small></span>
          {step >= 6 && <motion.em {...pop}>Qualified</motion.em>}
        </motion.div>}
      </AnimatePresence>
      {step < 5 && <><div className={styles.leadGhost} /><div className={styles.leadGhost} /></>}
      {step >= 7 && <motion.p {...pop} className={styles.note}><Send /> Assigned to sales with the details attached</motion.p>}
    </div>
  </Frame>;
}

/* 2. AI Front Office: an after-hours call is answered, summarised and routed to the right person. */
function FrontOffice() {
  const [ref, step] = useScene(6, 900);
  const lines = ["Caller: Is the 3-bed on Park Street still available?", "Assistant: It is. When would you like to view it?", "Caller: Saturday morning, if possible."];
  return <Frame title="Incoming call · 9:42 PM" tone="coral" stageRef={ref}>
    <div className={styles.call}>
      <motion.span className={styles.callIcon} animate={step === 0 ? { rotate: [0, -12, 12, -12, 0] } : { rotate: 0 }} transition={{ duration: 0.6, repeat: step === 0 ? Infinity : 0 }}>
        {step === 0 ? <PhoneIncoming /> : <Phone />}
      </motion.span>
      <span><b>+1 (415) 555-0142</b><small>{step === 0 ? "Ringing… after hours" : "Answered by the assistant"}</small></span>
      <div className={styles.wave}>{Array.from({ length: 12 }, (_, i) => <motion.i key={i} animate={step >= 1 && step < 5 ? { scaleY: [0.3, 1, 0.4, 0.8, 0.3] } : { scaleY: 0.25 }}
        transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.06 }} />)}</div>
    </div>
    <div className={styles.transcript}>
      {lines.map((l, i) => step >= i + 1 && <motion.p key={l} {...pop} data-who={l.startsWith("Caller") ? "them" : "us"}>{l.split(": ")[1]}</motion.p>)}
    </div>
    <AnimatePresence>{step >= 5 && <motion.div key="route" {...pop} className={styles.route}>
      <UserRound /><span><b>Routed to Maya (lettings)</b><small>Summary: 3-bed Park Street · viewing Sat AM · budget $450k</small></span>
    </motion.div>}</AnimatePresence>
    {step >= 6 && <motion.p {...pop} className={styles.note}><Check /> Caller gets a text confirming the next step</motion.p>}
  </Frame>;
}

/* 3. Business Operations: a purchase order is read, its fields go into the ERP, and a mismatch goes to a person. */
function Operations() {
  const [ref, step] = useScene(6, 800);
  const rows: [string, string, boolean][] = [["PO number", "PO-77812", true], ["Item", "SB-40 bracket × 500", true], ["Unit price", "$9.40 (list $9.64)", false], ["Delivery", "12 Dec", true]];
  return <Frame title="Purchase order → ERP" tone="pink" stageRef={ref}>
    <div className={styles.doc}>
      <FileText />
      <div className={styles.docLines}>{Array.from({ length: 7 }, (_, i) => <i key={i} style={{ width: `${[90, 70, 84, 60, 92, 76, 50][i]}%` }} />)}</div>
      <motion.span className={styles.scan} animate={step >= 1 && step <= 2 ? { y: [0, 150, 0] } : { y: 0, opacity: step >= 1 && step <= 2 ? 1 : 0 }} transition={{ duration: 1.6, ease: "easeInOut" }}><ScanLine /></motion.span>
    </div>
    <div className={styles.erp}>
      <small>ERP · new sales order</small>
      {rows.map(([k, v, ok], i) => <div key={k} className={styles.erpRow} data-on={step >= 2 + Math.floor(i / 2)}>
        <span>{k}</span>
        <AnimatePresence>{step >= 2 + Math.floor(i / 2) && <motion.b {...pop} data-ok={ok}>{v}{ok ? <Check /> : <AlertTriangle />}</motion.b>}</AnimatePresence>
      </div>)}
    </div>
    {step >= 5 && <motion.div {...pop} className={styles.flag}><AlertTriangle /><span><b>Price differs from your list</b><small>Sent to Anita to check before the order is confirmed</small></span></motion.div>}
  </Frame>;
}

/* 4. Financial Administration: a quote builds from the price list, waits for approval, is sent, then paid. */
function Finance() {
  const [ref, step] = useScene(7, 750);
  const items: [string, number][] = [["SB-40 bracket × 500", 4700], ["Zinc finish", 320], ["Delivery", 120]];
  const total = items.slice(0, Math.min(step, 3)).reduce((s, [, v]) => s + v, 0);
  return <Frame title="Quote Q-2041" tone="violet" stageRef={ref}>
    <div className={styles.quote}>
      {items.map(([name, v], i) => <div key={name} className={styles.qRow} data-on={step > i}>
        <span>{name}</span>{step > i && <motion.b {...pop}>${v.toLocaleString("en-US")}</motion.b>}
      </div>)}
      <div className={styles.qTotal}><span>Total</span><b>${(step >= 3 ? 5140 : total).toLocaleString("en-US")}</b></div>
    </div>
    <div className={styles.approval} data-state={step < 4 ? "draft" : step === 4 ? "wait" : "done"}>
      <span><small>{step < 4 ? "Drafted from your price list" : step === 4 ? "Needs your approval" : "Approved by you"}</small><b>Quote · $5,140</b></span>
      {step === 4 ? <motion.i animate={{ scale: [1, 0.92, 1] }} transition={{ duration: 0.9, repeat: Infinity }}>Approve</motion.i> : step > 4 ? <em><Check /> Sent</em> : null}
    </div>
    <AnimatePresence>{step >= 6 && <motion.div key="paid" className={styles.paid} initial={{ opacity: 0, scale: 1.4, rotate: -14 }} animate={{ opacity: 1, scale: 1, rotate: -8 }} transition={{ type: "spring", stiffness: 260, damping: 16 }}>Paid</motion.div>}</AnimatePresence>
    {step >= 7 && <motion.p {...pop} className={styles.note}><Check /> Payment matched to invoice INV-3307</motion.p>}
  </Frame>;
}

/* 5. Customer Experience: a customer is kept informed from booking to review. */
function Experience() {
  const [ref, step] = useScene(6, 850);
  const msgs: [React.ReactNode, string, string][] = [
    [<Check key="c" />, "Booking confirmed", "Fri 10:30 · Dr. Shah"],
    [<Bell key="b" />, "Reminder", "Tomorrow at 10:30. Reply C to confirm"],
    [<MessageCircle key="m" />, "Confirmed", "Thanks, see you tomorrow"],
    [<Star key="s" />, "How was your visit?", "Tap to rate"],
  ];
  return <Frame title="Customer messages" tone="sky" stageRef={ref}>
    <div className={styles.phone}>
      <div className={styles.phoneTop}><span className={styles.avatar}>SK</span><b>Sara K.</b><small>WhatsApp</small></div>
      <div className={styles.thread}>
        {msgs.map(([icon, t, d], i) => step > i && <motion.div key={t} {...pop} className={styles.msg} data-from={i === 2 ? "them" : "us"}>
          <span>{icon}</span><div><b>{t}</b><small>{d}</small></div>
        </motion.div>)}
        {step >= 5 && <motion.div {...pop} className={styles.stars}>{Array.from({ length: 5 }, (_, i) => <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.12, type: "spring", stiffness: 400, damping: 14 }}><Star /></motion.span>)}</motion.div>}
      </div>
    </div>
    {step >= 6 && <motion.p {...pop} className={styles.note}><Check /> Review request sent only after a 5-star reply</motion.p>}
  </Frame>;
}

/* 6. Business Intelligence: numbers count up, bars grow, and a plain-language summary writes itself. */
function Count({ to, on, prefix = "", suffix = "" }: { to: number; on: boolean; prefix?: string; suffix?: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!on) { setN(0); return; }
    let raf = 0; const start = performance.now();
    const tick = (t: number) => { const k = Math.min(1, (t - start) / 900); setN(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, to]);
  return <>{prefix}{n.toLocaleString("en-US")}{suffix}</>;
}
function Intelligence() {
  const [ref, step] = useScene(5, 900);
  const bars = [42, 58, 51, 70, 64, 86, 78];
  const summary = "Enquiries are up 18% this week. 3 quotes are waiting on approval for over 2 days.";
  return <Frame title="This week · dashboard" tone="orange" stageRef={ref}>
    <div className={styles.kpis}>
      <div><small>Enquiries</small><b><Count to={146} on={step >= 1} /></b></div>
      <div><small>Quoted</small><b><Count to={58} on={step >= 1} /></b></div>
      <div><small>Won</small><b><Count to={41200} on={step >= 1} prefix="$" /></b></div>
    </div>
    <div className={styles.chart}>
      {bars.map((h, i) => <motion.i key={i} initial={false} animate={{ scaleY: step >= 2 ? h / 100 : 0.04 }} transition={{ duration: 0.6, ease, delay: i * 0.06 }} data-hi={i === 5} />)}
      <svg viewBox="0 0 100 40" preserveAspectRatio="none"><motion.polyline points="0,32 16,26 33,29 50,18 66,22 83,8 100,12" fill="none"
        initial={false} animate={{ pathLength: step >= 3 ? 1 : 0 }} transition={{ duration: 1, ease }} /></svg>
    </div>
    <div className={styles.summary}>
      <small>Summary</small>
      <p>{step >= 4 ? <Typed text={summary} /> : " "}</p>
    </div>
    {step >= 5 && <motion.p {...pop} className={styles.note}><Check /> Sent to your inbox every Monday</motion.p>}
  </Frame>;
}
function Typed({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || new URLSearchParams(location.search).has("still")) { setN(text.length); return; }
    if (n >= text.length) return;
    const t = setTimeout(() => setN(n + 2), 18);
    return () => clearTimeout(t);
  }, [n, text]);
  return <>{text.slice(0, n)}</>;
}

const scenes = { payments: Acquisition, billing: FrontOffice, radar: Operations, issuing: Finance, crypto: Experience, connect: Intelligence } as const;

export default function HeroScene({ id }: { id: keyof typeof scenes }) {
  const Scene = scenes[id];
  return <Scene />;
}
