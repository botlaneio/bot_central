"use client";

import { useEffect, useRef } from "react";
import { ShieldCheck, X } from "lucide-react";
import { motion } from "motion/react";
import styles from "./capability-dialog.module.css";

/*
 * Detail panel for a capability tile: what it is, what's included, how it shows up in each industry, and where a
 * person stays in control. Opens as a modal <dialog> (Escape and backdrop click close it).
 */

import { info } from "./capabilities";
import { solutionSlugs } from "./routes";

const ease = [0.2, 0.7, 0.1, 1] as const;

export default function CapabilityDialog({ id, onClose, onAssess }: { id: string; onClose: () => void; onAssess: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { ref.current?.showModal(); }, []);
  const c = info[id];
  if (!c) return null;
  return <dialog ref={ref} className={styles.dialog} data-tone={c.tone} onClose={onClose} aria-labelledby="cap-title"
    onClick={e => { if (e.target === e.currentTarget) e.currentTarget.close(); }}>
    <motion.div className={styles.inner} initial={{ opacity: 0, y: 14, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.3, ease }}>
      <header className={styles.head}>
        <span className={styles.icon}><c.icon aria-hidden="true" /></span>
        <div><small>Capability</small><h2 id="cap-title">{c.name}</h2></div>
        <button className={styles.close} aria-label="Close" onClick={() => ref.current?.close()}>
          <X aria-hidden="true" />
        </button>
      </header>
      <p className={styles.lede}>{c.lede}</p>

      <h3>What's included</h3>
      <ul className={styles.includes}>{c.includes.map((x, i) => <motion.li key={x} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.1 + i * 0.04 }}>{x}</motion.li>)}</ul>

      <h3>In each industry</h3>
      <div className={styles.examples}>{c.examples.map(([ind, text]) => <div key={ind}><small>{ind}</small><span>{text}</span></div>)}</div>

      <p className={styles.control}><ShieldCheck aria-hidden="true" />{c.control}</p>

      <footer className={styles.foot}>
        <button className={styles.primary} onClick={() => { ref.current?.close(); onAssess(); }}>Get an automation assessment <span aria-hidden="true">→</span></button>
        <a className={styles.secondary} href={`/solutions/${solutionSlugs[id as keyof typeof solutionSlugs]}`}>See the full solution</a>
      </footer>
    </motion.div>
  </dialog>;
}
