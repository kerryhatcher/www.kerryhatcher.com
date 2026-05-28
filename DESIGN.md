---
name: kerryhatcher.com
description: A reading-first personal site. Deep ink-blue paper, a single luminous accent, silver type, mono kickers.
colors:
  paper: "oklch(0.17 0.03 252)"
  paper-2: "oklch(0.215 0.032 252)"
  ink: "oklch(0.92 0.004 250)"
  ink-soft: "oklch(0.78 0.006 250)"
  ink-muted: "oklch(0.6 0.008 248)"
  rule: "oklch(0.32 0.022 252)"
  rule-strong: "oklch(0.42 0.024 252)"
  accent: "oklch(0.78 0.14 240)"
  accent-2: "oklch(0.88 0.1 230)"
  mark: "oklch(0.65 0.13 240)"
  scrim: "oklch(0.17 0.03 252 / 0.78)"
  silver-1: "oklch(0.86 0.005 250)"
  silver-2: "oklch(0.7 0.008 245)"
typography:
  display:
    fontFamily: '"Noto Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif'
    fontSize: "clamp(2.4rem, 6vw, 4.6rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: '"Noto Sans", -apple-system, BlinkMacSystemFont, sans-serif'
    fontSize: "clamp(2.1rem, 5vw, 3.6rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.022em"
  title:
    fontFamily: '"Noto Sans", -apple-system, BlinkMacSystemFont, sans-serif'
    fontSize: "clamp(1.5rem, 2.2vw, 1.75rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  body:
    fontFamily: '"Noto Sans", -apple-system, BlinkMacSystemFont, sans-serif'
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: '"ss01", "kern"'
  prose:
    fontFamily: '"Noto Sans", -apple-system, BlinkMacSystemFont, sans-serif'
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: 'Menlo, Courier, monospace'
    fontSize: "0.78rem"
    fontWeight: 500
    letterSpacing: "0.06em"
rounded:
  pill: "999px"
  lg: "10px"
  md: "8px"
  sm: "6px"
  xs: "4px"
  hair: "2px"
spacing:
  gutter: "clamp(1.25rem, 5vw, 2.5rem)"
  col-max: "clamp(76rem, 92vw, 90rem)"
  measure: "70ch"
  measure-wide: "clamp(72ch, 88vw, 96ch)"
components:
  link-prose:
    textColor: "{colors.accent-2}"
  link-prose-hover:
    textColor: "{colors.accent}"
  button-subscribe:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
    rounded: "{rounded.sm}"
    padding: ".65rem 1.1rem"
  card-post:
    backgroundColor: "{colors.paper-2}"
    rounded: "{rounded.lg}"
  tag-pill:
    textColor: "{colors.ink-muted}"
    rounded: "{rounded.pill}"
    padding: ".2rem .55rem"
  pager-page-current:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.paper}"
    rounded: "{rounded.pill}"
---

# Design System: kerryhatcher.com

## 1. Overview

**Creative North Star: "Notes from the Whiteboard"**

Mono kickers, numbered section markers (`§ 02`), and a single luminous blue feel like reasoning done in front of you. The aesthetic is provenance: nothing claims more than it can show. The page is deep ink-blue paper with silver type; the accent is held back so that when it appears — in a link, a section number, a hovered card, the reading-progress bar at the top of a post — it reads as emphasis, not decoration.

This is not a magazine, not a SaaS landing page, not a developer-portfolio dark mode, not a campaign site, not a Substack template. It is a self-owned reading space that happens to be dark by default because of the room: a 13-inch laptop in a study with one desk lamp on, late evening. Light mode is a courtesy for daytime mobile readers, not a hedge.

