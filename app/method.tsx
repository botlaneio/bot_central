"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Code, PencilRuler, RefreshCw, Rocket, Search, ShieldCheck, type LucideIcon } from "lucide-react";
import { AnimatePresence, MotionConfig, motion, useInView } from "motion/react";
import styles from "./method.module.css";

/*
 * How implementation works: six steps on a track. While the section is on screen the track steps through them
 * (each icon lights in its wave colour, the line fills behind), and the panel below shows what happens at that
 * step, what you get and where you're involved. Hover or click any step to pin it. Fixed-height panel: no shift.
 */

type Tone = "orange" | "coral" | "pink" | "violet" | "sky";
const steps: { name: string; tone: Tone; icon: LucideIcon; line: string; does: string; get: string[]; you: string }[] = [
  { name: "Discover", tone: "orange", icon: Search,
    line: "We learn how your business runs and where admin slows it down.",
    does: "We map how work arrives, who handles it, which tools are involved and where things wait. We look for the one problem worth solving first.",
    get: ["A map of your current process", "The bottlenecks, in order of value", "A recommended first workflow"], you: "A working session with the people who do the work." },
  { name: "Design", tone: "coral", icon: PencilRuler,
    line: "An automation blueprint, with human approvals built in.",
    does: "We design the workflow step by step: what is automated, what uses AI, where a person approves, and what happens when something goes wrong.",
    get: ["An automation blueprint", "Approval and escalation rules", "A clear scope and quote"], you: "You review and approve the blueprint before anything is built." },
  { name: "Implement", tone: "pink", icon: Code,
    line: "Systems built and integrated with the tools you already use.",
    does: "We build the workflow, connect it to your website, inbox, CRM, ERP, calendar or accounting tools, and set up access by role.",
    get: ["The working automation", "Integrations with your existing tools", "Role-based access and audit logs"], you: "Access to the tools we connect, and a contact for questions." },
  { name: "Validate", tone: "violet", icon: ShieldCheck,
    line: "Tested on realistic scenarios before anything goes live.",
    does: "We run the workflow against real-world cases, including the awkward ones: missing details, unusual requests, failed integrations and human handoffs.",
    get: ["Test results on realistic scenarios", "Exception handling confirmed", "Sign-off checklist"], you: "You try it yourself and sign off when it behaves as agreed." },
  { name: "Launch", tone: "sky", icon: Rocket,
    line: "Rolled out with your team, one workflow at a time.",
    does: "We switch the workflow on with your team, watch it closely in the first days, and adjust anything that doesn't fit how people actually work.",
    get: ["The workflow live", "A short guide for your team", "Close monitoring at launch"], you: "A short handover with the people who'll use it." },
  { name: "Manage & improve", tone: "orange", icon: RefreshCw,
    line: "We monitor, maintain and improve it every month.",
    does: "Within an agreed monthly scope we monitor every workflow, maintain integrations, manage AI agents, handle exceptions and suggest the next improvement.",
    get: ["Monitoring and support", "Monthly report", "Ongoing improvements"], you: "A monthly check-in, and you decide what comes next." },
];

const ease = [0.2, 0.7, 0.1, 1] as const;
// Icons from Lucide (ISC).

export default function Method() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (!inView || pinned || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setActive(a => (a + 1) % steps.length), active === steps.length - 1 ? 4200 : 3200);
    return () => clearTimeout(t);
  }, [inView, pinned, active]);

  const s = steps[active];
  const pick = (i: number) => { setActive(i); setPinned(true); };

  return <MotionConfig reducedMotion="user">
    <section className={styles.section} id="global" aria-labelledby="method-title">
      <div className="frame">
        <header className={styles.head}>
          <div>
            <p className={styles.kicker}><span />How it works</p>
            <h2 id="method-title" className={styles.heading}>How implementation works. <span>Six steps, the same for every engagement.</span></h2>
          </div>
          <p className={styles.lede}>You approve the blueprint before anything is built, and every system is tested on realistic scenarios before it goes live.</p>
        </header>

        <div ref={ref} className={styles.board} onMouseLeave={() => setPinned(false)}>
          <div className={styles.track}>
            <div className={styles.rail} aria-hidden="true"><motion.i animate={{ scaleX: active / (steps.length - 1) }} transition={{ duration: 0.7, ease }} /></div>
            <ol className={styles.steps}>
              {steps.map((step, i) => <li key={step.name}>
                <button type="button" data-tone={step.tone} data-lit={i <= active} data-on={i === active} aria-pressed={i === active}
                  onClick={() => pick(i)} onMouseEnter={() => pick(i)} onFocus={() => pick(i)}>
                  <span className={styles.node}><step.icon aria-hidden="true" /></span>
                  <small>Step {i + 1}</small>
                  <strong>{step.name}</strong>
                </button>
              </li>)}
            </ol>
          </div>

          <div className={styles.panel} data-tone={s.tone} aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={active} className={styles.panelInner}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease }}>
                <div className={styles.what}>
                  <span className={styles.big}>{String(active + 1).padStart(2, "0")}</span>
                  <h3>{s.name}</h3>
                  <p className={styles.line}>{s.line}</p>
                  <p>{s.does}</p>
                </div>
                <div className={styles.side}>
                  <h4>What you get</h4>
                  <ul>{s.get.map((g, i) => <motion.li key={g} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.15 + i * 0.08 }}>
                    <Check aria-hidden="true" />{g}</motion.li>)}</ul>
                  <h4>Your part</h4>
                  <p>{s.you}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            {!pinned && inView && <motion.i key={`t-${active}`} className={styles.timer} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ duration: (active === steps.length - 1 ? 4200 : 3200) / 1000, ease: "linear" }} />}
          </div>
        </div>
      </div>
    </section>
  </MotionConfig>;
}
