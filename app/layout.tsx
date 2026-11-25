import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "botLane | Business automation & digital systems",
  description: "You run your business. We automate the work behind it. botLane designs, builds and manages intelligent digital systems for small and medium-sized businesses.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en-US"><body>{children}</body></html>;
}
