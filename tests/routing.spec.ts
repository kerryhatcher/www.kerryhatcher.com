import { expect, test } from '@playwright/test';
import { baseline } from './support/baseline';

test('unknown URLs return a real 404 with the custom 404 page', async ({ page }) => {
  const res = await page.goto('/this-page-does-not-exist/');
  expect(res?.status()).toBe(404);
  await expect(page.locator('h1')).toContainText('That link didn’t go where it was supposed to');
  await expect(page.getByRole('heading', { name: 'Recent writing' })).toBeVisible();
});

test('the 404 page lists the five most recent posts, newest first', async ({ page }) => {
  await page.goto('/404.html');
  const links = page.locator('section[aria-labelledby="error-404-recent"] .error-404__link');
  await expect(links).toHaveCount(5);
  const expected = baseline.pages['/'].main.links
    .filter((l) => l.href !== '/' && l.href?.startsWith('/') && !l.href.startsWith('/page/') && l.href !== '/about/')
    .slice(0, 5)
    .map((l) => l.href);
  const hrefs = await links.evaluateAll((els) => els.map((e) => e.getAttribute('href')));
  expect(hrefs).toEqual(expected);
});

test('directories redirect to their trailing-slash URL', async ({ request }) => {
  const res = await request.get('/about', { maxRedirects: 0 });
  expect([301, 307, 308]).toContain(res.status());
  expect(res.headers()['location']).toMatch(/\/about\/$/);
});

for (const [from, info] of Object.entries(baseline.redirects)) {
  test(`legacy redirect ${from} → ${info.target}`, async ({ page, request }) => {
    const html = await (await request.get(from)).text();
    expect(html).toContain(`url=${info.target}`);
    expect(html).toContain('name="robots" content="noindex"');
    expect(html).toContain(`rel="canonical" href="${info.canonical}"`);

    await page.goto(from);
    await page.waitForURL(`**${info.target}`);
    await expect(page.locator('h1')).toContainText('Out of Runway');
  });
}

test('robots.txt points at the sitemap', async ({ request }) => {
  const res = await request.get('/robots.txt');
  expect(res.status()).toBe(200);
  expect(await res.text()).toBe(baseline.robots);
});
