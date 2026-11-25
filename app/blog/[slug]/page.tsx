import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Shell from "../shell";
import Cover from "../cover";
import { Markdown } from "../markdown";
import { POSTS, anchor, findPost, formatDate, postsByDate, readingMinutes, toneFor } from "../posts";
import styles from "../blog.module.css";

export const dynamicParams = false;
export const generateStaticParams = () => POSTS.map(p => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = findPost((await params).slug);
  return post ? { title: `${post.title} | botLane Insights`, description: post.dek } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const post = findPost((await params).slug);
  if (!post) notFound();
  const tone = toneFor(post.topic);
  const headings = post.body.filter(b => b.type === "h2").map(b => (b as { text: string }).text);
  const more = postsByDate().filter(p => p.slug !== post.slug).slice(0, 3);

  return <Shell hero={<header className={styles.postHero} data-tone={tone}>
    <div className={`frame ${styles.postHeroGrid}`}>
      <div>
        <p className={styles.crumb}><a href="/blog">Insights</a> <span aria-hidden="true">/</span> <b>{post.topic}</b></p>
        <h1>{post.title}</h1>
        <p className={styles.lede}>{post.dek}</p>
        <p className={styles.byline}>{formatDate(post.date)} · {readingMinutes(post)} min read</p>
      </div>
      <Cover kind={post.cover} seed={post.slug} className={styles.postCover} />
    </div>
  </header>}>
    <div className={`frame ${styles.postLayout}`} data-tone={tone}>
      {headings.length > 1 && <aside className={styles.toc}>
        <small>On this page</small>
        <ol>{headings.map(h => <li key={h}><a href={`#${anchor(h)}`}>{h}</a></li>)}</ol>
      </aside>}
      <article className={styles.prose}>
        {post.body.map((b, i) => {
          if (b.type === "h2") return <h2 key={i} id={anchor(b.text)}>{b.text}</h2>;
          if (b.type === "list") return <ul key={i}>{b.items.map(it => <li key={it}><Markdown text={it} /></li>)}</ul>;
          if (b.type === "quote") return <blockquote key={i}><Markdown text={b.text} /></blockquote>;
          return <Markdown key={i} text={b.text} headingId={anchor} />;
        })}
      </article>
    </div>
    <section className={styles.more}>
      <div className="frame">
        <h2>More insights</h2>
        <div className={styles.grid} data-compact="true">
          {more.map(p => <a key={p.slug} href={`/blog/${p.slug}`} className={styles.card} data-tone={toneFor(p.topic)}>
            <Cover kind={p.cover} seed={p.slug} className={styles.cover} />
            <div className={styles.cardBody}>
              <div className={styles.meta}><span>{p.topic}</span><em>{readingMinutes(p)} min read</em></div>
              <h2>{p.title}</h2>
            </div>
          </a>)}
        </div>
      </div>
    </section>
  </Shell>;
}
