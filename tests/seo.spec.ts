import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';
import { copyFileSync, cpSync, mkdirSync, readFileSync, readdirSync } from 'node:fs';
import { decodeHTML } from 'entities';
import matter from 'gray-matter';
import { expect, test } from '@playwright/test';
import { postRoutes } from './support/baseline';

test('renders editorial metadata independently of the visible article', async ({ page }, testInfo) => {
  const root = testInfo.outputPath('site');
  const posts = join(root, 'src/content/posts');
  cpSync('src', join(root, 'src'), {
    recursive: true,
    filter: source => resolve(source) !== resolve('src/content/posts'),
  });
  mkdirSync(posts);
  for (const file of ['astro.config.mjs', 'package.json']) {
    copyFileSync(file, join(root, file));
  }
  copyFileSync('tests/fixtures/editorial-search.md', join(posts, '2026-01-01-editorial-search.md'));
  execFileSync(resolve('node_modules/.bin/astro'), ['build'], { cwd: root });

  const html = readFileSync(join(root, 'dist/editorial-search/index.html'), 'utf8');
  await page.setContent(html, { waitUntil: 'domcontentloaded' });
  await expect(page.locator('h1')).toHaveText('A headline for readers');
  await expect(page).toHaveTitle('A title for search | Kerry Hatcher');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', 'Schools & budgets');
});

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
      const title = data.seo_title.trim();
      await expect(page).toHaveTitle(`${title} | Kerry Hatcher`);
      expect(titles.has(title), path).toBe(false);
      titles.add(title);
    }
    if (data.seo_description) {
      const description = decodeHTML(data.seo_description.trim());
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', description);
      expect(descriptions.has(description), path).toBe(false);
      descriptions.add(description);
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
