import type { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "Automation for clinics | botLane",
  description: "Focus on your patients. Let intelligent systems handle the administrative work. AI receptionists, missed-call recovery, appointment reminders, digital intake and recall, built around patient privacy.",
};

export default function Page() { return <Content />; }
