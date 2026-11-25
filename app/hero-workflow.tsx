"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion, useSpring, useTransform, type Variants } from "motion/react";
import styles from "./hero-workflow.module.css";

/*
 * HeroWorkflow: an animated "org chart" of an automated plumbing business, drawn on a transparent background.
 * Signals come in, a job is created, three groups of automations work it from first call to review, and the
 * owner only approves what matters. Standalone React component animated with Motion (motion/react): it draws
 * itself in on page load, then runs one job after another. Everything shown is demo data and labelled as such.
 * Visitors who prefer reduced motion get the same states without movement (MotionConfig reducedMotion="user").
 */

type Task = { group: number; text: string; time: string; icon: keyof typeof icons; approval?: boolean };

const groups = ["Win the job", "Run the job", "Close it out"];
const tasks: Task[] = [
  { group: 0, text: "Answer call", time: "11:42", icon: "phone" },
  { group: 0, text: "Qualify job", time: "11:43", icon: "spark" },
  { group: 0, text: "Book slot", time: "11:44", icon: "calendar" },
  { group: 1, text: "Dispatch tech", time: "11:44", icon: "van" },
  { group: 1, text: "Text ETA", time: "11:45", icon: "message" },
  { group: 1, text: "Send quote", time: "12:51", icon: "doc", approval: true },
  { group: 2, text: "Invoice", time: "1:52", icon: "receipt" },
  { group: 2, text: "Get paid", time: "2:07", icon: "card" },
  { group: 2, text: "Ask review", time: "2:08", icon: "star" },
];

const icons = {
  phone: "M5 4h3l1.5 4-2 1.2a10 10 0 0 0 5.3 5.3l1.2-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 3 6a2 2 0 0 1 2-2z",
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6",
  calendar: "M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM4 10h16M8 3v4M16 3v4",
  van: "M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  message: "M4 5h16v11H9l-5 4z",
  doc: "M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5",
  receipt: "M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6",
  card: "M3 6h18v12H3zM3 10h18M7 15h3",
  star: "m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z",
  globe: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c2.5 2.6 2.5 15.4 0 18M12 3c-2.5 2.6-2.5 15.4 0 18",
  pin: "M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12zM12 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
  check: "M6 12.5l4 4 8-9",
} as const;

// The run, one event at a time: a signal, the job card, then each task. The quote waits for the owner.
const events = ["signal", "job", ...tasks.flatMap((task, index) => task.approval ? ["await", `t${index}`] : [`t${index}`]), "done"];
const duration = (event: string) => event === "signal" || event === "job" ? 900 : event === "await" ? 1800 : event === "done" ? 2800 : 800;
const taskEvent = (index: number) => events.indexOf(`t${index}`);
const DRAW_IN_MS = 1600;

// Flat accent, plus flat colours written as the same three-stop gradient so Motion can blend between them.
const gradient = (a: string, b: string, c: string) => `linear-gradient(135deg, ${a} 0%, ${b} 50%, ${c} 100%)`;
const SILK = gradient("#5333F5", "#5333F5", "#5333F5");
const GREY = gradient("#f6f8fa", "#f6f8fa", "#f6f8fa");
const WHITE = gradient("#ffffff", "#ffffff", "#ffffff");

const spring = { type: "spring", stiffness: 260, damping: 26 } as const;
const soft = { type: "spring", stiffness: 120, damping: 20 } as const;

// Draw-in on page load: each block rises and sharpens into place, one after another.
const chart: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } } };
const block: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: soft },
};
const lineX: Variants = { hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.6, ease: [0.2, 0.7, 0.1, 1] } } };
const lineY: Variants = { hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 0.5, ease: [0.2, 0.7, 0.1, 1] } } };
const marker: Variants = { hidden: { scale: 0 }, show: { scale: 1, transition: { ...spring, delay: 0.25 } } };

function Icon({ name }: { name: keyof typeof icons }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={icons[name]} /></svg>;
}

// A number that springs to its new value instead of jumping.
function Counter({ value, format = (n: number) => String(Math.round(n)) }: { value: number; format?: (n: number) => string }) {
  const motionValue = useSpring(value, { stiffness: 90, damping: 18 });
  const text = useTransform(motionValue, latest => format(latest));
  useEffect(() => { motionValue.set(value); }, [motionValue, value]);
  return <motion.span>{text}</motion.span>;
}

