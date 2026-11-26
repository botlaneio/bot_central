import type { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "Terms of use | botLane",
  description: "The terms that apply to using the botLane website.",
};

export default function Page() { return <Content />; }