**Key Characteristics:**
- One typographic family across the surface (Noto Sans), letting hierarchy come from weight and scale rather than family contrast.
- Mono labels (Menlo) carry every meta signal: dates, read-time, page numbers, section kickers, captions.
- A single committed accent — luminous mid-blue — does all the identity work. No secondary brand colors.
- The wordmark mark is a small brushed-silver square with `K·H` in mono; the only "logo" the site has.
- Layout breathes: clamp-based gutters, a 70ch reading measure, and a three-zone post body grid that lets figures expand wide or full-bleed without breaking column flow.
- Motion is choreographed, never decorative: scroll-stagger reveals, a reading-progress bar that maps to article scroll-through, a sticky-header scrim that fades in past 8px scroll, growing-underline links via animated `background-size`.

## 2. Colors

The palette is **The Two-Color Story: ink-blue + silver, lit by one luminous accent.** Deep saturated blue pushed toward indigo reads as ink, not as corporate navy. Silver — cool, slightly desaturated — handles text and rules. A luminous mid-blue does all of the emphasis work, alone. Every neutral tints toward the brand hue (chroma 0.004–0.03); there is no `#000` and no `#fff` anywhere in the system.

Colors are canonical in **OKLCH**. Hex equivalents are intentionally not provided; if a tool needs sRGB, convert and accept gamut clipping. The frontmatter format triggers a Stitch linter warning by design — the doctrine is OKLCH-first.

### Primary
- **Luminous Mid-Blue** (`oklch(0.78 0.14 240)`): the single identity color. Used on the hero second-line, section kickers (`§ 02`), reading-progress bar, link hover, current pager pill, signup card button, blockquote rule, callout rule, focus outline. Never used on more than ~10% of any given screen except inside the accent-carrying components themselves.
- **Luminous Mid-Blue, Brighter** (`oklch(0.88 0.1 230)`): the active/hover variant. Slightly higher lightness, lower chroma; lifts the accent on interaction without changing hue identity.

### Tertiary
- **Mark Blue** (`oklch(0.65 0.13 240)`): the `<mark>` highlight color. Used sparingly inside prose to spotlight a single phrase. Tinted in the same hue family so highlighted runs stay in voice.

### Neutral (Paper)
- **Ink-Blue Paper** (`oklch(0.17 0.03 252)`): the page surface. Dark, deeply saturated, reads as ink.
- **Inset Paper** (`oklch(0.215 0.032 252)`): code blocks, callouts, post-card image backplates, bookmark cards, signup card, kicker-mark background.
- **Header Scrim** (`oklch(0.17 0.03 252 / 0.78)`): sticky-header background once scrolled, paired with `backdrop-filter: saturate(140%) blur(10px)`.

### Neutral (Ink)
- **Silver Ink** (`oklch(0.92 0.004 250)`): body text and titles.
- **Silver Ink, Soft** (`oklch(0.78 0.006 250)`): post deks, ledes, secondary prose. Lower-contrast but still comfortably readable.
- **Silver Ink, Muted** (`oklch(0.6 0.008 248)`): meta, captions, dates, mono kickers, list markers.

### Neutral (Rules)
- **Hairline** (`oklch(0.32 0.022 252)`): inline rules, separators, code-block and bookmark-card borders.
- **Strong Rule** (`oklch(0.42 0.024 252)`): section dividers (archive head, footer rule, post footer top, post-tag pill border).

### Wordmark Mark
- **Silver Bright** (`oklch(0.86 0.005 250)`) and **Silver Cool** (`oklch(0.7 0.008 245)`): the two stops of the brushed-silver gradient applied to the wordmark monogram block (`linear-gradient(135deg, silver-1, silver-2 55%, silver-1)`). The gradient stays on the block, never on text.

### Light mode
Light mode is a courtesy, not the headline. Paper inverts to a cool off-white (`oklch(0.975 0.008 252)`), ink to deep blue (`oklch(0.22 0.04 252)`), accent darkens to `oklch(0.5 0.16 245)` to maintain contrast on light, and the silver-ink scale becomes a cool pewter. The metaphor stays: ink on paper.

