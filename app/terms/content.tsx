"use client";

import { ForRegion } from "../region";
import { PageHero, Prose, SitePage } from "../site/kit";

/* Terms of use for the website. Company details and governing law from the botstryx site. Reviewed Nov 2026. */
const EMAIL = "admin@botlane.io";

export default function Content() {
  return <SitePage cta={false} hero={<PageHero crumb={["Legal"]} actions={false} title="Terms of use" lede="Last updated 26 November 2026. The terms that apply when you use this website." />}>
    <Prose>
      <h2>About these terms</h2>
      <ForRegion block
        us={<p>botlane.io is run by BotLane LLC, a limited liability company registered in Wyoming, USA, trading as botLane. By using the site you agree to these terms. If you don&apos;t agree, please don&apos;t use it.</p>}
        in={<p>botlane.in is operated under the Vedanta Ventures name as botLane India. By using the site you agree to these terms. If you don&apos;t agree, please don&apos;t use it.</p>} />
      <p>These terms cover the website. Any work we take on is governed by the written scope and agreement we both sign before it starts, and that agreement wins wherever the two differ.</p>

      <h2>Information on this site</h2>
      <p>The site describes our services in general terms. It isn&apos;t professional, legal, financial or medical advice. Examples, sample workflows and demo screens are illustrative, are labelled as demos, and don&apos;t describe a specific client or promise a result.</p>
      <ForRegion block
        us={<p>Any prices on the site are in US dollars and show what work usually costs. They aren&apos;t an offer you can accept by contacting us: your price is fixed in your written scope. Taxes and third-party costs are extra unless your scope says otherwise.</p>}
        in={<p>Any prices on the site are in Indian rupees and show what work usually costs. They aren&apos;t an offer you can accept by contacting us: your price is fixed in your written scope. GST is additional where applicable. Please don&apos;t make a payment unless you&apos;ve received an agreed invoice and confirmed the payment details with us directly.</p>} />

      <h2>Using the site</h2>
      <p>Please don&apos;t:</p>
      <ul>
        <li>use the site for anything unlawful, or to mislead or harm anyone;</li>
        <li>try to get into parts of it that aren&apos;t public, or interfere with how it runs;</li>
        <li>send spam or automated submissions through the contact form;</li>
        <li>copy the site&apos;s content or design to pass it off as your own.</li>
      </ul>

      <h2>What&apos;s ours</h2>
      <p>The site&apos;s text, design, code, graphics and the botLane name and logo belong to us or to the people who license them to us. You can read, link to and share pages; anything more needs our written permission. Other companies&apos; names on the site belong to their owners and don&apos;t mean they endorse us. Photographs are used under licence.</p>

      <h2>Other sites</h2>
      <p>We link to other websites for your convenience. We don&apos;t control them and aren&apos;t responsible for what they contain or do.</p>

      <h2>Our responsibility</h2>
      <p>We work to keep the site accurate and available, but we provide it as it is. We don&apos;t promise it will always be available, free of errors or complete. As far as the law allows, we aren&apos;t liable for indirect or consequential loss, or for loss of profit, data or business, arising from using the site. Nothing in these terms limits liability that the law doesn&apos;t allow us to limit.</p>

      <h2>The law that applies</h2>
      <ForRegion block
        us={<p>These terms are governed by the laws of the State of Wyoming, USA, and disputes about them go to its courts, unless the law where you live gives you the right to bring them there.</p>}
        in={<p>Indian law applies to these terms, subject to any protections the law gives you that can&apos;t be excluded.</p>} />

      <h2>Changes and contact</h2>
      <p>We may update these terms; the date at the top shows when they last changed, and the version on the site when you use it is the one that applies. Questions? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
    </Prose>
  </SitePage>;
}
