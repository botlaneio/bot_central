"use client";

import {
  ArrowRight, Building2, CalendarCheck, CalendarDays, FileSignature, FolderOpen, Globe2, LayoutDashboard, LayoutTemplate,
  Mail, MessageCircle, MessageSquare, Phone, ShieldCheck, UserRoundCheck, Users, Workflow, type LucideIcon,
} from "lucide-react";
import { Faq, Flow, IndustryPage, Process } from "../blocks";
import type { FlowConfig } from "../../workflow";
import { ForRegion } from "../../region";
import LeadChat from "./lead-chat";
import PipelineBoard from "./pipeline-board";
import page from "./real-estate.module.css";

/*
 * Real estate: its own hero (a quiet street-map backdrop and a live after-hours enquiry desk), then the story from a
 * late-night message to a confirmed viewing. Fair housing is treated as a design rule, not a footnote. Demo data is
 * labelled; no invented results, clients or certifications. Icons from Lucide (ISC).
 */

const firstHour = [
  { when: "9:41 PM", title: "A buyer asks about a listing", text: "A three-bedroom enquiry comes in on WhatsApp while the office is closed." },
  { when: "9:45 PM", title: "A viewing slot is held", text: "The assistant answers the buyer’s questions, captures their requirements and logs the conversation." },
  { when: "8:10 AM", title: "The agent confirms", text: "An agent picks up the lead with the context already in the CRM. Confirmation and reminders follow." },
] as const;

const capabilities: [LucideIcon, string, [string, string][]][] = [
  [MessageSquare, "Capture the enquiry", [
    ["Enquiry handling", "Reply on your website and messaging channels, day and night."],
    ["AI voice receptionist", "Answer calls, capture details and hand urgent enquiries to an agent."],
    ["Lead qualification", "Ask consistent questions about budget, timing and requirements."],
  ]],
  [CalendarCheck, "Get to the viewing", [
    ["Property recommendations", "Suggest listings based on stated preferences such as size and location."],
    ["Viewing scheduling", "Offer times that work for the property and the agent’s calendar."],
    ["Confirmations and reminders", "Send updates by WhatsApp, SMS or email."],
  ]],
  [Workflow, "Keep the deal moving", [
    ["Lead nurturing", "Follow up with buyers who need time and respect opt-outs."],
    ["Documents and onboarding", "Collect documents and track what is still outstanding."],
    ["Pipeline and agent dashboards", "See enquiries, viewings and deals by source and by agent."],
  ]],
];

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

const safeguards: [string, string][] = [
  ["Neutral criteria", "Use stated requirements such as budget, timing, size and location. Exclude protected characteristics."],
  ["No steering", "Base recommendations on the client’s stated preferences."],
  ["Reviewed rules", "Review qualification scripts before launch and whenever the rules change."],
  ["Human takeover", "Give clients a way to reach an agent and pass sensitive questions to a person."],
  ["Consent and opt-out", "Respect messaging consent and stop follow-ups when requested."],
];

const digital: [LucideIcon, string, string][] = [
  [Globe2, "Real estate website", "Every enquiry form feeds the same system."],
  [Building2, "Listing platform", "Search, filters and enquiry capture."],
  [LayoutTemplate, "Landing pages", "One page per development or campaign."],
  [UserRoundCheck, "Customer portal", "Documents, viewings and next steps in one place."],
  [MessageSquare, "Interactive enquiry", "Guided questions instead of a blank form."],
];

const tools: [LucideIcon, string, string][] = [
  [Users, "CRM", "Leads, contacts and deals"], [Building2, "Listing portals", "Enquiries from every portal"],
  [CalendarDays, "Calendars", "Google and Outlook"], [MessageCircle, "WhatsApp Business", "Buyer and tenant messages"],
  [Phone, "Phone and SMS", "Calls, texts and voicemail"], [Mail, "Email", "Enquiry inboxes"],
  [FileSignature, "E-signature", "Offers and agreements"], [FolderOpen, "Document storage", "IDs, proofs and contracts"],
  [LayoutDashboard, "Dashboards", "By source and by agent"], [Globe2, "Website forms", "Every page, one queue"],
];

const faq = [
  ["Is automated lead qualification fair?", "It has to be. We design qualification and recommendations around stated requirements such as budget, timing, size and location, never protected characteristics, and review the rules with you against fair housing and anti-discrimination requirements in your market."],
  ["Will clients know they are talking to an assistant?", "Yes. The assistant introduces itself as automated, and a person can take over at any point."],
  ["We already use a CRM and listing portals. Does this replace them?", "No. We connect to the CRM, portals and calendars you already use, so agents keep working where they work today."],
  ["Which channels do you support?", "Website, phone, WhatsApp, SMS and email. In India, WhatsApp is usually the main channel. In the US, it's more often SMS and phone. The workflows are the same."],
  ["Where should we start?", "With enquiry handling and viewing scheduling, because that is where response time decides who wins the client."],
] as const;

