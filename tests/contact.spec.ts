import { expect, test, type Page } from '@playwright/test';
import { validateHtpEndpoint } from '../src/lib/htp-endpoint.mjs';

// Default build (PUBLIC_HTP_FORM_ENDPOINT unset): hidden page with an explicit unavailable state.
test.describe('hidden contact page (default build)', () => {
  test.skip(!!process.env.CONTACT_HTP_FIXTURE, 'default-build checks; the fixture build has a configured endpoint');

  test('is served directly, noindex, and the form control is disabled', async ({ page }) => {
    const res = await page.goto('/contact/');
    expect(res?.status()).toBe(200);
    await expect(page).toHaveTitle('Contact | Kerry Hatcher');
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.kerryhatcher.com/contact/');
    await expect(page.locator('[data-contact-form]')).not.toHaveAttribute('action', /.+/);
    await expect(page.locator('[data-contact-form] fieldset')).toHaveAttribute('disabled', '');
    await expect(page.locator('[data-contact-form] input[name="name"]')).toBeDisabled();
    await expect(page.locator('[data-submit]')).toBeDisabled();
    await expect(page.locator('[data-unavailable]')).toContainText('The contact form is unavailable');
  });

  test('is absent from the navigation and the sitemap', async ({ page, request }) => {
    await page.goto('/');
    await expect(page.locator('header a[href="/contact/"], nav a[href="/contact/"]')).toHaveCount(0);
    const sitemap = await (await request.get('/sitemap.xml')).text();
    expect(sitemap).not.toContain('/contact/');
  });
});

// Fixture build (CONTACT_HTP_FIXTURE=1, built with the same synthetic endpoint passed as
// CONTACT_HTP_ENDPOINT). Responses are mocked; every other external request is aborted.
test.describe('contact form submission (fixture build)', () => {
  test.skip(!process.env.CONTACT_HTP_FIXTURE, 'set CONTACT_HTP_FIXTURE=1 with the synthetic fixture build');

  // Fail collection loudly in fixture mode rather than letting an empty target hang on unhandled routes.
  const endpoint = process.env.CONTACT_HTP_ENDPOINT ?? '';
  if (process.env.CONTACT_HTP_FIXTURE) {
    if (!endpoint) throw new Error('CONTACT_HTP_ENDPOINT must be set when CONTACT_HTP_FIXTURE=1');
    validateHtpEndpoint(endpoint);
  }

  const local = (url: string) => url.startsWith('http://localhost') || url.startsWith('http://127.0.0.1');

  // Registered before the endpoint route: Playwright matches the most recent route first.
  async function guardExternal(page: Page) {
    await page.route('**/*', route => (local(route.request().url()) ? route.continue() : route.abort()));
  }

  async function fillAndSend(page: Page, name: string) {
    await page.getByLabel('Your name (required)').fill(name);
    await page.getByLabel('Email address (required)').fill('visitor@example.invalid');
    await page.getByRole('button', { name: 'Send message' }).click();
  }

  test('retries reuse one submission ID and only ok:true confirms', async ({ page }) => {
    await guardExternal(page);
    const bodies: { submission_id: string }[] = [];
    let call = 0;
    await page.route(endpoint, async route => {
      bodies.push(JSON.parse(route.request().postData() ?? '{}'));
      call += 1;
      if (call === 1) return route.fulfill({ status: 503, contentType: 'application/json', body: '{}' });
      return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true,"duplicate":false}' });
    });

    await page.goto('/contact/');
    await expect(page.locator('[data-contact-form]')).toHaveAttribute('action', endpoint);
    await fillAndSend(page, 'Test Visitor');
    await expect(page.locator('[data-form-status]')).toContainText('could not confirm');
    await expect(page.locator('[data-form-status]')).not.toContainText('has been received');

    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.locator('[data-form-status]')).toContainText('Thank you');
    expect(bodies).toHaveLength(2);
    expect(bodies[0].submission_id).toMatch(/^[0-9a-f-]{36}$/);
    expect(bodies[1].submission_id).toBe(bodies[0].submission_id);
  });

  test('a 429 keeps the submission ID and body for a same-ID retry', async ({ page }) => {
    // Regression for review B1: form-wide 429 can hit a retry of an already-stored submission,
    // so the client must not discard the ID or report a definite rejection.
    await guardExternal(page);
    const bodies: { submission_id: string; name: string }[] = [];
    let call = 0;
    await page.route(endpoint, async route => {
      bodies.push(JSON.parse(route.request().postData() ?? '{}'));
      call += 1;
      if (call === 1) {
        return route.fulfill({ status: 429, contentType: 'application/json', headers: { 'Retry-After': '600' }, body: '{"error":"rate_limited"}' });
      }
      return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true,"duplicate":true}' });
    });

    await page.goto('/contact/');
    await fillAndSend(page, 'Rate Limited');
    const status = page.locator('[data-form-status]');
    await expect(status).toContainText('too many requests');
    await expect(status).not.toContainText('was not accepted');
    // The control is re-enabled and the details are not cleared, so the same request can be resent.
    await expect(page.getByRole('button', { name: 'Send message' })).toBeEnabled();
    await expect(page.getByLabel('Your name (required)')).toHaveValue('Rate Limited');

    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(status).toContainText('Thank you');
    expect(bodies).toHaveLength(2);
    expect(bodies[1].submission_id).toBe(bodies[0].submission_id);
    expect(bodies[1].name).toBe('Rate Limited');
  });

  test('session storage keeps no raw contact values', async ({ page }) => {
    await guardExternal(page);
    await page.route(endpoint, route => route.fulfill({ status: 503, contentType: 'application/json', body: '{}' }));
    await page.goto('/contact/');
    await fillAndSend(page, 'Private Name Value');
    await expect(page.locator('[data-form-status]')).toContainText('could not confirm');
    const stored = await page.evaluate(() => JSON.stringify(Object.entries(sessionStorage)));
    expect(stored).not.toContain('Private Name Value');
    expect(stored).not.toContain('visitor@example.invalid');
  });

  test('a 2xx without the receipt shape is not confirmed', async ({ page }) => {
    await guardExternal(page);
    await page.route(endpoint, route => route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }));
    await page.goto('/contact/');
    await fillAndSend(page, 'Receipt Check');
    await expect(page.locator('[data-form-status]')).toContainText('could not confirm');
    await expect(page.locator('[data-form-status]')).not.toContainText('has been received');
  });
});
