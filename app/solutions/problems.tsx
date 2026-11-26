"use client";

import { useEffect, useRef, useState } from "react";
import { AlertCircle, ArrowRight, BarChart3, Bell, Boxes, Calendar, Check, CircleHelp, Clock, FileSpreadsheet, FileText, Inbox, Mail, MessageSquareOff, Phone, PhoneMissed, Receipt, Repeat, Sparkles, Star, Users } from "lucide-react";
import { AnimatePresence, MotionConfig, motion, useInView } from "motion/react";
import { details, midSentence } from "./data";
import styles from "./problems.module.css";

/*
 * "The problems it solves" on each solution page, laid out differently per page (copy in data.ts):
 *   Customer Acquisition      before / after cards with a Today | With botLane switch
 *   AI Front Office           a working day with the hours where calls are missed, then filled
 *   Business Operations       three systems with broken links between them that reconnect
 *   Financial Administration  one big problem with two smaller ones beside it (editorial)
 *   Customer Experience       animated problem cards, each with its own small loop
 *   Business Intelligence     the questions an owner can't answer today, answered on reveal
 * Fixed sizes, transform/opacity only. Icons from Lucide (ISC).
 */

const ease = [0.2, 0.7, 0.1, 1] as const;
type P = { title: string; text: string; fix: string; by: string };

function useSeen<T extends Element>(amount = 0.35) {
  const ref = useRef<T>(null);
  return [ref, useInView(ref, { amount, once: true })] as const;
}
const reduced = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/* 1. Before / after */
function BeforeAfter({ items }: { items: P[] }) {
  const [ref, seen] = useSeen<HTMLDivElement>();
  const [after, setAfter] = useState(false);
  const [touched, setTouched] = useState(false);
  useEffect(() => {
    if (!seen || touched) return;
    const t = setTimeout(() => setAfter(true), reduced() ? 0 : 1600);
    return () => clearTimeout(t);
  }, [seen, touched]);
  const icons = [Inbox, Mail, BarChart3];
  return <div ref={ref} className={styles.ba}>
    <div className={styles.switch} role="group" aria-label="Show">
      {[["Today", false], ["With botLane", true]].map(([label, v]) => <button key={String(label)} type="button" aria-pressed={after === v}
        onClick={() => { setTouched(true); setAfter(v as boolean); }}>{label as string}
        {after === v && <motion.i layoutId="baPill" className={styles.pill} transition={{ type: "spring", stiffness: 420, damping: 34 }} />}</button>)}
    </div>
    <div className={styles.baGrid}>
      {items.map((p, i) => { const Icon = icons[i]; return <article key={p.title} className={styles.baCard} data-after={after}>
        <span className={styles.baIcon}>{after ? <Check aria-hidden /> : <Icon aria-hidden />}</span>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={String(after)} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease, delay: i * 0.06 }}>
            <small>{after ? p.by : "Today"}</small>
            <h3>{after ? p.fix.split(". ")[0] : p.title}</h3>
            <p>{after ? p.fix.split(". ").slice(1).join(". ") || p.fix : p.text}</p>
          </motion.div>
        </AnimatePresence>
      </article>; })}
    </div>
  </div>;
}

