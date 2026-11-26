"use client";

import { useEffect, useRef, useState } from "react";
import { Code, EyeOff, Globe, Hourglass, Inbox, Mail, MessageCircle, PenLine, Phone, Repeat, Sheet, ShieldCheck, Sparkles, Unlink, Users, Workflow } from "lucide-react";
import { MotionConfig, motion, useInView } from "motion/react";
import styles from "./challenges.module.css";
import Orb from "./orb";

/*
 * Operational challenges, then how botLane answers them.
 *
 * Challenges: a bento of five cards. Each has an icon and a small looping scene that shows the problem
 * (fields retyped, enquiries piling up, apps that never connect, a queue that stalls, a dashboard you can't
 * read). Every scene lives in a fixed-height box and only animates transform and opacity, so nothing shifts.
 *
 * Solution: a navy band where a pulse steps through the five pillars: it travels to each icon, the icon lights
 * up and holds, then it moves on, until the whole line is lit. Then it resets and runs again.
 * Animations only run while on screen and respect reduced motion.
 */

// Icons from Lucide (ISC).
const paths = {
  repeat: Repeat,
  inbox: Inbox,
  unlink: Unlink,
  hourglass: Hourglass,
  eyeOff: EyeOff,
  pen: PenLine,
  code: Code,
  spark: Sparkles,
  flow: Workflow,
  shield: ShieldCheck,
  globe: Globe,
  mail: Mail,
  users: Users,
  sheet: Sheet,
  phone: Phone,
  chat: MessageCircle,
} as const;
type IconName = keyof typeof paths;

function Icon({ name, className }: { name: IconName; className?: string }) {
  const C = paths[name];
  return <C className={className} aria-hidden="true" />;
}

const loop = (duration: number, delay = 0) => ({ duration, delay, repeat: Infinity, ease: "easeInOut" as const });

/* 1. The same details typed into three systems */
function Retyped({ on }: { on: boolean }) {
  const apps = ["Website form", "CRM", "Spreadsheet"];
  return <div className={styles.retype}>
    {apps.map((app, i) => <div key={app} className={styles.mini}>
      <small>{app}</small>
      <div className={styles.input}>
        <motion.span className={styles.typed} initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={on ? { clipPath: ["inset(0 100% 0 0)", "inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)", "inset(0 100% 0 0)"] } : undefined}
          transition={{ duration: 6, repeat: Infinity, times: [0, i * 0.22, i * 0.22 + 0.18, 0.92, 1], ease: "linear" }}>Priya Shah · 500 units</motion.span>
      </div>
      <motion.b className={styles.count} initial={{ opacity: 0, scale: 0.6 }}
        animate={on ? { opacity: [0, 0, 1, 1, 0], scale: [0.6, 0.6, 1, 1, 0.6] } : undefined}
        transition={{ duration: 6, repeat: Infinity, times: [0, i * 0.22 + 0.17, i * 0.22 + 0.2, 0.92, 1] }}>{i + 1}×</motion.b>
    </div>)}
  </div>;
}

/* 2. Enquiries arriving while nobody answers */
function Missed({ on }: { on: boolean }) {
  const items: [IconName, string, string][] = [["phone", "Missed call", "11:02 PM"], ["mail", "RFQ by email", "Sat 6:15 PM"], ["chat", "WhatsApp enquiry", "Sun 8:30 AM"]];
  return <div className={styles.missed}>
    {items.map(([icon, what, when], i) => <motion.div key={what} className={styles.toast} style={{ top: 8 + i * 44 }}
      initial={{ opacity: 0, x: 24 }} animate={on ? { opacity: [0, 1, 1, 0.45, 0], x: [24, 0, 0, 0, 0] } : undefined}
      transition={{ duration: 6, repeat: Infinity, times: [i * 0.15, i * 0.15 + 0.08, 0.6, 0.85, 1] }}>
      <span className={styles.toastIcon}><Icon name={icon} /></span><strong>{what}</strong><small>{when}</small>
    </motion.div>)}
    <motion.span className={styles.unread} animate={on ? { scale: [1, 1.12, 1] } : undefined} transition={loop(1.4)}>3 unanswered</motion.span>
  </div>;
}

