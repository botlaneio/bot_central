import type { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "Responsible automation | botLane",
  description: "Human approval, escalation, privacy and audit logs: the safeguards built into every botLane system.",
};

export default function Page() { return <Content />; }
