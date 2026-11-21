import { expect, test } from '@playwright/test';
import { baseline, routes } from './support/baseline';
import { parseFeed, parseSitemap } from './support/xml';

test('feed.xml is a valid Atom feed matching the baseline', async ({ page, request }) => {
  const res = await request.get('/feed.xml');
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toMatch(/xml|atom/);
  await page.goto('/404.html');
  const feed = await parseFeed(page, await res.text());

  const { entries: expectedEntries, ...expectedMeta } = baseline.feed;
  const { entries, ...meta } = feed;
  expect(meta).toEqual(expectedMeta);
  expect(entries).toEqual(expectedEntries);
});

test('sitemap.xml lists exactly the same URLs and lastmod dates', async ({ page, request }) => {
  const res = await request.get('/sitemap.xml');
  expect(res.status()).toBe(200);
  await page.goto('/404.html');
  const sitemap = await parseSitemap(page, await res.text());
  const sort = (u: { loc: string }[]) => [...u].sort((a, b) => a.loc.localeCompare(b.loc));
  expect(sort(sitemap.urls)).toEqual(sort(baseline.sitemap.urls));
  expect(sitemap.urls.map(({ loc }) => new URL(loc).pathname).sort())
    .toEqual(routes.filter(route => route !== '/404.html').sort());
});

test('the legacy redirect stub is excluded from the sitemap', async ({ page, request }) => {
  await page.goto('/404.html');
  const sitemap = await parseSitemap(page, await (await request.get('/sitemap.xml')).text());
  expect(sitemap.urls.map((u) => u.loc).join('\n')).not.toContain('out-of-road');
});
