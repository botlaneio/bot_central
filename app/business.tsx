"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Factory, FileText, House, Mail, Package, ScanText, Stethoscope, UserCheck } from "lucide-react";
import { AnimatePresence, MotionConfig, motion, useInView } from "motion/react";
import styles from "./business.module.css";
import Orb, { wave } from "./orb";

/*
 * Industries we serve. Manufacturing is the flagship: a wide card where an RFQ steps through the order path and
 * waits for a person at the approval stage. Real Estate and Clinics sit below, each with its own live scene: a
 * late-night property enquiry answered and booked, and a clinic's day filling up with confirmations.
 * All scenes are labelled demos, sit in fixed-size boxes (no layout shift) and only run while on screen.
 * Each industry keeps its wave tone: manufacturing orange, real estate coral, clinics violet.
 */

// Icons from Lucide (ISC).
const paths = {
  factory: Factory,
  home: House,
  clinic: Stethoscope,
  mail: Mail,
  scan: ScanText,
  doc: FileText,
  user: UserCheck,
  box: Package,
  check: Check,
  arrow: ArrowRight,
} as const;
type IconName = keyof typeof paths;
const Icon = ({ name }: { name: IconName }) => { const C = paths[name]; return <C aria-hidden="true" />; };

const ease = [0.2, 0.7, 0.1, 1] as const;

/** Steps 0..count-1, holds on the last step, then restarts. Only runs while `on`. */
function useSteps(on: boolean, count: number, ms: number, holdEnd = 2600) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!on) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setStep(count - 1); return; }
    const t = setTimeout(() => setStep(s => (s >= count - 1 ? 0 : s + 1)), step >= count - 1 ? holdEnd : ms);
    return () => clearTimeout(t);
  }, [on, step, count, ms, holdEnd]);
  return step;
}

/* ── Manufacturing: an RFQ moving along the order path, stopping for approval ── */
const stages: [IconName, string, string][] = [
  ["mail", "RFQ received", "Email with drawing"],
  ["scan", "Read and classified", "Items, qty, deadline"],
  ["doc", "Quote drafted", "From your price list"],
  ["user", "Approval", "A person signs off"],
  ["box", "Order created", "PO matched in ERP"],
];
function OrderPath({ on }: { on: boolean }) {
  // Steps: 0-2 run, 3 waits for approval, 4 approved (still at stage 3), 5 order created.
  const step = useSteps(on, 6, 1500, 2800);
  const at = step <= 3 ? step : step === 4 ? 3 : 4;
  const waiting = step === 3;
  const approved = step >= 4;
  const done = (i: number) => i < at || (i === at && i !== 3) || (i === 3 && approved);
  return <div className={styles.path}>
    <div className={styles.track}>
      <motion.i className={styles.trackFill} animate={{ scaleX: at / (stages.length - 1) }} transition={{ duration: 0.6, ease }} />
    </div>
    <ol className={styles.stages}>
      {stages.map(([icon, name, detail], i) => <li key={name} data-done={done(i)} data-wait={i === 3 && waiting}>
        <span className={styles.stageIcon}><Icon name={done(i) && i < at ? "check" : icon} /></span>
        <strong>{name}</strong>
        <small>{i === 3 && waiting ? "Waiting for you" : i === 3 && approved ? "Approved by you" : detail}</small>
      </li>)}
    </ol>
    <div className={styles.ticket}>
      <AnimatePresence mode="wait">
        <motion.div key={step >= 5 ? "ok" : waiting ? "wait" : approved ? "approved" : "run"} className={styles.ticketInner}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3, ease }}>
          <span><small>RFQ-1187 · 500 × steel bracket SB-40</small>
            <b>{step >= 5 ? "Order confirmed · ERP #44102" : waiting ? "Quote $4,820 needs your approval" : approved ? "Approved by you · quote sent" : "Quote being prepared"}</b></span>
          {waiting ? <em className={styles.approve}>Approve</em> : step >= 4 ? <em className={styles.status}>{step >= 5 ? "Done" : "Sent"}</em> : <Orb state="composing" color={wave.orange} label="Preparing quote" />}
        </motion.div>
      </AnimatePresence>
    </div>
  </div>;
}

/* ── Real estate: an enquiry at 9:41 PM, answered and booked ── */
const chat: { from: "them" | "us"; text: string }[] = [
  { from: "them", text: "Hi, is the 3-bed on Park Street still available?" },
  { from: "us", text: "It is! What's your budget, and when would you like to view?" },
  { from: "them", text: "Around $450k. This weekend if possible." },
  { from: "us", text: "Saturday at 11:00 is free. Shall I book it with Maya?" },
];
function Enquiry({ on }: { on: boolean }) {
  const step = useSteps(on, chat.length + 2, 1400, 3000);
  return <div className={styles.chat}>
    <div className={styles.chatHead}>{chat[step]?.from === "us" ? <Orb state="listening" color={wave.coral} /> : <span className={styles.dot} />} WhatsApp · 9:41 PM<em>Demo</em></div>
    <div className={styles.bubbles}>
      {chat.map((m, i) => <motion.p key={i} className={styles.bubble} data-from={m.from}
        initial={false} animate={{ opacity: i < step ? 1 : 0, y: i < step ? 0 : 8 }} transition={{ duration: 0.35, ease }}>{m.text}</motion.p>)}
    </div>
    <motion.div className={styles.booked} initial={false} animate={{ opacity: step > chat.length ? 1 : 0, scale: step > chat.length ? 1 : 0.96 }} transition={{ duration: 0.4, ease }}>
      <Icon name="check" /> Viewing booked · Sat 11:00 · agent confirms in the morning
    </motion.div>
  </div>;
}

