// Side-by-side screenshot of post body content: local vs live.
// Usage: node scripts/compare_posts.mjs [slug1 slug2 ...]
// If no slugs are given, uses a built-in shortlist.

import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const SLUGS = process.argv.slice(2).length ? process.argv.slice(2) : [
  'trust-then-verify-1-035-reasons-why',
  'im-running-for-the-bibb-county-board-of-education',
  'coding-with-ai-how-real-time-collaboration-transforms-your-workflow',
  'taking-control-of-your-email-part-1-choosing-a-private-email-provider',
  'in-pictures-a-day-of-action-and-art-in-downtown-macon',
  'introducing-the-better-schools-brighter-futures-series-learning-from-schools-that-beat-the-odds-2',
  'yesterday-and-tomorrow',
  'gear-review-system76-pangolin-12-2',
];

const ROOT = path.resolve(process.argv[1], '../..');
const OUT = path.join(ROOT, '_screenshots');
for (const sub of ['local', 'live']) fs.mkdirSync(path.join(OUT, sub), { recursive: true });

const VIEW = { width: 1200, height: 900 };
const LOCAL_BASE = 'http://127.0.0.1:4000';
const LIVE_BASE  = 'https://www.kerryhatcher.com';

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 1, colorScheme: 'dark' });

async function shot(page, url, sel, outPath) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 45_000 }).catch(() => {});
  await page.waitForTimeout(800);
  // Force any reveal animations into final state.
  await page.evaluate(() => {
    for (const el of document.querySelectorAll('[data-reveal],[data-reveal-stagger]')) {
      el.classList.add('is-visible');
      el.style.opacity = '1';
      el.style.transform = 'none';
    }
  });
  const el = await page.$(sel);
  if (el) await el.screenshot({ path: outPath });
  else await page.screenshot({ path: outPath, fullPage: true });
}

for (const slug of SLUGS) {
  console.log('->', slug);
  const page = await ctx.newPage();
  try {
    await shot(page, `${LOCAL_BASE}/${slug}/`, '.post__body', path.join(OUT, 'local', `${slug}.png`));
    await shot(page, `${LIVE_BASE}/${slug}/`, '.gh-content', path.join(OUT, 'live', `${slug}.png`));
  } catch (e) {
    console.error('!!', slug, e.message);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log('done');
