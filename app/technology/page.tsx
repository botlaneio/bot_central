import type { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "Technology and integrations | botLane",
  description: "botLane connects the tools you already use, from email, phone and WhatsApp to CRM, ERP, calendars and accounting, with role-based access and audit logs.",
};

export default function Page() { return <Content />; }
