"use client";

import { PageHero, Prose, SitePage } from "../site/kit";

/* Cookie policy. Matches what the site does today: no cookies, no analytics. Update before adding either. */
export default function Content() {
  return <SitePage cta={false} hero={<PageHero crumb={["Legal"]} actions={false} title="Cookie policy" lede="Last updated 26 November 2026. The short version: this site doesn't set cookies." />}>
    <Prose>
      <h2>What we use</h2>
      <table>
        <thead><tr><th>Type</th><th>Purpose</th><th>Used?</th></tr></thead>
        <tbody>
          <tr><td>Strictly necessary</td><td>Running and protecting the site. Cloudflare may use security measures to block abuse.</td><td>Only where Cloudflare needs them</td></tr>
          <tr><td>Analytics</td><td>Measuring how pages are used.</td><td>No</td></tr>
          <tr><td>Marketing and advertising</td><td>Tracking you across sites, measuring ads.</td><td>No</td></tr>
        </tbody>
      </table>
      <p>For the current visit only, your browser may remember which version of the site you chose to preview. It stays on your device and is cleared when you close the tab.</p>
      <p>If we ever add cookies that aren&apos;t strictly necessary, we&apos;ll update this page first and ask for your consent where the law requires it.</p>

      <h2>How to control cookies</h2>
      <p>You can block or delete cookies in your browser settings. Blocking strictly necessary ones may stop parts of the site from working.</p>

      <h2>More information</h2>
      <p>See our <a href="/privacy">privacy policy</a>, or email <a href="mailto:admin@botlane.io">admin@botlane.io</a>.</p>
    </Prose>
  </SitePage>;
}
