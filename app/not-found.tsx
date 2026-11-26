"use client";

import { PageHero, SitePage } from "./site/kit";

export default function NotFound() {
  return <SitePage cta={false} hero={<PageHero crumb={["404"]} title={<>This page doesn&apos;t exist. <em>It may have moved, or the link may be wrong.</em></>}
    lede="Try one of these instead."
    actions={<div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 30 }}>
      <a className="purple-button" style={{ background: "var(--ink)" }} href="/">Go to the homepage <span aria-hidden="true">›</span></a>
      <a className="light-button" style={{ border: "1px solid var(--line)" }} href="/#business">Industries</a>
      <a className="light-button" style={{ border: "1px solid var(--line)" }} href="/blog">Insights</a>
      <a className="light-button" style={{ border: "1px solid var(--line)" }} href="/contact">Contact</a>
    </div>} />}>
    <div style={{ height: 40 }} />
  </SitePage>;
}
