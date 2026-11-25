# botLane website (primer)

Marketing site for botLane, a business automation and digital systems company serving small and mid-sized businesses in the United States and India. It started as a rebuild of a Stripe homepage and is being rebranded. Some Stripe images in `public/media/` are still in use and must be replaced before launch.

## Structure

- `/`: homepage (`app/page.tsx`). Hero with a cross-industry phone demo (`app/hero.tsx`, `app/hero-phone.tsx`), challenges and approach (`app/challenges.tsx`), industries (`app/business.tsx`), capabilities, workflow demo and method (`Capabilities` in `app/top.tsx`, `app/workflow.tsx`), technology, managed automation, questions, responsible automation and CTA (`app/lower.tsx`).
- `/industries/manufacturing`, `/industries/real-estate`, `/industries/clinics`: industry landing pages, composed from `app/industries/blocks.tsx`. To add an industry, add a folder with `page.tsx` and `content.tsx`, a nav entry in `app/top.tsx` and a footer link in `app/lower.tsx`.
- Shared header and nav: `SiteHeader` in `app/top.tsx`. The workflow canvas takes a `FlowConfig` per industry.
- `/blog` (Insights) and `/blog/[slug]`: the 8 posts imported word for word from the botstryx repo (`src/content/insights.json`) into `app/blog/posts.json`. Links to botstryx-only pages (/websites, /care, /custom-solutions, /products/slotlane, /solutions) were repointed to the nearest homepage section. Rendered by a small built-in Markdown renderer (`app/blog/markdown.tsx`).
- Thinking orbs: vendored from github.com/Jakubantalik/thinking-orbs (MIT, licence kept in `app/vendor/thinking-orbs/LICENSE`) with an added `color` prop. Use via `app/orb.tsx`, which pins the theme (the site is light-only). Used in the hero phone (searching), workflow Running badge (working), industry demos (composing, listening, connecting in wave colours) and the Intelligence pillar (solving).
- Icon packs: `lucide-react` (ISC) for UI icons and `simple-icons` (CC0) for brand marks such as WhatsApp. Use these instead of hand-drawn paths for new icons. Brand marks are trademarks of their owners; use them only to name integrations.
- Rules: no published pricing, no invented results, testimonials or logos, and every demo is labelled.

---

# Stripe homepage demo

An isolated Next.js and Tailwind CSS rebuild of the Stripe India homepage. The public reference resolved to `https://stripe.com/in` during browser preflight.

## Run locally

Install dependencies with `npm ci`, then run `npm run dev`. Next.js prints the local address.

The `out/` directory contains the production export. Serve it from the root of any local static HTTP server. The demo includes mock product, sales, sign-in, event registration, and newsletter interactions. It contains no account, payment, or credential collection flows. Public informational links can open external documentation and case studies.

Browser reference captures are in `docs/design-references/`. The component briefs, responsive observations, and QA status are in `docs/research/`.
