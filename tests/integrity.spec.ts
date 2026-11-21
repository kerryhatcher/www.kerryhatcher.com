import { expect, test } from '@playwright/test';
import { baseline } from './support/baseline';

/** Every internal link and local image referenced anywhere in the baseline must resolve. */
const pages = Object.values(baseline.pages);
const internalLinks = new Set<string>();
const localImages = new Set<string>();
for (const p of pages) {
  for (const l of [...p.main.links, ...p.header.nav, ...p.footerLinks]) {
    if (l.href?.startsWith('/') && !l.href.startsWith('//')) internalLinks.add(l.href.split('#')[0]);
  }
  for (const i of p.main.images) {
    if (i.src?.startsWith('/')) localImages.add(i.src);
  }
}
internalLinks.delete('');

test(`all ${internalLinks.size} internal links resolve`, async ({ request }) => {
  const bad: string[] = [];
  for (const href of internalLinks) {
    const res = await request.get(href);
    if (res.status() !== 200) bad.push(`${res.status()} ${href}`);
  }
  expect(bad).toEqual([]);
});

test(`all ${localImages.size} local images resolve to image responses`, async ({ request }) => {
  const bad: string[] = [];
  await Promise.all(
    [...localImages].map(async (src) => {
      const res = await request.get(src);
      const type = res.headers()['content-type'] ?? '';
      // A few legacy Ghost thumbnails have no file extension (served as
      // octet-stream; browsers sniff them). Only enforce a MIME type when
      // the file has an extension.
      const hasExt = /\.[a-z0-9]+$/i.test(src);
      if (res.status() !== 200 || (hasExt && !type.startsWith('image/'))) bad.push(`${res.status()} ${type} ${src}`);
    }),
  );
  expect(bad).toEqual([]);
});

test('home hero + post images actually decode in the browser', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => Promise.all([...document.images].map((i) => { i.loading = 'eager'; return i.decode().catch(() => {}); })));
  const broken = await page.$$eval('img', (imgs) => imgs.filter((i) => !i.naturalWidth).map((i) => i.src));
  expect(broken).toEqual([]);
});
