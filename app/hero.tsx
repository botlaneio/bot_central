"use client";

import { Inter } from "next/font/google";
import HeroPhone from "./hero-phone";
import styles from "./hero.module.css";

// The hero headline is set in Inter (self-hosted by Next at build time).
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

// The copy rises in with CSS (no JavaScript needed), so it plays from the first paint even on a slow connection.
const delay = (seconds: number) => ({ "--d": `${seconds}s` }) as React.CSSProperties;

export default function Hero({ onDemo }: { onDemo: (label: string) => void }) {
  return <section className={styles.hero} aria-labelledby="hero-title">
    <img className={styles.streak} src="/media/hero-streak.svg" alt="" aria-hidden="true" fetchPriority="high" />
    <div className={`frame ${styles.grid}`}>
      <div className={styles.copy}>
        <p className={`${styles.eyebrow} ${styles.in}`} style={delay(0.05)}><span className={styles.dot} aria-hidden="true" />Business automation for manufacturing, real estate and clinics</p>
        <h1 id="hero-title" className={`${inter.className} ${styles.in}`} style={delay(0.12)}>Move from requests to responses <em>at lightning speed.</em></h1>
        <p className={`${styles.lede} ${styles.in}`} style={delay(0.2)}>botLane designs, builds and manages the systems that bring enquiries, follow-ups and approvals together, so your team can respond promptly and keep work moving.</p>
        <div className={`${styles.actions} ${styles.in}`} style={delay(0.28)}>
          <button className={styles.primary} onClick={() => onDemo("Explore automation")}>Explore automation <span aria-hidden="true">→</span></button>
          <a className={styles.secondary} href="#business">Explore industries</a>
        </div>
        <ul className={`${styles.points} ${styles.in}`} style={delay(0.36)}>
          <li>Built around your existing tools</li>
          <li>You approve what matters</li>
          <li>Managed and improved monthly</li>
        </ul>
      </div>

      <HeroPhone className={styles.stage} />
    </div>
  </section>;
}
