# Tests

Playwright suite that guards the site's rendered output. It was written *before* the
Jekyll → Astro migration, captured against the Jekyll build, and then used to drive
the Astro port until the two matched.

```bash
bun run test            # astro build, then run everything against dist/
bun run test:only       # reuse the existing dist/
```

| Spec | What it checks |
| --- | --- |
| `parity.spec.ts` | Every page (49) vs `fixtures/baseline.json`: head/SEO meta, JSON-LD, nav/footer, headings, visible text, links, images, layout outline, post-body HTML hash |
| `feed-sitemap.spec.ts` | Atom feed entries and sitemap URLs/lastmod vs baseline |
| `routing.spec.ts` | Real 404 + custom page, trailing-slash redirect, legacy redirect stub, robots.txt |
| `integrity.spec.ts` | Every internal link and local image resolves; images decode |
| `behavior.spec.ts` | Reader-mode toggle + persistence, reveal-on-scroll, reading progress, sticky header, skip link, pagination, mobile overflow/YouTube embed |
| `visual.spec.ts` | Pixel baselines (desktop + mobile) in `__screenshots__/` — **local only, not committed**; skipped when absent |

`support/static-server.ts` mimics Cloudflare Static Assets routing (`auto-trailing-slash`,
`404-page`) so tests exercise production-like URLs.

## Updating baselines on purpose

If you *intend* to change the site, update the expectations and review the git diff:

```bash
bun run capture-baseline            # rewrites tests/fixtures/baseline.json from dist/
bun run test:update-screenshots     # (re)creates the local, git-ignored tests/__screenshots__/
```

## Known quirks preserved from Jekyll

The migration kept behavior 1:1. These pre-existing oddities are intentionally reproduced
(and therefore pinned by the baseline) — fix them deliberately and re-capture:

- Home (`/`) and `/page/N/` don't mark "Home" with `aria-current` in the nav.
- `/page/2+` have no `<h1>` (the hero, which holds it, only renders on page 1).
- jekyll-seo-tag dropped a `|` in titles (`Networking 101 | …` → `Networking 101 …`) in og/twitter/JSON-LD.
- JSON-LD `description` contains literal HTML entities (`&#39;`, `&nbsp;`).
- `<link rel="alternate" type="application/atom+xml">` is emitted twice (absolute + relative).
- A few legacy Ghost thumbnails have no file extension and are served as `application/octet-stream`.

Only one deliberate difference: Jekyll's rouge classes (`language-plaintext highlighter-rouge`)
on inline `<code>` are ignored by the comparison — no CSS references them.
