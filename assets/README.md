# Assets — client handoff list

Files this folder still needs. Until they're added, the site falls back gracefully:
images use the `.placeholder` gradient block, and the `<img>` fallback (`onerror`)
hides the broken image so no broken-image icon ever shows.

| Path | Purpose | Aspect / size |
| --- | --- | --- |
| `assets/hero-portrait-800.webp` | Hero portrait, small variant (mobile) | ~3:2, 800px wide |
| `assets/hero-portrait-1200.webp` | Hero portrait, default variant | ~3:2, 1200px wide |
| `assets/hero-portrait-1800.webp` | Hero portrait, large variant (desktop/retina) | ~3:2, min. 1800px wide, colour original fine — site applies a duotone filter in CSS |
| `assets/favicon.svg` | Favicon, "MA" monogram | square, SVG |
| `assets/favicon-32.png` | Favicon fallback | 32×32 |
| `assets/apple-touch-icon.png` | iOS home-screen icon | 180×180 |
| `assets/og-image.jpg` | Social share preview image | 1200×630 |

## Data needed

- Social links are set: Instagram, TikTok and Facebook (`malekkaseb01`). Add YouTube/LinkedIn only if wanted.

## Added in later phases

# Phase 2 — Work section

Files delivered:
- `_build/work.html` — the `#work` section, plus (after a divider comment) the lightbox `<dialog>` and the two `<template>`s, meant to be placed right after `</main>`.
- `_build/work.css` — `@layer sections` (`.work__*`, `.reels__*`, `.long__*`) and `@layer components` (`.card`, `.play-btn`, `.chip`/`.chips`, `.sub-head`, `.lightbox`, `.counter`).
- `_build/work.js` — one IIFE, appended after the nav code inside `main.js`'s outer IIFE, under the `// ===== Work (Phase 2) =====` marker already present.
- `/projects.js` — replaced the Phase 1 stub with the seed data (12 projects, top-level file, not in `_build/`).

## Poster assets expected

All 12 projects currently ship with `poster: null` (render as `.placeholder` gradient blocks). When real posters are ready, set `poster: 'assets/posters/<id>'` on each project object — `work.js` will automatically fill `src`/`srcset` with the `-400/-800/-1200.webp` variants.

| Project id | Files needed | Aspect / source size |
|---|---|---|
| dubai | `assets/posters/dubai-400.webp`, `-800.webp`, `-1200.webp` | 16:9 (1920×1080) — long-form |
| mango-food | `assets/posters/mango-food-400.webp`, `-800.webp`, `-1200.webp` | 9:16 (1080×1920) — reel |
| creator-content | `assets/posters/creator-content-400.webp`, `-800.webp`, `-1200.webp` | 16:9 (1920×1080) — long-form |
| product-launch | `assets/posters/product-launch-400.webp`, `-800.webp`, `-1200.webp` | 16:9 (1920×1080) — long-form |
| outdoor-brand | `assets/posters/outdoor-brand-400.webp`, `-800.webp`, `-1200.webp` | 9:16 (1080×1920) — reel |
| brand-film | `assets/posters/brand-film-400.webp`, `-800.webp`, `-1200.webp` | 16:9 (1920×1080) — long-form |
| pxi-furniture | `assets/posters/pxi-furniture-400.webp`, `-800.webp`, `-1200.webp` | 9:16 (1080×1920) — reel |
| viral-media-hooks | `assets/posters/viral-media-hooks-400.webp`, `-800.webp`, `-1200.webp` | 9:16 (1080×1920) — reel |
| cairo-streets | `assets/posters/cairo-streets-400.webp`, `-800.webp`, `-1200.webp` | 9:16 (1080×1920) — reel |
| kinetic-type-promo | `assets/posters/kinetic-type-promo-400.webp`, `-800.webp`, `-1200.webp` | 9:16 (1080×1920) — reel |
| founder-story | `assets/posters/founder-story-400.webp`, `-800.webp`, `-1200.webp` | 16:9 (1920×1080) — long-form |
| logo-reveal-pack | `assets/posters/logo-reveal-pack-400.webp`, `-800.webp`, `-1200.webp` | 9:16 (1080×1920) — reel |
| avatar (featured card) | `assets/avatar-malek.webp` | 1:1, 160×160 — used by the featured card's `.card__avatar`; currently a `.placeholder` circle since no `<img>` is wired up yet |

## Data needed from the client

- Real `youtubeId` for every project — all 12 currently use the placeholder id `dQw4w9WgXcQ` (Rick Astley) purely so the lightbox is testable end-to-end. **Every id must be replaced before launch.**
- Real durations — seeded durations are plausible placeholders based on the mockup and typical short/long-form runtimes.
- Confirmation of the real "+5M" total-views stat (and whether it should be dynamic/updatable later).
- Any additional/replacement projects, plus final titles, clients, and descriptions for the 6 projects invented beyond the mockup (`pxi-furniture`, `viral-media-hooks`, `cairo-streets`, `kinetic-type-promo`, `founder-story`, `logo-reveal-pack`).
- The real poster photography/video stills listed above.

## Component classes defined

