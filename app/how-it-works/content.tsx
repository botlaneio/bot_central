"use client";

import { ClipboardCheck, Handshake, KeyRound, MessageSquare, ShieldCheck, Users } from "lucide-react";
import Method from "../method";
import { Faq, Section } from "../industries/blocks";
import { IconCards, PageHero, SitePage } from "../site/kit";

const yourPart = [
  { icon: Users, tone: "orange", title: "The people who do the work", text: "A working session with whoever handles the process today. They know where it really slows down." },
  { icon: KeyRound, tone: "coral", title: "Access to your tools", text: "Accounts or API access for the systems we connect, set up with the least access the job needs." },
  { icon: ClipboardCheck, tone: "violet", title: "Your approval", text: "You approve the blueprint before anything is built, and sign off before anything goes live." },
] as const;

const principles = [
  { icon: Handshake, tone: "sky", title: "One workflow first", text: "We start with one narrowly scoped problem, so you see value early and decide what comes next." },
  { icon: ShieldCheck, tone: "violet", title: "People stay in control", text: "Quotes, discounts, payments and anything sensitive wait for a person to approve them." },
  { icon: MessageSquare, tone: "pink", title: "Plain language", text: "Blueprints, reports and summaries written for business owners, not engineers." },
] as const;

const faq = [
  ["How long does the first workflow take?", "It depends on scope and on the tools involved. We give you a timeline with the blueprint, before anything is built."],
  ["Do we need to change our software?", "Usually not. We connect the tools you already use. If something can't be connected safely, we tell you before you commit."],
  ["What if the automation gets something wrong?", "Every workflow has exception handling and escalation to a person, and every step is logged so it can be checked and corrected."],
  ["Can we stop at any point?", "Yes. You approve each stage, and the monthly service follows the terms in your agreement."],
] as const;

export default function Content() {
  return <SitePage hero={<PageHero crumb={["How it works"]} title={<>How implementation works. <em>The same six steps for every engagement.</em></>}
    lede="We learn how your business runs, design the workflow with you, build and test it on realistic scenarios, launch it with your team and then keep improving it every month." />}>
    <Method />
    <Section title="Your part." sub="What we need from you, and when.">
      <IconCards items={yourPart} />
    </Section>
    <Section tone="soft" title="How we work.">
      <IconCards items={principles} />
    </Section>
    <Section title="Common questions.">
      <Faq items={faq} />
    </Section>
  </SitePage>;
}
