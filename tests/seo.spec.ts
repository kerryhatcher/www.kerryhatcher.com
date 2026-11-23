import { readFileSync, readdirSync } from 'node:fs';
import matter from 'gray-matter';
import { expect, test } from '@playwright/test';
import { postRoutes } from './support/baseline';

test('article search metadata uses editorial overrides when present', async ({ page }) => {
  const files = readdirSync('src/content/posts');
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  await page.route('**/*', (route) => route.request().resourceType() === 'document' ? route.continue() : route.abort());

  for (const file of files) {
    const { data } = matter(readFileSync(`src/content/posts/${file}`, 'utf8'));
    if (!data.seo_title && !data.seo_description) continue;

    const path = `/${file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.[^.]+$/, '')}/`;
    await page.goto(path, { waitUntil: 'domcontentloaded' });
    if (data.seo_title) {
      await expect(page).toHaveTitle(`${data.seo_title} | Kerry Hatcher`);
      expect(titles.has(data.seo_title), path).toBe(false);
      titles.add(data.seo_title);
    }
    if (data.seo_description) {
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', data.seo_description);
      expect(descriptions.has(data.seo_description), path).toBe(false);
      descriptions.add(data.seo_description);
    }
  }
});

test('each article advertises its feature image and author profile', async ({ page }) => {
  await page.route('**/*', (route) => route.request().resourceType() === 'document' ? route.continue() : route.abort());
  for (const path of postRoutes) {
    await page.goto(path, { waitUntil: 'domcontentloaded' });
    const article = await page.locator('script[type="application/ld+json"]').evaluate(node => JSON.parse(node.textContent!));
    const image = await page.locator('.post__hero img').getAttribute('src');
    expect(image, path).toBeTruthy();
    expect(article['@type'], path).toBe('BlogPosting');
    expect(article.author.url, path).toBe('https://www.kerryhatcher.com/about/');
    expect(article.image, path).toBe(new URL(image!, 'https://www.kerryhatcher.com').href);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', article.image);
    await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute('content', article.image);
  }
});

test('formerly generic descriptions identify their pages', async ({ page }) => {
  const descriptions = new Set<string>();
  await page.route('**/*', (route) => route.request().resourceType() === 'document' ? route.continue() : route.abort());
  for (const path of ['/', '/about/', '/no-kings-protest/', '/page/2/', '/page/3/', '/page/4/']) {
    await page.goto(path, { waitUntil: 'domcontentloaded' });
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description, path).toBeTruthy();
    expect(descriptions.has(description!), path).toBe(false);
    descriptions.add(description!);
  }
});