### Named Rules
**The One Voice Rule.** A single accent (Luminous Mid-Blue) carries the entire brand. Adding a second saturated color makes this site look like a startup. No yellow callouts, no green success states, no orange warnings as part of the standing palette. If a state needs differentiation, use weight, position, and mono labels — not new hues.

**The No-Pure-Neutral Rule.** No `#000`, no `#fff`, no `oklch(L 0 H)` anywhere. Every neutral tints toward the brand hue (chroma 0.004–0.03). The page is ink-blue paper, not gray paper.

## 3. Typography

**Display Font:** Noto Sans (with a complete system fallback chain). Loaded via `fonts.bunny.net` (no Google Fonts, no third-party CDN that surveils). Weights 400 and 700, plus italics, are served.

**Body Font:** Noto Sans. The same family covers display, body, prose, and UI. Hierarchy comes from weight (400 ↔ 600 ↔ 700) and scale (≥1.25 ratio between steps), not from family contrast. There is no serif body, intentionally — the site is sans across the entire surface.

**Label / Mono Font:** Menlo (with Courier fallback). System mono — no web mono is loaded. Carries every meta signal in the system: dates, read-time, page numbers, section kickers (`§ 02`), captions, tag pills, post-card kickers, signup disclaimer.

**Character.** Quiet, geometric, evenly weighted. Noto Sans is deliberately not a "designer" sans — it is a workhorse with broad Unicode coverage, and the site leans into that as evidence of seriousness rather than performance. The mono is editorial-machine: a typewritten margin note in a thoughtful essay. Together they read as a notebook, not a brochure.

### Hierarchy
- **Display** (700, `clamp(2.4rem, 6vw, 4.6rem)`, 1.1, `-0.02em`): the home hero headline. Two lines, the second tinted Luminous Mid-Blue.
- **Headline** (700, `clamp(2.1rem, 5vw, 3.6rem)`, 1.15, `-0.022em`): the post title. Slightly smaller than display so the post page reads as content, not as a landing surface.
- **Page Title** (600, `clamp(2rem, 4.5vw, 3.4rem)`, 1.05, `-0.022em`): about, etc. Lighter weight than display/headline to mark "page" vs. "post."
- **Title — Prose H2** (700, `clamp(1.5rem, 2.2vw, 1.75rem)`, 1.15, `-0.01em`): the most common in-prose heading.
- **Subtitle — Prose H3** (700, `clamp(1.15rem, 1.5vw, 1.3rem)`, 1.25, `-0.008em`): nested headings inside long posts.
- **Body — UI surfaces** (400, `1.125rem`, 1.6): site chrome, home archive head, footer.
- **Body — Prose** (400, `1.25rem`, 1.6): the post and page reading surface. Bigger than UI body on purpose — the long-form post is the most important surface in the system, and it is sized accordingly.
- **Dek / Lede** (400, `clamp(1.15rem, 1.4vw, 1.35rem)`, 1.5, color Silver Ink Soft): the post subtitle and home hero lede.
- **Label / Mono Kicker** (500, `0.78rem`, `0.06em` letter-spacing, uppercase): every meta signal in the system.
- **Post-card kicker** (500, `0.72rem`, `0.14em` letter-spacing, uppercase): wider tracking than other mono labels to give the post feed a typesetter's rhythm.

### Named Rules
**The Reading Measure Rule.** Long-form prose lives inside `var(--measure)` = `70ch`. Wider columns are reserved for figures and full-bleed media that have earned the room. The post body uses a three-zone grid (`main` 70ch, `wide`, `full`) so a figure can declare its own column without breaking column flow for the paragraphs around it.

**The One Family Rule.** Hierarchy is built from weight and scale within Noto Sans + Menlo. No third display font, no serif body, no italic-script display. If a system needs more contrast than weight + scale can provide, the system is doing too much.