- `@layer components`: `.chip`, `.chips`, `.sub-head` (+ `__title`, `__count`, `__nav`), `.card` (+ `__media`, `__img`, `__format`, `__duration`, `__body`, `__title`, `__title--big`, `__tags`, `__sep`, `__eyebrow`, `__desc`, `__meta`, `__avatar`, `__client-col`, `__client`, `__cta`), `.card--reel`, `.card--long`, `.card--featured`, `.play-btn`, `.lightbox` (+ `__inner`, `__head`, `__title`, `__close`, `__frame`), `.lightbox-open`, `.counter` (+ `__rule`, `__num`, `__total`).
- `@layer sections`: `.work` (+ `__inner`, `__head`, `__head-left`, `__head-right`, `__title`, `__title-line`, `__script`, `__intro`, `__stat`, `__stat-script`, `__stat-rule`, `__stat-num`, `__count`, `__empty`, `__foot`, `__foot-right`, `__all`, `__sign-block`, `__sign`), `.reels` (+ `__track`, `__prev`, `__next`), `.long` (+ `__grid`, `__featured`, `__side`, `__more`).

## Assumptions / deviations

- `.reels` and `.long` are plain `<div>` wrappers, not nested `<section>` elements — avoids un-labelled/duplicate landmark clutter inside `#work`; their sub-heads (`<h3>`) already give them a visible heading, and screen-reader users reach them via the section's own landmark.
- `.work__script`'s horizontal offset (positioned to sit just right of "VIDEOS") is approximated with `left: 44%` / `top: .1em` in em units (so it scales with the clamp'd headline size) rather than measured pixel-for-pixel against the mockup's specific text metrics — visually close but worth a final eyeball pass once real fonts render.
- Footer `.counter` uses the literal static text "02 / 06" as specified in the task rather than being wired to any dynamic pagination state (the reels/long grids are not paginated — reels scroll horizontally, long-form is a full grid).
- Card `.card__tags` / featured `.card__tags` are built with `innerHTML` (tag strings joined by `<span class="card__sep"> | </span>`) since tag text comes only from the trusted local `projects.js` array, never user input.
- The featured template renders `title` only inside `.card__title--big` (no separate kicker/big-word split) and `description` inside `.card__desc`, per the simplified option offered in the task brief.
- No `!important` used; no element-scoped selectors within sections (only class selectors, per convention).

## Verification performed

- `node -e "new Function(require('fs').readFileSync('_build/work.js','utf8'))"` — syntax OK.
- Checked every `id` referenced in `work.html` (`work-title`, `reels-heading`, `lightbox-title`, `tpl-card`, `tpl-card-featured`) is unique within the partial and every `aria-labelledby`/`aria-label`/`for`-style reference resolves.
- `grep -n "!important"` over `work.css` — 0 matches.
- Grepped for element-scoped selectors (e.g. `.work h2`, `.card svg`) — only component-internal structural selectors used (e.g. `.reels__track > .card`), consistent with the convention's allowance for component-internal structural selectors.

# Phase 3 — Testimonials

## Files written
- `_build/testimonials.html` — `<section class="testi">` + `<template id="tpl-testimonial">` (place the template after `</main>`).
- `_build/testimonials.css` — appended to end of `styles.css` (already wrapped in `@layer sections` / `@layer components`).
- `_build/testimonials.js` — appended inside the outer IIFE of `main.js`, after the Work section block.
- `_build/README-phase3.md` — this file.

## Assets referenced (none exist yet — seed data renders text-based placeholders instead)

| Path | Purpose | Aspect / size |
|---|---|---|
| `assets/logos/pxi.svg` | Client logo, PXI | single-colour cream SVG, ~160×48 |
| `assets/logos/mango.svg` | Client logo, Mango | single-colour cream SVG, ~160×48 |
| `assets/logos/viral-media.svg` | Client logo, Viral Media | single-colour cream SVG, ~160×48 |
| `assets/logos/nova.svg` | Client logo, Nova | single-colour cream SVG, ~160×48 |
| `assets/logos/sahara.svg` | Client logo, Sahara Films | single-colour cream SVG, ~160×48 |
| `assets/avatars/pxi.webp` | Contact avatar, PXI Team | 1:1, 160px |
| `assets/avatars/mango.webp` | Contact avatar, Mango Team | 1:1, 160px |
| `assets/avatars/viral-media.webp` | Contact avatar, Viral Media Team | 1:1, 160px |
| `assets/avatars/nova.webp` | Contact avatar, Nova Marketing | 1:1, 160px |
| `assets/avatars/sahara.webp` | Contact avatar, Sahara Films | 1:1, 160px |

When a `logoSrc`/`avatarSrc` is added to a `TESTIMONIALS` entry in `testimonials.js`, the JS swaps the text-logo / `.placeholder` avatar for an `<img>` automatically — no other markup changes needed.

## Data needed
- Real, approved client quotes (the five quotes shipped are placeholder copy in the spirit of the mockup).
- Confirmed client/company names and role labels.
- Client permission to display their logos and any client-side headshots/avatars.
- Final logo files (SVG, single colour cream) and avatar photos (or explicit sign-off to keep the text-logo + generic avatar placeholder look permanently).

