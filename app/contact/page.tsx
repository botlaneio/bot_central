import type { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "Get an automation assessment | botLane",
  description: "Tell us where admin slows your business down. We map your current process and recommend one narrowly scoped first automation, with the approval steps you need.",
};

export default function Page() { return <Content />; }
