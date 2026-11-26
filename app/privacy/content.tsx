"use client";

import { ForRegion } from "../region";
import { PageHero, Prose, SitePage } from "../site/kit";

/*
 * Privacy policy. Company details from the botstryx site (src/lib/site.ts, privacy and terms pages):
 * BotLane LLC (Wyoming) runs botlane.io; botlane.in is operated under the Vedanta Ventures name as botLane India.
 * Reviewed by the owner's lawyer, Nov 2026. When the form, a provider or anything the browser keeps changes,
 * change this page and its date in the same change.
 *   Contact form -> Cloudflare Worker -> botLane's own CRM (self-hosted), as a contact and a note
 *   Every request -> Cloudflare (hosting, short-lived request logs)
 *   Browser -> nothing kept beyond the current page; no cookies, no analytics
 */
const EMAIL = "admin@botlane.io";
const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

export default function Content() {
  return <SitePage cta={false} hero={<PageHero crumb={["Legal"]} actions={false} title="Privacy policy"
    lede={<>Last updated 26 November 2026. The short version: we only collect what you send us, we use it to reply and to do the work, and we don&apos;t sell it or track you.</>} />}>
    <Prose>
      <h2>Who we are</h2>
      <ForRegion block
        us={<p>botlane.io is run by BotLane LLC, a limited liability company registered in Wyoming, USA, trading as botLane. We decide what happens to the information described here.</p>}
        in={<p>botlane.in is operated under the Vedanta Ventures name as botLane India. We decide what happens to the information described here.</p>} />
      <p>For anything about your information, email {mail}. A person reads it.</p>

      <h2>What we collect</h2>
      <ul>
        <li><strong>When you use the <a href="/contact">contact form</a>:</strong> your name, work email, company, phone number if you add it, your industry, country and team size, the areas you pick, the tools you mention and your message.</li>
        <li><strong>When you visit any page:</strong> the technical details every browser sends, such as your IP address, browser type, the page you asked for and when. We don&apos;t use them to identify you.</li>
      </ul>
      <p>We don&apos;t ask for payment details, passwords or health information. Please don&apos;t include them, or any patient information, in a message.</p>

      <h2>How we use it</h2>
      <ul>
        <li>To reply to your enquiry, prepare an assessment you asked for, and talk about the work with you.</li>
        <li>To provide and support the services we agree with you.</li>
        <li>To keep the site running and secure, including blocking spam.</li>
        <li>To meet legal obligations.</li>
      </ul>
      <p>We use your details because you sent them to us and asked us to reply. You can withdraw that at any time by emailing {mail}.</p>

      <h2>What we don&apos;t do</h2>
      <ul>
        <li>We don&apos;t sell your information or share it for advertising.</li>
        <li>We don&apos;t add you to a mailing list.</li>
        <li>We don&apos;t use advertising trackers or analytics cookies, and we don&apos;t build a profile of you.</li>
      </ul>

      <h2>Who handles it for us</h2>
      <ul>
        <li><strong>Cloudflare</strong> hosts the site, passes the contact form to us, and keeps short-lived request logs to run and protect it.</li>
        <li><strong>Our own customer relationship system</strong>, which we run on our own server, stores your enquiry and our notes about it.</li>
        <li><strong>Our email provider</strong> carries any emails we exchange with you.</li>
      </ul>

      <h2>Where it&apos;s handled</h2>
      <p>We work from India and the United States, and Cloudflare processes information in many countries. Wherever it&apos;s handled, it&apos;s used only for the purposes on this page.</p>

      <h2>How long we keep it</h2>
      <p>We keep enquiries and our emails with you for as long as we need them to reply, to do any work we agree and to keep business records. Request logs are kept by Cloudflare for a short time. Ask us to delete anything you&apos;ve sent and we will, unless the law requires us to keep it.</p>

      <h2>Your choices</h2>
      <p>You can ask us what we hold about you, to correct it, to delete it, or to stop using it. Email {mail} from the address you used, or tell us how to confirm it&apos;s you. We&apos;ll answer within 30 days.</p>
      <ForRegion block
        us={<p>If you&apos;re unhappy with our answer, you can complain to the data protection authority where you live.</p>}
        in={<p>To raise a grievance about how we handle your information, email {mail} with the subject &quot;Grievance&quot;. If you&apos;re unhappy with our answer, you can complain to the Data Protection Board of India.</p>} />

      <h2>Security</h2>
      <p>We use reasonable technical and organisational safeguards, including access controls and encrypted connections. No online service can guarantee complete security.</p>

      <h2>Cookies and your browser</h2>
      <p>This site doesn&apos;t set cookies and nothing on it tracks you across other sites. See the <a href="/cookies">cookie policy</a>.</p>

      <h2>Children</h2>
      <p>This site is for businesses. It isn&apos;t meant for children, and we don&apos;t knowingly collect their information.</p>

      <h2>Changes to this policy</h2>
      <p>When the site starts collecting something new or uses a new provider, we update this page first and change the date at the top. See also our <a href="/terms">terms of use</a>.</p>
    </Prose>
  </SitePage>;
}
