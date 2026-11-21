import { expect, test } from '@playwright/test';
import { baseline, routes } from './support/baseline';
import { collectFacts, type PageFacts } from './support/facts';

/**
 * Every page of the Jekyll baseline must render identically (head, chrome,
 * text, links, images, layout outline and post-body HTML) in the build under test.
 */
const isExternal = (href: string) => /^https?:\/\//.test(href);

const sections: Record<string, (f: PageFacts) => unknown> = {
  head: (f) => ({
    lang: f.lang,
    bodyClass: f.bodyClass,
    title: f.title,
    canonical: f.canonical,
    meta: f.meta,
    alternates: f.alternates,
    jsonLd: f.jsonLd,
    externalStylesheets: f.stylesheets.filter(isExternal),
    hasLocalStylesheet: f.stylesheets.some((s) => !isExternal(s)),
  }),
  'header & footer': (f) => ({ header: f.header, footerText: f.footerText, footerLinks: f.footerLinks }),
  headings: (f) => f.main.headings,
  'visible text': (f) => f.main.text,
  links: (f) => f.main.links,
  images: (f) => f.main.images,
  iframes: (f) => f.main.iframes,
  'element counts': (f) => f.main.counts,
  'layout outline': (f) => f.main.outline,
  'post body HTML': (f) => ({ hashes: f.main.proseHashes, lengths: f.main.proseLengths }),
};

for (const route of routes) {
  test(`parity ${route}`, async ({ page }) => {
    await page.route(/fonts\.bunny\.net/, (r) => r.abort());
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);

    const actual = await collectFacts(page);
    const expected = baseline.pages[route];
    for (const [name, pick] of Object.entries(sections)) {
      expect.soft(pick(actual), name).toEqual(pick(expected));
    }
  });
}