/* 2. A working day: when calls are missed, then the gaps fill in */
function Day({ items }: { items: P[] }) {
  const [ref, seen] = useSeen<HTMLDivElement>(0.4);
  const [filled, setFilled] = useState(false);
  useEffect(() => { if (seen) { const t = setTimeout(() => setFilled(true), reduced() ? 0 : 1400); return () => clearTimeout(t); } }, [seen]);
  // hours 7..23; gaps where nobody can answer (demo)
  const gaps = [{ from: 7, to: 9, label: "Before opening" }, { from: 12.5, to: 14, label: "Lunch, everyone busy" }, { from: 18, to: 23, label: "After hours" }];
  const pct = (h: number) => ((h - 7) / 16) * 100;
  return <div ref={ref} className={styles.day}>
    <div className={styles.dayHead}><span><Clock aria-hidden /> A typical day at the front desk</span>
      <button type="button" onClick={() => setFilled(f => !f)}>{filled ? "Show today" : "Show with botLane"}</button></div>
    <div className={styles.track}>
      <div className={styles.staffed} style={{ left: `${pct(9)}%`, width: `${pct(12.5) - pct(9)}%` }}>Team answering</div>
      <div className={styles.staffed} style={{ left: `${pct(14)}%`, width: `${pct(18) - pct(14)}%` }}>Team answering</div>
      {gaps.map((g, i) => <div key={g.label} className={styles.gap} data-filled={filled} style={{ left: `${pct(g.from)}%`, width: `${pct(g.to) - pct(g.from)}%` }}>
        <motion.i className={styles.fill} initial={false} animate={{ scaleX: filled ? 1 : 0 }} transition={{ duration: 0.7, ease, delay: i * 0.25 }} />
        <span>{filled ? "Assistant answers" : g.label}</span>
        {!filled && <PhoneMissed aria-hidden />}
      </div>)}
      <div className={styles.hours}>{[7, 9, 11, 13, 15, 17, 19, 21, 23].map(h => <small key={h} style={{ left: `${pct(h)}%` }}>{h <= 12 ? `${h} AM` : `${h - 12} PM`}</small>)}</div>
    </div>
    <div className={styles.dayList}>
      {items.map((p, i) => <div key={p.title} data-filled={filled}>
        <span>{filled ? <Check aria-hidden /> : (() => { const I = [PhoneMissed, Repeat, Users][i]; return <I aria-hidden />; })()}</span>
        <div><h3>{filled ? p.fix.split(". ")[0] : p.title}</h3><p>{filled ? p.by : p.text}</p></div>
      </div>)}
    </div>
  </div>;
}

/* 3. Systems with broken links that reconnect */
function Links({ items }: { items: P[] }) {
  const [ref, seen] = useSeen<HTMLDivElement>(0.4);
  const [fixed, setFixed] = useState(false);
  useEffect(() => { if (seen) { const t = setTimeout(() => setFixed(true), reduced() ? 0 : 1800); return () => clearTimeout(t); } }, [seen]);
  const nodes = [{ icon: Mail, name: "Inbox & PDFs" }, { icon: Users, name: "CRM" }, { icon: Boxes, name: "ERP" }, { icon: FileSpreadsheet, name: "Spreadsheets" }];
  return <div ref={ref} className={styles.links}>
    <div className={styles.chain}>
      {nodes.map((n, i) => <div key={n.name} className={styles.chainItem}>
        <div className={styles.node}><n.icon aria-hidden /><span>{n.name}</span></div>
        {i < nodes.length - 1 && <div className={styles.link} data-fixed={fixed}>
          <motion.i initial={false} animate={{ scaleX: fixed ? 1 : 0.38 }} transition={{ duration: 0.6, ease, delay: i * 0.2 }} />
          <motion.i initial={false} animate={{ scaleX: fixed ? 1 : 0.38 }} transition={{ duration: 0.6, ease, delay: i * 0.2 }} />
          <AnimatePresence mode="wait" initial={false}>
            <motion.b key={String(fixed)} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }} transition={{ duration: 0.25, delay: fixed ? 0.4 + i * 0.2 : 0 }}>
              {fixed ? <Check aria-hidden /> : <AlertCircle aria-hidden />}
            </motion.b>
          </AnimatePresence>
        </div>}
      </div>)}
    </div>
    <p className={styles.chainNote}>{fixed ? "Connected: details entered once, passed along automatically, every step logged." : "Today: a person carries the same details from one system to the next."}
      <button type="button" onClick={() => setFixed(f => !f)}>{fixed ? "Show today" : "Connect them"}</button></p>
    <div className={styles.linkCards}>
      {items.map(p => <article key={p.title} data-fixed={fixed}><h3>{p.title}</h3><p>{p.text}</p><span><ArrowRight aria-hidden />{p.fix.split(". ")[0]}</span></article>)}
    </div>
  </div>;
}

/* 4. Editorial: one big problem, two smaller ones */
function Editorial({ items }: { items: P[] }) {
  const [ref, seen] = useSeen<HTMLDivElement>(0.3);
  const [lead, ...rest] = items;
  return <div ref={ref} className={styles.edit}>
    <motion.blockquote className={styles.big} initial={{ opacity: 0, y: 18 }} animate={seen ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.6, ease }}>
      <Receipt aria-hidden />
      <p>&ldquo;{lead.title}.&rdquo;</p>
      <small>{lead.text}</small>
      <span className={styles.answer}><Sparkles aria-hidden />{lead.fix}</span>
    </motion.blockquote>
    <div className={styles.side}>
      {rest.map((p, i) => <motion.article key={p.title} initial={{ opacity: 0, y: 18 }} animate={seen ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.12 }}>
        <small>0{i + 2}</small><h3>{p.title}</h3><p>{p.text}</p><span><ArrowRight aria-hidden />{p.fix.split(". ")[0]}</span>
      </motion.article>)}
    </div>
  </div>;
}