/* 3. Apps that never connect: a pulse leaves each one and dies halfway */
function Disconnected({ on }: { on: boolean }) {
  const apps: [IconName, string, number, number][] = [["globe", "Website", 12, 16], ["mail", "Inbox", 70, 10], ["users", "CRM", 18, 70], ["sheet", "Sheets", 76, 66]];
  const lines = [[26, 24, 70, 18], [22, 32, 24, 70], [80, 26, 82, 66], [32, 76, 74, 74]];
  return <div className={styles.disconnected}>
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
      {lines.map(([x1, y1, x2, y2], i) => <g key={i}>
        <line x1={x1} y1={y1} x2={x2} y2={y2} className={styles.ghost} />
        <motion.line x1={x1} y1={y1} x2={x2} y2={y2} className={styles.attempt} initial={{ pathLength: 0, opacity: 0 }}
          animate={on ? { pathLength: [0, 0.45, 0.45], opacity: [1, 1, 0] } : undefined}
          transition={{ duration: 2.4, delay: i * 0.6, repeat: Infinity, repeatDelay: 0.8, times: [0, 0.6, 1] }} />
      </g>)}
    </svg>
    {apps.map(([icon, name, left, top]) => <span key={name} className={styles.app} style={{ left: `${left}%`, top: `${top}%` }}>
      <Icon name={icon} />{name}
    </span>)}
  </div>;
}

/* 4. A quote stuck in a queue: the bar crawls, stalls, the clock keeps going */
function Stalled({ on }: { on: boolean }) {
  return <div className={styles.stalled}>
    <div className={styles.stallHead}><strong>Quote Q-2039</strong><motion.span animate={on ? { rotate: [0, 180, 180, 360] } : undefined} transition={{ duration: 3, repeat: Infinity, times: [0, 0.3, 0.7, 1] }} className={styles.glass}><Icon name="hourglass" /></motion.span></div>
    <div className={styles.track}><motion.i initial={{ scaleX: 0.08 }} animate={on ? { scaleX: [0.08, 0.34, 0.36, 0.36] } : undefined} transition={{ duration: 6, repeat: Infinity, times: [0, 0.35, 0.6, 1] }} /></div>
    <div className={styles.steps}><span data-done="true">Received</span><span>Priced</span><span>Approved</span><span>Sent</span></div>
    <small className={styles.waiting}>Waiting for someone to have time · 3 days</small>
  </div>;
}

/* 5. A dashboard you can't read */
function Blind({ on }: { on: boolean }) {
  const bars = [0.4, 0.7, 0.5, 0.85, 0.6, 0.3, 0.75];
  return <div className={styles.blind}>
    <div className={styles.bars}>{bars.map((h, i) => <motion.i key={i} style={{ height: `${h * 100}%` }}
      animate={on ? { opacity: [0.08, 0.2, 0.08] } : undefined} transition={loop(2.2, i * 0.18)} />)}</div>
    <motion.span className={styles.query} animate={on ? { y: [0, -4, 0] } : undefined} transition={loop(2.4)}>
      <Icon name="eyeOff" />Enquiries? Quotes? Won?
    </motion.span>
  </div>;
}

const challenges = [
  { title: "Repetitive administrative work", text: "The same details typed into three systems, the same questions answered every day.", icon: "repeat", Scene: Retyped, wide: true },
  { title: "Missed customer inquiries", text: "Calls after hours, emails left overnight, enquiries that go cold before anyone replies.", icon: "inbox", Scene: Missed, wide: true },
  { title: "Disconnected software", text: "A website, an inbox, a CRM and a spreadsheet that never talk to each other.", icon: "unlink", Scene: Disconnected },
  { title: "Slow manual processes", text: "Quotes, bookings and paperwork that wait in a queue for someone to have time.", icon: "hourglass", Scene: Stalled },
  { title: "Limited operational visibility", text: "No clear view of what came in, what is stuck and what it is worth.", icon: "eyeOff", Scene: Blind },
] as const;

const pillars: [IconName, string, string][] = [
  ["pen", "Design", "Premium, conversion-focused interfaces your customers actually use."],
  ["code", "Engineering", "Integrations, custom applications and reliable cloud infrastructure."],
  ["spark", "Intelligence", "AI only where language, reasoning or conversation adds real value."],
  ["flow", "Automation", "Rules-based workflows for everything that should be predictable."],
  ["shield", "Management", "Monitored, supported and improved every month after launch."],
];

