import type { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "Insights | botLane",
  description: "Practical writing on business automation for manufacturers, real estate teams and clinics: what to automate, what to keep human, and how to start small.",
};

export default function Page() { return <Content />; }
