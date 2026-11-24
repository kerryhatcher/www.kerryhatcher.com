import { expect, test } from '@playwright/test';

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

// Fixture build (CONTACT_HTP_FIXTURE=1, built with a synthetic .invalid endpoint): exercises
// the submission contract against mocked responses. Every external request is aborted.
test.describe('contact form submission (fixture build)', () => {
  test.skip(!process.env.CONTACT_HTP_FIXTURE, 'set CONTACT_HTP_FIXTURE=1 with the synthetic fixture build');

  // Must equal the PUBLIC_HTP_FORM_ENDPOINT the fixture build was made with.
  const endpoint = process.env.CONTACT_HTP_ENDPOINT ?? '';

  test('retries reuse one submission ID and only ok:true confirms', async ({ page }) => {
    await page.route('**/*', route => {
      const url = route.request().url();
      if (url.startsWith(endpoint)) return; // handled below
      return url.startsWith('http://localhost') || url.startsWith('http://127.0.0.1')
        ? route.continue()
        : route.abort();
    });
    const bodies: { submission_id: string; name: string }[] = [];
    let call = 0;
    await page.route(endpoint, async route => {
      bodies.push(JSON.parse(route.request().postData() ?? '{}'));
      call += 1;
      if (call === 1) return route.fulfill({ status: 503, contentType: 'application/json', body: '{"ok":false}' });
      return route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true,"duplicate":false}' });
    });

    await page.goto('/contact/');
    await expect(page.locator('[data-contact-form]')).toHaveAttribute('action', endpoint);
    await page.getByLabel('Your name (required)').fill('Test Visitor');
    await page.getByLabel('Email address (required)').fill('visitor@example.invalid');
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.locator('[data-form-status]')).toContainText('could not confirm');
    await expect(page.locator('[data-form-status]')).not.toContainText('has been received');

    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.locator('[data-form-status]')).toContainText('Thank you');
    expect(bodies).toHaveLength(2);
    expect(bodies[0].submission_id).toMatch(/^[0-9a-f-]{36}$/);
    expect(bodies[1].submission_id).toBe(bodies[0].submission_id);
  });

  test('session storage keeps no raw contact values', async ({ page }) => {
    await page.route(endpoint, route => route.fulfill({ status: 503, contentType: 'application/json', body: '{}' }));
    await page.route('**/*', route => (route.request().url().startsWith('http://localhost') || route.request().url().startsWith('http://127.0.0.1')) ? route.continue() : route.abort());
    await page.goto('/contact/');
    await page.getByLabel('Your name (required)').fill('Private Name Value');
    await page.getByLabel('Email address (required)').fill('private.value@example.invalid');
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.locator('[data-form-status]')).toContainText('could not confirm');
    const stored = await page.evaluate(() => JSON.stringify(Object.entries(sessionStorage)));
    expect(stored).not.toContain('Private Name Value');
    expect(stored).not.toContain('private.value@example.invalid');
  });

  test('a 2xx without the receipt shape is not confirmed', async ({ page }) => {
    await page.route(endpoint, route => route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' }));
    await page.route('**/*', route => (route.request().url().startsWith('http://localhost') || route.request().url().startsWith('http://127.0.0.1')) ? route.continue() : route.abort());
    await page.goto('/contact/');
    await page.getByLabel('Your name (required)').fill('Receipt Check');
    await page.getByLabel('Email address (required)').fill('receipt@example.invalid');
    await page.getByRole('button', { name: 'Send message' }).click();
    await expect(page.locator('[data-form-status]')).toContainText('could not confirm');
    await expect(page.locator('[data-form-status]')).not.toContainText('has been received');
  });
});
