import { writeFile } from "node:fs/promises";
const staticBase = "https://b.stripecdn.com/mkt-ssr-statics/assets/_next/static/media/";
const imageBase = "https://images.stripeassets.com/fzn2n1nzq965/";
const assets = {
  "sohne.woff2": staticBase + "Sohne.cb178166.woff2",
  "wave-desktop.webp": staticBase + "wave-fallback-desktop-1x.fba6fa88.webp",
  "wave-tablet.webp": staticBase + "wave-fallback-tablet-1x.c0413950.webp",
  "wave-mobile.webp": staticBase + "wave-fallback-mobile-1x.80eb433a.webp",
  "terminal.webp": imageBase + "1Vf8oT9Fm6dEwpnEx5PgK1/055956f38d7fd8b0cc7419692ef29778/bento-terminal.png?w=616&fm=webp&q=90",
  "payments.webp": imageBase + "vYmk6v8n7oDAwbDpwhjV6/846f9b3e214549b8f14e2b8c8cfe9343/payment-bento-background.jpg?w=860&fm=webp&q=80",
  "connect.jpg": imageBase + "3NcSrMqMgaKe75QNr8wZI8/46d520dfc48c5b9f1c59dcde9460b58c/connect-bento-card-background-image.jpg?w=1232&q=90",
  "sessions.png": imageBase + "6qXXr6LHgF0pDzCKGr90jG/ee23b420081aa216b844b2117cc5ff3d/sessions-2027-homepage-bg.png?w=1280&q=85",
  "stats.png": imageBase + "63zO5Z4CABvFl3pLLhnu3l/a9c12c883f820dc29d29fa0b9dcb0814/DatavizStatic3x.png?w=1280&q=90"
};
const entries = Object.entries({...assets, ...{
  "enterprise-accordion-hertz.png": "https://images.stripeassets.com/fzn2n1nzq965/24BNV3GGtvCprFLrYovyaa/b2eac20a1d5ec75e4bff3888b998d163/enterprise-accordion-hertz.png?w=590&q=90",
  "enterprise-accordion-urbn.png": "https://images.stripeassets.com/fzn2n1nzq965/37wKFanVluouT2iEZUbD0H/f75e77141e1330ad81ea18c6aea65f0c/enterprise-accordion-urbn.png?w=590&q=90",
  "enterprise-accordion-instacart.png": "https://images.stripeassets.com/fzn2n1nzq965/1v5hJ2NWvKpQfVbMqOzCpE/c900b9ed4c288f7cf0a0dced5f4983f2/enterprise-accordion-instacart.png?w=590&q=90",
  "enterprise-accordion-lemonde.png": "https://images.stripeassets.com/fzn2n1nzq965/5AQ9A87KzwpPy4CD3uPz5C/4afd1a1e9d6e1d698c4c7c74a4868822/enterprise-accordion-lemonde.png?w=590&q=90",
  "lovable.png": "https://images.stripeassets.com/fzn2n1nzq965/1CBkJePR5Cwf2QNIVCia1I/c0a702cec7a3814c69f21f86b89ed718/lovable.png?w=590&q=90",
  "Gamma.png": "https://images.stripeassets.com/fzn2n1nzq965/2QjRFO1cRvocACDtyA7g9e/44245671788d6e086ab7d82b37937450/Gamma.png?w=590&q=90",
  "Runway.png": "https://images.stripeassets.com/fzn2n1nzq965/6fpvaTP1TZWXKWVMewABjV/4412b9ca2940d89d3834ac65c1fc329d/Runway.png?w=590&q=90",
  "Supabase.png": "https://images.stripeassets.com/fzn2n1nzq965/7fM8bvEbivprOMM1zyow9N/3cad3cc826f96e4038b4ea88d81ebe3b/Supabase.png?w=590&q=90",
  "linear.png": "https://images.stripeassets.com/fzn2n1nzq965/4b8Ubw7N2kYwb7QZl3Ogri/422cc19f725aa68e647d90ce2833c8d0/linear.png?w=590&q=90",
  "Eleven_Labs.png": "https://images.stripeassets.com/fzn2n1nzq965/JK7aZoMzWA3uUbLb35kxx/dea1444a0aee29751c0c7098ffb33534/Eleven_Labs.png?w=590&q=90",
  "browserbase.png": "https://images.stripeassets.com/fzn2n1nzq965/1NiQJZA0rKbwXZ7mD4BCrM/0abdaba77e564f858a33241a9aab0939/browserbase.png?w=590&q=90",
  "decagon.png": "https://images.stripeassets.com/fzn2n1nzq965/1hreJwxuVJ5ucPtuA7pRKH/3c5630387bca898d01ae17fc7ae2890a/decagon.png?w=590&q=90",
  "annual-letter-mobile.png": "https://images.stripeassets.com/fzn2n1nzq965/yqIFyZRGU5zDwdUsWtUyM/25b9f23c748c4d54079a09016fde59d8/annual-letter-mobile.png?w=960&q=90",
  "the-happenings-bfcm-mobile.png": "https://images.stripeassets.com/fzn2n1nzq965/6yE6G454SGCJnJgEYsS2MB/70b405a1dce904bc0c6f2698223fb966/the-happenings-bfcm-mobile.png?w=960&q=90",
  "the-happenings-tidemark-mobile.png": "https://images.stripeassets.com/fzn2n1nzq965/33xcv8eCmXzMzWXicVQ4cF/83d91fa419ff8d1b9466739b4ecdcb1d/the-happenings-tidemark-mobile.png?w=960&q=90",
  "the-happenings-cheeky-pint-mobile.png": "https://images.stripeassets.com/fzn2n1nzq965/t03tXrgvnHUPGwxYUgSxN/bd8da003434c9e9fb72c719b9edb429b/the-happenings-cheeky-pint-mobile.png?w=960&q=90",
  "the-happenings-payment-processing-mobile.png": "https://images.stripeassets.com/fzn2n1nzq965/Pd2JQ7FZ1pYMIMGDwvMdV/13e7e021ca23d042da8ac07be829f7ef/the-happenings-payment-processing-mobile.png?w=960&q=90",
  "the-happenings-crypto-mobile.png": "https://images.stripeassets.com/fzn2n1nzq965/4LaZVLqDqGf9091wqUAmFp/fbe9fc307e1336b69bcd9be4ec5c4752/the-happenings-crypto-mobile.png?w=960&q=90",
  "the-happenings-agentic-mobile.png": "https://images.stripeassets.com/fzn2n1nzq965/1k7ckFceNFlxqF47hWJUlM/eaa4d8b3f8e4b76ba3dd7df7da88e099/the-happenings-agentic-mobile.png?w=960&q=90",
  "the-happenings-payment-retailers-mobile.png": "https://images.stripeassets.com/fzn2n1nzq965/7EVLwfXmG3pl1vhBssMrFB/b6d8612b1f567922c1355d864c279678/the-happenings-payment-retailers-mobile.png?w=960&q=90",
  "The_Death_and_Life_of_Great_American_Cities.png": "https://images.stripeassets.com/fzn2n1nzq965/28nKM4lDOo56MhJPUdJbzJ/1601d9de7d6ad57fe5d4f97ead810af8/The_Death_and_Life_of_Great_American_Cities.png?w=960&q=90"
}});
for (let offset = 0; offset < entries.length; offset += 4) {
  const results = await Promise.allSettled(entries.slice(offset, offset + 4).map(async ([name, url]) => {
    const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error(name + ": HTTP " + response.status);
    await writeFile(new URL("../public/media/" + name, import.meta.url), Buffer.from(await response.arrayBuffer()));
  }));
  for (const result of results) {
    if (result.status === "rejected") { console.error(result.reason); process.exitCode = 1; }
  }
}