function Bars({ heights }: { heights: number[] }) {
  return <span className={styles.bars}>
    {heights.map((height, index) => <motion.i key={index} initial={{ height: 0 }} animate={{ height: `${height}%` }} transition={{ ...soft, delay: 1.2 + index * 0.05 }} />)}
  </span>;
}

export default function HeroWorkflow({ className }: { className?: string }) {
  const [step, setStep] = useState(-1);
  const [run, setRun] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const go = (next: number) => {
      if (next >= events.length) { setRun(value => value + 1); setStep(-1); timer = setTimeout(() => go(0), 600); return; }
      setStep(next);
      timer = setTimeout(() => go(next + 1), duration(events[next]));
    };
    timer = setTimeout(() => go(0), DRAW_IN_MS);
    return () => clearTimeout(timer);
  }, []);

  const event = events[step] ?? "";
  const done = (index: number) => step > taskEvent(index) || event === "done";
  const awaiting = event === "await";
  const approved = step > events.indexOf("await");
  const hot = event === "signal" || event === "job";
  const jobId = 1042 + run;

  const answered = 41 + run + (done(0) ? 1 : 0);
  const booked = 17 + run + (done(2) ? 1 : 0);
  const collected = 7840 + run * 480 + (done(7) ? 480 : 0);

  return <MotionConfig reducedMotion="user">
    <motion.div className={`${styles.chart} ${className ?? ""}`} variants={chart} initial="hidden" animate="show"
      role="img" aria-label="Demo: how botLane automates a plumbing business. Calls, web forms and messages create a job; automations answer, qualify, book, dispatch, quote, invoice, collect payment and ask for a review; the owner approves the quote.">

      <motion.div className={styles.headRow} variants={block} aria-hidden="true">
        <p className={styles.kicker}>THE AUTOMATED BACK OFFICE <span>·</span> 9 AUTOMATIONS <span>·</span> 1 OWNER</p>
        <span className={styles.demo}>Demo</span>
      </motion.div>

      <div className={styles.top} aria-hidden="true">
        <motion.div className={`${styles.box} ${styles.signals}`} variants={block}>
          <span className={styles.label}>SIGNALS · 4 SOURCES</span>
          <div className={styles.sources}>
            {(["phone", "globe", "pin", "message"] as const).map((name, index) => {
              const on = index === 0 && hot;
              return <motion.span key={name} className={styles.source}
                animate={{ scale: on ? 1.1 : 1, backgroundImage: on ? SILK : GREY, color: on ? "#ffffff" : "#425e73", boxShadow: on ? "0 0 0 5px rgba(83,51,245,.16)" : "0 0 0 0px rgba(83,51,245,0)" }}
                transition={spring}><Icon name={name} /></motion.span>;
            })}
          </div>
        </motion.div>

        <motion.div className={styles.link} variants={block}>
          <motion.span className={styles.hLine} variants={lineX} data-lit={step >= 0} />
          <motion.b variants={marker} data-lit={step >= 0}>1</motion.b>
          <small>NEW LEAD</small>
        </motion.div>

        <motion.div className={`${styles.box} ${styles.job}`} variants={block} data-filled={step >= 1}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span key={jobId} className={styles.label} initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={spring}>JOB #{jobId}</motion.span>
          </AnimatePresence>
          <motion.div animate={{ opacity: step >= 1 ? 1 : 0.25, filter: step >= 1 ? "blur(0px)" : "blur(2px)" }} transition={soft}>
            <strong>Burst pipe, kitchen</strong>
            <dl>
              <div><dt>Priority</dt><dd className={styles.urgent}>Emergency</dd></div>
              <div><dt>Received</dt><dd>11:42 PM</dd></div>
            </dl>
          </motion.div>
        </motion.div>
      </div>

      <motion.div className={styles.down} variants={block} aria-hidden="true">
        <motion.span className={styles.vLine} variants={lineY} />
        <motion.b variants={marker}>2</motion.b><small>ESCALATES ONLY WHAT MATTERS</small>
      </motion.div>

      <motion.div className={styles.owner} variants={block} data-awaiting={awaiting} aria-hidden="true">
        <span className={styles.avatar}>You</span>
        <div className={styles.ownerText}><strong>YOU</strong><span>the owner</span></div>
        <motion.div className={styles.pills} layout transition={spring}>
          <AnimatePresence mode="popLayout" initial={false}>
            {awaiting
              ? <motion.span key="ask" className={styles.ask} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: [1, 1.04, 1] }} exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ opacity: { duration: 0.2 }, scale: { duration: 0.9, repeat: Infinity, ease: "easeInOut" } }}>APPROVE QUOTE · $480?</motion.span>
              : approved
                ? <motion.span key="ok" className={styles.ok} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={spring}>✓ QUOTE APPROVED</motion.span>
                : <motion.span key="idle" className={styles.idlePills} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><span>APPROVE QUOTES</span><span>APPROVE REFUNDS</span></motion.span>}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <motion.div className={styles.down} variants={block} aria-hidden="true">
        <motion.span className={styles.vLine} variants={lineY} />
        <motion.b variants={marker}>3</motion.b><small>RUNS THE REST</small>
      </motion.div>

      <motion.div className={styles.group} variants={block} aria-hidden="true">
        <span className={styles.groupLabel}>AUTOMATIONS · DEMO DATA</span>
        <div className={styles.columns}>
          {groups.map((name, group) => <div key={name} className={styles.column}>
            <span className={styles.columnTitle}>{name}</span>
            <ul>
              {tasks.map((task, index) => {
                if (task.group !== group) return null;
                const waiting = !!task.approval && awaiting;
                const state = done(index) ? "done" : step === taskEvent(index) || waiting ? "active" : "idle";
                return <motion.li key={task.text} data-state={state}
                  animate={{ opacity: state === "idle" ? 0.5 : 1, backgroundColor: state === "active" ? "#f4f2ff" : "rgba(244,242,255,0)" }} transition={soft}>
                  <motion.span className={styles.taskIcon}
                    animate={{ backgroundImage: state === "done" ? SILK : state === "active" ? WHITE : GREY, color: state === "idle" ? "#425e73" : state === "done" ? "#ffffff" : "#5333f5", boxShadow: state === "active" ? "inset 0 0 0 1.5px #5333f5" : "inset 0 0 0 0px #5333f5", scale: state === "active" ? 1.08 : 1 }}
                    transition={spring}>
                    <AnimatePresence mode="popLayout" initial={false}>
                      <motion.span key={state === "done" ? "check" : "icon"} className={styles.glyph} data-done={state === "done"}
                        initial={{ scale: 0.3, rotate: -30, opacity: 0 }} animate={{ scale: 1, rotate: 0, opacity: 1 }} exit={{ scale: 0.3, opacity: 0 }} transition={spring}>
                        <Icon name={state === "done" ? "check" : task.icon} />
                      </motion.span>
                    </AnimatePresence>
                  </motion.span>
                  <span className={styles.taskText}>{task.text}</span>
                  <span className={styles.taskTime}>
                    <AnimatePresence mode="popLayout" initial={false}>
                      {state === "done" && <motion.span key="t" initial={{ opacity: 0, x: 6 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={spring}>{task.time}</motion.span>}
                      {state === "active" && <motion.span key="a" className={waiting ? styles.wait : styles.working} initial={{ opacity: 0 }} animate={{ opacity: [0.35, 1, 0.35] }} exit={{ opacity: 0 }} transition={{ duration: 1, repeat: Infinity }}>{waiting ? "WAIT" : "···"}</motion.span>}
                    </AnimatePresence>
                  </span>
                </motion.li>;
              })}
            </ul>
          </div>)}
        </div>
      </motion.div>

      <motion.div className={styles.stats} variants={block} aria-hidden="true">
        <div><span className={styles.label}>CALLS ANSWERED</span><strong><Counter value={answered} /></strong><Bars heights={[30, 45, 38, 60, 52, 75, 90]} /></div>
        <div><span className={styles.label}>JOBS BOOKED</span><strong><Counter value={booked} /></strong><Bars heights={[40, 35, 55, 48, 66, 72, 85]} /></div>
        <div className={styles.money}><span className={styles.label}>COLLECTED</span><strong><Counter value={collected} format={n => "$" + Math.round(n).toLocaleString("en-US")} /></strong><small>this week · demo</small></div>
      </motion.div>
    </motion.div>
  </MotionConfig>;
}
