import type { Page } from '@playwright/test';

/**
 * Everything observable about a rendered page that a reader (or a crawler)
 * could notice. The Jekyll build is captured into tests/fixtures/baseline.json
 * with this exact function; the suite then asserts any other build matches.
 */
export interface PageFacts {
  lang: string | null;
  bodyClass: string;
  title: string;
  canonical: string | null;
  meta: Record<string, string>;
  alternates: { type: string | null; href: string | null; title: string | null }[];
  stylesheets: string[];
  jsonLd: unknown[];
  header: {
    wordmarkHref: string | null;
    wordmarkLabel: string | null;
    nav: { text: string; href: string | null; current: string | null }[];
  };
  footerText: string;
  footerLinks: { text: string; href: string | null }[];
  main: {
    headings: { level: number; text: string }[];
    text: string;
    links: { text: string; href: string | null }[];
    images: Record<string, string | null>[];
    iframes: { src: string | null; title: string | null }[];
    counts: Record<string, number>;
    /** Element-tree outline of the layout shell (post/page prose excluded; runtime state classes ignored). */
    outline: string[];
    /** Whitespace-normalised innerHTML hash of each `.prose` body. */
    proseHashes: string[];
    proseLengths: number[];
  };
}

export async function collectFacts(page: Page): Promise<PageFacts> {
  return page.evaluate(async () => {
    const norm = (s: string | null | undefined) => (s ?? '').replace(/\s+/g, ' ').trim();
    const attr = (el: Element, name: string) => el.getAttribute(name);

    async function sha1(text: string) {
      const buf = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(text));
      return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
    }

    // ---- <head> ----
    const meta: Record<string, string> = {};
    const IGNORED_META = new Set(['generator']);
    document.querySelectorAll('head meta').forEach((m) => {
      const key = attr(m, 'name') ?? attr(m, 'property');
      if (!key || IGNORED_META.has(key)) return;
      const media = attr(m, 'media');
      meta[media ? `${key}[${media}]` : key] = attr(m, 'content') ?? '';
    });

    const jsonLd = [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) =>
      JSON.parse(s.textContent ?? 'null'),
    );

    // ---- header / footer ----
    const wordmark = document.querySelector('.site-header .wordmark');
    const header = {
      wordmarkHref: wordmark ? attr(wordmark, 'href') : null,
      wordmarkLabel: wordmark ? attr(wordmark, 'aria-label') : null,
      nav: [...document.querySelectorAll('.site-nav a')].map((a) => ({
        text: norm(a.textContent),
        href: attr(a, 'href'),
        current: attr(a, 'aria-current'),
      })),
    };
    const footer = document.querySelector('.site-footer');
    // The colophon year is "now"; mask it so the baseline doesn't expire.
    const footerText = norm((footer as HTMLElement | null)?.innerText).replace(/©\s*\d{4}/, '© YYYY');

    // ---- <main> ----
    const main = document.querySelector('main')!;
    const proses = [...main.querySelectorAll('.prose')];
    const inProse = (el: Element) => proses.some((p) => p.contains(el));

    const outline: string[] = [];
    const walk = (el: Element, depth: number) => {
      if (el.classList.contains('prose')) {
        outline.push(`${depth}:.prose`);
        return;
      }
      const attrs = [...el.attributes]
        .map((a) => a.name)
        .filter((n) => n === 'role' || n.startsWith('aria-') || n.startsWith('data-') || n === 'id' || n === 'rel')
        .sort()
        .map((n) => (n === 'id' || n === 'role' || n === 'aria-current' ? `${n}=${el.getAttribute(n)}` : n))
        .join(',');
      outline.push(`${depth}:${el.tagName.toLowerCase()}${[...el.classList].filter((c) => c !== 'is-visible' && c !== 'is-scrolled').map((c) => '.' + c).join('')}${attrs ? `[${attrs}]` : ''}`);
      [...el.children].forEach((c) => walk(c, depth + 1));
    };
    walk(main, 0);

    // Jekyll's rouge highlighter tagged inline <code> with these classes. Nothing in
    // the stylesheet uses them, so they're not part of the comparison.
    const JEKYLL_ONLY_CLASSES = ['language-plaintext', 'highlighter-rouge'];
    const proseHashes: string[] = [];
    const proseLengths: number[] = [];
    for (const p of proses) {
      const clone = p.cloneNode(true) as HTMLElement;
      clone.querySelectorAll('.highlighter-rouge').forEach((el) => {
        JEKYLL_ONLY_CLASSES.forEach((c) => el.classList.remove(c));
        if (!el.getAttribute('class')) el.removeAttribute('class');
      });
      const html = clone.innerHTML.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
      proseHashes.push(await sha1(html));
      proseLengths.push(html.length);
    }

    const count = (sel: string) => main.querySelectorAll(sel).length;

    return {
      lang: document.documentElement.getAttribute('lang'),
      bodyClass: document.body.className,
      title: document.title,
      canonical: attr(document.querySelector('link[rel="canonical"]')!, 'href'),
      meta,
      alternates: [...document.querySelectorAll('link[rel="alternate"]')].map((l) => ({
        type: attr(l, 'type'),
        href: attr(l, 'href'),
        title: attr(l, 'title'),
      })),
      stylesheets: [...document.querySelectorAll('link[rel="stylesheet"]')].map((l) => attr(l, 'href') ?? ''),
      jsonLd,
      header,
      footerText,
      footerLinks: [...(footer?.querySelectorAll('a') ?? [])].map((a) => ({ text: norm(a.textContent), href: attr(a, 'href') })),
      main: {
        headings: [...main.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => ({
          level: Number(h.tagName[1]),
          text: norm(h.textContent),
        })),
        // innerText = what a reader sees (CSS-aware), not raw DOM whitespace.
        text: norm(main.innerText),
        links: [...main.querySelectorAll('a[href]')].map((a) => ({ text: norm(a.textContent), href: attr(a, 'href') })),
        images: [...main.querySelectorAll('img')].map((img) => ({
          src: attr(img, 'src'),
          srcset: attr(img, 'srcset'),
          alt: attr(img, 'alt'),
          width: attr(img, 'width'),
          height: attr(img, 'height'),
          loading: attr(img, 'loading'),
          fetchpriority: attr(img, 'fetchpriority'),
        })),
        iframes: [...main.querySelectorAll('iframe')].map((f) => ({ src: attr(f, 'src'), title: attr(f, 'title') })),
        counts: {
          p: count('p'),
          figure: count('figure'),
          figcaption: count('figcaption'),
          table: count('table'),
          pre: count('pre'),
          code: count('code'),
          ul: count('ul'),
          ol: count('ol'),
          li: count('li'),
          blockquote: count('blockquote'),
          proseElements: proses.reduce((n, p) => n + p.querySelectorAll('*').length, 0),
          shellElements: [...main.querySelectorAll('*')].filter((e) => !inProse(e)).length,
        },
        outline,
        proseHashes,
        proseLengths,
      },
    };
  });
}
