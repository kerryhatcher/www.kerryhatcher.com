import type { Page } from '@playwright/test';

export interface FeedFacts {
  title: string;
  subtitle: string;
  author: string;
  id: string;
  links: { rel: string | null; href: string | null }[];
  entries: {
    title: string;
    href: string | null;
    id: string;
    published: string;
    updated: string;
    contentHash: string;
  }[];
}

export interface SitemapFacts {
  urls: { loc: string; lastmod: string | null }[];
}

/** Parse XML text inside the browser (no extra dependencies needed). */
export async function parseFeed(page: Page, xml: string): Promise<FeedFacts> {
  return page.evaluate(async (xml) => {
    const doc = new DOMParser().parseFromString(xml, 'application/xml');
    if (doc.querySelector('parsererror')) throw new Error('feed.xml is not well-formed XML');
    const text = (el: Element | null | undefined) => (el?.textContent ?? '').trim();
    const sha1 = async (s: string) => {
      const b = await crypto.subtle.digest('SHA-1', new TextEncoder().encode(s));
      return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join('');
    };
    const feed = doc.documentElement;
    const direct = (parent: Element, name: string) => [...parent.children].filter((c) => c.localName === name);
    const entries = [];
    for (const e of direct(feed, 'entry')) {
      // Parse as HTML so serialization-only differences (`<img />` vs `<img>`) don't count,
      // and drop Jekyll's rouge-only classes (see facts.ts).
      const body = new DOMParser().parseFromString(text(direct(e, 'content')[0]), 'text/html').body;
      body.querySelectorAll('.highlighter-rouge').forEach((el) => {
        el.classList.remove('language-plaintext', 'highlighter-rouge');
        if (!el.getAttribute('class')) el.removeAttribute('class');
      });
      const html = body.innerHTML.replace(/>\s+</g, '><').replace(/\s+/g, ' ').trim();
      entries.push({
        title: text(direct(e, 'title')[0]),
        href: direct(e, 'link')[0]?.getAttribute('href') ?? null,
        id: text(direct(e, 'id')[0]),
        published: text(direct(e, 'published')[0]),
        updated: text(direct(e, 'updated')[0]),
        contentHash: await sha1(html),
      });
    }
    return {
      title: text(direct(feed, 'title')[0]),
      subtitle: text(direct(feed, 'subtitle')[0]),
      author: text(direct(direct(feed, 'author')[0], 'name')[0]),
      id: text(direct(feed, 'id')[0]),
      links: direct(feed, 'link').map((l) => ({ rel: l.getAttribute('rel'), href: l.getAttribute('href') })),
      entries,
    };
  }, xml);
}

export async function parseSitemap(page: Page, xml: string): Promise<SitemapFacts> {
  return page.evaluate((xml) => {
    const doc = new DOMParser().parseFromString(xml, 'application/xml');
    if (doc.querySelector('parsererror')) throw new Error('sitemap.xml is not well-formed XML');
    const urls = [...doc.getElementsByTagNameNS('*', 'url')].map((u) => ({
      loc: u.getElementsByTagNameNS('*', 'loc')[0]?.textContent?.trim() ?? '',
      lastmod: u.getElementsByTagNameNS('*', 'lastmod')[0]?.textContent?.trim() ?? null,
    }));
    return { urls };
  }, xml);
}