/* 5. Animated problem cards */
function Looping({ items }: { items: P[] }) {
  const [ref, seen] = useSeen<HTMLDivElement>(0.3);
  const scenes = [
    // customers left wondering: a phone ringing with "Any update?"
    <div key="a" className={styles.mini}><motion.span className={styles.miniBubble} animate={seen ? { y: [10, 0, 0, -6], opacity: [0, 1, 1, 0] } : undefined} transition={{ duration: 3, repeat: Infinity, times: [0, .2, .8, 1] }}>Any update on my order?</motion.span>
      <motion.span className={styles.miniIcon} animate={seen ? { rotate: [0, -10, 10, -10, 0] } : undefined} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 1.6 }}><Phone aria-hidden /></motion.span></div>,
    // no-shows: calendar slots emptying
    <div key="b" className={styles.mini}><div className={styles.slots}>{[0, 1, 2, 3, 4, 5].map(i => <motion.i key={i} animate={seen && (i === 2 || i === 4) ? { opacity: [1, 0.15, 0.15, 1] } : undefined} transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }} />)}</div><Calendar aria-hidden className={styles.miniCorner} /></div>,
    // feedback never collected: stars that never fill
    <div key="c" className={styles.mini}><div className={styles.miniStars}>{[0, 1, 2, 3, 4].map(i => <motion.span key={i} animate={seen ? { scale: [1, 1.15, 1], opacity: [0.25, 0.5, 0.25] } : undefined} transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.15 }}><Star aria-hidden /></motion.span>)}</div><MessageSquareOff aria-hidden className={styles.miniCorner} /></div>,
  ];
  return <div ref={ref} className={styles.loops}>
    {items.map((p, i) => <motion.article key={p.title} initial={{ opacity: 0, y: 20 }} animate={seen ? { opacity: 1, y: 0 } : undefined} transition={{ duration: 0.6, ease, delay: i * 0.1 }}>
      {scenes[i]}
      <div className={styles.loopCopy}><h3>{p.title}</h3><p>{p.text}</p><span><Bell aria-hidden />{p.fix.split(". ")[0]}</span></div>
    </motion.article>)}
  </div>;
}

/* 6. Questions you can't answer today */
function Questions({ items }: { items: P[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const qs = ["How many enquiries did we get last week, and from where?", "Which orders or quotes are stuck right now?", "Are we actually doing better than last month?"];
  return <div className={styles.qs}>
    {items.map((p, i) => <button type="button" key={p.title} className={styles.q} data-open={open === i} aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
      <span className={styles.qIcon}>{open === i ? <Check aria-hidden /> : <CircleHelp aria-hidden />}</span>
      <span className={styles.qText}>
        <strong>{qs[i]}</strong>
        <AnimatePresence initial={false} mode="wait">
          {open === i
            ? <motion.span key="a" className={styles.qAnswer} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}><b>With botLane:</b> {p.fix}</motion.span>
            : <motion.span key="t" className={styles.qToday} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}><b>Today:</b> {midSentence(p.title)}. {p.text}</motion.span>}
        </AnimatePresence>
      </span>
      <span className={styles.qCta}>{open === i ? "Hide" : "See the answer"}</span>
    </button>)}
    <p className={styles.qHint}><FileText aria-hidden /> Tap a question to see how it gets answered.</p>
  </div>;
}

const layouts = { payments: BeforeAfter, billing: Day, radar: Links, issuing: Editorial, crypto: Looping, connect: Questions } as const;

export default function Problems({ id }: { id: keyof typeof layouts }) {
  const Layout = layouts[id];
  const d = details[id];
  const items: P[] = d.problems.map(([title, text], i) => ({ title, text, fix: d.fixes[i][0], by: d.fixes[i][1] }));
  return <MotionConfig reducedMotion="user"><Layout items={items} /></MotionConfig>;
}