function Hero({ onDemo }: { onDemo: (label: string) => void }) {
  return <section className={page.hero} aria-labelledby="re-title">
    <img className={page.streak} src="/media/streaks/real-estate.svg" alt="" aria-hidden="true" fetchPriority="high" />
    <div className={`frame ${page.heroGrid}`}>
      <div className={page.heroCopy}>
        <p className={page.crumb}><a href="/#business">Industries</a><span aria-hidden="true">/</span>Real Estate</p>
        <h1 id="re-title">Less time chasing leads. <span>More time closing deals.</span></h1>
        <p className={page.lede}>Property enquiries, lead qualification, viewings and follow-ups, connected into one system that answers at 9:41 PM and hands your agent a ready lead by morning.</p>
        <div className={page.actions}>
          <button type="button" className={page.primary} onClick={() => onDemo("Get an automation assessment")}>Get an automation assessment <ArrowRight aria-hidden="true" /></button>
          <a className={page.secondary} href="#workflow">See the enquiry workflow</a>
        </div>
        <ul className={page.for}><li>Agencies and brokers</li><li>Developers</li><li>Property managers</li></ul>
      </div>
      <LeadChat />
    </div>
  </section>;
}

export default function Content() {
  return <IndustryPage hero={onDemo => <Hero onDemo={onDemo} />}>

    <section className={page.band} aria-label="What we cover">
      <div className={`frame ${page.bandGrid}`}>
        <div><strong>Answered while the office is closed</strong><span>Website, phone, WhatsApp, SMS and email, day and night.</span></div>
        <div><strong>Agents stay in charge</strong><span>The assistant holds the slot. A person confirms the viewing.</span></div>
        <div><strong>Fair by design</strong><span>Stated requirements only, never protected characteristics.</span></div>
      </div>
    </section>

    <section className={page.chapter} aria-labelledby="re-night">
      <div className="frame">
        <header className={page.heading}>
          <h2 id="re-night">From late-night enquiry to a booked viewing.</h2>
          <p>Buyers message when they are browsing, which is rarely office hours. The first reply decides who they keep talking to.</p>
        </header>
        <div className={page.story}>
          <figure className={page.property}>
            <img src="/media/real-estate/apartment-at-dusk.webp" width={1280} height={960} alt="Contemporary apartment building with lit windows at dusk" loading="lazy" decoding="async" />
            <figcaption><span>Sample enquiry</span><strong>3-bed apartment</strong><span>WhatsApp · 9:41 PM</span></figcaption>
          </figure>
          <ol className={page.night} aria-label="Sample enquiry timeline">
            {firstHour.map(({ when, title, text }, i) => <li key={when} data-day={i === 2 ? "true" : undefined}>
              <time>{when}</time><h3>{title}</h3><p>{text}</p>
            </li>)}
          </ol>
        </div>
      </div>
    </section>

    <section className={`${page.chapter} ${page.tinted}`} aria-labelledby="re-pipe">
      <div className="frame">
        <header className={page.heading}>
          <h2 id="re-pipe">One pipeline, from first reply to offer.</h2>
          <p>Watch one enquiry move along. Tap a column to stop it there. Each stage can share your CRM, calendar and messaging channels.</p>
        </header>
        <PipelineBoard />
        <ol className={page.mods}>
          {capabilities.map(([Icon, title, items]) => <li key={title}>
            <h3><Icon aria-hidden="true" />{title}</h3>
            <dl>{items.map(([n, d]) => <div key={n}><dt>{n}</dt><dd>{d}</dd></div>)}</dl>
          </li>)}
        </ol>
      </div>
    </section>

    <div className={page.workflow}><Flow flow={flow} /></div>

    <section className={page.chapter} aria-labelledby="re-spot">
      <div className="frame">
        <header className={page.heading}>
          <h2 id="re-spot">What your agents see.</h2>
          <p>Less inbox, more viewings. Every screen here is a sample.</p>
        </header>
        <div className={page.spots}>
          <article className={page.spot}>
            <div className={page.spotCopy}><small>Viewing scheduling</small><h3>Slots from the real calendar.</h3><p>The assistant only offers times when both the property and the agent are free, holds the slot, and sends the confirmation and a reminder.</p></div>
            <div className={page.mock}>
              <div className={page.mockHead}><b>Viewings · Lakeview Court</b><em>Demo</em></div>
              <div className={page.cal}>
                {["Thu", "Fri", "Sat"].map((d, c) => <div key={d}><b>{d}</b>
                  {["10:00", "11:00", "12:00", "15:00"].map((t, r) => {
                    const k = c === 2 && r === 1 ? "held" : (c + r) % 3 === 0 ? "busy" : "free";
                    return <span key={t} data-k={k}>{t}{k === "held" ? " · held" : ""}</span>;
                  })}
                </div>)}
              </div>
            </div>
          </article>
          <article className={page.spot} data-flip="true">
            <div className={page.spotCopy}><small>Recommendations</small><h3>Suggestions that show their reasons.</h3><p>Listings are matched to what the client asked for, and every suggestion says why. Nothing about who the client is goes into the match.</p></div>
            <div className={page.mock}>
              <div className={page.mockHead}><b>Suggested for this enquiry</b><em>Demo</em></div>
              {[["Lakeview Court", <ForRegion key="a" us="$640k" in="₹1.45 Cr" />, 0], ["Harbour Row", <ForRegion key="b" us="$615k" in="₹1.38 Cr" />, 1]].map(([n, p, v]) =>
                <div key={String(n)} className={page.match}><i className={page.house} data-v={v as number} /><span><b>{n}</b><small>3 bed · 2 bath · {p}</small></span>
                  <ul><li>In budget</li><li>Lakeview</li><li>3 bed</li></ul></div>)}
              <p className={page.mockNote}>Matched on stated budget, area and size only.</p>
            </div>
          </article>
          <article className={page.spot}>
            <div className={page.spotCopy}><small>Dashboards</small><h3>See where viewings come from.</h3><p>Enquiries, viewings and deals by source and by agent, so you know which portals and campaigns are worth paying for.</p></div>
            <div className={page.mock}>
              <div className={page.mockHead}><b>Enquiries to viewings · by source</b><em>Demo</em></div>
              {[["WhatsApp", 82, 44], ["Listing portals", 64, 26], ["Website", 48, 22], ["Phone", 30, 14]].map(([s, a, b]) =>
                <div key={s as string} className={page.bar}><span>{s}</span><div><i style={{ width: `${a}%` }} /><i style={{ width: `${b}%` }} /></div></div>)}
              <p className={page.legend}><i />Enquiries <i data-b="true" />Viewings</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section className={page.fair} aria-labelledby="re-fair">
      <div className={`frame ${page.split}`}>
        <div>
          <ShieldCheck className={page.fairIcon} aria-hidden="true" />
          <h2 id="re-fair">Fair by design.</h2>
          <p>Automated qualification and recommendations must comply with fair housing and anti-discrimination requirements. We review how each rule works with your team before launch.</p>
          <div className={page.criteria} aria-label="Qualification criteria">
            <div><small>Used to qualify</small><ul><li>Budget</li><li>Area</li><li>Size</li><li>Timing</li><li>Financing status</li></ul></div>
            <div data-never="true"><small>Never used</small><ul><li>Protected characteristics, such as race, religion, sex, disability or family status</li></ul></div>
          </div>
        </div>
        <dl className={page.rules}>{safeguards.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}</dl>
      </div>
    </section>

    <section className={page.chapter} aria-labelledby="re-digital">
      <div className="frame">
        <header className={page.heading}>
          <h2 id="re-digital">Every property page can start a conversation.</h2>
          <p>New websites, listing pages and portals, connected to the systems your team already uses.</p>
        </header>
        <ul className={page.digital}>{digital.map(([Icon, n, d]) => <li key={n}><Icon aria-hidden="true" /><b>{n}</b><small>{d}</small></li>)}</ul>
        <h3 className={page.subhead}>Connects to your tools</h3>
        <ul className={page.tools}>{tools.map(([Icon, n, d]) => <li key={n}><Icon aria-hidden="true" /><b>{n}</b><small>{d}</small></li>)}</ul>
      </div>
    </section>

    <section className={`${page.chapter} ${page.tinted}`} aria-labelledby="re-how">
      <div className="frame">
        <header className={page.heading}>
          <h2 id="re-how">From assessment to rollout.</h2>
          <p>Agree on what to measure before you launch, from first-reply time to missed viewings and time spent on admin.</p>
        </header>
        <Process />
      </div>
    </section>

    <section className={page.chapter} aria-labelledby="re-faq">
      <div className={`frame ${page.split}`}>
        <h2 id="re-faq">Questions real estate teams ask.</h2>
        <Faq items={faq} />
      </div>
    </section>
  </IndustryPage>;
}
