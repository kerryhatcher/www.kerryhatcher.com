# DESIGN.md — kerryhatcher.com

Design system for the kerryhatcher.com blog. Dark-first, single-accent, type-led. The room: late evening, reading on a 13" laptop in a study with one desk lamp on. Dark register fits.

## Color (OKLCH, Committed strategy)

Two-color story: **ink-blue + silver**. The paper is a deep saturated blue pushed toward indigo so it reads as ink, not as corporate navy. The text and rules are silver (cool, slightly desaturated). One luminous mid-blue accent does the identity work.

Dark mode (primary):

| Token           | Value                          | Role                                              |
| --------------- | ------------------------------ | ------------------------------------------------- |
| `--paper`       | `oklch(0.17 0.03 252)`         | Page background, deep ink-blue                    |
| `--paper-2`     | `oklch(0.215 0.032 252)`       | Inset / blockquote / muted block                  |
| `--ink`         | `oklch(0.92 0.004 250)`        | Body text, silver-white                           |
| `--ink-soft`    | `oklch(0.78 0.006 250)`        | Secondary text, ledes, dek                        |
| `--ink-muted`   | `oklch(0.6 0.008 248)`         | Meta, captions, dates                             |
| `--rule`        | `oklch(0.32 0.022 252)`        | Hairlines, list separators                        |
| `--rule-strong` | `oklch(0.42 0.024 252)`        | Section borders                                   |
| `--accent`      | `oklch(0.78 0.14 240)`         | Luminous mid-blue. The gleam. Identity color.     |
| `--accent-2`    | `oklch(0.85 0.12 235)`         | Brighter hover / active variant                   |
| `--mark`        | `oklch(0.65 0.13 240)`         | Highlight (sparing); blue-tinted                  |
| `--silver-1`    | `oklch(0.86 0.005 250)`        | Wordmark mark gradient stop A                     |
| `--silver-2`    | `oklch(0.7 0.008 245)`         | Wordmark mark gradient stop B                     |

Light mode (`prefers-color-scheme: light`): cool off-white paper `oklch(0.975 0.008 252)`, deep blue ink `oklch(0.22 0.04 252)`, accent darkens to `oklch(0.5 0.16 245)` to keep contrast on light. Silver becomes a cool pewter for muted tones.

No `#000`, no `#fff`. Every neutral tints toward the blue hue (chroma 0.004–0.03).

The wordmark mark uses a two-stop silver gradient on the block (not on text), giving a brushed-metal feel against the deep paper.

## Typography

- **Display**: Bricolage Grotesque (variable, weights 400–800). Headings, nav, kicker labels.
- **Body**: Source Serif 4 (variable). Post body, page body.
- **Mono**: JetBrains Mono. Dates, tags, code, inline metadata.

Loaded via Google Fonts. All three are off the impeccable reflex-reject list.

### Scale (fluid)

| Step | Size                              | Use                            |
| ---- | --------------------------------- | ------------------------------ |
| H1   | `clamp(2.6rem, 6vw, 5rem)`        | Hero / post title              |
| H2   | `clamp(1.9rem, 3.4vw, 2.75rem)`   | Section heading                |
| H3   | `clamp(1.35rem, 2vw, 1.7rem)`     | Sub-section                    |
| Body | `1.0625rem` / `1.65`              | Post body, page body           |
| Meta | `0.8125rem` / `1.5`               | Mono dates, tags               |

Ratio ≥1.25 between steps. Headings use Bricolage at 540–700 weight, tight tracking (`-0.02em` on display sizes).

Body is set in Source Serif 4 at 400 weight, line-height 1.65, max-width 68ch.

## Layout

- Page container: `clamp(1.25rem, 5vw, 2.5rem)` horizontal padding, full-bleed background.
- Reading column for posts: `min(68ch, 100% - 2 * gutter)`, centered with `margin-inline: auto`.
- Home is intentionally asymmetric: a wide-ranging hero block, then a card feed in the Ghost Casper pattern — first post featured (horizontal: image left, title/dek/meta right), next two as a 2-up row, then 3-up rows for the rest. Pagination pages 2+ are all 3-up.
- Each card: feature image on top (16:10, or 4:3 on the featured), then mono uppercase category kicker, display-weight title, serif/sans dek, and mono uppercase date · read-time meta.
- Spacing rhythm uses a 4px base, but heading-to-body spacing is deliberately larger than body-to-body for visual phrasing.

## Motion

All easing: `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quart). Durations 280–520ms. Respects `prefers-reduced-motion`.

- **Hero entrance**: kicker, headline lines, lede each translateY(14px) → 0 with opacity 0 → 1, 80ms stagger.
- **Scroll reveal**: section blocks fade-and-rise once they enter the viewport (IntersectionObserver, one-shot).
- **Reading progress**: a 2px bar at the very top of post pages, width tracked to scroll-through of the article element.
- **Header scrim**: the sticky nav background fades from transparent to translucent paper once the page has scrolled.
- **Link underlines**: animated via `background-size` on a linear-gradient, growing from left.

No bouncy springs, no scale-up-on-hover by default, no parallax.

## Components

- **Site header**: sticky, hairline rule, wordmark left, three links right. Backdrop-tint on scroll.
- **Hero**: kicker (mono uppercase, accent color) → display headline → serif lede.
- **Post card**: feature image (rounded, hairline border) → mono uppercase category kicker → display-weight title → soft-ink dek → mono uppercase date · reading-time. Image scales subtly and title shifts to accent color on hover.
- **Post body**: standard prose, but blockquotes are full-width with a subtle persimmon left-accent rule on the inset block (not a thick side stripe), `h2` gets a leading mono kicker like `§ 02`.
- **Footer**: hairline rule, three columns on desktop, a single column on mobile. No mailing-list cliché.

## Bans (in addition to the impeccable shared list)

- Big "Read more →" CTAs at the bottom of post excerpts. The post list IS the CTA.
- Tag clouds. Tags appear inline with post metadata; that's enough.
- Profile photo in the hero.
- Auto-playing background gradients (e.g., conic-gradient blob heros).
