"use client";

import { useState } from "react";
import styles from "./lower.module.css";
import Logo from "./logo";
import { goTo } from "./routes";
import BotOrb from "./bot-orb";
import { Boxes, Calculator, CalendarDays, CreditCard, Globe, Phone, Users } from "lucide-react";
import { siWhatsapp } from "simple-icons";

const stripeImages = "/media/";
const articles = [
  ["Will this replace my staff?", "No. It takes repetitive admin off their plate so they can spend more time with customers and on the work that needs them.", "Ask us", "/contact?topic=general", "stock/faq-staff.jpg"],
  ["Do I have to change my software?", "Usually not. We integrate the tools you already use and only build custom components when there is a real need.", "How we integrate", "developers", "stock/faq-software.jpg"],
  ["Where do you use AI?", "Where reasoning, language or conversation is needed. Predictable, rules-based steps use conventional automation, which is more reliable and cheaper.", "Our approach", "developers", "stock/faq-ai.jpg"],
  ["Who approves sensitive decisions?", "Your people. Anything involving money, sensitive information or professional judgment keeps a human approval step.", "Responsible automation", "developers", "stock/faq-approval.jpg"],
  ["What does it cost?", "A one-time implementation fee, then a monthly fee to manage and improve the system. Third-party software, AI usage, calls and messaging are set out separately. We quote after an assessment.", "How engagements work", "/engagements", "stock/faq-cost.jpg"],
  ["How long does it take?", "It depends on scope. We recommend starting with one clearly defined problem, so you see value early.", "How it works", "/how-it-works", "stock/faq-time.jpg"],
  ["Do you still build websites?", "Yes. Premium websites and landing pages are part of customer acquisition, connected to the systems behind them.", "Customer acquisition", "payments", "stock/faq-website.jpg"],
  ["Which industries do you serve?", "We start with manufacturing, real estate and clinics, in the United States and India. Other industries will follow as each solution is proven.", "Industries", "business", "stock/faq-industries.jpg"],
] as const;

const footerGroups = [
  [["Solutions", [
    ["Customer Acquisition", "/solutions/customer-acquisition"], ["AI Front Office", "/solutions/ai-front-office"], ["Business Operations", "/solutions/business-operations"], ["Financial Administration", "/solutions/financial-administration"], ["Customer Experience", "/solutions/customer-experience"], ["Business Intelligence", "/solutions/business-intelligence"],
  ]]],
  [["Industries", [
    ["Manufacturing", "/industries/manufacturing"], ["Real Estate", "/industries/real-estate"], ["Clinics", "/industries/clinics"],
  ]]],
  [
    ["How it works", [["Our process", "/how-it-works"], ["How engagements work", "/engagements"], ["Technology", "/technology"], ["Responsible automation", "/responsible-automation"]]],
    ["Resources", [["Insights", "/blog"], ["Questions", "/#resources"], ["Demo workflow", "/#workflows"]]],
  ],
  [
    ["Company", [["About", "/about"], ["Get an assessment", "/contact"]]],
    ["Support", [["Get support", "/support"], ["Privacy", "/privacy"], ["Terms", "/terms"]]],
  ],
] as const;

const integrations = [
  ["Start small.", "Fix one clearly defined problem first, such as slow RFQ replies or missed enquiries.", "Explore automation", "top"],
  ["Add modules.", "Connect the next part of your business once the first system proves its value.", "See solutions", "products"],
  ["Fully managed.", "Monitoring, maintenance, support and monthly improvements, so nothing breaks quietly.", "How engagements work", "/engagements"],
] as const;

const features = [
  ["Connect to existing systems.", "Your website, phone system, CRM, ERP, scheduling, accounting and messaging tools, from email to WhatsApp, connected into one coordinated system instead of separate apps."],
  ["The right tool for each step.", "AI where reasoning or conversation is needed, rules-based automation where execution must be predictable, and people wherever judgment matters."],
] as const;

function publicUrl(path: string) {
  return path.startsWith("https://") || path.startsWith("/") ? path : "#" + path;
}
function PublicLink({ path, children }: { path: string; children: React.ReactNode }) {
  return <a className={styles.link} href={publicUrl(path)}>{children} <span aria-hidden="true">›</span></a>;
}

