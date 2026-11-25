"use client";

import { useState } from "react";
import BotOrb, { type Mood } from "./bot-orb";

/* The botLane logo for the nav and footer: the living orb beside the wordmark. Hover or focus makes it wink. */
export default function Logo({ size = 34, intro = "load", className = "", href = "#top", text = "botLane" }: { size?: number; intro?: "load" | "view"; className?: string; href?: string; text?: string }) {
  const [mood, setMood] = useState<Mood>("idle");
  return <a className={`logo-lockup ${className}`} href={href} aria-label="botLane homepage"
    onMouseEnter={() => setMood("wink")} onMouseLeave={() => setMood("idle")} onFocus={() => setMood("wink")} onBlur={() => setMood("idle")}>
    <BotOrb size={size} mood={mood} intro={intro} tone="navy" />
    <span>{text}</span>
  </a>;
}
