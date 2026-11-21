/**
 * Snapshot the rendered facts of a built site into tests/fixtures/baseline.json.
 *
 *   bun run capture-baseline        # reads SITE_DIR (default dist/)
 *
 * The committed baseline was captured from the Jekyll build during the Astro
 * migration. Re-capturing from Astro output *accepts* the current site as the
 * new truth — do it only for intentional changes, and review the git diff.
 */
import { readdirSync, statSync, writeFileSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { chromium } from '@playwright/test';
import { collectFacts } from './facts';
import { ORIGIN, PORT, SITE_DIR } from './site';
import { parseFeed, parseSitemap } from './xml';

function walk(dir: string, out: string[] = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

// Routes = every index.html outside /assets, plus the 404 page.
const routes = walk(SITE_DIR)
  .map((f) => '/' + relative(SITE_DIR, f))
  .filter((r) => !r.startsWith('/assets/'))
  .filter((r) => r.endsWith('/index.html') || r === '/index.html' || r === '/404.html')
  .map((r) => (r.endsWith('/index.html') ? r.slice(0, -'index.html'.length) : r))
  .sort();

const server = Bun.spawn(['bun', 'tests/support/static-server.ts'], {
  env: { ...process.env, SITE_DIR, PORT: String(PORT) },
  stdout: 'ignore',
  stderr: 'inherit',
});
await Bun.sleep(600);

const browser = await chromium.launch();
const context = await browser.newContext({ reducedMotion: 'reduce', baseURL: ORIGIN });
const page = await context.newPage();
// Fonts are third-party and irrelevant to facts.
await page.route(/fonts\.bunny\.net/, (r) => r.abort());

const pages: Record<string, unknown> = {};
const redirects: Record<string, { target: string; canonical: string | null; robots: string | null }> = {};

for (const route of routes) {
  const html = readFileSync(join(SITE_DIR, route.endsWith('/') ? route + 'index.html' : route), 'utf8');
  // Jekyll-era redirect stubs are not real pages; capture them as redirects.
  const refresh = html.match(/http-equiv="refresh"[^>]*url=([^"]+)"/i);
  if (refresh) {
    redirects[route] = {
      target: refresh[1],
      canonical: html.match(/rel="canonical"\s+href="([^"]+)"/)?.[1] ?? null,
      robots: html.match(/name="robots"\s+content="([^"]+)"/)?.[1] ?? null,
    };
    continue;
  }
  await page.goto(route, { waitUntil: 'load' });
  pages[route] = await collectFacts(page);
  console.log('captured', route);
}

await page.goto('/404.html');
const feedXml = await (await page.request.get('/feed.xml')).text();
const sitemapXml = await (await page.request.get('/sitemap.xml')).text();
const robots = await (await page.request.get('/robots.txt')).text();
const feed = await parseFeed(page, feedXml);
const sitemap = await parseSitemap(page, sitemapXml);

writeFileSync(
  'tests/fixtures/baseline.json',
  JSON.stringify({ source: 'jekyll', pages, redirects, feed, sitemap, robots }, null, 1) + '\n',
);
console.log(`\nwrote tests/fixtures/baseline.json (${Object.keys(pages).length} pages)`);

await browser.close();
server.kill();