// Systems diagram icons: Lucide (ISC) for generic tools, Simple Icons (CC0) for the WhatsApp brand mark.
const appIcons = {
  Website: [Globe, "#ff8a1f"], Phone: [Phone, "#ff6a5c"], CRM: [Users, "#f77ce0"], ERP: [Boxes, "#7a5cff"],
  Scheduling: [CalendarDays, "#6f9bff"], Accounting: [Calculator, "#ff8a1f"], Payments: [CreditCard, "#ff6a5c"],
} as const;
function AppIcon({ name }: { name: keyof typeof appIcons | "WhatsApp" }) {
  if (name === "WhatsApp") return <svg viewBox="0 0 24 24" aria-hidden="true" style={{ fill: `#${siWhatsapp.hex}`, stroke: "none" }}><path d={siWhatsapp.path} /></svg>;
  const [Icon, color] = appIcons[name];
  return <Icon aria-hidden="true" color={color} size={18} strokeWidth={1.8} />;
}

function Developers() {
  return <section id="developers" className={styles.developers}>
    <div className={`frame ${styles.developerFrame}`}>
      <header className={styles.sectionHeader}>
        <h2>Technology that fits your business. <span>We integrate the software you already use, and build custom only when it is needed.</span></h2>
        <div className={styles.actions}>
          <a className={styles.lightButton} href="#top">Talk to us about your stack <span aria-hidden="true">›</span></a>
          <PublicLink path="resources">Common questions</PublicLink>
        </div>
      </header>
      <article className={styles.feature}>
        <div><h3>{features[0][0]}</h3><p>{features[0][1]}</p></div>
        <div className={styles.systems} aria-hidden="true">
          <div className={styles.systemRow}>{(["Website", "Phone", "CRM", "WhatsApp"] as const).map(n => <b key={n}><AppIcon name={n} />{n}</b>)}</div>
          <div className={styles.systemLine} />
          <div className={styles.systemCore}><BotOrb size={34} tone="navy" intro="view" /><span>botLane</span></div>
          <div className={styles.systemLine} />
          <div className={styles.systemRow}>{(["ERP", "Scheduling", "Accounting", "Payments"] as const).map(n => <b key={n}><AppIcon name={n} />{n}</b>)}</div>
        </div>
      </article>
      <article className={styles.feature}>
        <div><h3>{features[1][0]}</h3><p>{features[1][1]}</p></div>
        <div className={styles.scale}>
          {([["AI", "for reasoning and conversation"], ["Rules", "for predictable execution"], ["People", "for sensitive decisions"]] as const).map(([value, label]) => <div key={value}><strong>{value}</strong><span>{label}</span></div>)}
        </div>
      </article>
      <article className={styles.integration} id="managed">
        <h3>Managed, not handed over.</h3>
        <p>Automations depend on software that keeps changing. Within an agreed monthly scope, we monitor every workflow, maintain integrations and infrastructure, manage AI agents, handle exceptions, provide support and report on how the system is running, then improve it.</p>
        <div className={styles.integrationGrid}>{integrations.map(([heading, detail, label, path], index) =>
          <div className={styles.integrationCard} key={heading}>
            <div className={styles.integrationArt} aria-hidden="true">{["↗", "▤", "‹/›"][index]}</div>
            <h4>{heading}</h4><p>{detail}</p><PublicLink path={path}>{label}</PublicLink>
          </div>
        )}</div>
      </article>
    </div>
  </section>;
}

