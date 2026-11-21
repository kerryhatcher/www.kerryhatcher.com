import { expect, test } from '@playwright/test';

const POST = '/out-of-runway-the-fy27-bcsd-budget/';
const READER_KEY = 'kh-reader-mode';

test.beforeEach(async ({ page }) => {
  await page.route(/fonts\.bunny\.net/, (r) => r.abort());
});

test('mobile galleries fill both columns across imported rows', async ({ page }) => {
  await page.setViewportSize({ width: 402, height: 874 });
  await page.goto('/gsdf-patriot-25/');

  const galleries = page.locator('.kg-gallery-container');
  await expect(galleries).toHaveCount(10);
  const rowCounts = await galleries.evaluateAll(albums => albums.map(album => {
    const rows = new Map<number, number>();
    for (const photo of album.querySelectorAll('.kg-gallery-image')) {
      const { top } = photo.getBoundingClientRect();
      rows.set(top, (rows.get(top) ?? 0) + 1);
    }
    return [...rows.values()];
  }));

  for (const rows of rowCounts) {
    expect(rows.slice(0, -1)).not.toContain(1);
    expect(rows.every(count => count === 1 || count === 2)).toBe(true);
  }
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
  test('page numbers are centered in a level row on mobile and desktop', async ({ page }) => {
    for (const width of [402, 1280]) {
      await page.setViewportSize({ width, height: 874 });
      await page.goto('/page/2/');
      const numbers = await page.locator('.pager__page').evaluateAll(elements => elements.map(element => {
        const button = element.getBoundingClientRect();
        const range = document.createRange();
        range.selectNodeContents(element);
        const label = range.getBoundingClientRect();
        return {
          horizontalOffset: label.left + label.width / 2 - button.left - button.width / 2,
          verticalOffset: label.top + label.height / 2 - button.top - button.height / 2,
          top: button.top,
        };
      }));
      expect(numbers).toHaveLength(4);
      for (const number of numbers) {
        expect(Math.abs(number.horizontalOffset)).toBeLessThan(1);
        expect(Math.abs(number.verticalOffset)).toBeLessThan(1);
        expect(Math.abs(number.top - numbers[0].top)).toBeLessThan(1);
      }
    }
  });

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

for (const width of [320, 402]) {
  test(`audited posts reflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 874 });
    for (const path of [
      POST,
      '/digital-privacy-and-freedoms-are-under-threat/',
      '/gsdf-patriot-25/',
      '/install-git-1-8-on-rhel-6/',
      '/its-time-to-switch-to-a-new-email-provider/',
      '/state-of-play-gaming-on-linux-in-the-roaring-20s/',
      '/still-waiting-a-transparency-update-from-bibb-county-schools-and-the-state-superintendent/',
      '/taking-control-of-your-email-part-1-choosing-a-private-email-provider/',
      '/taking-control-of-your-email-part-2-using-your-own-domain-for-email/',
    ]) {
      expect((await page.goto(path))?.ok(), path).toBe(true);
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth, path).toBeLessThanOrEqual(width);
    }

    await page.goto(POST);
    const table = page.locator('.post__body table').first();
    await expect(table).toBeVisible();
    expect((await table.boundingBox())!.width).toBeLessThan(width);

    await page.goto('/better-python-logging/');
    const code = page.locator('.post__body pre').first();
    const scroller = await code.evaluate(node => ({
      client: node.clientWidth,
      scroll: node.scrollWidth,
      overflow: getComputedStyle(node).overflowX,
    }));
    expect(scroller.scroll).toBeGreaterThan(scroller.client);
    expect(scroller.overflow).toBe('auto');
  });
}
