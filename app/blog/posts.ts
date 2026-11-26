// Insights posts, imported from the botstryx repo (src/content/insights.json), word for word. Links to botstryx
// pages that don't exist here were pointed at the nearest section of this site (see the import note in README).
import posts from "./posts.json";

export type Block =
  | { type: "markdown"; text: string }
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  dek: string;
  topic: string;
  date: string; // YYYY-MM-DD
  body: Block[];
};

export const POSTS = posts as Post[];
export const postsByDate = (): Post[] => [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
export const findPost = (slug: string) => POSTS.find(p => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export function readingMinutes(post: Post) {
  const words = post.body.flatMap(b => (b.type === "list" ? b.items : [b.text])).join(" ").split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

export const anchor = (text: string) => text.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");

// Each topic gets one of the hero-wave tones.
const tones = ["orange", "coral", "pink", "violet", "sky"] as const;
export const topics = () => [...new Set(postsByDate().map(p => p.topic))];
export const toneFor = (topic: string) => tones[Math.max(0, topics().indexOf(topic)) % tones.length];