function Card({ index, on }: { index: number; on: boolean }) {
  const { title, text, icon, Scene } = challenges[index];
  return <motion.li className={styles.card} data-wide={"wide" in challenges[index]} data-tone={(["orange", "coral", "sky", "pink", "violet"] as const)[index]}
    initial={{ opacity: 0, y: 24 }} animate={on ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.7, ease: [0.2, 0.7, 0.1, 1], delay: index * 0.08 }}>
    <div className={styles.scene} aria-hidden="true"><Scene on={on} /></div>
    <div className={styles.copy}>
      <span className={styles.icon}><Icon name={icon} /></span>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  </motion.li>;
}

export default function Challenges() {
  const grid = useRef<HTMLUListElement>(null);
  const band = useRef<HTMLDivElement>(null);
  const gridOn = useInView(grid, { amount: 0.15 });
  const bandOn = useInView(band, { amount: 0.4 });
  const [step, setStep] = useState(-1); // -1 = nothing lit yet; 0..4 = pillars lit up to here

  useEffect(() => {
    if (!bandOn) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { setStep(pillars.length - 1); return; }
    // Travel ~0.7s, light up, hold ~1.1s, move on. After the last one, hold the full line, then start over.
    const wait = step < 0 ? 900 : step < pillars.length - 1 ? 1800 : 3200;
    const timer = setTimeout(() => setStep(s => (s >= pillars.length - 1 ? -1 : s + 1)), wait);
    return () => clearTimeout(timer);
  }, [bandOn, step]);
  const at = Math.max(step, 0) / (pillars.length - 1);

  return <MotionConfig reducedMotion="user">
    <section className={styles.section} id="challenges" aria-labelledby="challenges-title">
      <div className="frame">
        <header className={styles.head}>
          <p className={styles.kicker}><span />The problem</p>
          <h2 id="challenges-title" className={styles.heading}>Growing businesses hit the same walls. <span>Different industries, the same operational problems underneath.</span></h2>
        </header>

        <ul ref={grid} className={styles.grid}>
          {challenges.map((c, index) => <Card key={c.title} index={index} on={gridOn} />)}
        </ul>

        <div ref={band} className={styles.solution} id="solution">
          <div className={styles.solutionHead}>
            <div>
              <p className={styles.kicker} data-dark="true"><span />The botLane approach</p>
              <h2 className={styles.heading}>We don&rsquo;t just digitize businesses. <span>We automate how they operate.</span></h2>
            </div>
            <p className={styles.lede}>botLane combines design, engineering, AI and automation into one connected system, built around the tools you already use and managed by the team that built it.</p>
          </div>

          <div className={styles.pillarWrap}>
            <div className={styles.rail} aria-hidden="true">
              <motion.i className={styles.railFill} initial={{ scaleX: 0 }} animate={{ scaleX: step < 0 ? 0 : at }}
                transition={{ duration: step < 0 ? 0.5 : 0.7, ease: [0.45, 0, 0.2, 1] }} />
              {/* The pulse rides a full-width track moved with a transform (x as a % of the rail), in step with the fill.
                  Animating `left` instead re-lays out every frame and visibly stutters against the fill. */}
              <motion.span className={styles.pulseTrack} initial={{ x: "0%", opacity: 0 }} animate={{ x: `${at * 100}%`, opacity: step < 0 ? 0 : 1 }}
                transition={{ duration: step <= 0 ? 0.3 : 0.7, ease: [0.45, 0, 0.2, 1] }}><b className={styles.pulse} /></motion.span>
            </div>
            <ul className={styles.pillars}>
              {pillars.map(([icon, name, text], index) => <motion.li key={name}
                initial={{ opacity: 0, y: 14 }} animate={bandOn ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.6, delay: 0.2 + index * 0.18, ease: [0.2, 0.7, 0.1, 1] }}>
                <motion.span className={styles.node} data-lit={index <= step} data-tone={(["orange", "coral", "pink", "violet", "sky"] as const)[index]}
                  animate={index === step ? { scale: [1, 1.12, 1] } : { scale: 1 }} transition={{ duration: 0.5, delay: index === 0 ? 0 : 0.6, ease: "easeOut" }}>
                  {name === "Intelligence" && step === index ? <Orb state="solving" on="dark" color="#ffffff" /> : <Icon name={icon} />}
                </motion.span>
                <strong>{name}</strong><span className={styles.pillarText}>{text}</span>
              </motion.li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  </MotionConfig>;
}
