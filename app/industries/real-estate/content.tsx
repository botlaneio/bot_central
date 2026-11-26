"use client";

import { ArrowDownRight, ArrowRight, CalendarCheck, Globe2, MessageSquare, ShieldCheck, Workflow } from "lucide-react";
import { Faq, Flow, Hero, IndustryPage, Process } from "../blocks";
import type { FlowConfig } from "../../workflow";
import styles from "../industry.module.css";
import page from "./real-estate.module.css";

const firstHour = [
  { when: "9:41 PM", title: "A buyer asks about a listing", text: "A three-bedroom enquiry comes in on WhatsApp while the office is closed." },
  { when: "9:45 PM", title: "A viewing slot is held", text: "The assistant answers the buyer’s questions, captures their requirements and logs the conversation." },
  { when: "8:10 AM", title: "The agent confirms", text: "An agent picks up the lead with the context already in the CRM. Confirmation and reminders follow." },
] as const;

const capabilities = [
  {
    icon: MessageSquare, title: "Capture the enquiry", items: [
      ["Enquiry handling", "Reply on your website and messaging channels, day and night."],
      ["AI voice receptionist", "Answer calls, capture details and hand urgent enquiries to an agent."],
      ["Lead qualification", "Ask consistent questions about budget, timing and requirements."],
    ],
  },
  {
    icon: CalendarCheck, title: "Get to the viewing", items: [
      ["Property recommendations", "Suggest listings based on stated preferences such as size and location."],
      ["Viewing scheduling", "Offer times that work for the property and the agent’s calendar."],
      ["Confirmations and reminders", "Send updates by WhatsApp, SMS or email."],
    ],
  },
  {
    icon: Workflow, title: "Keep the deal moving", items: [
      ["Lead nurturing", "Follow up with buyers who need time and respect opt-outs."],
      ["Documents and onboarding", "Collect documents and track what is still outstanding."],
      ["Pipeline and agent dashboards", "See enquiries, viewings and deals by source and by agent."],
    ],
  },
] as const;

const safeguards = [
  ["Neutral criteria", "Use stated requirements such as budget, timing, size and location. Exclude protected characteristics."],
  ["No steering", "Base recommendations on the client’s stated preferences."],
  ["Reviewed rules", "Review qualification scripts before launch and whenever the rules change."],
  ["Human takeover", "Give clients a way to reach an agent and pass sensitive questions to a person."],
  ["Consent and opt-out", "Respect messaging consent and stop follow-ups when requested."],
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

    <section className={page.chapter} aria-labelledby="estate-journey">
      <div className={`frame ${page.frame}`}>
        <header className={page.heading}>
          <h2 id="estate-journey">From late-night enquiry to a booked viewing.</h2>
          <p>See how a late-night message turns into a lead your agent can pick up in the morning.</p>
        </header>
        <div className={page.story}>
          <figure className={page.property}>
            <img src="/media/real-estate/apartment-at-dusk.webp" width={1280} height={960} alt="Contemporary apartment building with lit windows at dusk" loading="lazy" decoding="async" />
            <figcaption><span>Sample enquiry</span><strong>3-bed apartment</strong><span>WhatsApp · 9:41 PM</span></figcaption>
          </figure>
          <ol className={page.timeline} aria-label="Sample enquiry timeline">
            {firstHour.map(({ when, title, text }) => <li key={when}>
              <time>{when}</time><h3>{title}</h3><p>{text}</p>
            </li>)}
          </ol>
        </div>
      </div>
    </section>

    <section className={page.chapter} aria-labelledby="estate-capabilities">
      <div className={`frame ${page.frame}`}>
        <header className={page.heading}>
          <h2 id="estate-capabilities">One pipeline, from first reply to follow-up.</h2>
          <p>Start with the step that takes the most time. Each module can share your CRM, calendar and messaging channels.</p>
        </header>
        <ol className={page.capabilities}>
          {capabilities.map(({ icon: Icon, title, items }) => <li key={title}>
            <div className={page.stageHeader}><Icon aria-hidden="true" /><h3>{title}</h3></div>
            <dl>{items.map(([name, detail]) => <div key={name}><dt>{name}</dt><dd>{detail}</dd></div>)}</dl>
          </li>)}
        </ol>
      </div>
    </section>

    <div className={page.workflow}><Flow flow={flow} /></div>

    <section className={`${page.chapter} ${page.safeguards}`} aria-labelledby="estate-safeguards">
      <div className={`frame ${page.frame} ${page.split}`}>
        <header>
          <ShieldCheck className={page.shield} aria-hidden="true" />
          <h2 id="estate-safeguards">Fair by design.</h2>
          <p>Automated qualification and recommendations must comply with fair housing and anti-discrimination requirements. Review how each rule works with your team before launch.</p>
        </header>
        <dl className={page.ledger}>{safeguards.map(([name, detail]) =>
          <div key={name}><dt>{name}</dt><dd>{detail}</dd></div>
        )}</dl>
      </div>
    </section>

    <section className={page.chapter} aria-labelledby="estate-digital">
      <div className={`frame ${page.frame}`}>
        <header className={page.heading}>
          <h2 id="estate-digital">Every property page can start a conversation.</h2>
          <p>Connect new websites, listing pages and portals to the systems your team already uses.</p>
        </header>
        <div className={page.connections}>
          <div>
            <h3><Globe2 aria-hidden="true" /> Websites and portals</h3>
            <dl className={page.ledger}>{digital.map(([name, detail]) =>
              <div key={name}><dt>{name}</dt><dd>{detail}</dd></div>
            )}</dl>
          </div>
          <aside className={page.tools}>
            <h3><ArrowDownRight aria-hidden="true" /> Connect your tools</h3>
            <ul>
              <li><strong>Leads and listings</strong><span>CRM and listing portals</span></li>
              <li><strong>Scheduling and messaging</strong><span>Google and Outlook calendars, WhatsApp Business, SMS, email and phone</span></li>
              <li><strong>Documents and reporting</strong><span>E-signature, document storage and dashboards</span></li>
            </ul>
          </aside>
        </div>
      </div>
    </section>

    <section className={`${page.chapter} ${page.delivery}`} aria-labelledby="estate-delivery">
      <div className={`frame ${page.frame}`}>
        <header className={page.heading}>
          <h2 id="estate-delivery">From assessment to rollout.</h2>
          <p>Agree on what to measure before you launch, from first-reply time to missed viewings and time spent on admin.</p>
        </header>
        <div className={page.process}><Process /></div>
      </div>
    </section>

    <section className={page.chapter} aria-labelledby="estate-faq">
      <div className={`frame ${page.frame} ${page.split}`}>
        <header><h2 id="estate-faq">Questions real estate teams ask.</h2>
          <a className={page.link} href="#workflow">See the sample workflow <ArrowRight aria-hidden="true" /></a>
        </header>
        <Faq items={faq} />
      </div>
    </section>
  </IndustryPage>;
}
