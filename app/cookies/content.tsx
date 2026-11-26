"use client";

import { PageHero, Prose, SitePage } from "../site/kit";

/* DRAFT TEMPLATE: complete once analytics and hosting choices are final; review with counsel before launch. */
export default function Content() {
  return <SitePage cta={false} hero={<PageHero crumb={["Legal"]} actions={false} title="Cookie policy" lede="Last updated: [date]. Which cookies and similar technologies this website uses, and how to control them." />}>
    <Prose draft="This is a template. The table must match what the live website actually uses once analytics and hosting are decided, and should be reviewed by a qualified lawyer.">
      <h2>What cookies are</h2>
      <p>Cookies are small files a website stores in your browser. Similar technologies include local storage and pixels.</p>

      <h2>What we use</h2>
      <table>
        <thead><tr><th>Type</th><th>Purpose</th><th>Used today?</th></tr></thead>
        <tbody>
          <tr><td>Strictly necessary</td><td>Security and basic operation of the website, such as protecting forms from abuse.</td><td>[Confirm]</td></tr>
          <tr><td>Analytics</td><td>Understanding which pages are useful, using aggregated data.</td><td>[Not yet: complete when chosen]</td></tr>
          <tr><td>Marketing</td><td>Measuring advertising.</td><td>No</td></tr>
        </tbody>
      </table>
      <p>We will ask for your consent before setting any cookie that isn&apos;t strictly necessary, where the law requires it.</p>

      <h2>How to control cookies</h2>
      <p>You can block or delete cookies in your browser settings. Blocking strictly necessary cookies may stop parts of the website from working.</p>

      <h2>More information</h2>
      <p>See our <a href="/privacy">privacy policy</a>, or contact [privacy email].</p>
    </Prose>
  </SitePage>;
}
