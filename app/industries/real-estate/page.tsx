import type { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "Automation for real estate | botLane",
  description: "Less time chasing leads. More time closing deals. Property inquiry handling, fair lead qualification, viewing scheduling, reminders, WhatsApp, SMS and email follow-ups and CRM integration.",
};

export default function Page() { return <Content />; }
