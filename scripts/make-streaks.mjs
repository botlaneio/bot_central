// Generates the solution-page hero artwork (public/media/streaks/*.svg). Six different concepts, one per
// capability, all crisp vector shapes (no blur) in the wave colours. Original artwork, static.
// Run: node scripts/make-streaks.mjs
import fs from "node:fs";

const W = 1400, H = 1000;
const C = { orange: "#ff7a00", amber: "#ffa40a", gold: "#ffc21a", coral: "#ff5a4e", pink: "#f53fd0", rose: "#ff4fa8",
  violet: "#6b46ff", purple: "#4b2bf2", lilac: "#9b7bff", sky: "#3f7dff", cyan: "#22b8ff", navy: "#061b31" };
const f = n => +n.toFixed(1);

function doc(name, defs, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <!-- botLane solution artwork: ${name}. Original, crisp vector shapes in the wave colours. Static. -->
  <defs>${defs}</defs>${body}
</svg>\n`;
}
const lin = (id, stops, [x1, y1, x2, y2] = [0, 0, 1, 1]) =>
  `<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join("")}</linearGradient>`;

// 1. Customer Acquisition: sharp beams fanning in from the edge and converging on one point (leads -> one place).
function beams() {
  const fx = 560, fy = 930; // focal point, below and left of the card so it shows
  const cols = [[C.gold, C.orange], [C.orange, C.coral], [C.coral, C.rose], [C.rose, C.pink], [C.pink, C.violet], [C.lilac, C.purple]];
  let defs = "", body = "";
  cols.forEach((pair, i) => {
    defs += lin(`b${i}`, [[0, pair[0]], [1, pair[1]]], [1, 0, 0, 1]);
    const a = -1.32 + i * 0.16; // angle of the beam from the focal point toward the top-right edge
    const len = 1500, spread = 0.055;
    const p1 = [fx + Math.cos(a - spread) * len, fy + Math.sin(a - spread) * len];
    const p2 = [fx + Math.cos(a + spread) * len, fy + Math.sin(a + spread) * len];
    body += `<polygon points="${f(fx)},${f(fy)} ${f(p1[0])},${f(p1[1])} ${f(p2[0])},${f(p2[1])}" fill="url(#b${i})"/>`;
  });
  body += `<circle cx="${fx}" cy="${fy}" r="26" fill="#fff"/><circle cx="${fx}" cy="${fy}" r="14" fill="${C.purple}"/>`;
  return doc("beams converging", defs, body);
}

// 2. AI Front Office: crisp ripple arcs radiating from a point (calls and messages answered).
function ripples() {
  const cx = 1180, cy = 520;
  const tones = [C.coral, C.rose, C.pink, C.lilac, C.sky, C.cyan, C.sky];
  let body = "";
  tones.forEach((c, i) => {
    const r = 120 + i * 92, w = 46 - i * 3;
    const a0 = Math.PI * (0.62 + (i % 2) * 0.06), a1 = Math.PI * (1.42 - (i % 3) * 0.05);
    const p = a => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    body += `<path d="M${f(x0)} ${f(y0)} A${r} ${r} 0 0 1 ${f(x1)} ${f(y1)}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
  });
  body += `<circle cx="${cx}" cy="${cy}" r="58" fill="${C.coral}"/><circle cx="${cx}" cy="${cy}" r="24" fill="#fff"/>`;
  return doc("ripples", "", body);
}

