"use client";

import { Checklist, Chips, Faq, Flow, Hero, IndustryPage, Journey, ModuleCards, NumberedGrid, Process, Section, Split } from "../blocks";
import type { FlowConfig } from "../../workflow";
import styles from "../industry.module.css";

const journey = [
  { when: "Before the visit", title: "Booked without the phone tag", text: "Calls answered, missed calls returned, appointments booked in your practice system, and intake forms sent to complete at home." },
  { when: "On the day", title: "Fewer gaps in the schedule", text: "Confirmations and reminders by SMS, WhatsApp or email, with easy rescheduling that offers the slot to the next patient." },
  { when: "After the visit", title: "Patients who come back", text: "Feedback requests, review invitations and recall reminders when a routine checkup is due." },
] as const;

const challenges = [
  ["Missed calls", "Phones ring while the front desk is with a patient."],
  ["Repetitive questions", "Hours, location, parking, insurance and preparation, every day."],
  ["Manual scheduling", "Booking, moving and confirming appointments by phone."],
  ["No-shows and cancellations", "Empty chairs that could have been filled."],
  ["Inconsistent follow-ups", "Recalls and feedback that depend on someone remembering."],
  ["Fragmented systems", "Phone, practice software, forms and messaging that don't connect."],
] as const;

const modules = [
  ["AI receptionist", "Answers calls and messages for administrative requests, and hands anything clinical to your team."],
  ["Missed-call recovery", "Returns missed calls by text or phone so the patient isn't lost."],
  ["Appointment scheduling", "Booking, confirmations, cancellations and rescheduling in your practice system."],
  ["Patient reminders", "Appointment and recall reminders on the patient's preferred channel."],
  ["Digital intake", "Registration and intake forms completed before the visit, reviewed by your staff."],
  ["Feedback and reviews", "Feedback collected after visits, review requests sent only where appropriate."],
] as const;

const x = (i: number) => 60 + i * 320;
const flow: FlowConfig = {
  heading: "A missed lunchtime call, booked by the afternoon.",
  sub: "The assistant handles administration only. Anything clinical goes straight to your team.",
  barTitle: "Missed call to attended visit",
  barSub: "Clinics · administrative requests only",
  label: "Demo workflow: a call is missed at lunchtime, it is returned automatically, clinical questions are routed to clinic staff, an appointment is booked in the practice system, an intake form is sent, staff review the intake, a reminder is confirmed and a feedback request follows the visit.",
  path: [
    { x: x(0), y: 190, kind: "trigger", tag: "Trigger", title: "Missed call", detail: "Front desk busy at lunchtime", time: "12:52 PM" },
    { x: x(1), y: 190, kind: "ai", tag: "AI agent", title: "Call returned", detail: "Wants a checkup appointment", time: "12:53 PM" },
    { x: x(2), y: 190, kind: "condition", tag: "Condition", title: "Clinical question?", detail: "Mentions tooth sensitivity", time: "12:54 PM" },
    { x: x(3), y: 70, kind: "action", tag: "Escalate", title: "Routed to clinic staff", detail: "No advice given by the assistant", time: "12:54 PM" },
    { x: x(4), y: 190, kind: "action", tag: "Schedule", title: "Appointment booked", detail: "In your practice system", time: "12:56 PM" },
    { x: x(5), y: 190, kind: "action", tag: "Intake", title: "Intake form sent", detail: "Secure link by SMS", time: "12:56 PM" },
    { x: x(6), y: 190, kind: "action", tag: "Approval", title: "Staff review intake", detail: "Before the visit", time: "4:10 PM" },
    { x: x(7), y: 190, kind: "action", tag: "Notify", title: "Reminder confirmed", detail: "Patient replied YES", time: "Day before" },
    { x: x(8), y: 190, kind: "goal", tag: "Goal", title: "Visit attended", detail: "Feedback request sent", time: "Visit day" },
  ],
  noBranch: { x: x(3), y: 320, kind: "action", tag: "Answer", title: "Admin question answered", detail: "Hours, location, parking", dim: true },
};

