import { existsSync } from 'node:fs';
import { expect, test } from '@playwright/test';

// Baselines are not committed (size). Skip when absent; create them with
// `bun run test:update-screenshots`, then they guard later changes locally.
const HAS_BASELINES = existsSync(new URL('./__screenshots__/visual.spec.ts', import.meta.url));
test.skip(!HAS_BASELINES, 'no local pixel baselines (run bun run test:update-screenshots)');

/**
 * Pixel baselines captured from the Jekyll site. Third-party webfonts are
 * blocked so both builds render with the same fallback fonts, and lazy images
 * are forced to load so full-page shots are deterministic.
 */
const viewports = {
  desktop: { width: 1280, height: 900 },
  mobile: { width: 390, height: 844 },
};

const pages: { name: string; path: string; fullPage: boolean }[] = [
  { name: 'home', path: '/', fullPage: true },
  { name: 'home-page-2', path: '/page/2/', fullPage: true },
  { name: 'about', path: '/about/', fullPage: true },
  { name: '404', path: '/404.html', fullPage: true },
  // Long posts: top of article + a mid-article window (keeps fixtures small).
  { name: 'post-budget', path: '/out-of-runway-the-fy27-bcsd-budget/', fullPage: false },
  { name: 'post-photos', path: '/crossover-2025/', fullPage: false },
  { name: 'post-plain-text', path: '/better-python-logging/', fullPage: false },
];

for (const [vpName, viewport] of Object.entries(viewports)) {
  test.describe(vpName, () => {
    test.use({ viewport });

    for (const p of pages) {
      test(`${p.name}`, async ({ page }) => {
        test.setTimeout(60_000);
        await page.route(/fonts\.bunny\.net/, (r) => r.abort());
        await page.goto(p.path);
        await page.evaluate(() =>
          Promise.all([...document.images].map((i) => { i.loading = 'eager'; return i.decode().catch(() => {}); })),
        );
        await page.evaluate(() => document.fonts.ready);

        if (p.fullPage) {
          await expect(page).toHaveScreenshot(`${p.name}-${vpName}.png`, { fullPage: true });
        } else {
          await expect(page).toHaveScreenshot(`${p.name}-${vpName}-top.png`);
          await page.evaluate(() => window.scrollTo(0, 1800));
          await page.waitForTimeout(150);
          await expect(page).toHaveScreenshot(`${p.name}-${vpName}-mid.png`);
        }
      });
    }
  });
}
