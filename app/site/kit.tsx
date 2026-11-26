"use client";

import { SiteHeader, useDemo } from "../top";
import { Footer } from "../lower";
import { Cta } from "../industries/blocks";
import styles from "./kit.module.css";

/*
 * Shell for the content pages (solutions, how it works, technology, about, legal...). Same header, footer and
 * closing call-to-action as the industry pages; the hero is text-first with an optional right-hand aside.
 */

export type CtaProps = { title?: string; text?: string; secondary?: readonly [string, string] } | false;

export function SitePage({ children, hero, cta = {} }: { children: React.ReactNode; hero: React.ReactNode; cta?: CtaProps }) {
  const [openDemo, dialog] = useDemo();
  return <>
    <main>
      <SiteHeader onDemo={openDemo}>{hero}</SiteHeader>
      {children}
      {cta && <Cta onDemo={openDemo} {...cta} />}
    </main>
    <Footer />
    {dialog}
  </>;
}

export function PageHero({ crumb, title, lede, aside, actions = true, tone }: {
  crumb: readonly [string, string?]; title: React.ReactNode; lede: React.ReactNode; aside?: React.ReactNode; actions?: boolean | React.ReactNode; tone?: string;
}) {
  return <section className={styles.hero} data-tone={tone}>
    <div className={`frame ${styles.grid}`} data-aside={Boolean(aside)}>
      <div className={styles.copy}>
        <p className={styles.crumb}>{crumb[1] ? <a href={crumb[1]}>{crumb[0]}</a> : crumb[0]}</p>
        <h1>{title}</h1>
        <p className={styles.lede}>{lede}</p>
        {actions === true ? <div className={styles.actions}>
          <a className="purple-button" href="/contact">Get an automation assessment <span aria-hidden="true">›</span></a>
          <a className="light-button" href="/how-it-works">How it works</a>
        </div> : actions || null}
      </div>
      {aside && <div className={styles.aside}>{aside}</div>}
    </div>
  </section>;
}

/** A simple card grid with a Lucide icon in a wave tone. */
export function IconCards({ items, columns = 3 }: { items: readonly { icon: React.ComponentType<{ "aria-hidden"?: boolean }>; tone?: string; title: string; text: string }[]; columns?: number }) {
  return <ul className={styles.cards} style={{ "--cols": columns } as React.CSSProperties}>
    {items.map(({ icon: Icon, tone = "violet", title, text }) => <li key={title} data-tone={tone}>
      <span className={styles.icon}><Icon aria-hidden /></span>
      <h3>{title}</h3>
      <p>{text}</p>
    </li>)}
  </ul>;
}

/** Long-form text (legal pages and similar). */
export function Prose({ children, draft }: { children: React.ReactNode; draft?: string }) {
  return <section className={styles.proseSection}>
    <div className={`frame ${styles.proseFrame}`}>
      {draft && <p className={styles.draft} role="note"><strong>Draft for legal review.</strong> {draft}</p>}
      <div className={styles.prose}>{children}</div>
    </div>
  </section>;
}
