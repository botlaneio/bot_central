import type { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "Support | botLane",
  description: "How botLane supports the systems it manages: monitoring, maintenance, help for your team and monthly improvements.",
};

export default function Page() { return <Content />; }
