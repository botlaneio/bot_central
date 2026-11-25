"use client";

import { Checklist, Chips, Faq, Flow, Hero, IndustryPage, Journey, ModuleCards, Process, Section, TwoCol } from "../blocks";
import type { FlowConfig } from "../../workflow";
import styles from "../industry.module.css";

const firstHour = [
  { when: "Minute 0", title: "An enquiry arrives at 9:41 PM", text: "From a listing portal, your website or WhatsApp. Without a system, it waits until morning, and by then the buyer has called three other agents." },
  { when: "Minute 1", title: "It is answered and qualified", text: "An assistant replies, asks about budget, area, timing and financing, and logs everything in your CRM using the same criteria for every enquiry." },
  { when: "Next morning", title: "An agent picks up a warm lead", text: "A viewing is already offered, the agent confirms the slot, and reminders go out automatically. The agent's time goes into the conversation, not the admin." },
] as const;

const modules = [
  ["AI inquiry handling", "Property enquiries answered on your website, phone and messaging channels, day and night."],
  ["Lead qualification", "Consistent questions on budget, timing and requirements, never on protected characteristics."],
  ["AI voice receptionist", "Calls answered, details captured and urgent ones passed to an agent."],
  ["Viewing scheduling", "Viewings booked around agent and property availability."],
  ["Confirmations and reminders", "WhatsApp, SMS and email reminders that reduce missed viewings."],
  ["Lead nurturing", "Follow-ups for leads who aren't ready yet, stopped when they ask."],
  ["Property recommendations", "Listings suggested from stated preferences such as budget, size and location."],
  ["Documents and onboarding", "Client documents collected and onboarding steps tracked."],
  ["Pipeline and agent dashboards", "Enquiries, viewings and deals by source and by agent."],
] as const;

const x = (i: number) => 60 + i * 320;
const flow: FlowConfig = {
  heading: "A late-night enquiry, ready for an agent by morning.",
  sub: "The assistant handles the questions and the calendar. The agent confirms the viewing.",
  barTitle: "Enquiry to viewing",
  barSub: "Real estate · buyers and tenants",
  label: "Demo workflow: a property enquiry arrives on WhatsApp, an assistant replies and asks qualifying questions, ready leads are assigned to an agent, a viewing is booked, the agent confirms it, reminders are sent, the CRM is updated and a follow-up goes out after the viewing.",
  path: [
    { x: x(0), y: 190, kind: "trigger", tag: "Trigger", title: "Property enquiry", detail: "WhatsApp · 3-bed apartment", time: "9:41 PM" },
    { x: x(1), y: 190, kind: "ai", tag: "AI agent", title: "Assistant replies", detail: "Budget, area and timing captured", time: "9:41 PM" },
    { x: x(2), y: 190, kind: "condition", tag: "Condition", title: "Ready to view?", detail: "Wants to view this week", time: "9:44 PM" },
    { x: x(3), y: 70, kind: "action", tag: "Assign", title: "Agent assigned", detail: "By area and availability", time: "9:44 PM" },
    { x: x(4), y: 190, kind: "action", tag: "Schedule", title: "Viewing offered", detail: "Saturday, 11:00 held", time: "9:45 PM" },
    { x: x(5), y: 190, kind: "action", tag: "Approval", title: "Agent confirms", detail: "One tap in the morning", time: "8:10 AM" },
    { x: x(6), y: 190, kind: "action", tag: "Notify", title: "Reminders sent", detail: "Confirmation now, reminder Friday", time: "8:10 AM" },
    { x: x(7), y: 190, kind: "action", tag: "CRM", title: "CRM updated", detail: "Conversation and viewing logged", time: "8:11 AM" },
    { x: x(8), y: 190, kind: "goal", tag: "Goal", title: "Post-viewing follow-up", detail: "Feedback and next steps", time: "Saturday" },
  ],
  noBranch: { x: x(3), y: 320, kind: "action", tag: "Nurture", title: "Added to nurture", detail: "Useful listings, no pressure", dim: true },
};

const digital = [
  ["Real estate website", "A premium site where every enquiry form feeds the same system."],
  ["Property listing platform", "Listings with search, filters and enquiry capture."],
  ["Property landing pages", "One page per development or campaign, built to convert."],
  ["Customer portal", "Documents, viewings and next steps in one place for buyers and tenants."],
  ["Interactive enquiry", "Guided questions instead of a blank contact form."],
] as const;

