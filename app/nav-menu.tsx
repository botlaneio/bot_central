"use client";

import { motion } from "motion/react";
import { ArrowRight, ChartLine, Factory, Headset, HeartHandshake, House, ListOrdered, Plug, Receipt, ShieldCheck, Stethoscope, Target, Workflow } from "lucide-react";
import styles from "./nav-menu.module.css";

/*
 * Mega-menus for the main navigation. Each panel fades and lifts in, items stagger in, and every link has an
 * icon. Solutions: six capabilities plus an assessment card. Industries: three industry cards with example
 * modules. How It Works: method, technology and safeguards plus the six steps. On mobile, panels collapse to
 * simple lists inside the menu sheet.
 */

// Icons from Lucide (ISC).
const icons = {
  target: Target,
  headset: Headset,
  flow: Workflow,
  receipt: Receipt,
  heart: HeartHandshake,
  chart: ChartLine,
  factory: Factory,
  home: House,
  clinic: Stethoscope,
  steps: ListOrdered,
  plug: Plug,
  shield: ShieldCheck,
  arrow: ArrowRight,
} as const;
type IconName = keyof typeof icons;

function Icon({ name }: { name: IconName }) {
  const C = icons[name];
  return <C aria-hidden="true" />;
}

type Tone = "orange" | "coral" | "pink" | "violet" | "sky";
const tones: Tone[] = ["orange", "coral", "pink", "violet", "sky", "orange"];

const solutions: [IconName, string, string, string][] = [
  ["target", "Customer Acquisition", "Websites, landing pages and lead capture", "/solutions/customer-acquisition"],
  ["headset", "AI Front Office", "Receptionists, enquiries and routing", "/solutions/ai-front-office"],
  ["flow", "Business Operations", "Workflows, scheduling and documents", "/solutions/business-operations"],
  ["receipt", "Financial Administration", "Quotations, invoices and reminders", "/solutions/financial-administration"],
  ["heart", "Customer Experience", "Follow-ups, reminders and reviews", "/solutions/customer-experience"],
  ["chart", "Business Intelligence", "Dashboards and reporting", "/solutions/business-intelligence"],
];

const industries: { icon: IconName; tone: Tone; name: string; line: string; modules: string[]; href: string; flag?: string }[] = [
  { icon: "factory", tone: "orange", name: "Manufacturing", line: "From inquiry to order, intelligently connected.", modules: ["RFQ intake", "Quotations", "Purchase orders", "Dealer portals"], href: "/industries/manufacturing", flag: "Flagship" },
  { icon: "home", tone: "coral", name: "Real Estate", line: "Less time chasing leads. More time closing deals.", modules: ["Enquiry handling", "Viewings", "Follow-ups", "CRM"], href: "/industries/real-estate" },
  { icon: "clinic", tone: "violet", name: "Clinics", line: "Patient admin handled, privacy built in.", modules: ["Missed calls", "Reminders", "Digital intake", "Recall"], href: "/industries/clinics" },
];

const how: [IconName, string, string, string][] = [
  ["steps", "Our process", "From discovery to monthly improvement", "/how-it-works"],
  ["plug", "Technology", "Integrations with the tools you already use", "/technology"],
  ["shield", "Responsible automation", "Human approval, privacy and audit logs", "/responsible-automation"],
];

export const menuLabels = ["Solutions", "Industries", "How It Works"] as const;
export type MenuLabel = (typeof menuLabels)[number];

const ease = [0.2, 0.7, 0.1, 1] as const;
const item = (i: number) => ({ initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3, ease, delay: 0.04 + i * 0.03 } });

function Row({ icon, name, detail, href, i, onNavigate, tone }: { icon: IconName; name: string; detail: string; href: string; i: number; onNavigate: () => void; tone: Tone }) {
  return <motion.a href={href} className={styles.row} onClick={onNavigate} data-tone={tone} {...item(i)}>
    <span className={styles.icon}><Icon name={icon} /></span>
    <span><strong>{name}</strong><small>{detail}</small></span>
  </motion.a>;
}

export default function MegaMenu({ label, onNavigate, onDemo }: { label: MenuLabel; onNavigate: () => void; onDemo: (label: string) => void }) {
  return <div className={styles.anchor} data-menu={label}>
    <motion.div className={styles.panel} initial={{ opacity: 0, y: -8, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.28, ease }}>
      {label === "Solutions" && <div className={styles.solutions}>
        <div>
          <p className={styles.eyebrow}>Six reusable capabilities</p>
          <div className={styles.rows}>{solutions.map(([icon, name, detail, href], i) => <Row key={name} tone={tones[i]} {...{ icon, name, detail, href, i, onNavigate }} />)}</div>
        </div>
        <motion.aside className={styles.feature} {...item(6)}>
          <p className={styles.eyebrow} data-dark="true">Not sure where to start?</p>
          <strong>Get an automation assessment</strong>
          <span>We map how work moves through your business and recommend one narrowly scoped first workflow.</span>
          <button type="button" onClick={() => { onNavigate(); onDemo("Get an automation assessment"); }}>Request an assessment <Icon name="arrow" /></button>
        </motion.aside>
      </div>}

      {label === "Industries" && <div className={styles.industries}>
        {industries.map((ind, i) => <motion.a key={ind.name} href={ind.href} className={styles.industry} onClick={onNavigate} data-tone={ind.tone} {...item(i * 2)}>
          <span className={styles.industryTop}><span className={styles.icon}><Icon name={ind.icon} /></span>{ind.flag && <em>{ind.flag}</em>}</span>
          <strong>{ind.name}</strong>
          <small>{ind.line}</small>
          <span className={styles.chips}>{ind.modules.map(m => <i key={m}>{m}</i>)}</span>
          <span className={styles.more}>Explore {ind.name.toLowerCase()} <Icon name="arrow" /></span>
        </motion.a>)}
        <motion.p className={styles.foot} {...item(7)}>Same shared automation infrastructure underneath, configured for each industry. More industries will follow.</motion.p>
      </div>}

      {label === "How It Works" && <div className={styles.how}>
        <div className={styles.rows} data-single="true">{how.map(([icon, name, detail, href], i) => <Row key={name} tone={(["sky", "pink", "violet"] as Tone[])[i]} {...{ icon, name, detail, href, i, onNavigate }} />)}</div>
        <motion.a href="/responsible-automation" className={styles.control} onClick={onNavigate} {...item(4)}>
          <p className={styles.eyebrow}>You stay in control</p>
          <span className={styles.approval}>
            <span><small>Needs your approval</small><b>Quote · $4,820</b></span>
            <motion.i animate={{ scale: [1, 0.94, 1] }} transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.2 }}>Approve</motion.i>
          </span>
          <span className={styles.log}><i data-tone="orange" /> RFQ read and classified<em>9:04</em></span>
          <span className={styles.log}><i data-tone="pink" /> Quote drafted from price list<em>9:06</em></span>
          <span className={styles.controlText}>Sensitive actions wait for a person, and every step is logged.</span>
        </motion.a>
      </div>}
    </motion.div>
  </div>;
}
