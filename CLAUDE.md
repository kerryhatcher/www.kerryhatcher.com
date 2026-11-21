# CLAUDE.md

## Running the site

Astro static site; **use bun for all Node operations** (`bun install`, `bun run …`,
`bunx …`) — not npm/npx/yarn. `just` wraps the common tasks (`just --list`).

```bash
bun install
bun run dev              # dev server, http://localhost:4321
bun run build            # static output → dist/
bun run preview          # serve dist/
bun run test             # build, then run the Playwright suite against dist/
```

`wrangler.jsonc` deploys `dist/` to Cloudflare Workers Static Assets
(`scripts/deploy.sh`, or `just deploy`).

## Project shape

- Astro 7, `output: 'static'`, `trailingSlash: 'always'`, `build.format: 'directory'`,
  `compressHTML: false`. URLs are `/<slug>/`, `/about/`, `/page/N/`, `/404.html` — they
  must not change (inbound links, feed, sitemap).
- Posts: `src/content/posts/YYYY-MM-DD-slug.{html,md}`. The URL slug is the filename
  minus the date. A custom loader in `src/content.config.ts` reads them: `.html`
  posts are Ghost imports emitted **verbatim** (never run them through Markdown);
  `.md` posts go through Astro's Markdown pipeline (remark `unified()` processor with
  single-tilde strikethrough disabled — see `astro.config.mjs`).
- Pages in `src/pages/` (`index`, `page/[page]`, `[slug]`, `about.md`, `404`,
  `feed.xml.ts` Atom, `sitemap.xml.ts`, legacy redirect stub). Layouts in
  `src/layouts/`, partials in `src/components/`, helpers in `src/lib/`.
- `src/lib/text.ts` / `dates.ts` / `seo.ts` deliberately reproduce Jekyll/Liquid behavior
  (reading-time math, excerpts, seo-tag descriptions, `America/Chicago` dates). Don't
  "simplify" them without re-running the tests — parity depends on the details.
- Single SCSS entry `src/styles/main.scss`; client JS in `src/scripts/main.js`;
  static files (including `public/assets/images/**`) keep their `/assets/...` URLs.
- Site config (title, nav, social, posts per page) lives in `src/lib/site.ts`.
- See `DESIGN.md` for the visual system. Update it when the design changes.

## Tests (Playwright)

`tests/` guards the rendered output — see `tests/README.md`. Key points:

- The suite compares `dist/` against `tests/fixtures/baseline.json` and
  `tests/__screenshots__/` (git-ignored, local only; visual tests skip if absent). The baseline was captured from the original Jekyll site. A failing
  parity test means the output changed; either fix the code or, if the change is
  intentional, re-capture (`bun run capture-baseline`, `bun run test:update-screenshots`)
  and review the diff.
- Always rebuild before testing (`bun run test` does). Running `test:only` against a
  stale `dist/` gives misleading results.
- `bunx playwright` must stay on the version whose Chromium revision is installed
  (currently 1.62.x → revision 1234). If browsers are missing: `bunx playwright install chromium`.
- Playwright context options like `reducedMotion` must go under `use.contextOptions`
  here — the top-level `use.reducedMotion` is silently ignored in this setup.

## Content rules

- Post bodies must start at `<h2>` — the layout emits the only `<h1>`
  (`scripts/check-post-headings.sh`, run by `just build`).
