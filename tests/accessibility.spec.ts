import { expect, test } from '@playwright/test';
import { ORIGIN } from './support/site';
import { routes } from './support/baseline';

test('all pages reflow at 320px with text enlarged to 200%', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 874 });
  for (const path of routes) {
    await page.goto(path, { waitUntil: 'domcontentloaded' });
    await page.addStyleTag({ content: 'html { font-size: 200%; }' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth), path).toBe(320);
  }
  await page.goto('/out-of-runway-the-fy27-bcsd-budget/');
  await page.addStyleTag({ content: 'html { font-size: 200%; }' });
  const table = page.getByRole('region', { name: 'Scrollable table' }).first();
  await table.focus();
  await expect(table).toBeFocused();
  await page.keyboard.press('ArrowRight');
  await expect.poll(() => table.evaluate(element => element.scrollLeft)).toBeGreaterThan(0);
});

test('About and error pages fit at 200% text on a narrow screen', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 874 });
  for (const path of ['/about/', '/404.html', '/missing-page-for-accessibility-check/']) {
    await page.goto(path);
    await page.addStyleTag({ content: 'html { font-size: 200%; }' });
    expect(await page.evaluate(() => document.documentElement.scrollWidth), path).toBe(320);
    const about = page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: 'About' });
    await expect(about).toBeInViewport({ ratio: 1 });
  }
});

test.beforeEach(async ({ page }) => {
  await page.route('**/*', (route) =>
    new URL(route.request().url()).origin === ORIGIN ? route.continue() : route.abort(),
  );
});

for (const colorScheme of ['light', 'dark'] as const) {
  test(`split-card emphasis stays legible in ${colorScheme} mode`, async ({ page }) => {
    await page.emulateMedia({ colorScheme });
    await page.setViewportSize({ width: 402, height: 874 });
    await page.goto('/investing-in-bibb-countys-future/');
    const heading = page.locator('#how-does-bibb-county-compare-in-teacher-pay');
    await expect(heading.locator('strong')).toHaveCSS('color', 'rgb(255, 255, 255)');
    await expect(heading.locator('xpath=ancestor::div[contains(@class, "kg-header-card ")][1]'))
      .toHaveCSS('background-color', 'rgb(0, 0, 0)');
  });
}

test('image links and restored citations have accessible names', async ({ page }) => {
  await page.goto('/digital-privacy-and-freedoms-are-under-threat/');
  await expect(page.getByRole('link', { name: /Salt Typhoon telecom hacks/ })).toBeVisible();
  await expect(page.getByRole('link', { name: '', exact: true })).toHaveCount(0);
  await page.goto('/taking-control-of-your-email-part-1-choosing-a-private-email-provider/');
  await expect(page.getByRole('link', { name: 'Fastmail’s guide to SPF records' })).toBeVisible();
  await expect(page.getByRole('link', { name: '', exact: true })).toHaveCount(0);
});

test('imported banner text prints dark on paper', async ({ page }) => {
  await page.emulateMedia({ media: 'print', colorScheme: 'dark' });
  await page.goto('/investing-in-bibb-countys-future/');
  const heading = page.locator('#how-does-bibb-county-compare-in-teacher-pay');
  await expect(heading).toHaveCSS('color', 'rgb(26, 26, 26)');
  await expect(heading.locator('strong')).toHaveCSS('color', 'rgb(26, 26, 26)');
  await expect(page.locator('#together-we-will-succeed')).toHaveCSS('color', 'rgb(26, 26, 26)');
  await expect(page.locator('.kg-header-card').filter({ has: heading })).toHaveCSS('background-color', 'rgb(255, 255, 255)');
});

test('map and trailer frames have descriptive titles', async ({ page }) => {
  await page.goto('/better-schools-brighter-futures-literacy-special-edition/');
  await expect(page.locator('iframe[src*="google.com/maps/embed"]'))
    .toHaveAttribute('title', 'Map of the Bibb County Professional Learning Center');
  await page.goto('/state-of-play-gaming-on-linux-in-the-roaring-20s/');
  await expect(page.locator('iframe[src*="DR01YdFtWFI"]')).toHaveAttribute('title', 'Factorio trailer');
});

test('DNS figures expose their results and section headings retain their IDs', async ({ page }) => {
  await page.goto('/make-your-internet-faster-and-safer-for-free/#1-speed');
  await expect(page.getByRole('heading', { name: '1. Speed', level: 3 })).toHaveAttribute('id', '1-speed');
  await expect(page.getByRole('img', { name: /283 ms for DNS resolution/ })).toBeVisible();
  await expect(page.getByRole('img', { name: /Cloudflare 1\.1\.1\.1 was second at 9\.88 ms/ })).toBeVisible();
  await page.goto('/a-successful-beginning-not-an-end/#-1');
  await expect(page.locator('[id="-1"]')).toHaveCount(1);
  await expect(page.getByRole('heading', { name: '', exact: true })).toHaveCount(0);
});