function News() {
  const [selected, setSelected] = useState(0);
  const [title, description, label, path] = articles[selected];
  const visibleSlides = [...articles.slice(selected), ...articles.slice(0, selected)];

  function advance(offset: number) {
    setSelected(previous => (previous + offset + articles.length) % articles.length);
  }

  return <section id="resources" className={styles.news}>
    <div className={`frame ${styles.newsFrame}`}>
      <div className={styles.newsHeading}>
        <h2>Questions owners ask <span>Straight answers about business automation.</span></h2>
        <div className={styles.carouselControls}>
          <button type="button" onClick={() => advance(-1)} aria-label="Previous question">←</button>
          <button type="button" onClick={() => advance(1)} aria-label="Next question">→</button>
        </div>
      </div>
      <div className={styles.indicators} aria-label="Choose question">
        {visibleSlides.map(([headline, , , , image], index) =>
          <button type="button" key={headline} aria-label={headline} aria-pressed={index === 0} onClick={() => advance(index)}>
            <img src={stripeImages + image} alt="" loading="lazy" />
          </button>
        )}
      </div>
      <article className={styles.slide} key={title} aria-roledescription="slide">
        <p><strong>{title}</strong> {description}</p><PublicLink path={path}>{label}</PublicLink>
      </article>
      <p className={styles.srOnly} aria-live="polite">Item {selected + 1} of {articles.length}: {title}</p>
      <div className={styles.book} id="responsible">
        <div className={styles.bookArt}><img src={stripeImages + "stock/responsible.jpg"} alt="" loading="lazy" /></div>
        <div className={styles.bookCopy}>
          <h3>Responsible automation</h3>
          <p>Dependable automation, not uncontrolled autonomy.</p>
          <h4>Humans stay in control of what matters</h4>
          <p>botLane</p>
          <p>Human approval of sensitive actions, role-based access, secure credential management, financial authorisation, audit logs, monitoring, error handling and human escalation are designed in from the start, not added later.</p>
          <p>You keep ownership and visibility of your business information and processes.</p>
          <div className={styles.actions}><PublicLink path="developers">Our approach</PublicLink><PublicLink path="resources">Common questions</PublicLink></div>
        </div>
      </div>
    </div>
  </section>;
}

export default function Lower({ onDemo }: { onDemo?: (label: string) => void }) {
  return <>
    <Developers />
    <News />
    <section className={styles.conversion}>
      <div className={`frame ${styles.conversionGrid}`}>
        <div><h2>Get an automation assessment.</h2><p>Tell us where admin is slowing your business down. We will map your current process and show you what a connected system could look like for your business.</p><DemoButton label="Get an automation assessment" onDemo={onDemo} primary /></div>
        <div id="pricing"><h3>How engagements work</h3><p>A one-time implementation fee, then a monthly fee to manage and improve your system. Quoted after an assessment.</p><PublicLink path="/engagements">How engagements work</PublicLink></div>
        <div><h3>Start with one problem</h3><p>A narrowly scoped first project, such as RFQ intake or appointment reminders, so you see value early.</p><PublicLink path="products">See solutions</PublicLink></div>
      </div>
    </section>
  </>;
}

function DemoButton({ label, onDemo, primary = false }: { label: string; onDemo?: (label: string) => void; primary?: boolean }) {
  const [shown, setShown] = useState(false);
  return <>
    <button className={primary ? styles.primary : styles.link} type="button" onClick={() => { if (goTo(label)) return; if (onDemo) onDemo(label); else setShown(!shown); }}>{label} <span aria-hidden="true">›</span></button>
    {shown && <p role="status" className={styles.demoStatus}>This action is shown for demonstration only.</p>}
  </>;
}

export function Footer({ onDemo }: { onDemo?: (label: string) => void }) {
  return <footer className={styles.footer}>
    <div className={`frame ${styles.footerFrame}`}>
      <div className={styles.footerGrid}>
        <div className={styles.brandColumn}><Logo size={38} intro="view" href="#top" /></div>
        {footerGroups.map((column, index) =>
          <div key={column[0][0]} className={styles.footerColumn}>
            {column.map(([heading, links]) => <div className={styles.footerGroup} key={heading}>
              <h3>{heading}</h3>
              <ul>{links.map(([label, path]) => <li key={label}><a href={publicUrl(path)}>{label}</a></li>)}
                {heading === "Company" && <li><DemoButton label="Contact us" onDemo={onDemo} /></li>}
                {heading === "Support" && <li><DemoButton label="Client sign in" onDemo={onDemo} /></li>}
                {heading === "Resources" && <li><DemoButton label="Cookie settings" onDemo={onDemo} /></li>}
              </ul>
            </div>)}
            {index === 3 && <div className={styles.footerGroup}><h3>Get automation insights from botLane</h3><span className={styles.newsletter} aria-hidden="true">Enter work email</span><DemoButton label="Continue" onDemo={onDemo} /></div>}
          </div>
        )}
      </div>
      <div className={styles.footerBase}>
        <div aria-label="Markets served">◎ United States and India (English)</div>
        <small>© 2026 BotLane LLC.</small>
      </div>
    </div>
  </footer>;
}
