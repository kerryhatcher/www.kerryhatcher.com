import { defineConfig, devices } from '@playwright/test';
import { ORIGIN, PORT, SITE_DIR } from './tests/support/site';

/**
 * Runs against the built site in SITE_DIR (default: dist/ — run `bun run build` first,
 * or just `bun run test`). Expectations in tests/fixtures/ and tests/__screenshots__/
 * were captured from the original Jekyll site during the Astro migration; see tests/README.md.
 */
export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: [['list'], ['html', { open: 'never' }]],
  // One baseline image per page regardless of which build produced it.
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.002, animations: 'disabled' },
  },
  use: {
    baseURL: ORIGIN,
    ...devices['Desktop Chrome'],
    // Keeps the scroll-reveal system in its final state for deterministic output.
    contextOptions: { reducedMotion: 'reduce' },
  },
  projects: [{ name: 'chromium' }],
  webServer: {
    command: 'bun tests/support/static-server.ts',
    url: `${ORIGIN}/404.html`,
    reuseExistingServer: false,
    env: { SITE_DIR, PORT: String(PORT) },
  },
});
