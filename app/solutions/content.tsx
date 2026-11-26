"use client";

import { Check, ShieldCheck } from "lucide-react";
import { info } from "../capabilities";
import { solutionSlugs } from "../routes";
import { NumberedGrid, Process, Section } from "../industries/blocks";
import { PageHero, SitePage } from "../site/kit";
import { details } from "./data";
import styles from "./solution.module.css";

/* One page per capability: the problems it answers, what's included, how it looks in each industry, safeguards. */
export default function Content({ id }: { id: keyof typeof solutionSlugs }) {
  const c = info[id];
  const d = details[id];
  return <SitePage cta={{ title: `Start with ${c.name.toLowerCase()}.`, secondary: ["All solutions", "/#products"] }}
    hero={<PageHero crumb={["Solutions", "/#products"]} title={c.name} lede={c.lede}
      aside={<div className={styles.panel} data-tone={c.tone}>
        <span className={styles.icon}><c.icon aria-hidden /></span>
        <small>What&apos;s included</small>
        <ul>{c.includes.map(x => <li key={x}><Check aria-hidden />{x}</li>)}</ul>
      </div>} />}>
    <Section title="The problems it solves." sub="Where this usually costs businesses time today.">
      <NumberedGrid items={d.problems} columns={3} />
    </Section>
    <Section tone="soft" title="What's included." sub="Each piece can be used on its own or connected to the rest.">
      <ul className={styles.modules} data-tone={c.tone}>{d.modules.map(([title, text]) => <li key={title}><span className={styles.icon}><c.icon aria-hidden /></span><div><h3>{title}</h3><p>{text}</p></div></li>)}</ul>
    </Section>
    <Section title="In each industry." sub="The same capability, configured for how each industry works.">
      <div className={styles.examples}>{c.examples.map(([ind, text]) => <a key={ind} href={`/industries/${ind === "Real Estate" ? "real-estate" : ind.toLowerCase()}`}><small>{ind}</small><span>{text}</span><em>Explore {ind.toLowerCase()} ›</em></a>)}</div>
      <p className={styles.control}><ShieldCheck aria-hidden />{c.control}</p>
    </Section>
    <Section tone="soft" title="How we deliver it." sub="Six steps, the same for every engagement.">
      <Process />
    </Section>
    <Section title="Works well with.">
      <div className={styles.related}>{d.related.map(r => <a key={r} href={`/solutions/${solutionSlugs[r as keyof typeof solutionSlugs]}`} data-tone={info[r].tone}>
        <span className={styles.icon}>{(() => { const I = info[r].icon; return <I aria-hidden />; })()}</span>
        <div><strong>{info[r].name}</strong><small>{info[r].lede}</small></div>
      </a>)}</div>
    </Section>
  </SitePage>;
}