const faq = [
  ["Is automated lead qualification fair?", "It has to be. We design qualification and recommendations around stated requirements such as budget, timing, size and location, never protected characteristics, and review the rules with you against fair housing and anti-discrimination requirements in your market."],
  ["Will clients know they are talking to an assistant?", "Yes. The assistant introduces itself as automated, and a person can take over at any point."],
  ["We already use a CRM and listing portals. Does this replace them?", "No. We connect to the CRM, portals and calendars you already use, so agents keep working where they work today."],
  ["Which channels do you support?", "Website, phone, WhatsApp, SMS and email. In India, WhatsApp is usually the main channel. In the US, it's more often SMS and phone. The workflows are the same."],
  ["Where should we start?", "With enquiry handling and viewing scheduling, because that is where response time decides who wins the client."],
] as const;

export default function Content() {
  return <IndustryPage hero={onDemo => <Hero onDemo={onDemo} eyebrow="Real Estate"
    title={<>Less time chasing leads. <em>More time closing deals.</em></>}
    lede="Connect property inquiries, lead qualification, scheduling and customer follow-ups into one intelligent real estate ecosystem."
    panel={<div className={styles.mockCard}>
      <small>This week · all channels</small>
      <strong>Enquiry pipeline</strong>
      <div className={styles.funnel}>
        <div><span>Enquiries answered</span><span>48</span></div>
        <div><span>Qualified</span><span>21</span></div>
        <div><span>Viewings booked</span><span>12</span></div>
        <div><span>Offers</span><span>3</span></div>
      </div>
      <div className={styles.mockRow} style={{ marginTop: 12 }}><span>New: 3-bed apartment, WhatsApp</span><span className={styles.pill}>Viewing Sat 11:00</span></div>
    </div>} />}>

    <Section title="The first hour decides the lead." sub="Agencies, brokerages, developers and property managers lose good enquiries to slow replies, manual follow-ups and missed viewings.">
      <Journey steps={firstHour} />
    </Section>

    <Section tone="soft" title="Modules for every step of the enquiry." sub="Use one or connect them all. They share the same CRM, calendar and messaging channels.">
      <ModuleCards items={modules} label="Real estate" />
    </Section>

    <Flow flow={flow} />

    <Section tone="navy" title="Fair by design." sub="Automated qualification and recommendations must comply with fair housing and anti-discrimination requirements.">
      <Checklist items={[
        ["Neutral criteria", "Qualification uses stated requirements such as budget, timing, size and location, never protected characteristics."],
        ["No steering", "Recommendations follow the client's stated preferences, not assumptions about who they are."],
        ["Reviewed rules", "Qualification scripts and rules are reviewed with you before launch and whenever they change."],
        ["Human takeover", "Any conversation can be handed to an agent, and sensitive questions always are."],
        ["Consent and opt-out", "Follow-ups respect messaging consent rules and stop when a client asks."],
      ]} />
    </Section>

    <Section title="Websites and portals that feed the pipeline.">
      <TwoCol intro={<><h3>Every page is a lead source</h3><p>Listing pages, development landing pages and portals all route enquiries into the same qualification and scheduling workflows.</p></>}>
        <Checklist items={digital} />
      </TwoCol>
    </Section>

    <Section tone="soft" title="Works with your tools." sub="CRM, calendars, listing portals and messaging, connected.">
      <Chips items={["CRM", "Listing portals", "Google and Outlook calendars", "WhatsApp Business", "SMS", "Email", "Telephone", "E-signature", "Document storage", "Dashboards"]} />
    </Section>

    <Section title="What it can change." sub="Potential benefits, not guarantees. We agree measurable goals with you during the assessment.">
      <ModuleCards label="Benefit" items={[
        ["Faster first replies", "Enquiries answered in minutes, including evenings and weekends."],
        ["Fewer missed viewings", "Confirmations and reminders on the channel each client prefers."],
        ["Agents focused on clients", "Less time on data entry, scheduling and chasing."],
      ]} />
    </Section>

    <Section tone="soft" title="How implementation works.">
      <Process />
    </Section>

    <Section title="Questions real estate teams ask.">
      <Faq items={faq} />
    </Section>
  </IndustryPage>;
}
