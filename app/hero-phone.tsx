"use client";

import { useEffect, useState } from "react";
import { Calendar, ChartColumn, Check, CreditCard, FileText, House, List, Mail, Phone, Settings, Truck } from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import BotOrb, { type Mood } from "./bot-orb";
import styles from "./hero-phone.module.css";
import Orb from "./orb";

/*
 * HeroPhone: one connected automation ecosystem, seen from the owner's phone, across sample workflows from the
 * three launch industries (manufacturing, real estate, clinics).
 *
 * Inside the phone: the botLane app (status bar, today's numbers, tabs, a live feed, a tab bar). Outside it,
 * cards float in beside the phone in step with the feed: the incoming RFQ, the fields read from it, a booked
 * viewing and the approved quote. Halfway through, the app asks a person to approve the quote: the human
 * approval checkpoint. The owner taps Approve.
 *
 * Animated with Motion. Only transform and opacity move (no filters, no animated gradients), so it stays smooth
 * on an iPad. The phone is visible from the first paint (CSS entrance); the story starts once React has loaded.
 * Everything shown is demo data and labelled as such. Reduced-motion visitors get the states without movement.
 */

// Icons from Lucide (ISC).
const icons = {
  mail: Mail,
  phone: Phone,
  calendar: Calendar,
  van: Truck,
  doc: FileText,
  card: CreditCard,
  check: Check,
  home: House,
  list: List,
  chart: ChartColumn,
  gear: Settings,
} as const;
type IconName = keyof typeof icons;

function Icon({ name }: { name: IconName }) {
  const C = icons[name];
  return <C aria-hidden="true" />;
}

// The story, one beat at a time. Each beat lasts `ms`; everything on screen is derived from the beat number.
const story = [
  { id: "ring", ms: 1700 },      // manufacturing: an RFQ email arrives
  { id: "booked", ms: 1800 },    // read and classified, quote drafted from the price list
  { id: "dispatch", ms: 1900 },  // real estate: enquiry qualified, viewing booked
  { id: "ask", ms: 1800 },       // the quote needs a person
  { id: "tap", ms: 350 },        // owner taps Approve
  { id: "approved", ms: 1500 },
  { id: "paid", ms: 3400 },      // clinics: reminder confirmed; the quote is sent and followed up
] as const;
type BeatId = (typeof story)[number]["id"];
const at = (id: BeatId) => story.findIndex(beat => beat.id === id);
const START_MS = 500;

type Note = { id: string; icon: IconName; kicker: string; text: string; from: BeatId };
const notes: Note[] = [
  { id: "call", icon: "doc", kicker: "MANUFACTURING · RFQ READ · 9:04", text: "500 steel brackets, powder-coated. Quote drafted from your price list.", from: "booked" },
  { id: "dispatch", icon: "calendar", kicker: "REAL ESTATE · VIEWING BOOKED · 9:20", text: "Enquiry for a 3-bed apartment answered. Viewing Saturday, 11:00.", from: "dispatch" },
  { id: "quote", icon: "doc", kicker: "NEEDS YOU · 9:31", text: "Quote Q-2041 for 500 brackets: $4,820. Send it?", from: "ask" },
  { id: "paid", icon: "check", kicker: "CLINICS · REMINDER CONFIRMED · 10:05", text: "Patient confirmed tomorrow's 9:30 appointment by SMS.", from: "paid" },
];

const spring = { type: "spring", stiffness: 380, damping: 32 } as const;
const float = { type: "spring", stiffness: 220, damping: 24 } as const;
const cardMotion = {
  initial: { opacity: 0, y: 16, scale: 0.94 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.96, transition: { duration: 0.3 } },
  transition: float,
};