const faq = [
  ["Can the AI give medical or dental advice?", "No. Our systems never diagnose, recommend treatment or replace qualified healthcare professionals. They handle administration, and route anything clinical to your team."],
  ["How is patient data protected?", "We design for HIPAA where it applies in the United States and data protection law in India, including the Digital Personal Data Protection Act. That means minimum necessary data, role-based access, encryption, audit logs, and vendors that sign the agreements your obligations require."],
  ["Which kinds of clinics is this for?", "Independent and multi-location clinics, including dental, orthodontic, cosmetic and specialty practices, and other outpatient clinics with similar front-desk work."],
  ["Does it work with our practice management system?", "We integrate with the system you use where it allows it. Where it doesn't, we design a workflow your team can review, rather than forcing a switch."],
  ["Where should we start?", "Usually with missed-call recovery and appointment reminders, because they are narrowly scoped and easy to measure."],
] as const;

export default function Content() {
  return <IndustryPage hero={onDemo => <Hero onDemo={onDemo} eyebrow="Clinics"
    title={<>Focus on your patients. <em>Let intelligent systems handle the administrative work.</em></>}
    lede="Streamline patient inquiries, appointment scheduling and everyday administrative workflows with connected automation designed for clinics, with privacy built in from the start."
    panel={<div className={styles.mockCard}>
      <small>Tomorrow · Front desk</small>
      <strong>Appointments and reminders</strong>
      <div className={styles.schedule}>
        <div><time>9:00</time><span>Checkup</span><span className={styles.pill}>Confirmed</span></div>
        <div><time>9:30</time><span>Cleaning</span><span className={styles.pill}>Confirmed</span></div>
        <div><time>10:15</time><span>Consultation</span><span className={styles.pill} data-tone="grey">Reminder sent</span></div>
        <div><time>11:00</time><span>Follow-up</span><span className={styles.pill} data-tone="ink">Rescheduled, slot offered</span></div>
      </div>
      <div className={styles.mockRow} style={{ marginTop: 12 }}><span>Missed calls returned today</span><span>4 of 4</span></div>
    </div>} />}>

    <Section title="What the system does, and what it never does." sub="Clear limits come first in healthcare.">
      <Split
        left={{ title: "Handles", items: ["Answering and returning calls", "Booking, confirming and rescheduling appointments", "General questions about hours, location and preparation", "Intake forms, reminders and recall", "Feedback and review requests"] }}
        right={{ title: "Never does", items: ["Diagnose a patient", "Recommend or change a treatment", "Answer clinical questions: they go to your team", "Replace a qualified healthcare professional", "Share patient data beyond what a task needs"] }} />
    </Section>

    <Section tone="soft" title="The front desk, stretched thin." sub="Common challenges for independent and multi-location clinics.">
      <NumberedGrid columns={3} items={challenges} />
    </Section>

    <Section title="The patient journey, connected." sub="One system from the first call to the next recall.">
      <Journey steps={journey} />
    </Section>

    <Flow flow={flow} />

    <Section title="Modules." sub="Start with one, such as missed-call recovery, and connect the rest when it proves its value.">
      <ModuleCards items={modules} label="Clinics" />
    </Section>

    <Section tone="navy" title="Patient privacy, built in." sub="HIPAA where applicable in the United States, and data protection requirements in India.">
      <Checklist items={[
        ["Minimum necessary data", "Each workflow only sees the information its task needs."],
        ["Role-based access", "Staff, systems and vendors get the narrowest access that works."],
        ["Secure handling", "Encrypted storage and transfer, and secure credential management."],
        ["Audit logs", "Every automated action and every access is recorded."],
        ["Human escalation", "Clinical, urgent or sensitive requests always go to a person."],
        ["Your data stays yours", "Patient information remains the clinic's business information, under the clinic's control."],
      ]} />
    </Section>

    <Section title="Websites and booking, part of the same system.">
      <ModuleCards label="Digital" items={[
        ["Clinic website", "A premium, accessible website that patients trust."],
        ["Treatment pages", "Clear, compliant pages for the services you offer."],
        ["Online booking", "Booking that writes straight into your schedule."],
        ["Patient portal", "Forms, appointments and messages in one place."],
        ["Digital registration", "New-patient registration completed before arrival."],
      ]} />
    </Section>

    <Section tone="soft" title="Connects to your clinic's tools.">
      <Chips items={["Practice management system", "Telephone system", "SMS", "WhatsApp Business", "Email", "Online booking", "Forms", "Review platforms", "Dashboards"]} />
    </Section>

    <Section title="How implementation works." sub="Including a privacy review before any workflow touches patient data.">
      <Process />
    </Section>

    <Section tone="soft" title="Questions clinics ask.">
      <Faq items={faq} />
    </Section>
  </IndustryPage>;
}
