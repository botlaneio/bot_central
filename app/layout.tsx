import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { regionScript } from "./region-script";

export const metadata: Metadata = {
  title: "botLane | Business automation & digital systems",
  description: "You run your business. We automate the work behind it. botLane designs, builds and manages intelligent digital systems for small and medium-sized businesses.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" data-region="us" suppressHydrationWarning>
    {/* Sets data-region from the hostname before first paint: botlane.in shows India content and INR. */}
    <body>
      <Script id="region" strategy="beforeInteractive">{regionScript}</Script>
      {children}
    </body>
  </html>;
}
