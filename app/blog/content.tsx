"use client";

import { useState } from "react";
import Shell from "./shell";
import Cover from "./cover";
import { formatDate, postsByDate, readingMinutes, toneFor, topics } from "./posts";
import styles from "./blog.module.css";

// Insights index: the newest post as a feature, the rest in a grid, filterable by topic.
export default function Content() {
  const all = postsByDate();
  const [topic, setTopic] = useState<string>("All");
  const shown = topic === "All" ? all : all.filter(p => p.topic === topic);

  return <Shell hero={<section className={styles.hero}>
    <div className="frame">
      <p className={styles.kicker}><span />Insights</p>
      <h1>Practical thinking on business automation.</h1>
      <p className={styles.lede}>What to automate, what to keep human, and how to start small. Plain guides for owners and teams, with nothing to buy.</p>
    </div>
  </section>}>
    <section className={styles.list}>
      <div className="frame">
        <div className={styles.topics} role="group" aria-label="Filter by topic">
          {["All", ...topics()].map(t => <button key={t} type="button" aria-pressed={topic === t} onClick={() => setTopic(t)}>{t}</button>)}
        </div>
        <div className={styles.grid}>
          {shown.map((post, i) => <a key={post.slug} href={`/blog/${post.slug}`} className={styles.card} data-feature={i === 0 && topic === "All"} data-tone={toneFor(post.topic)}>
            <Cover slug={post.slug} className={styles.cover} />
            <div className={styles.cardBody}>
              <div className={styles.meta}><span>{post.topic}</span><em>{formatDate(post.date)} · {readingMinutes(post)} min read</em></div>
              <h2>{post.title}</h2>
              <p>{post.dek}</p>
              <b className={styles.read}>Read <span aria-hidden="true">→</span></b>
            </div>
          </a>)}
        </div>
      </div>
    </section>
  </Shell>;
}
