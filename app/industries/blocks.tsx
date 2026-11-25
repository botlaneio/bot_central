"use client";

import { SiteHeader, useDemo } from "../top";
import { Footer } from "../lower";
import Workflow, { type FlowConfig } from "../workflow";
import styles from "./industry.module.css";

/*
 * Building blocks for the industry landing pages. Each page composes its own order and variants, so the three
 * pages share the botLane system without being one template with the names swapped.
 */

type Pair = readonly [string, string];

export function IndustryPage({ children, hero }: { children: React.ReactNode; hero: (openDemo: (label: string) => void) => React.ReactNode }) {
  const [openDemo, dialog] = useDemo();
  return <>
    <main>
      <SiteHeader onDemo={openDemo}>{hero(openDemo)}</SiteHeader>
      {children}
      <Cta onDemo={openDemo} />
    </main>
    <Footer />
    {dialog}
  </>;
}

export function Hero({ eyebrow, title, lede, onDemo, panel }: { eyebrow: string; title: React.ReactNode; lede: string; onDemo: (label: string) => void; panel: React.ReactNode }) {
  return <section className={styles.hero}>
    <div className={`frame ${styles.heroGrid}`}>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}><a href="/#business">Industries</a> <span aria-hidden="true">/</span> {eyebrow}</p>
        <h1>{title}</h1>
        <p className={styles.lede}>{lede}</p>
        <div className={styles.actions}>
          <button className="purple-button" onClick={() => onDemo("Get an automation assessment")}>Get an automation assessment <span aria-hidden="true">›</span></button>
          <a className="light-button" href="#workflow">See a sample workflow</a>
        </div>
      </div>
      <div className={styles.panel} aria-hidden="true">{panel}<span className={styles.demoTag}>Demo data</span></div>
    </div>
  </section>;
}

export function Section({ id, title, sub, tone = "white", children }: { id?: string; title: string; sub?: string; tone?: "white" | "soft" | "navy"; children: React.ReactNode }) {
  return <section id={id} className={styles.section} data-tone={tone}>
    <div className="frame">
      <h2 className={styles.heading}>{title} {sub && <span>{sub}</span>}</h2>
      {children}
    </div>
  </section>;
}

export function NumberedGrid({ items, columns = 4 }: { items: readonly Pair[]; columns?: number }) {
  return <ol className={styles.numbered} style={{ "--cols": columns } as React.CSSProperties}>
    {items.map(([title, text], index) => <li key={title}><small>{String(index + 1).padStart(2, "0")}</small><h3>{title}</h3><p>{text}</p></li>)}
  </ol>;
}

export function Stages({ stages }: { stages: readonly { name: string; items: readonly string[] }[] }) {
  return <div className={styles.stages}>
    {stages.map((stage, index) => <div key={stage.name} className={styles.stage}>
      <header><small>Stage {index + 1}</small><h3>{stage.name}</h3></header>
      <ul>{stage.items.map(item => <li key={item}>{item}</li>)}</ul>
    </div>)}
  </div>;
}

export function ModuleCards({ items, label }: { items: readonly Pair[]; label: string }) {
  return <div className={styles.modules}>
    {items.map(([title, text]) => <article key={title}><span>{label}</span><h3>{title}</h3><p>{text}</p></article>)}
  </div>;
}

export function Split({ left, right }: { left: { title: string; items: readonly string[] }; right: { title: string; items: readonly string[] } }) {
  return <div className={styles.split}>
    {[left, right].map((side, index) => <div key={side.title} data-side={index === 0 ? "do" : "dont"}>
      <h3>{side.title}</h3>
      <ul>{side.items.map(item => <li key={item}>{item}</li>)}</ul>
    </div>)}
  </div>;
}

export function Journey({ steps }: { steps: readonly { when: string; title: string; text: string }[] }) {
  return <ol className={styles.journey}>
    {steps.map(step => <li key={step.title}><small>{step.when}</small><h3>{step.title}</h3><p>{step.text}</p></li>)}
  </ol>;
}

export function Chips({ items }: { items: readonly string[] }) {
  return <ul className={styles.chips}>{items.map(item => <li key={item}>{item}</li>)}</ul>;
}

export function TwoCol({ intro, children }: { intro: React.ReactNode; children: React.ReactNode }) {
  return <div className={styles.twoCol}><div className={styles.intro}>{intro}</div><div>{children}</div></div>;
}

export function Checklist({ items }: { items: readonly Pair[] }) {
  return <ul className={styles.checklist}>{items.map(([title, text]) => <li key={title}><strong>{title}</strong><span>{text}</span></li>)}</ul>;
}

const process = [
  ["Discover", "We map how work arrives, who handles it and where it stalls."],
  ["Design", "An automation blueprint with approval steps and exceptions defined."],
  ["Implement", "Built and integrated with your existing tools."],
  ["Validate", "Tested on realistic scenarios before go-live."],
  ["Launch", "Rolled out with your team, one workflow at a time."],
  ["Manage and improve", "Monitored, supported and improved every month."],
] as const;

export function Process() {
  return <ol className={styles.process}>{process.map(([title, text], index) => <li key={title}><small>{index + 1}</small><strong>{title}</strong><span>{text}</span></li>)}</ol>;
}

export function Faq({ items }: { items: readonly Pair[] }) {
  return <div className={styles.faq}>{items.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>;
}

export function Flow({ flow }: { flow: FlowConfig }) {
  return <Workflow flow={flow} id="workflow" />;
}

function Cta({ onDemo }: { onDemo: (label: string) => void }) {
  return <section className={styles.cta}>
    <div className={`frame ${styles.ctaInner}`}>
      <div>
        <h2>Start with one workflow.</h2>
        <p>Tell us where work slows down today. We will map your current process and recommend a narrowly scoped first automation, with the approval steps you need.</p>
      </div>
      <div className={styles.actions}>
        <button className="purple-button" onClick={() => onDemo("Get an automation assessment")}>Get an automation assessment <span aria-hidden="true">›</span></button>
        <a className="light-button" href="/#business">Other industries</a>
      </div>
    </div>
  </section>;
}
