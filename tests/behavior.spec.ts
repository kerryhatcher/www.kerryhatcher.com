import { expect, test } from '@playwright/test';

const POST = '/out-of-runway-the-fy27-bcsd-budget/';
const READER_KEY = 'kh-reader-mode';

test.beforeEach(async ({ page }) => {
  await page.route(/fonts\.bunny\.net/, (r) => r.abort());
});

test.describe('reader-mode toggle', () => {
  test('toggles the data-reader attribute, aria-pressed, and localStorage', async ({ page }) => {
    await page.goto(POST);
    const toggle = page.locator('[data-reader-toggle]');
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('html')).not.toHaveAttribute('data-reader', /.*/);

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('html')).toHaveAttribute('data-reader', 'on');
    expect(await page.evaluate((k) => localStorage.getItem(k), READER_KEY)).toBe('on');

    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('html')).not.toHaveAttribute('data-reader', /.*/);
    expect(await page.evaluate((k) => localStorage.getItem(k), READER_KEY)).toBeNull();
  });

  test('persists across reload and applies before first paint (no flash)', async ({ page }) => {
    await page.goto(POST);
    await page.locator('[data-reader-toggle]').click();
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-reader', 'on');
    await expect(page.locator('[data-reader-toggle]')).toHaveAttribute('aria-pressed', 'true');

    const font = await page.locator('.post__body').evaluate((el) => getComputedStyle(el).fontFamily);
    expect(font).toContain('Atkinson Hyperlegible');
  });

  test('preference carries over to other pages', async ({ page }) => {
    await page.goto(POST);
    await page.locator('[data-reader-toggle]').click();
    await page.goto('/about/');
    await expect(page.locator('html')).toHaveAttribute('data-reader', 'on');
  });

  test('only post pages have the toggle', async ({ page }) => {
    for (const path of ['/', '/about/', '/404.html']) {
      await page.goto(path);
      await expect(page.locator('[data-reader-toggle]')).toHaveCount(0);
    }
  });
});

test.describe('chrome', () => {
  test('html swaps no-js for js once scripts run', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveClass(/\bjs\b/);
    await expect(page.locator('html')).not.toHaveClass(/no-js/);
  });

  test('skip link is the first tab stop and targets #main', async ({ page }) => {
    await page.goto('/about/');
    await page.keyboard.press('Tab');
    const skip = page.locator('.skip-link');
    await expect(skip).toBeFocused();
    await expect(skip).toHaveAttribute('href', '#main');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main$/);
    await expect(page.locator('main#main')).toHaveCount(1);
  });

  test('primary nav marks the current page', async ({ page }) => {
    await page.goto('/about/');
    await expect(page.locator('.site-nav a[aria-current="page"]')).toHaveText('About');
  });

  test('wordmark links home and is labelled', async ({ page }) => {
    await page.goto('/about/');
    const wm = page.locator('.site-header .wordmark');
    await expect(wm).toHaveAttribute('aria-label', 'Kerry Hatcher, home');
    await wm.click();
    await expect(page).toHaveURL('/');
  });

  test('sticky header gains its scrim after scrolling', async ({ page }) => {
    await page.goto(POST);
    const header = page.locator('[data-site-header]');
    await expect(header).not.toHaveClass(/is-scrolled/);
    await page.mouse.wheel(0, 400);
    await expect(header).toHaveClass(/is-scrolled/);
    await page.mouse.wheel(0, -2000);
    await expect(header).not.toHaveClass(/is-scrolled/);
  });

  // NOTE: /page/2+ currently have no <h1> (hero is page-1 only); parity pins that.
  test('every page has exactly one h1', async ({ page }) => {
    for (const path of ['/', '/about/', '/404.html', POST, '/crossover-2025/']) {
      await page.goto(path);
      await expect(page.locator('h1'), path).toHaveCount(1);
    }
  });
});

test.describe('reading progress (posts)', () => {
  test('bar starts empty and fills as the reader scrolls', async ({ page }) => {
    await page.goto(POST);
    const bar = page.locator('.reading-progress__bar');
    const scale = () => bar.evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).a);

    expect(await scale()).toBeLessThan(0.05);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await expect.poll(scale).toBeGreaterThan(0.2);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect.poll(scale).toBeGreaterThan(0.9);
  });

  test('is absent on non-post pages', async ({ page }) => {
    await page.goto('/about/');
    await expect(page.locator('[data-reading-progress]')).toHaveCount(0);
  });
});

