"use client";

import { PageHero, Prose, SitePage } from "../site/kit";

/* DRAFT TEMPLATE: must be reviewed by a qualified lawyer before launch. Bracketed items are placeholders. */
export default function Content() {
  return <SitePage cta={false} hero={<PageHero crumb={["Legal"]} actions={false} title="Terms of use" lede="Last updated: [date]. The terms that apply when you use this website." />}>
    <Prose draft="This is a template prepared for review by a qualified lawyer. It is not legal advice and is not yet in force. Bracketed items need to be completed.">
      <h2>About these terms</h2>
      <p>This website is operated by BotLane LLC, [registered address]. By using it, you agree to these terms. They cover the website only. Services we provide to clients are governed by a separate written agreement.</p>

      <h2>Information on this website</h2>
      <p>The content on this website is general information about our services. It is not professional, legal, financial or medical advice. Examples, sample workflows and demo screens are illustrative only and are labelled as demos; they do not describe a specific client or guarantee any result.</p>

      <h2>Your use of the website</h2>
      <ul>
        <li>Use the website lawfully and don&apos;t try to disrupt it, access it without permission, or scrape it at scale.</li>
        <li>Make sure the information you send us is accurate, and don&apos;t send us sensitive personal data such as health information through the website.</li>
      </ul>

      <h2>Intellectual property</h2>
      <p>The website, its design, text, graphics and code belong to botLane or its licensors. Third-party names and logos belong to their owners and do not imply endorsement. Photographs are used under licence.</p>

      <h2>Links to other websites</h2>
      <p>We are not responsible for the content or practices of websites we link to.</p>

      <h2>Liability</h2>
      <p>The website is provided &quot;as is&quot;. To the extent the law allows, we are not liable for losses arising from your use of it. [Counsel to complete limitation of liability for US and India.]</p>

      <h2>Governing law</h2>
      <p>[To be completed by counsel: governing law and jurisdiction.]</p>

      <h2>Changes</h2>
      <p>We may update these terms. The date at the top shows when they last changed. Contact: [legal email].</p>
    </Prose>
  </SitePage>;
}
