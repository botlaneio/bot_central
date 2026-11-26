"use client";

import { Compass, Factory, Globe2, House, Layers, ShieldCheck, Stethoscope, Wrench } from "lucide-react";
import { Section } from "../industries/blocks";
import { IconCards, PageHero, SitePage } from "../site/kit";

const beliefs = [
  { icon: Compass, tone: "orange", title: "Start narrow", text: "One clearly defined problem, solved well, beats a large project that takes a year to show anything." },
  { icon: ShieldCheck, tone: "violet", title: "People stay in charge", text: "Automation handles the admin. Decisions about prices, customers and care stay with your team." },
  { icon: Wrench, tone: "coral", title: "Built to be run", text: "We don't hand over a system and disappear. We monitor, maintain and improve it every month." },
  { icon: Layers, tone: "sky", title: "Reusable, not reinvented", text: "One shared automation core, configured for each industry, so improvements reach every client." },
] as const;

const industries = [
  { icon: Factory, tone: "orange", title: "Manufacturing", text: "RFQs, quotations, purchase orders and dealer communication." },
  { icon: House, tone: "coral", title: "Real estate", text: "Enquiries, viewings, follow-ups and client onboarding." },
  { icon: Stethoscope, tone: "violet", title: "Clinics", text: "Calls, reminders, digital intake and recall, with patient privacy built in." },
] as const;

export default function Content() {
  return <SitePage cta={{ title: "Let's find your first workflow.", text: "Tell us where admin slows your business down, and we'll recommend where to start.", secondary: ["How it works", "/how-it-works"] }}
    hero={<PageHero crumb={["About"]} title={<>About botLane. <em>Business automation and digital systems.</em></>}
      lede="botLane designs, builds and manages the systems that bring enquiries, follow-ups and approvals together, so teams can respond promptly and keep work moving. We work with businesses in the United States and India." />}>
    <Section title="From websites to connected systems." sub="Why we changed what we do.">
      <div style={{ maxWidth: 720, display: "grid", gap: 16, color: "var(--muted)", fontSize: 17, lineHeight: 1.6 }}>
        <p style={{ margin: 0 }}>botLane started as a web development studio. Building websites, we kept seeing the same thing: the site would bring in enquiries, and then the real work started. Emails retyped into spreadsheets, quotes built by hand, calls missed after hours, follow-ups that depended on someone remembering.</p>
        <p style={{ margin: 0 }}>So we changed what we build. Today botLane designs the whole system behind the website: how enquiries are captured, answered, routed, quoted, approved, followed up and reported, connected to the tools a business already uses.</p>
      </div>
    </Section>
    <Section tone="soft" title="What we believe.">
      <IconCards items={beliefs} columns={4} />
    </Section>
    <Section title="Who we work with." sub="Three industries first, each with deep, reusable solutions.">
      <IconCards items={industries} />
      <p style={{ display: "flex", alignItems: "center", gap: 10, margin: "28px 0 0", color: "var(--muted)" }}><Globe2 size={18} aria-hidden color="var(--accent)" /> Serving businesses in the United States and India.</p>
    </Section>
  </SitePage>;
}