**The Mono-For-Meta Rule.** Every meta signal — date, read-time, page number, section kicker, caption, tag — is in Menlo, uppercase where appropriate, with 0.06–0.14em tracking. Body sentences are never in mono. Mono is the margin; the page is the body.

## 4. Elevation

The system is **flat by default, with one ambient lift on interaction and one structural depth on the wordmark mark.**

There are no decorative shadows on cards, no drop-shadow on hero text, no glassmorphism panels. The wordmark monogram carries an inset shadow vocabulary to give it a brushed-metal feel; that is the only standing shadow in the system. Post cards lift on hover by a `transform: translateY(-1px)` (on the pager pill) or `transform: scale(1.04)` (on the post-card image) — depth is conveyed by transform, not shadow.

The sticky site header uses `backdrop-filter: saturate(140%) blur(10px)` once scrolled — this is structural, not decorative. The "blur" is not stylized glass; it is a working scrim that keeps the page header readable as content slides under it.

### Shadow Vocabulary
- **Wordmark Mark Inset** (`inset 0 1px 0 oklch(1 0 0 / 0.35), inset 0 -1px 0 oklch(0 0 0 / 0.15), 0 0 0 1px oklch(1 0 0 / 0.06)`): the brushed-silver block on the wordmark only. Applied to no other surface.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Depth at rest is anti-doctrine. Hover and focus may introduce a 1–2px transform; that is the system's only motion-on-state.

**The No-Glassmorphism Rule.** The single `backdrop-filter` in the system is a functional scrim on the sticky header. Decorative blurs, glass cards, frosted pills are prohibited. If a surface needs separation from the page, use the inset paper (`oklch(0.215 0.032 252)`) and a hairline border.

## 5. Components

### Wordmark
A small brushed-silver square (2rem) carrying `K·H` in Menlo, followed by the title in 600-weight Noto Sans, set on the baseline. The square uses a `linear-gradient(135deg, silver-1, silver-2 55%, silver-1)` and an inset shadow vocabulary to read as brushed metal. On hover, the square rotates `-6deg` and brightens by `filter: brightness(1.06)` — the only signature micro-interaction in the chrome.

### Site Navigation
- **Style:** inline list, gap clamp(1.25rem, 3vw, 2.25rem), no decoration.
- **Default:** Noto Sans 500, 1rem, color Silver Ink.
- **Hover / Active (`aria-current="page"`):** color Luminous Mid-Blue Brighter; a `background-image: linear-gradient(currentColor, currentColor)` underline grows from `background-size: 0 1px` to `100% 1px` over 360ms ease-out-quart. **No standard `text-decoration: underline`.**
- **Touch target:** each link is `display: inline-flex`, `min-height: 44px`, padding `.75rem 0`, to meet the WCAG 2.5.5 44×44 floor on phones.

### Site Header
- **Position:** sticky, top 0, z-50.
- **Default:** transparent background, transparent bottom border.
- **Scrolled state (`.is-scrolled`, added when `scrollY > 8`):** background `var(--scrim)`, `backdrop-filter: saturate(140%) blur(10px)`, bottom border `var(--rule)`.
- **Behavior:** RAF-throttled scroll listener (see `assets/js/main.js`).

### Hero (home)
- **Layout:** grid, kicker → 2-line headline → lede, gap 1.25rem.
- **Kicker:** mono label in Luminous Mid-Blue Brighter.
- **Headline:** display scale, two lines, the second line tinted Luminous Mid-Blue. Max-width 18ch so the line breaks fall on the same words on every viewport.
- **Lede:** Noto Sans, clamp(1.05rem, 1.2vw, 1.25rem), Silver Ink Soft, max-width 52ch.
- **Entrance:** kicker → line 1 → line 2 → lede, each `translateY(14px)` → `0` with opacity `0 → 1`, staggered 70ms (capped at 480ms total) via `data-reveal-stagger` in JS.

