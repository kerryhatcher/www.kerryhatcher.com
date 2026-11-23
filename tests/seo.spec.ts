import { expect, test } from '@playwright/test';
import { postRoutes } from './support/baseline';

test('article search metadata uses editorial overrides', async ({ page }) => {
  await page.route('**/*', (route) => route.request().resourceType() === 'document' ? route.continue() : route.abort());
  const titles = new Set<string>();
  const descriptions = new Set<string>();
  for (const path of postRoutes) {
    await page.goto(path, { waitUntil: 'domcontentloaded' });
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(title, path).toBeTruthy();
    expect(description, path).toBeTruthy();
    expect(titles.has(title), path).toBe(false);
    expect(descriptions.has(description!), path).toBe(false);
    titles.add(title);
    descriptions.add(description!);
  }

  await page.goto('/taking-control-of-your-email-part-1-choosing-a-private-email-provider/');
  await expect(page).toHaveTitle('Fastmail vs. mailbox.org and Other Private Email Options | Kerry Hatcher');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Fastmail.*mailbox\.org/);
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
