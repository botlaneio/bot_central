"use client";

import { useEffect, useRef, useState } from "react";
import { Check, FileText, Mail, PackageCheck, ScanText, UserCheck } from "lucide-react";
import { AnimatePresence, MotionConfig, motion, useInView } from "motion/react";
import styles from "./manufacturing.module.css";

/*
 * Hero "order desk": one RFQ becomes an order. The email arrives with a drawing, its fields are read off the
 * drawing, a quote is drafted from the price list, a person approves it, and the purchase order is matched in the
 * ERP. Steps advance while on screen, hold on the last frame, then start again. Transform and opacity only, fixed
 * size (no layout shift). Demo data, labelled. Icons from Lucide (ISC).
 */

const ease = [0.2, 0.7, 0.1, 1] as const;
const LAST = 9;

function useSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!inView) return;
    // Reduced motion, or ?still for previews: show the finished order.
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || new URLSearchParams(location.search).has("still")) { setStep(LAST); return; }
    const t = setTimeout(() => setStep(s => (s >= LAST ? 0 : s + 1)), step >= LAST ? 3600 : step === 0 ? 700 : 900);
    return () => clearTimeout(t);
  }, [inView, step]);
  return [ref, step] as const;
}

/* A small technical drawing of the bracket on the RFQ: original line art. */
function Drawing() {
  return <svg viewBox="0 0 120 80" className={styles.drawing} aria-hidden="true">
    <path d="M14 62 H70 V30 H86 V62 H106" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <path d="M14 62 V70 H106 V62" fill="none" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="30" cy="66" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="92" cy="66" r="2.4" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <circle cx="78" cy="40" r="3" fill="none" stroke="currentColor" strokeWidth="1.2" />
    <path d="M14 76 H106 M14 74 V78 M106 74 V78" stroke="currentColor" strokeWidth=".8" opacity=".6" />
    <text x="60" y="13" textAnchor="middle" fontSize="7" fill="currentColor" opacity=".7">SB-40 · rev 3</text>
    <path d="M90 30 V18 M86 18 H94" stroke="currentColor" strokeWidth=".8" opacity=".6" />
  </svg>;
}

const fields: [string, string][] = [["Item", "Steel bracket SB-40"], ["Quantity", "500"], ["Finish", "Powder-coated"], ["Needed by", "12 Jan"]];
const lines: [string, string][] = [["500 × SB-40 bracket", "$4,250"], ["Powder coating", "$420"], ["Freight", "$150"]];

export default function OrderDesk() {
  const [ref, step] = useSteps();
  const read = Math.max(0, Math.min(fields.length, step - 1)); // fields read: steps 2..5
  const quoting = step >= 6, waiting = step === 7, approved = step >= 8, ordered = step >= 9;
  return <MotionConfig reducedMotion="user">
    <div ref={ref} className={styles.desk} aria-hidden="true">
      <header className={styles.deskBar}><i /><i /><i /><span>Order desk</span><em>Demo</em></header>

      <div className={styles.deskGrid}>
        {/* 1. The RFQ email */}
        <motion.article className={styles.mail} initial={false} animate={{ opacity: step >= 1 ? 1 : 0.35, y: step >= 1 ? 0 : 8 }} transition={{ duration: 0.4, ease }}>
          <div className={styles.mailHead}><Mail /><span><b>RFQ: 500 × SB-40 bracket</b><small>buyer@northline.example · 9:04 AM</small></span></div>
          <div className={styles.attach}><Drawing /><span><FileText />SB-40_rev3.pdf</span>
            {step >= 2 && step <= 5 && <motion.i className={styles.scan} initial={{ y: 0 }} animate={{ y: [0, 54, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />}
          </div>
        </motion.article>

        {/* 2. Fields read from the drawing */}
        <article className={styles.read}>
          <h4><ScanText />Read from the drawing</h4>
          <dl>{fields.map(([k, v], i) => <div key={k} data-on={i < read}>
            <dt>{k}</dt>
            <AnimatePresence initial={false}>{i < read && <motion.dd initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }}>{v}<Check /></motion.dd>}</AnimatePresence>
          </div>)}</dl>
        </article>

        {/* 3. Quote drafted from the price list, then approval */}
        <article className={styles.quote} data-state={ordered ? "done" : approved ? "approved" : waiting ? "wait" : quoting ? "draft" : "idle"}>
          <h4><FileText />Quote Q-2041 <small>{quoting ? "From your price list" : "Waiting for details"}</small></h4>
          {lines.map(([k, v], i) => <motion.div key={k} className={styles.qLine} initial={false} animate={{ opacity: quoting ? 1 : 0.25 }} transition={{ duration: 0.3, delay: quoting ? i * 0.12 : 0 }}><span>{k}</span><b>{v}</b></motion.div>)}
          <div className={styles.qTotal}><span>Total</span><b>{quoting ? "$4,820" : "—"}</b></div>
          <div className={styles.approve}>
            <AnimatePresence mode="wait" initial={false}>
              {approved
                ? <motion.span key="ok" className={styles.ok} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease }}><UserCheck />Approved by you · sent to buyer</motion.span>
                : <motion.span key="wait" className={styles.waiting} initial={{ opacity: 0 }} animate={{ opacity: waiting ? 1 : 0.4 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                    Needs your approval<motion.i animate={waiting ? { scale: [1, 0.94, 1] } : { scale: 1 }} transition={{ duration: 1, repeat: waiting ? Infinity : 0 }}>Approve</motion.i>
                  </motion.span>}
            </AnimatePresence>
          </div>
        </article>

        {/* 4. Purchase order matched */}
        <motion.article className={styles.po} initial={false} animate={{ opacity: ordered ? 1 : 0.35, y: ordered ? 0 : 6 }} transition={{ duration: 0.4, ease }}>
          <PackageCheck />
          <span><b>{ordered ? "PO-77812 matched · order created" : "Purchase order"}</b><small>{ordered ? "ERP order #44102 · dealer notified" : "Matched when it arrives"}</small></span>
        </motion.article>
      </div>

      <ol className={styles.deskSteps}>
        {["RFQ in", "Read", "Quoted", "Approved", "Ordered"].map((s, i) => {
          const at = [1, 5, 6, 8, 9][i];
          return <li key={s} data-on={step >= at}><i />{s}</li>;
        })}
      </ol>
    </div>
  </MotionConfig>;
}
