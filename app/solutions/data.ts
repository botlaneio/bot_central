import { solutionSlugs } from "../routes";

/* Extra copy for the /solutions pages: what each included module does, and the problems it answers. */
export const details: Record<string, { problems: [string, string][]; modules: [string, string][]; related: string[] }> = {
  payments: {
    problems: [["Enquiries arrive incomplete", "Missing drawings, budgets or dates mean another round of emails before anyone can reply."], ["Leads sit in an inbox", "Form fills land in a shared mailbox and wait for someone to notice them."], ["No idea what's working", "You can't tell which page, ad or channel brought in the customers who actually bought."]],
    modules: [["Websites and landing pages", "Fast, clear pages built around the one thing a visitor came to do."], ["Lead capture", "Forms that ask the right questions for your business, so enquiries arrive complete."], ["Inquiry management", "Every enquiry logged, assigned and tracked until someone replies."], ["CRM integration", "New leads created in your CRM with the source and details attached."], ["Conversion tracking", "See which pages and channels bring enquiries that turn into work."]],
    related: ["billing", "connect"],
  },
  billing: {
    problems: [["Calls go unanswered", "The phone rings after hours, at lunch, or while everyone is busy with a customer."], ["The same questions, every day", "Opening hours, prices, locations and status updates take hours each week."], ["Enquiries reach the wrong person", "Messages bounce between colleagues before they reach whoever can help."]],
    modules: [["AI receptionists", "Calls and messages answered at any hour for routine, administrative requests."], ["Conversational assistants", "Website and WhatsApp assistants that answer from your own approved information."], ["Missed-call recovery", "A text or call-back goes out when a call is missed, so the customer isn't lost."], ["Inquiry classification and routing", "Each request is sorted by type and urgency and sent to the right person, with a summary."], ["Human escalation", "Anything sensitive, unusual or urgent goes straight to a person."]],
    related: ["payments", "crypto"],
  },
  radar: {
    problems: [["The same details typed twice", "Information from emails and PDFs is retyped into the CRM, ERP and spreadsheets."], ["Work waits between people", "Tasks stall because nobody knows it's their turn."], ["Systems that don't talk", "Your inbox, calendar, CRM and accounts each hold part of the picture."]],
    modules: [["Workflow orchestration", "Multi-step processes that move work from one step and person to the next."], ["Scheduling", "Appointments, viewings and site visits booked into the right calendar."], ["Document processing", "Details read from emails, PDFs and forms, checked and filed."], ["Task management", "Tasks created, assigned and chased automatically, with deadlines."], ["Customer onboarding", "Documents collected and welcome steps completed without the back and forth."], ["System integrations", "Your existing tools connected, so data is entered once."]],
    related: ["issuing", "connect"],
  },
  issuing: {
    problems: [["Quotes take days", "Each quote is built by hand from price lists, lead times and old emails."], ["Invoices go out late", "Billing waits for someone to find time at the end of the month."], ["Chasing payments is awkward", "Follow-ups are forgotten, or sent inconsistently."]],
    modules: [["Quotation workflows", "Quotes drafted from your own price lists and rules, then sent for approval."], ["Invoice preparation", "Invoices prepared from completed work, ready to check and send."], ["Payment reminders", "Polite, consistent reminders on a schedule you set."], ["Payment system integrations", "Connected to the payment and accounting tools you already use."], ["Reconciliation assistance", "Payments matched to invoices, with exceptions flagged to your team."]],
    related: ["radar", "connect"],
  },
  crypto: {
    problems: [["Customers left wondering", "No update on an order, a viewing or an appointment until they call to ask."], ["No-shows and cancellations", "Empty slots that a reminder could have prevented or refilled."], ["Feedback never collected", "Happy customers aren't asked, unhappy ones aren't heard."]],
    modules: [["Automated follow-ups", "The next step sent at the right time, on the customer's preferred channel."], ["Appointment reminders", "Confirmations and reminders with easy rescheduling."], ["Customer notifications", "Status updates for orders, bookings and documents."], ["Feedback collection", "Short surveys after the work is done, with replies routed to a person."], ["Review requests", "Invitations to review sent only where appropriate, and never in exchange for anything."]],
    related: ["billing", "payments"],
  },
  connect: {
    problems: [["Reports built by hand", "Someone spends a day each month pulling numbers from different systems."], ["Problems found too late", "A stuck order or a dip in enquiries only shows up weeks later."], ["Data without meaning", "Dashboards full of charts, but no clear answer to how the business is doing."]],
    modules: [["Operational dashboards", "One view of what came in, what's in progress and what's stuck."], ["Performance reporting", "Weekly and monthly reports produced automatically from your own systems."], ["Plain-language business summaries", "A short written summary of what changed and what needs attention."], ["Workflow monitoring", "Every automation watched, with alerts when something fails or waits too long."], ["Acquisition analytics", "Which channels bring enquiries, and which of those turn into revenue."]],
    related: ["radar", "issuing"],
  },
};

export const slugToId = Object.fromEntries(Object.entries(solutionSlugs).map(([id, slug]) => [slug, id])) as Record<string, keyof typeof solutionSlugs>;
