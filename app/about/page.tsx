import type { Metadata } from "next";
import Content from "./content";

export const metadata: Metadata = {
  title: "About | botLane",
  description: "botLane designs, builds and manages business automation and digital systems for manufacturers, real estate firms and clinics in the United States and India.",
};

export default function Page() { return <Content />; }