### Archive Header
- **Layout:** flex baseline, title left + meta right, top hairline (Strong Rule).
- **Title:** display 600 + Menlo section kicker (`§ 01`) in Luminous Mid-Blue.
- **Meta:** mono Silver Ink Muted ("`N pieces · Newest first`").

### Post Card (three variants)
- **Default (3-up row):** `grid-column: span 2` of a 6-column grid. Image 16:10, mono kicker, display 700 title (clamp(1.1rem, 1.4vw, 1.4rem)), Silver Ink Soft dek truncated to 180c, mono date·read-time meta.
- **Large (2-up second row):** `span 3`. Title scales up to `clamp(1.35rem, 1.9vw, 1.75rem)`.
- **Featured (first card on page 1):** `span 6`, horizontal layout (image left 1.7fr / body right 1fr), title `clamp(1.85rem, 3.2vw, 2.75rem)`, image aspect-ratio 16:9.
- **Hover:** image `transform: scale(1.04)` + `filter: saturate(1)` from rested `saturate(0.92)` over 520ms ease-out-quint; title tint to Luminous Mid-Blue.
- **Image at rest:** `filter: saturate(0.92)` — the post feed reads slightly desaturated; hover restores full color.
- **Responsive:** 960px collapses to 2-up; 600px to 1-up with 16:9 hero images and 6px radius.

### Tag Pill
- **Shape:** `border-radius: 999px`, 1px Strong Rule border.
- **Style:** Menlo 0.78rem, Silver Ink Muted, padding `.2rem .55rem`.
- **Use:** inline post tags only. Not for filtering, not for navigation.

### Post Body Grid (signature component)
A three-zone CSS grid that defines `main`, `wide`, and `full` columns. By default every child sits in `main` (70ch). A figure with `.kg-width-wide` spans into the `wide` zone (70ch + 14rem). A figure with `.kg-width-full` spans the entire viewport. Below 760px the grid collapses to a single block-flow column. The grid is the central typographic affordance of the site and the reason figures can breathe without disrupting paragraph rhythm.

### Reading Progress Bar
- **Position:** fixed, top 0, height 2px, full width, z-60, `pointer-events: none`.
- **Fill:** `background: var(--accent)`, width tracked to article scroll-through via RAF. Computes `(viewport * 0.6 - rect.top) / (rect.height - viewport * 0.4)`.
- **Reduced motion:** still tracks (no animation; a static value); functional, not decorative.

### Prose Link
- **Default:** color Luminous Mid-Blue Brighter, no `text-decoration`; uses a 1px-tall `background-image` line at the baseline.
- **Hover:** color Luminous Mid-Blue, line grows from 1px to 2px tall via `background-size`. Transition 240ms ease-out-quart.
- This is the canonical link treatment across the site. Site nav, footer, post-card titles, and post-back use the same growing-underline mechanism.

### Blockquote
- **Style:** margin-notation treatment. A two-column CSS grid (`auto 1fr`) places a leading `‖` (U+2016, double vertical bar) glyph in Menlo Luminous Mid-Blue at `1.5em` to the left of the quote, with `.75rem` column gap. The quote body stays italic Silver Ink Soft and remains in the `main` (70ch) column. No side stripe, no padding-left rule — the mono glyph acts as a margin note, consistent with the "Notes from the Whiteboard" North Star and the `§ 02` archive kicker vocabulary.

### Code & Pre
- **Inline code:** Menlo 0.9em, `background: var(--paper-2)`, 1px Hairline border, `border-radius: 3px`, padding `.12em .35em`.
- **Code blocks:** Menlo 0.88em, `background: var(--paper-2)`, 1px Hairline border, `border-radius: 6px`, padding `1rem 1.1rem`, horizontal scroll.

