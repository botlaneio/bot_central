"use client";

import { useState } from "react";
import BotOrb, { type Mood } from "../bot-orb";

const moods: [Mood, string][] = [
  ["idle", "Floats, blinks, glances around"],
  ["happy", "Smiling eyes and a little bounce"],
  ["thinking", "Looks up and scans, glow swirls"],
  ["working", "Focused eyes, glow spins faster"],
  ["surprised", "Wide round eyes, orb pops"],
  ["wink", "The violet eye winks"],
  ["love", "Heart eyes"],
  ["sleepy", "Eyes closed, breathing, z's"],
];

export default function Brand() {
  const [live, setLive] = useState<Mood>("idle");
  return <main style={{ padding: "48px 5.4%", maxWidth: 1200, margin: "0 auto", color: "#061b31" }}>
    <h1 style={{ fontSize: 36, fontWeight: 400, letterSpacing: "-.03em", margin: 0 }}>The botLane orb</h1>
    <p style={{ color: "#425e73", margin: "8px 0 40px" }}>An animated React component (<code>app/bot-orb.tsx</code>, built with Motion). Pick a mood to try it, or see them all below.</p>

    <section style={{ display: "flex", alignItems: "center", gap: 48, flexWrap: "wrap", padding: 32, borderRadius: 16, boxShadow: "0 1px 2px #061b310f, 0 6px 18px -6px #061b311f" }}>
      <BotOrb size={200} mood={live} title={`botLane orb, ${live}`} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, maxWidth: 520 }}>
        {moods.map(([mood]) => <button key={mood} onClick={() => setLive(mood)}
          style={{ padding: "10px 16px", borderRadius: 4, border: 0, cursor: "pointer", fontSize: 15, fontWeight: 550, background: live === mood ? "#5333f5" : "#f1eeff", color: live === mood ? "white" : "#4130bd" }}>{mood}</button>)}
      </div>
    </section>

    <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20, marginTop: 32 }}>
      {moods.map(([mood, note]) => <figure key={mood} style={{ margin: 0, padding: 20, borderRadius: 14, boxShadow: "0 1px 2px #061b310f, 0 6px 18px -6px #061b311f", display: "grid", justifyItems: "center", gap: 10 }}>
        <BotOrb size={110} mood={mood} intro="view" />
        <figcaption style={{ textAlign: "center", fontSize: 14 }}><b style={{ fontWeight: 600 }}>{mood}</b><br /><span style={{ color: "#425e73" }}>{note}</span></figcaption>
      </figure>)}
    </section>
  </main>;
}
