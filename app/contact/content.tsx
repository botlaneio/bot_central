"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, Check, ClipboardList, FileSearch, ShieldCheck } from "lucide-react";
import { PageHero, SitePage } from "../site/kit";
import { submitEnquiry } from "./submit";
import styles from "./contact.module.css";

/*
 * Get an automation assessment / contact. One form with three topics (assessment, support, general), picked
 * from ?topic= or the toggle. Fully validated in the browser; the submit step is a stub (see submit.ts).
 */

type Topic = "assessment" | "support" | "general";
const topics: [Topic, string][] = [["assessment", "Automation assessment"], ["support", "Support for an existing system"], ["general", "General question"]];
const areas = ["Customer acquisition", "Calls and enquiries", "Operations and documents", "Quotes and invoices", "Customer follow-ups", "Reporting"];
const industries = ["Manufacturing", "Real estate", "Clinics", "Other"];

const next = [
  { icon: FileSearch, title: "We read your request", text: "A person reviews what you sent, not an auto-responder." },
  { icon: CalendarCheck, title: "A short call", text: "We ask how work arrives today, who handles it and where it waits." },
  { icon: ClipboardList, title: "A clear recommendation", text: "One narrowly scoped first workflow, with approval steps, and a quote." },
];

export default function Content() {
  const [topic, setTopic] = useState<Topic>("assessment");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "stub" | "failed">("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("topic");
    if (t === "support" || t === "general") setTopic(t);
  }, []);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    const data = new FormData(form);
    if (topic === "assessment" && data.getAll("areas").length === 0) { setError("Pick at least one area where work slows down."); return; }
    setError("");
    setState("sending");
    const enquiry = Object.fromEntries([...new Set(data.keys())].map(key => [key, key === "areas" ? data.getAll(key).map(String) : String(data.get(key))]));
    const result = await submitEnquiry({ ...enquiry, topic });
    if (result === "invalid") { setState("idle"); setError("Please check the highlighted fields and try again."); return; }
    setState(result === "sent" ? "sent" : result === "not_configured" ? "stub" : "failed");
  }

  const heading = topic === "support" ? "Get support." : topic === "general" ? "Ask us anything." : "Get an automation assessment.";

  return <SitePage cta={false} hero={<PageHero crumb={["Contact"]} actions={false}
    title={<>{heading} <em>{topic === "assessment" ? "Start with the one problem that costs you most." : "A person reads every message."}</em></>}
    lede={topic === "assessment"
      ? "Tell us where admin slows your business down. We map your current process and recommend one narrowly scoped first automation, with the approval steps you need. No obligation."
      : "Tell us what you need and how to reach you. We reply on working days in the United States and India."} />}>
    <section className={styles.section}>
      <div className={`frame ${styles.grid}`}>
        <div className={styles.card}>
          {state === "sent" || state === "stub" || state === "failed" ? <div className={styles.done} role="status">
            <span className={styles.doneIcon}><Check aria-hidden /></span>
            <h2>{state === "sent" ? "Thanks. We have your request." : state === "failed" ? "Something went wrong." : "Form preview: not sent."}</h2>
            <p>{state === "sent"
              ? "A member of the team will be in touch."
              : state === "failed" ? "Your message didn't reach us. Please try again in a few minutes."
              : "This form isn't connected on this version of the site, so nothing was sent."}</p>
            <button type="button" className="light-button" onClick={() => setState("idle")}>Back to the form</button>
          </div> : <form className={styles.form} onSubmit={onSubmit} noValidate>
            <input className={styles.trap} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
            <fieldset className={styles.topics}>
              <legend>What can we help with?</legend>
              {topics.map(([value, label]) => <label key={value} data-on={topic === value}>
                <input type="radio" name="topicChoice" value={value} checked={topic === value} onChange={() => setTopic(value)} />{label}
              </label>)}
            </fieldset>

            <div className={styles.row}>
              <label>Your name<input name="name" required autoComplete="name" /></label>
              <label>Work email<input name="email" type="email" required autoComplete="email" /></label>
            </div>
            <div className={styles.row}>
              <label>Company<input name="company" required={topic !== "general"} autoComplete="organization" /></label>
              <label>Phone or WhatsApp <small>optional</small><input name="phone" type="tel" autoComplete="tel" /></label>
            </div>

            {topic === "assessment" && <>
              <div className={styles.row}>
                <label>Industry<select name="industry" required defaultValue=""><option value="" disabled>Choose one</option>{industries.map(i => <option key={i}>{i}</option>)}</select></label>
                <label>Country<select name="country" required defaultValue=""><option value="" disabled>Choose one</option><option>United States</option><option>India</option><option>Other</option></select></label>
              </div>
              <label>Team size<select name="size" defaultValue=""><option value="">Prefer not to say</option><option>1–10</option><option>11–50</option><option>51–200</option><option>200+</option></select></label>
              <fieldset className={styles.areas}>
                <legend>Where does work slow down? <small>pick any</small></legend>
                {areas.map(a => <label key={a}><input type="checkbox" name="areas" value={a} />{a}</label>)}
              </fieldset>
              <label>Tools you use today <small>optional</small><input name="tools" placeholder="e.g. Gmail, Zoho CRM, Tally, WhatsApp Business" /></label>
            </>}

            <label>{topic === "assessment" ? "Describe the problem" : "Your message"}
              <textarea name="message" required rows={5} placeholder={topic === "assessment" ? "What happens today, who handles it, and what it costs you in time or missed work." : ""} />
            </label>
            {topic === "assessment" && <p className={styles.hint}>Please don&apos;t include patient health information or other sensitive personal data.</p>}

            <label className={styles.consent}><input type="checkbox" name="consent" required />
              <span>I agree that botLane may use these details to reply to my request, as described in the <a href="/privacy">privacy policy</a>.</span>
            </label>
            {error && <p className={styles.error} role="alert">{error}</p>}
            <button type="submit" className={styles.submit} disabled={state === "sending"}>{state === "sending" ? "Checking…" : topic === "assessment" ? "Request an assessment" : "Send message"} <span aria-hidden="true">›</span></button>
          </form>}
        </div>

        <aside className={styles.side}>
          <h2>What happens next</h2>
          <ol>{next.map(({ icon: Icon, title, text }) => <li key={title}><span><Icon aria-hidden /></span><div><strong>{title}</strong><p>{text}</p></div></li>)}</ol>
          <p className={styles.safe}><ShieldCheck aria-hidden /> We only use your details to reply. No mailing lists unless you ask.</p>
          <p className={styles.small}>Existing client? Choose <button type="button" onClick={() => setTopic("support")}>Support</button> above, or see <a href="/support">how support works</a>.</p>
        </aside>
      </div>
    </section>
  </SitePage>;
}
