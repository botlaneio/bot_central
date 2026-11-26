"use client";

import { ShieldCheck } from "lucide-react";
import { info } from "../capabilities";
import { solutionSlugs } from "../routes";
import { Section } from "../industries/blocks";
import { PageHero, SitePage } from "../site/kit";
import { details, midSentence } from "./data";
import HeroScene from "./hero-scenes";
import Problems from "./problems";
import Modules from "./modules";
import Delivery from "./delivery";
import styles from "./solution.module.css";

/* One page per capability: the problems it answers, what's included, how it looks in each industry, safeguards. */
export default function Content({ id }: { id: keyof typeof solutionSlugs }) {
  const c = info[id];
  const d = details[id];
  return <SitePage cta={{ title: `Start with ${midSentence(c.name)}.`, secondary: ["All solutions", "/#products"] }}
    hero={<PageHero crumb={["Solutions", "/#products"]} title={c.name} lede={c.lede} streak={`/media/streaks/${solutionSlugs[id]}.svg`}
      aside={<HeroScene id={id} />} />}>
    <Section title="The problems it solves." sub="Where this usually costs businesses time today.">
      <div data-tone={c.tone}><Problems id={id} /></div>
    </Section>
    <Section tone="soft" title="What's included." sub="Each piece can be used on its own or connected to the rest.">
      <div data-tone={c.tone}><Modules items={d.modules} /></div>
    </Section>
    <Section title="In each industry." sub="The same capability, configured for how each industry works.">
      <div className={styles.examples}>{c.examples.map(([ind, text]) => <a key={ind} href={`/industries/${ind === "Real Estate" ? "real-estate" : ind.toLowerCase()}`}><small>{ind}</small><span>{text}</span><em>Explore {ind.toLowerCase()} ›</em></a>)}</div>
      <p className={styles.control}><ShieldCheck aria-hidden />{c.control}</p>
    </Section>
    <Section tone="soft" title="How we deliver it." sub={`Six steps, the same for every engagement. Here is what each one means for ${c.name}.`}>
      <div data-tone={c.tone}><Delivery id={id} /></div>
    </Section>
    <Section title="Works well with.">
      <div className={styles.related}>{d.related.map(r => <a key={r} href={`/solutions/${solutionSlugs[r as keyof typeof solutionSlugs]}`} data-tone={info[r].tone}>
        <span className={styles.icon}>{(() => { const I = info[r].icon; return <I aria-hidden />; })()}</span>
        <div><strong>{info[r].name}</strong><small>{info[r].lede}</small></div>
      </a>)}</div>
    </Section>
  </SitePage>;
}
