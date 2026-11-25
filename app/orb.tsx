"use client";

import { ThinkingOrb } from "./vendor/thinking-orbs/ThinkingOrb";
import type { OrbState } from "./vendor/thinking-orbs/types";

/*
 * Thinking orbs (vendored, MIT) used as small "the system is working" signals. The site is light-themed, so the
 * theme is always pinned (never "auto", which would follow a visitor's dark OS setting). `on="dark"` is for navy
 * surfaces. `color` takes a wave colour; leave it out for navy ink.
 */
export const wave = { orange: "#ff8a1f", coral: "#ff6a5c", pink: "#f77ce0", violet: "#7a5cff", sky: "#6f9bff" } as const;

export default function Orb({ state, size = 20, color, on = "light", className, label }:
  { state: OrbState; size?: 20 | 64; color?: string; on?: "light" | "dark"; className?: string; label?: string }) {
  return <ThinkingOrb state={state} size={size} theme={on} color={color} className={className}
    style={{ display: "inline-block", verticalAlign: "middle", flex: "none" }} aria-label={label} aria-hidden={label ? undefined : true} />;
}