## Notes / deviations
- Quote mark glyph: used `&#10077;&#10077;` (❝❝, U+275D doubled) inside `.quote-mark` rather than a custom inline SVG, to keep it a single lightweight text glyph in the Archivo Black display font, matching the "66"-style mark in the mockup.
- `.testi__head` is a flex column by default and switches to the 3-column grid only at `min-width: 1100px`, so it also stacks in the 900–1100px range (no separate grid variant was defined for that band, consistent with "stacks below 900px" reading down from the grid breakpoint).
- Section counter markup uses the shared `.counter` component exactly as documented in CONVENTIONS.md; only `.testi__counter` (no extra CSS beyond flex/position context, none needed since `.testi__foot` already handles placement) wraps it.
- Card border-radius is 20px per the phase-3 spec (overriding the general `--radius: 16px` token used elsewhere), as explicitly requested in the task brief.
- `goTo()` clamps rather than wraps at the first/last card, and both header and side prev/next buttons are disabled at the respective end, per spec.

# Phase 4 — About, Services, Contact + Footer

Files written to `_build/`: `about.html`, `services.html`, `contact.html` (contact section + `<footer>`, marked with `<!-- footer: place after </main> -->`), `phase4.css`, `phase4.js` (no-op — the form needs no JS and "back to top" is a plain anchor), this README.

Component classes defined (owned, per task assignment): `.form` (+ `.form__row`, `.form__field`, `.form__label`, `.form__control`, `.form__hp`, `.form__submit`, `.form__note`), `.stat` (+ `.stat__num`, `.stat__label`), `.tool-chip`, `.service` (+ `.service__index`, `.service__title`, `.service__desc`, `.service__list`, `.service__foot`, `.service__turn-label`, `.service__turn`), `.footer` (+ `.footer__inner`, `.footer__brand`, `.footer__nav`, `.footer__copy`, `.footer__top`).

Section classes: `.about__*`, `.services__*`, `.contact__*` (all in `@layer sections`).

## Assets

| Path | Purpose | Aspect / size |
|---|---|---|
| `assets/about-portrait-600.webp` | About portrait, 600w source | 4:5 |
| `assets/about-portrait-900.webp` | About portrait, default `src` | 4:5 (900×1125) |
| `assets/about-portrait-1200.webp` | About portrait, 1200w source | 4:5 |

All three currently missing → the `.placeholder` block shows behind the `<img>`; `onerror` hides the broken `<img>` (`.about__img.is-missing { visibility: hidden }`), mirroring the Phase 1 hero pattern.

## Data needed before launch

- **WhatsApp number**: replace the placeholder `20XXXXXXXXXX` in the `wa.me` link (`contact.html`) with Malek's real WhatsApp number in international format, no `+` or leading zeros.
- **Email**: confirm `hello@malekahmed.com` is the real inbox (used in the `mailto:` link and copy).
- **Social URLs**: all three `.contact__socials` links (Instagram, YouTube, LinkedIn) are placeholder `href="#"`, matching the pattern already in `index.html` — fill in real profile URLs across all sections when available.
- **Bio copy**: confirm the two About paragraphs (5 years, 15s–40min range, process description) are accurate.
- **Stats**: confirm "5+ Years Editing", "120+ Projects Delivered", "+5M Views Across Platforms" are current numbers.
- **Tools list**: confirm Premiere Pro, After Effects, DaVinci Resolve, Photoshop, Audition, CapCut is the full/accurate toolset.
- **Services**: prices are intentionally NOT shown anywhere in this section — confirm the four turnaround windows (48–72 hrs / 5–7 days per 15 min / 2–3 weeks / 3–5 days per 30s) and deliverable bullets are accurate before launch.
- **Netlify Forms**: the contact form uses `data-netlify="true"` + a hidden `form-name` input + a honeypot field (`bot-field`), with no JS. Enable Forms in the Netlify site dashboard after deploy (Netlify detects the form automatically from the static HTML at build time) and optionally configure a custom success page/redirect — currently `action="/"` (default Netlify behavior, no redirect page built in this phase).

## Deviations / assumptions

- `.contact__socials` reuses the same three inline SVG icons (Instagram, YouTube, LinkedIn) copied verbatim from `index.html`, with `href="#"` placeholders as instructed.
- Services intro copy uses `&ldquo;/&rdquo;` HTML entities for the curly quotes around "premium packages" instead of literal curly-quote characters, to keep the source ASCII-safe.
- Select elements' custom chevron is a ~180-byte inline `data:image/svg+xml` background image (well under the 300-byte budget).
- `.stat` separator rule (`border-left` on all but `:first-child`) and the tool-chip pill styling live in `@layer components` since `.stat`/`.tool-chip` are components this agent owns; the surrounding row/wrap layout (`.about__stats`, `.about__tool-list`) lives in `@layer sections` since those are About-specific containers.
- Footer is placed in `@layer components` (not `@layer sections`) per the task's ownership list, even though it's structurally a page region rather than a reusable widget.
