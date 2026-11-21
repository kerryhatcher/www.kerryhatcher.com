import { expect, test } from '@playwright/test';
import { postRoutes } from './support/baseline';

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