// 3. Business Operations: an isometric staircase of blocks, work stepping from one stage to the next.
function blocks() {
  const s = 110, dx = s * 0.866, dy = s * 0.5;
  const cube = (x, y, h, top, left, right) => {
    const t = `${f(x)},${f(y)} ${f(x + dx)},${f(y + dy)} ${f(x)},${f(y + 2 * dy)} ${f(x - dx)},${f(y + dy)}`;
    const l = `${f(x - dx)},${f(y + dy)} ${f(x)},${f(y + 2 * dy)} ${f(x)},${f(y + 2 * dy + h)} ${f(x - dx)},${f(y + dy + h)}`;
    const r = `${f(x)},${f(y + 2 * dy)} ${f(x + dx)},${f(y + dy)} ${f(x + dx)},${f(y + dy + h)} ${f(x)},${f(y + 2 * dy + h)}`;
    return `<polygon points="${l}" fill="${left}"/><polygon points="${r}" fill="${right}"/><polygon points="${t}" fill="${top}"/>`;
  };
  const steps = [
    [C.gold, C.amber, C.orange], [C.rose, C.pink, "#c92aa8"], [C.lilac, C.violet, C.purple], [C.cyan, C.sky, "#2a5fd6"], [C.rose, C.coral, "#d9402f"],
    [C.gold, C.amber, C.orange], [C.lilac, C.violet, C.purple],
  ];
  let body = "";
  steps.forEach((t, i) => {
    const x = 470 + i * dx * 1.3, y = 820 - i * dy * 1.3 - i * 62, h = 120;
    body += cube(x, y, h, ...t);
  });
  return doc("isometric steps", "", body);
}

