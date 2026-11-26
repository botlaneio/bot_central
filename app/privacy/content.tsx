"use client";

import { PageHero, Prose, SitePage } from "../site/kit";

/* DRAFT TEMPLATE: must be reviewed by a qualified lawyer (US and India) before launch. Bracketed items are placeholders. */
export default function Content() {
  return <SitePage cta={false} hero={<PageHero crumb={["Legal"]} actions={false} title="Privacy policy" lede="Last updated: [date]. How botLane collects, uses and protects personal information." />}>
    <Prose draft="This is a template prepared for review by a qualified lawyer. It is not legal advice and is not yet in force. Bracketed items need to be completed.">
      <h2>Who we are</h2>
      <p>This website is operated by BotLane LLC (&quot;botLane&quot;, &quot;we&quot;, &quot;us&quot;), [registered address]. For privacy questions, contact [privacy email]. [If applicable: our grievance officer for India is [name, contact].]</p>

      <h2>What this policy covers</h2>
      <p>This policy covers personal information we collect through this website and when you contact us. When we build and run systems for our clients, we process their customers&apos; information on our clients&apos; behalf and under our agreements with them; those clients&apos; own privacy notices apply to that information.</p>

      <h2>Information we collect</h2>
      <ul>
        <li><strong>Information you give us:</strong> your name, work email, phone number, company, industry, country and the details you include in a form or message.</li>
        <li><strong>Information collected automatically:</strong> basic technical data such as browser type, device, pages visited and approximate location derived from your IP address. See our <a href="/cookies">cookie policy</a>.</li>
      </ul>
      <p>Please do not send us patient health information or other sensitive personal data through the website.</p>

      <h2>How we use it</h2>
      <ul>
        <li>To reply to your enquiry and provide an assessment you requested.</li>
        <li>To provide, support and improve our services for clients.</li>
        <li>To keep the website secure and working properly.</li>
        <li>To meet legal obligations.</li>
      </ul>
      <p>We do not sell personal information. We do not add you to marketing emails unless you ask us to, and you can unsubscribe at any time.</p>

      <h2>Legal basis and consent</h2>
      <p>[To be completed by counsel: legal bases relied on, consent under India&apos;s Digital Personal Data Protection Act, 2023, and any applicable US state privacy laws.]</p>

      <h2>Who we share it with</h2>
      <p>We share personal information only with service providers who help us run our business (for example hosting, email and customer relationship tools), under contracts that require them to protect it, and where required by law. [List categories of processors and their locations.]</p>

      <h2>International transfers</h2>
      <p>We operate in the United States and India, so your information may be processed in either country. [Describe safeguards.]</p>

      <h2>How long we keep it</h2>
      <p>We keep enquiry information for [period] after our last contact, unless you become a client or the law requires us to keep it longer.</p>

      <h2>Your rights</h2>
      <p>Depending on where you live, you may have the right to access, correct, delete or obtain a copy of your personal information, to withdraw consent, and to nominate someone to act for you. To make a request, contact [privacy email]. We will not discriminate against you for exercising your rights.</p>

      <h2>Security</h2>
      <p>We use reasonable technical and organisational measures to protect personal information, including access controls and encryption in transit. No system is completely secure.</p>

      <h2>Children</h2>
      <p>This website is intended for businesses and is not directed at children.</p>

      <h2>Changes</h2>
      <p>We may update this policy. The date at the top shows when it last changed.</p>
    </Prose>
  </SitePage>;
}