// A number that rolls up to its new value.
function Roll({ value }: { value: string }) {
  return <span className={styles.roll}>
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.span key={value} initial={{ y: "100%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: "-100%", opacity: 0 }} transition={spring}>{value}</motion.span>
    </AnimatePresence>
  </span>;
}

export default function HeroPhone({ className }: { className?: string }) {
  const [beat, setBeat] = useState(-1);
  const [run, setRun] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const go = (next: number) => {
      if (next >= story.length) { setRun(r => r + 1); setBeat(-1); timer = setTimeout(() => go(0), 700); return; }
      setBeat(next);
      timer = setTimeout(() => go(next + 1), story[next].ms);
    };
    timer = setTimeout(() => go(0), START_MS);
    return () => clearTimeout(timer);
  }, []);

  const reached = (id: BeatId) => beat >= at(id);
  const now = story[beat]?.id;
  const approved = reached("approved");

  const shown = notes.filter(note => reached(note.from));
  const calls = 11 + (reached("booked") ? 1 : 0) + (reached("dispatch") ? 1 : 0);
  const quotes = 3 + (reached("approved") ? 1 : 0);
  const booked = 5 + (reached("dispatch") ? 1 : 0) + (reached("paid") ? 1 : 0);

  const mood: Mood = now === "ring" ? "surprised" : now === "ask" ? "thinking" : now === "approved" || now === "paid" ? "happy" : beat >= 0 ? "working" : "idle";
  const clock = beat < at("dispatch") ? "9:04" : beat < at("ask") ? "9:20" : beat < at("paid") ? "9:31" : "10:05";

  return <MotionConfig reducedMotion="user">
    <div className={`${styles.stage} ${className ?? ""}`} role="img"
      aria-label="Demo with sample data: one phone showing connected workflows. botLane reads a manufacturing RFQ and drafts a quote, books a real estate viewing, asks a person to approve the quote before it is sent, and confirms a clinic patient's appointment reminder.">

      <div className={styles.phone} aria-hidden="true">
        <i className={styles.btnAction} /><i className={styles.btnVolUp} /><i className={styles.btnVolDown} /><i className={styles.btnPower} />
        <div className={styles.screen}>
          <div className={styles.status}><Roll value={clock} /><span className={styles.signal}><i /><i /><i /><i /><b /></span></div>

          <div className={styles.appBar}>
            <BotOrb size={28} mood={mood} intro={false} />
            <div><strong>botLane</strong><small>Sample workflows</small></div>
            <span className={styles.demo}>Demo</span>
          </div>

          <div className={styles.today}>
            <div><small>Enquiries</small><strong><Roll value={String(calls)} /></strong></div>
            <div><small>Quotes sent</small><strong><Roll value={String(quotes)} /></strong></div>
            <div><small>Booked</small><strong><Roll value={String(booked)} /></strong></div>
          </div>

          <div className={styles.tabs}>
            <span data-on="true">Activity <motion.i className={styles.live} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.6, repeat: Infinity }} /></span>
            <span>Approvals</span><span>Inbox</span>
          </div>

          <ul className={styles.feed}>
            <AnimatePresence initial={false}>
              {beat >= 0 && now === "ring" && <motion.li key={`${run}-typing`} layout className={`${styles.note} ${styles.typing}`}
                initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, transition: { duration: 0.15 } }} transition={spring}>
                <span className={styles.noteIcon}><Icon name="mail" /></span>
                <div><small>NEW RFQ · 9:04</small><p className={styles.reading}>Reading the request <Orb state="searching" /></p></div>
              </motion.li>}
              {[...shown].reverse().map(note => {
                const isQuote = note.id === "quote";
                const ok = isQuote && approved;
                return <motion.li key={`${run}-${note.id}`} layout className={styles.note} data-ok={ok} data-ask={isQuote && !approved}
                  initial={{ opacity: 0, y: -14, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, transition: { duration: 0.25 } }}
                  transition={spring}>
                  <span className={styles.noteIcon}><Icon name={ok ? "check" : note.icon} /></span>
                  <div>
                    <small>{ok ? "APPROVED BY YOU · 9:32" : note.kicker}</small>
                    <p>{ok ? "Quote Q-2041: $4,820. Sent to the buyer, follow-up in 3 days." : note.text}</p>
                    <AnimatePresence initial={false}>
                      {isQuote && !approved && <motion.div key="buttons" className={styles.buttons}
                        exit={{ opacity: 0, height: 0, marginTop: 0 }} transition={{ duration: 0.25, ease: [0.2, 0.7, 0.1, 1] }}>
                        <span>Edit</span>
                        <motion.span className={styles.approve} animate={{ scale: now === "tap" ? 0.9 : 1 }} transition={spring}>Approve</motion.span>
                      </motion.div>}
                    </AnimatePresence>
                  </div>
                </motion.li>;
              })}
            </AnimatePresence>
          </ul>

          <nav className={styles.tabBar}>
            {(["home", "list", "chart", "gear"] as const).map((name, index) => <span key={name} data-on={index === 0}><Icon name={name} /></span>)}
          </nav>
          <span className={styles.homeBar} />

          {/* The owner's finger, only for the tap. */}
          <AnimatePresence>
            {(now === "ask" || now === "tap") && <motion.span key="finger" className={styles.finger}
              initial={{ opacity: 0, x: 40, y: 50 }} animate={{ opacity: 1, x: 0, y: 0, scale: now === "tap" ? 0.8 : 1 }} exit={{ opacity: 0, scale: 1.4 }}
              transition={{ ...float, delay: now === "ask" ? 0.9 : 0 }} />}
          </AnimatePresence>
        </div>
      </div>

      {/* Outside the phone: what is happening in the real world at each step. */}
      <div className={styles.side} aria-hidden="true">
        <AnimatePresence>
          {(now === "ring" || now === "booked") && <motion.div key={`${run}-call`} className={`${styles.card} ${styles.callCard}`} {...cardMotion}>
            <span className={styles.cardIcon} data-ring={now === "ring"}><Icon name="mail" /></span>
            <div><small>{now === "ring" ? "New RFQ by email" : "RFQ read by botLane"}</small><strong>rfq-brackets.pdf</strong></div>
            <span className={styles.wave}>{[0.5, 0.9, 0.6, 1, 0.7, 0.4, 0.8].map((h, i) =>
              <motion.i key={i} style={{ scaleY: h }} animate={{ scaleY: [h, h * 0.35, h] }} transition={{ duration: 0.7 + i * 0.07, repeat: Infinity, ease: "easeInOut" }} />)}</span>
          </motion.div>}

          {reached("booked") && beat < at("approved") && <motion.div key={`${run}-doc`} className={`${styles.card} ${styles.mapCard}`} {...cardMotion}>
            <small>Read from the attachment</small>
            <dl className={styles.fields}>
              {([["Item", "Steel bracket SB-40"], ["Quantity", "500"], ["Finish", "Powder-coated"], ["Needed by", "12 Jan"]] as const).map(([k, v], i) =>
                <motion.div key={k} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ ...float, delay: 0.2 + i * 0.12 }}><dt>{k}</dt><dd>{v}</dd></motion.div>)}
            </dl>
          </motion.div>}

          {reached("dispatch") && beat < at("paid") && <motion.div key={`${run}-cal`} className={`${styles.card} ${styles.calCard}`} {...cardMotion}>
            <small>Saturday · Agent calendar</small>
            <div className={styles.slots}>
              <span>10:30</span><span>11:00</span><span>11:30</span>
              <motion.b initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ ...float, delay: 0.25 }}>Viewing · 3-bed apartment</motion.b>
            </div>
          </motion.div>}

          {reached("approved") && <motion.div key={`${run}-paid`} className={`${styles.card} ${styles.paidCard}`} {...cardMotion}>
            <small>Quote Q-2041</small>
            <strong>$4,820.00</strong>
            <motion.span className={styles.stamp} initial={{ scale: 1.6, opacity: 0, rotate: -12 }} animate={{ scale: 1, opacity: 1, rotate: -6 }} transition={{ ...spring, delay: 0.35 }}>Approved</motion.span>
            <div className={styles.stars}><span>Approved by you · sent to the buyer</span></div>
          </motion.div>}
        </AnimatePresence>
      </div>
    </div>
  </MotionConfig>;
}