// 4. Financial Administration: tall rounded columns of different heights, like a ledger or a bar chart.
function columns() {
  const heights = [380, 560, 470, 720, 620, 880, 780];
  const cols = [[C.lilac, C.violet], [C.violet, C.purple], [C.sky, C.violet], [C.violet, C.purple], [C.cyan, C.sky], [C.lilac, C.purple], [C.coral, C.orange]];
  let defs = "", body = "";
  heights.forEach((h, i) => {
    defs += lin(`c${i}`, [[0, cols[i][0]], [1, cols[i][1]]], [0, 0, 0, 1]);
    const w = 78, x = 560 + i * 112, y = H - h + 40;
    body += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${w / 2}" fill="url(#c${i})"/>`;
  });
  return doc("ledger columns", defs, body);
}

// 5. Customer Experience: overlapping message bubbles (customers kept informed).
function bubbles() {
  const list = [
    { x: 760, y: 170, w: 420, h: 220, c: C.sky, tail: "left" },
    { x: 980, y: 330, w: 360, h: 190, c: C.pink, tail: "right" },
    { x: 700, y: 520, w: 380, h: 200, c: C.gold, tail: "left" },
    { x: 960, y: 650, w: 330, h: 180, c: C.violet, tail: "right" },
  ];
  let body = "";
  for (const b of list) {
    const r = b.h / 2;
    const tail = b.tail === "left"
      ? `<polygon points="${b.x + 40},${b.y + b.h - 30} ${b.x - 10},${b.y + b.h + 40} ${b.x + 110},${b.y + b.h - 10}" fill="${b.c}"/>`
      : `<polygon points="${b.x + b.w - 40},${b.y + b.h - 30} ${b.x + b.w + 10},${b.y + b.h + 40} ${b.x + b.w - 110},${b.y + b.h - 10}" fill="${b.c}"/>`;
    const lines = [0.35, 0.55, 0.75].map((k, j) => `<rect x="${b.x + 46}" y="${f(b.y + b.h * k - 8)}" width="${f((b.w - 92) * (j === 2 ? 0.55 : 1 - j * 0.15))}" height="16" rx="8" fill="#ffffff" fill-opacity=".85"/>`).join("");
    body += `<g>${tail}<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="${r}" fill="${b.c}"/>${lines}</g>`;
  }
  return doc("message bubbles", "", body);
}

// 6. Business Intelligence: layered sharp peaks, like an area chart, with a bright trend line on top.
function peaks() {
  const layers = [
    { pts: [[480, 1000], [620, 720], [760, 820], [900, 520], [1040, 640], [1180, 360], [1320, 470], [1420, 300], [1420, 1000]], c: [C.lilac, C.violet] },
    { pts: [[420, 1000], [600, 820], [760, 900], [920, 680], [1080, 760], [1240, 560], [1420, 640], [1420, 1000]], c: [C.gold, C.orange] },
    { pts: [[380, 1000], [560, 920], [740, 960], [900, 840], [1080, 900], [1260, 780], [1420, 820], [1420, 1000]], c: [C.pink, C.rose] },
  ];
  let defs = "", body = "";
  layers.forEach((l, i) => {
    defs += lin(`p${i}`, [[0, l.c[0]], [1, l.c[1]]], [0, 0, 0, 1]);
    body += `<polygon points="${l.pts.map(([x, y]) => `${x},${y}`).join(" ")}" fill="url(#p${i})"/>`;
  });
  const trend = [[520, 760], [700, 640], [860, 690], [1020, 470], [1180, 520], [1340, 250]];
  body += `<polyline points="${trend.map(p => p.join(",")).join(" ")}" fill="none" stroke="${C.cyan}" stroke-width="14" stroke-linejoin="round" stroke-linecap="round"/>`;
  body += trend.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="16" fill="#fff" stroke="${C.cyan}" stroke-width="8"/>`).join("");
  return doc("chart peaks", defs, body);
}

// 7. Manufacturing: thick chevron ribbons flowing up and to the right, like work moving down a line.
function chevrons() {
  const cols = [[C.gold, C.orange], [C.orange, C.coral], [C.coral, C.pink], [C.pink, C.violet], [C.lilac, C.violet], [C.violet, C.purple], [C.sky, C.violet], [C.cyan, C.sky]];
  let defs = "", body = "";
  cols.forEach((pair, i) => {
    defs += lin(`v${i}`, [[0, pair[0]], [1, pair[1]]], [0, 1, 1, 0]);
    const x = 560 + i * 120, y = 1060 - i * 128, a = 300, t = 86; // tip position, arm length, thickness
    const pts = [[x - a, y - a * 0.2], [x, y - a], [x + a * 1.2, y - a * 0.1], [x + a * 1.2, y - a * 0.1 + t], [x, y - a + t], [x - a, y - a * 0.2 + t]];
    body += `<polygon points="${pts.map(([px, py]) => `${f(px)},${f(py)}`).join(" ")}" fill="url(#v${i})"/>`;
  });
  return doc("chevron flow", defs, body);
}

// 8. Real Estate: overlapping gabled rooftops of different heights, a skyline of homes.
function rooftops() {
  const homes = [
    { x: 600, w: 300, h: 640, c: [C.gold, C.orange] }, { x: 820, w: 340, h: 900, c: [C.lilac, C.violet] },
    { x: 1080, w: 280, h: 760, c: [C.pink, C.rose] }, { x: 1240, w: 300, h: 960, c: [C.sky, C.purple] },
    { x: 720, w: 240, h: 420, c: [C.coral, C.pink] }, { x: 1150, w: 220, h: 460, c: [C.amber, C.coral] },
  ];
  let defs = "", body = "";
  homes.forEach((b, i) => {
    defs += lin(`r${i}`, [[0, b.c[0]], [1, b.c[1]]], [0, 0, 0, 1]);
    const base = H + 20, top = base - b.h, roof = b.w * 0.5;
    body += `<polygon points="${b.x},${base} ${b.x},${top + roof} ${f(b.x + b.w / 2)},${top} ${b.x + b.w},${top + roof} ${b.x + b.w},${base}" fill="url(#r${i})"/>`;
    body += `<rect x="${f(b.x + b.w / 2 - 22)}" y="${f(top + roof + 30)}" width="44" height="44" rx="8" fill="#fff" fill-opacity=".85"/>`;
  });
  return doc("rooftops", defs, body);
}

const pages = {
  "customer-acquisition": beams(),
  "ai-front-office": ripples(),
  "business-operations": blocks(),
  "financial-administration": columns(),
  "customer-experience": bubbles(),
  "business-intelligence": peaks(),
  "manufacturing": chevrons(),
  "real-estate": rooftops(),
};
for (const [slug, svg] of Object.entries(pages)) fs.writeFileSync(`public/media/streaks/${slug}.svg`, svg);
console.log(Object.keys(pages).length, "artworks");
