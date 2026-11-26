# botLane logo

Brought over from the botstryx site (`botlaneio/botstryx`). There the logo is code, not an image file:
`src/components/brand/bot-mark.tsx` (the bot face) and `logo.tsx` (face + "botLane"). The static files
here come from the botLane logo kit (`~/Desktop/bb_kit`), which is generated from that same geometry;
the wordmark is outlined, so no font is needed.

**Primary logo:** `svg/lockup/botlane-lockup-light-transparent.svg` (use `-dark-` on dark backgrounds).
**Icon / avatar:** `svg/icon/botlane-icon-light-transparent.svg`.

- `svg/icon|lockup|wordmark/` vector masters in light, dark, black, white (and solid/rounded backgrounds)
- `png/` icon 512/1024 and lockup 800w/1600w, light and dark, transparent
- `favicon/` favicon.ico, adaptive favicon.svg, apple-touch, android, webmanifest, `head-snippet.html`
- `social/` Open Graph images 1200x630, light and dark
- Animated React version: `components/brand/` (`logo.tsx`, `bot-mark.tsx`, `bot-mark.css`)

The full kit (every PNG size, social banners, build script) stays in `~/Desktop/bb_kit`.

Colours: ink #16181C / #EDEEF0, blue eye #2F55F0 / #8098FF (light / dark). Font: Instrument Sans 600, -0.035em.