### Ghost Koenig Cards
The site is wired to render content imported from Ghost CMS (`kg-*` classes). Documented for parity:
- **`.kg-image-card`:** full-width responsive image, 8px radius, 2em vertical margin.
- **`.kg-header-card.kg-layout-split`:** image + heading split, swappable via `.kg-swapped`, collapses to stacked at 720px.
- **`.kg-gallery-card`:** 3-column grid that adapts to 2-up at ≤600px; rows with fewer images auto-balance.
- **`.kg-bookmark-card`:** horizontal link card with thumbnail, 1px Hairline border, 10px radius, Inset Paper background, hover lifts via `translateY(-2px)` + Luminous Mid-Blue border.
- **`.kg-callout-card`:** Inset Paper background, full 1px Strong Rule border, 6px radius. A small Luminous Mid-Blue mono `§` marker (Menlo 0.78rem, uppercase, 0.06em tracking) sits above the callout content via `::before`, acting as a margin-note signature consistent with the `§ 02` archive kickers.
- **`.kg-embed-card`:** 16:9 iframe wrapper, max-width 720px, 8px radius.
- **`.kg-signup-card`:** the only embedded subscribe form in the system, rendered only when Ghost content includes it. Marked for review against the "no newsletter ceremony" principle in PRODUCT.md — consider hiding or styling-down site-wide.

### Subscribe Button (sole real button in the system)
- **Style:** Luminous Mid-Blue background, Ink-Blue Paper text, `border-radius: 6px`, padding `.65rem 1.1rem`, Noto Sans 600.
- **Used only inside `.kg-signup-card`.** There is no general primary button in the chrome.

### Pager (home pagination)
- **Layout:** 3-column grid, `Newer` left / page trail center / `Older` right; top Strong Rule.
- **Page pill (default):** Menlo 0.85rem, Silver Ink Muted, padded `0 .55rem` with a 2.75rem min-width and 2.75rem height (≈44px, the WCAG 2.5.5 touch-target floor), 999px radius, transparent border.
- **Page pill (current):** Luminous Mid-Blue background, Ink-Blue Paper text, no border, weight 500.
- **Newer / Older buttons:** Noto Sans 500, 1px Strong Rule border, 999px radius, padding `.55rem .9rem .55rem .8rem`; hover tints border + text to accent and lifts `-1px`. A mono arrow glyph nudges 3px on hover.

### Footer
- **Layout:** 3-column grid (1fr auto auto), collapses to 1-column at 720px. Top Strong Rule.
- **Columns:** site identity & tag, "Elsewhere" links, "Feed" link.
- **Link treatment:** same growing-underline as site nav.
- **Colophon:** Menlo, Silver Ink Muted, copyright + future room for build metadata.

### Skip Link
- **Style:** absolutely positioned, `transform: translateY(-110%)` at rest, slides to `0` on focus. Ink background, Paper text, Menlo. Z-100. Required affordance.

### Focus Ring
- **Treatment:** `outline: 2px solid var(--accent)` with `outline-offset: 3px` and `border-radius: 2px`. Used globally via `:focus-visible`. No `:focus` (mouse) styling — keyboard-only.

### Print
Long civic posts are frequently printed and forwarded in school board meetings, so print is a first-class surface, not an afterthought. `@page` margins are set to 1.6cm/1.8cm/2cm/1.8cm for A4 and Letter, body type is 11pt Noto Sans at 1.5 line-height, and the site header, footer, pager, post-feed, and reading-progress chrome are hidden. Links inside prose drop the growing-underline mechanism for a standard underline, and any `http(s)` link renders its URL inline after the link text in mono so paper carries provenance. The `kg-embed-card` iframe is replaced with a printed `[Embedded video. See the online post for content.]` marker between hairlines. The printed blockquote intentionally uses a 2px ink-line side stripe — an explicit print-only exception to the side-stripe ban in section 6, since a vertical ink rule is the long-established convention for quoted passages on paper.

## 6. Do's and Don'ts

