"use client";

import { Faq, NumberedGrid, Section, Split } from "../industries/blocks";
import { PageHero, SitePage } from "../site/kit";

const stages = [
  ["Assessment", "We map how work moves through your business and recommend one narrowly scoped first workflow. You get a clear scope and a quote."],
  ["Implementation", "A one-time fee to design, build, integrate and test the agreed workflow, then launch it with your team."],
  ["Managed service", "A monthly fee to monitor, maintain, support and improve the system within an agreed scope."],
] as const;

const faq = [
  ["Do you have fixed packages?", "No. Every business works differently, so we quote after an assessment, based on the workflow, the tools involved and the level of support you need."],
  ["What isn't included in your fees?", "Third-party software subscriptions, AI usage, phone calls and messaging are set out separately in your quote, so you can see exactly what you pay for."],
  ["Is there a long contract?", "The terms of the monthly service are set out in your agreement before you sign. Ask us about them during the assessment."],
  ["Can we add more workflows later?", "Yes. Most clients start with one workflow and add the next when the first is working well. Each addition is scoped and quoted the same way."],
] as const;

export default function Content() {
  return <SitePage hero={<PageHero crumb={["How it works", "/how-it-works"]} title={<>How engagements work. <em>Clear scope, clear fees, no surprises.</em></>}
    lede="A one-time implementation fee, then a monthly fee to manage and improve your system. We quote after an assessment, and set out third-party costs separately." />}>
    <Section title="Three stages.">
      <NumberedGrid items={stages} columns={3} />
    </Section>
    <Section tone="soft" title="What the monthly service covers.">
      <Split left={{ title: "Included", items: ["Monitoring every workflow and integration", "Maintenance when your tools change", "Managing AI assistants and their approved information", "Handling exceptions and support requests", "A monthly report in plain language", "Suggestions for the next improvement"] }}
        right={{ title: "Set out separately", items: ["Third-party software subscriptions", "AI usage", "Phone calls and SMS", "WhatsApp and messaging fees", "New workflows outside the agreed scope"] }} />
    </Section>
    <Section title="Common questions.">
      <Faq items={faq} />
    </Section>
  </SitePage>;
}