/* ── Clinics: tomorrow's list filling with confirmations ── */
const appts = [
  ["9:00", "Checkup", ["Reminder sent", "Confirmed"]],
  ["9:30", "Cleaning", ["Reminder sent", "Confirmed"]],
  ["10:15", "Consultation", ["Cancelled", "Slot offered", "Filled from waitlist"]],
  ["11:00", "Follow-up", ["Reminder sent", "Confirmed"]],
] as const;
function Schedule({ on }: { on: boolean }) {
  const step = useSteps(on, 7, 1100, 3000);
  return <div className={styles.schedule}>
    <div className={styles.chatHead}><span className={styles.dot} /> Tomorrow · front desk<em>Demo</em></div>
    {appts.map(([time, what, states], i) => {
      const k = Math.max(0, Math.min(states.length - 1, step - i - 1));
      const label = step <= i ? "Scheduled" : states[k];
      const ok = step > i && k === states.length - 1;
      return <div key={time} className={styles.appt}>
        <time>{time}</time><span>{what}</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.b key={label} data-ok={ok} data-warn={label === "Cancelled"} className={label === "Slot offered" ? styles.working : undefined}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25, ease }}>{label === "Slot offered" && <Orb state="connecting" color={wave.violet} />}{label}</motion.b>
        </AnimatePresence>
      </div>;
    })}
    <p className={styles.note}>Clinical questions always go to your team.</p>
  </div>;
}

const core = [["Customer Acquisition", "orange"], ["AI Front Office", "coral"], ["Business Operations", "pink"], ["Financial Administration", "violet"], ["Customer Experience", "sky"], ["Business Intelligence", "orange"]] as const;

const others = [
  { id: "startups", tone: "coral", icon: "home", label: "Real Estate", title: "Less time chasing leads. More time closing deals.", text: "Enquiries answered day and night, qualified on fair, consistent criteria, and booked straight into agents' calendars.", chips: ["Enquiries", "Qualification", "Viewings", "Follow-ups"], href: "/industries/real-estate", Scene: Enquiry },
  { id: "platforms", tone: "violet", icon: "clinic", label: "Clinics", title: "Focus on your patients. Let systems handle the admin.", text: "Calls answered, reminders confirmed and cancelled slots refilled, with patient privacy built in and no diagnosis, ever.", chips: ["Missed calls", "Reminders", "Digital intake", "Recall"], href: "/industries/clinics", Scene: Schedule },
] as const;

export default function Business() {
  const flagship = useRef<HTMLElement>(null);
  const pair = useRef<HTMLDivElement>(null);
  const flagOn = useInView(flagship, { amount: 0.3 });
  const pairOn = useInView(pair, { amount: 0.3 });

  return <MotionConfig reducedMotion="user">
    <section id="business" className={styles.business} aria-labelledby="business-heading">
      <div className="frame">
        <header className={styles.head}>
          <div>
            <p className={styles.kicker}><span />Industries</p>
            <h2 id="business-heading" className={styles.heading}>Industries we serve. <span>The same automation core, configured for how each industry actually works.</span></h2>
          </div>
          <p className={styles.lede}>We start with three industries in the United States and India, and build deep, reusable solutions for each before adding the next.</p>
        </header>

        <motion.article ref={flagship} id="enterprise" className={styles.flagship} data-tone="orange"
          initial={{ opacity: 0, y: 24 }} animate={flagOn ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.7, ease }}>
          <div className={styles.copy}>
            <div className={styles.labelRow}><span className={styles.icon}><Icon name="factory" /></span><span className={styles.flag}>Flagship · Manufacturing</span></div>
            <h3>From inquiry to order, intelligently connected.</h3>
            <p>For manufacturers, industrial suppliers and distributors. RFQs read and routed, quotes drafted from your price lists, purchase orders matched, dealers kept informed. Commercial and admin work only, never production machinery.</p>
            <ul className={styles.chips}>{["RFQ intake", "Quotations", "Purchase orders", "Dealer portals", "ERP and CRM"].map(c => <li key={c}>{c}</li>)}</ul>
            <a className={styles.cta} href="/industries/manufacturing">Explore manufacturing <Icon name="arrow" /></a>
          </div>
          <div className={styles.scene} aria-hidden="true"><span className={styles.demo}>Demo</span><OrderPath on={flagOn} /></div>
        </motion.article>

        <div ref={pair} className={styles.pair}>
          {others.map((ind, i) => <motion.article key={ind.id} id={ind.id} className={styles.card} data-tone={ind.tone}
            initial={{ opacity: 0, y: 24 }} animate={pairOn ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.7, ease, delay: i * 0.12 }}>
            <div className={styles.scene} aria-hidden="true"><ind.Scene on={pairOn} /></div>
            <div className={styles.copy}>
              <div className={styles.labelRow}><span className={styles.icon}><Icon name={ind.icon} /></span><span className={styles.flag}>{ind.label}</span></div>
              <h3>{ind.title}</h3>
              <p>{ind.text}</p>
              <ul className={styles.chips}>{ind.chips.map(c => <li key={c}>{c}</li>)}</ul>
              <a className={styles.cta} href={ind.href}>Explore {ind.label.toLowerCase()} <Icon name="arrow" /></a>
            </div>
          </motion.article>)}
        </div>

        <div className={styles.core}>
          <span className={styles.coreLabel}>One shared automation core</span>
          <ul>{core.map(([name, tone]) => <li key={name} data-tone={tone}><i />{name}</li>)}</ul>
        </div>
      </div>
    </section>
  </MotionConfig>;
}
