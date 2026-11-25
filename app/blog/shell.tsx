"use client";

import { SiteHeader, useDemo } from "../top";
import { Footer } from "../lower";

// Header, footer and the demo dialog around the Insights pages. `hero` renders inside the hero shell under the nav.
export default function Shell({ hero, children }: { hero: React.ReactNode; children: React.ReactNode }) {
  const [openDemo, dialog] = useDemo();
  return <>
    <main>
      <SiteHeader onDemo={openDemo}>{hero}</SiteHeader>
      {children}
    </main>
    <Footer />
    {dialog}
  </>;
}
