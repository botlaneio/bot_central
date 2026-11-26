"use client";

import { useEffect, useRef, useState } from "react";
import { FileSpreadsheet, Inbox, PackageCheck, Truck, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion, useInView } from "motion/react";
import styles from "./manufacturing.module.css";

/*
 * The order path: four stages on a track. While on screen it steps through them on its own; tapping a stage
 * takes over. Each stage shows its modules and what changes for the team. Fixed-height panel (no shift).
 * Icons from Lucide (ISC).
 */

const ease = [0.2, 0.7, 0.1, 1] as const;

const stages: { name: string; icon: LucideIcon; line: string; modules: string[]; change: string }[] = [
  { name: "Inquiry", icon: Inbox, line: "Every request captured, complete and classified.",
    modules: ["Automated RFQ intake and classification", "Customer inquiry management", "RFQ landing pages", "Digital product catalogues"],
    change: "Requests from email, web forms and WhatsApp land in one queue with items, quantities and deadlines already read." },
  { name: "Quotation", icon: FileSpreadsheet, line: "Quotes drafted from your price lists, approved by you.",
    modules: ["AI-assisted quotation preparation", "Pricing approval workflows", "Sales follow-up automation", "Document extraction from drawings and specs"],
    change: "Sales reviews a drafted quote instead of building one, and follow-ups go out on schedule." },
  { name: "Order", icon: PackageCheck, line: "Purchase orders matched and entered once.",
    modules: ["Purchase order processing", "ERP and CRM integrations", "Inventory system integrations", "Order status notifications"],
    change: "POs are checked against the quote and created in your ERP, with mismatches sent to a person." },
  { name: "After the order", icon: Truck, line: "Dealers informed, invoices out, numbers visible.",
    modules: ["Invoice and payment workflows", "Dealer and distributor portals", "Operational reporting", "Business intelligence dashboards"],
    change: "Dealers check status themselves, invoices follow the order, and you see open, quoted and won in one view." },
];

export default function OrderPath() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [active, setActive] = useState(0);
  const [pinned, setPinned] = useState(false);
  useEffect(() => {
    if (!inView || pinned || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setActive(a => (a + 1) % stages.length), 3400);
    return () => clearTimeout(t);
  }, [inView, pinned, active]);
  const s = stages[active];
  return <div ref={ref} className={styles.path}>
    <ol className={styles.track}>
      <span className={styles.rail} aria-hidden="true"><motion.i initial={false} animate={{ scaleX: active / (stages.length - 1) }} transition={{ duration: 0.6, ease }} /></span>
      {stages.map((st, i) => <li key={st.name}>
        <button type="button" aria-pressed={i === active} data-lit={i <= active} onClick={() => { setPinned(true); setActive(i); }}>
          <span className={styles.node}><st.icon aria-hidden="true" /></span>
          <small>Stage {i + 1}</small><strong>{st.name}</strong>
        </button>
      </li>)}
    </ol>
    <div className={styles.panel} aria-live="polite">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={active} className={styles.panelInner} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3, ease }}>
          <div>
            <h3>{s.line}</h3>
            <p>{s.change}</p>
          </div>
          <ul>{s.modules.map((m, i) => <motion.li key={m} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.1 + i * 0.06 }}>{m}</motion.li>)}</ul>
        </motion.div>
      </AnimatePresence>
    </div>
  </div>;
}
