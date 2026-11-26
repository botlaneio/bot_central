"use client";

import { BadgeCheck, BellRing, Bot, EyeOff, Logs, UserCheck } from "lucide-react";
import { Checklist, Section, Split } from "../industries/blocks";
import { IconCards, PageHero, SitePage } from "../site/kit";

const principles = [
  { icon: UserCheck, tone: "violet", title: "A person approves what matters", text: "Quotes, discounts, payments, contract terms and anything unusual wait for a named person to approve them." },
  { icon: BellRing, tone: "coral", title: "Escalation, not guessing", text: "When a request is sensitive, urgent or outside the rules, the automation hands it to a person with a summary." },
  { icon: Logs, tone: "sky", title: "Every step is logged", text: "What happened, when, and who approved it, so any decision can be checked later." },
  { icon: EyeOff, tone: "pink", title: "Only the data it needs", text: "Workflows process the minimum personal information required, kept for agreed periods." },
  { icon: Bot, tone: "orange", title: "Honest about AI", text: "Customers are told when they're talking to an automated assistant, and can always reach a person." },
  { icon: BadgeCheck, tone: "violet", title: "Tested before launch", text: "Every workflow is tested on realistic and awkward cases before it goes live, and monitored afterwards." },
] as const;

const clinic = [
  ["No diagnosis, ever", "Automations handle administration only: bookings, reminders, forms and payments. Clinical questions always go to your clinical team."],
  ["United States", "For practices handling protected health information, we design workflows to support HIPAA obligations and use vendors that will sign a business associate agreement where one is required."],
  ["India", "We design workflows to support obligations under the Digital Personal Data Protection Act, 2023, including notice, consent and purpose limitation."],
  ["Consent for messages", "Reminders and follow-ups respect each patient's channel preferences and stop when they ask."],
] as const;

export default function Content() {
  return <SitePage hero={<PageHero crumb={["How it works", "/how-it-works"]} title={<>Responsible automation. <em>Safeguards built in, not bolted on.</em></>}
    lede="Automation should take admin off your team's plate, not take decisions out of their hands. These are the rules every botLane system follows." />}>
    <Section title="Our principles.">
      <IconCards items={principles} />
    </Section>
    <Section tone="soft" title="What automation does, and doesn't do.">
      <Split left={{ title: "Automation handles", items: ["Answering routine questions from your approved information", "Capturing, sorting and routing enquiries", "Drafting quotes, invoices and messages for approval", "Reminders, confirmations and status updates", "Moving data between your systems", "Reporting and monitoring"] }}
        right={{ title: "People decide", items: ["Prices, discounts and contract terms", "Anything clinical, legal or financial advice", "Complaints and sensitive conversations", "Exceptions the rules don't cover", "Hiring, credit or eligibility decisions", "What gets automated next"] }} />
    </Section>
    <Section title="Clinics and patient data." sub="Extra care where it matters most.">
      <Checklist items={clinic} />
    </Section>
  </SitePage>;
}
