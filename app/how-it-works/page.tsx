import type { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "How it works | botLane",
  description: "From discovery to monthly improvement: how botLane designs, builds, tests and manages business automation, with you approving every step that matters.",
};

export default function Page() { return <Content />; }
