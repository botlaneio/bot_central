"use client";

import { Activity, LifeBuoy, MessageSquareText, RefreshCw, Wrench, FileBarChart } from "lucide-react";
import { Checklist, Section } from "../industries/blocks";
import { IconCards, PageHero, SitePage } from "../site/kit";

const covered = [
  { icon: Activity, tone: "sky", title: "Monitoring", text: "Every workflow and integration is watched, and failures raise an alert to our team." },
  { icon: Wrench, tone: "orange", title: "Maintenance", text: "When one of your tools changes, we update the connection." },
  { icon: LifeBuoy, tone: "coral", title: "Help for your team", text: "Questions about how a workflow behaves, or a result that looks wrong." },
  { icon: MessageSquareText, tone: "pink", title: "Assistant updates", text: "Changes to the answers, prices or hours your assistants use." },
  { icon: FileBarChart, tone: "violet", title: "Monthly report", text: "What ran, what needed a person, and what we suggest next." },
  { icon: RefreshCw, tone: "sky", title: "Improvements", text: "Small changes within your agreed scope, prioritised with you." },
] as const;

const include = [
  ["Which workflow", "The name of the workflow or assistant, as it appears in your report or dashboard."],
  ["What happened", "What you expected, what happened instead, and roughly when."],
  ["An example", "A reference number, customer name or screenshot, if you have one. Please don't send passwords or patient health information."],
  ["How urgent it is", "Whether customers are affected right now, or it can wait for the next working day."],
] as const;

export default function Content() {
  return <SitePage cta={{ title: "Need help now?", text: "Existing clients can reach the team through the contact form, or through the channel agreed in your onboarding.", secondary: ["How engagements work", "/engagements"] }}
    hero={<PageHero crumb={["Support"]} title={<>Support. <em>For the systems we build and manage.</em></>}
      lede="Every botLane system comes with a managed service: we monitor it, maintain it, help your team with it and improve it every month."
      actions={<div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 30 }}>
        <a className="purple-button" style={{ background: "var(--ink)" }} href="/contact?topic=support">Contact support <span aria-hidden="true">›</span></a>
        <a className="light-button" style={{ border: "1px solid var(--line)" }} href="/engagements">What's included</a>
      </div>} />}>
    <Section title="What support covers.">
      <IconCards items={covered} />
    </Section>
    <Section tone="soft" title="When you get in touch, include…" sub="It helps us fix things faster.">
      <Checklist items={include} />
    </Section>
  </SitePage>;
}