### Do:
- **Do** use **one** accent (Luminous Mid-Blue) across the whole system. New states get weight and label changes, not new hues. (See the One Voice Rule.)
- **Do** keep prose inside `var(--measure)` (70ch). Figures may expand into `wide` or `full` via the post-body grid; paragraphs may not.
- **Do** use **Menlo, uppercase, 0.06–0.14em tracked** for every meta signal: dates, read-time, page numbers, section kickers, captions, tag pills, post-card kickers.
- **Do** use the growing-underline link treatment (`background-image: linear-gradient(currentColor, currentColor)`, `background-position: 0 100%`, transition on `background-size`). It is the canonical link affordance across the site.
- **Do** tint every neutral toward the brand hue (chroma 0.004–0.03). No pure grays.
- **Do** respect `prefers-reduced-motion` on every animation. The reveal system, the reading-progress bar, and the scroll-stagger logic all already do.
- **Do** treat the **print stylesheet** as part of the design: readable type at A4/Letter, hidden chrome, links rendered as URLs after the link text. (PRODUCT.md commitment, shipped — see **Print** under Components.)
- **Do** plan for a **reader-mode toggle** or alternate body-font affordance (PRODUCT.md commitment, not yet implemented) for readers who tire on long passages.
- **Do** keep the wordmark monogram as the **only logo**. No icon mark, no avatar in the header, no signature graphic.

### Don't:
- **Don't** introduce a second saturated brand color. No gold accents, no signal-green success states, no orange warnings. (Violation of the One Voice Rule and a PRODUCT.md anti-reference.)
- **Don't** use `#000` or `#fff`, in CSS or in SVG. Every neutral tints toward the brand hue. (No-Pure-Neutral Rule.)
- **Don't** add `border-left` or `border-right` greater than 1px as a colored accent on cards, callouts, or list items.
- **Don't** add a serif display, italic-script display, or third type family. Hierarchy is weight + scale within Noto Sans + Menlo. (One Family Rule.)
- **Don't** use mono inside body sentences. Mono is for the margin: dates, kickers, captions, tags, page numbers. (Mono-For-Meta Rule.)
- **Don't** add decorative shadows, gradient text, or glassmorphism panels. The single `backdrop-filter` lives on the sticky header scrim; the only standing shadow vocabulary lives on the wordmark monogram. (Flat-By-Default Rule.)
- **Don't** ship a SaaS landing surface, a magazine clone, a developer-portfolio terminal aesthetic, or default Jekyll theme chrome. (PRODUCT.md anti-references — all four still apply.)
- **Don't** add a campaign frame: no endorsement bars, no donate CTAs, no yard-sign red/white/blue palette, no "Meet Kerry" hero bio block. The school board run is acknowledged when it is the subject of a post, not the frame of the site.
- **Don't** add a Substack/Medium author-template stack: no giant author avatar + name + Subscribe button atop posts, no "X subscribers" social proof, no paywall chrome. The existing `.kg-signup-card` is a parity artifact for Ghost-imported content; consider hiding it site-wide.
- **Don't** add a local-news-site aesthetic: no sidebars, no "recent comments" widgets, no "most-read this week," no dated WordPress chrome.
- **Don't** add a "Read more →" CTA at the end of post excerpts. The post-card itself is the link.
- **Don't** add a profile photo in the hero.
- **Don't** auto-play background gradients, conic-gradient blob heros, or scroll-tied parallax. Motion in this system is choreographed (scroll-stagger reveals, reading-progress bar, growing-underline links, sticky-header scrim, wordmark hover-rotate); it is not garnish.
- **Don't** add third-party widgets (chat, analytics that surveil, social embeds beyond Ghost's existing card system). The site is hosted, not platform. (PRODUCT.md design principle.)

### Anti-pattern audit tests
- If a heading is in a serif or italic-script family, it is not this system.
- If a meta line is in Noto Sans rather than Menlo, it is not this system.
- If a card has a 3px colored stripe on one side, it is not this system.
- If two saturated brand colors appear in the same screen, it is not this system.
- If the page has a hero metric or a feature grid above the fold, it is not this system.
