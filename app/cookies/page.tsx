import type { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "Cookie policy | botLane",
  description: "Which cookies and similar technologies the botLane website uses.",
};

export default function Page() { return <Content />; }