test.describe('scroll reveal', () => {
  test.use({ contextOptions: { reducedMotion: 'no-preference' } });

  test('above-the-fold content reveals; below-the-fold waits for scroll', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hero__kicker')).toHaveClass(/is-visible/);

    const lastCard = page.locator('.post-card').last();
    await expect(lastCard).not.toHaveClass(/is-visible/);
    await lastCard.scrollIntoViewIfNeeded();
    await expect(lastCard).toHaveClass(/is-visible/);
  });

  test('staggered groups get increasing, capped transition delays', async ({ page }) => {
    await page.goto('/about/');
    const delays = await page
      .locator('[data-reveal-stagger] [data-reveal]')
      .evaluateAll((els) => els.map((e) => (e as HTMLElement).style.transitionDelay));
    expect(delays[0]).toBe('0ms');
    expect(delays[1]).toBe('70ms');
    expect(Math.max(...delays.map((d) => parseInt(d)))).toBeLessThanOrEqual(480);
  });
});

test.describe('reduced motion', () => {
  test.use({ contextOptions: { reducedMotion: 'reduce' } });
  test('everything is revealed immediately', async ({ page }) => {
    await page.goto('/');
    const hidden = await page.$$eval('[data-reveal]', (els) => els.filter((e) => getComputedStyle(e).opacity !== '1').length);
    expect(hidden).toBe(0);
  });
});

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('content stays visible and readable', async ({ page }) => {
    await page.goto(POST);
    await expect(page.locator('h1')).toBeVisible();
    const op = await page.locator('.post__dek').evaluate((el) => getComputedStyle(el).opacity);
    expect(op).toBe('1');
    await expect(page.locator('.post__body p').first()).toBeVisible();
  });
});

test.describe('home pagination', () => {
  test('page 1 shows 12 cards with a featured + two large lead cards', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.post-card')).toHaveCount(12);
    await expect(page.locator('.post-card--featured')).toHaveCount(1);
    await expect(page.locator('.post-card--large')).toHaveCount(2);
    await expect(page.locator('.archive__meta')).toContainText('43 pieces');
    await expect(page.locator('.pager__prev a')).toHaveCount(0);
    await expect(page.locator('.pager__next a')).toHaveAttribute('href', '/page/2/');
  });

  test('walking Older → Older → Newer lands on the right pages', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: /Older/ }).click();
    await expect(page).toHaveURL('/page/2/');
    await expect(page.locator('.archive__title')).toContainText('Writing, page 2');
    await expect(page.locator('.hero')).toHaveCount(0);
    await expect(page.locator('.pager__page.is-current')).toHaveText('2');

    await page.getByRole('link', { name: /Older/ }).click();
    await expect(page).toHaveURL('/page/3/');
    await page.getByRole('link', { name: /Newer/ }).click();
    await expect(page).toHaveURL('/page/2/');
  });

  test('last page has no Older link; cards total 43 across pages', async ({ page }) => {
    let total = 0;
    for (const p of ['/', '/page/2/', '/page/3/', '/page/4/']) {
      await page.goto(p);
      total += await page.locator('.post-card').count();
    }
    expect(total).toBe(43);
    await expect(page.locator('.pager__next a')).toHaveCount(0);
  });

  test('a card opens its post', async ({ page }) => {
    await page.goto('/');
    await page.locator('.post-card--featured a').click();
    await expect(page).toHaveURL(POST);
    await expect(page.locator('h1')).toHaveText('Out of Runway: The FY27 BCSD Budget');
    await page.getByRole('link', { name: /Back to writing/ }).click();
    await expect(page).toHaveURL('/');
  });
});

test.describe('mobile layout', () => {
  test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  for (const path of ['/', '/about/', POST, '/crossover-2025/']) {
    test(`no horizontal overflow on ${path}`, async ({ page }) => {
      await page.goto(path);
      const { scrollWidth, clientWidth } = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
      }));
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth);
    });
  }

  test('YouTube embed fits the column and keeps a 16:9 shape', async ({ page }) => {
    await page.goto(POST);
    const iframe = page.locator('iframe[src*="youtube"]').first();
    await iframe.scrollIntoViewIfNeeded();
    const box = (await iframe.boundingBox())!;
    expect(box.width).toBeLessThanOrEqual(390);
    expect(box.width).toBeGreaterThan(250);
    expect(box.width / box.height).toBeCloseTo(16 / 9, 1);
  });
});
