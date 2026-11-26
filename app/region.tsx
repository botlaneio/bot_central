"use client";

/*
 * Host-based region: botlane.io (and www) is the US site, botlane.in (and www) the India site. One build serves
 * both. A tiny script in <head> (see layout.tsx) sets <html data-region="us|in"> from the hostname before the first
 * paint, and CSS shows only the matching variant, so nothing flickers and the static export still works.
 * Locally, add ?region=in to preview the India site (it is remembered for the tab).
 */

import type { Region } from "./region-script";
export type { Region };

/** Renders both variants; CSS shows the one for the current host. Use for text, legal entities, prices. */
export function ForRegion({ us, in: india, block = false }: { us: React.ReactNode; in: React.ReactNode; block?: boolean }) {
  const Tag = block ? "div" : "span";
  return <><Tag data-region-only="us">{us}</Tag><Tag data-region-only="in">{india}</Tag></>;
}

export function formatMoney(amount: number, region: Region) {
  return new Intl.NumberFormat(region === "in" ? "en-IN" : "en-US", {
    style: "currency", currency: region === "in" ? "INR" : "USD", maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * A price in both currencies; the visitor sees the one for their site. INR amounts are set separately, not converted
 * from USD. `suffix` for things like "/month".
 */
export function Price({ usd, inr, suffix = "" }: { usd: number; inr: number; suffix?: string }) {
  return <ForRegion us={<>{formatMoney(usd, "us")}{suffix}</>} in={<>{formatMoney(inr, "in")}{suffix}</>} />;
}
