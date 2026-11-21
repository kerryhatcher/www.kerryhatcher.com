import type { APIRoute } from 'astro';
import { xmlDate } from '../lib/dates';
import { getPosts, postDescription, postHtml, postUrl } from '../lib/posts';
import { absoluteUrl, site } from '../lib/site';
import { normalizeWhitespace, stripHtml } from '../lib/text';

const FEED_LIMIT = 10;
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
/** CDATA can't contain "]]>", so split any occurrence across two sections. */
const cdata = (s: string) => `<![CDATA[${s.replaceAll(']]>', ']]]]><![CDATA[>')}]]>`;

/** Atom feed of the latest posts (the format jekyll-feed produced). */
export const GET: APIRoute = async () => {
  const posts = (await getPosts()).slice(0, FEED_LIMIT);
  const self = absoluteUrl('/feed.xml');

  const entries = posts
    .map((post) => {
      const url = absoluteUrl(postUrl(post));
      const date = xmlDate(post.data.date);
      const summary = normalizeWhitespace(stripHtml(post.data.excerptHtml)).trim();
      return `<entry><title type="html">${esc(post.data.title)}</title><link href="${url}" rel="alternate" type="text/html" title="${esc(post.data.title)}" /><published>${date}</published><updated>${date}</updated><id>${url.replace(/\/$/, '')}</id><content type="html" xml:base="${url}">${cdata(postHtml(post))}</content><author><name>${esc(site.author)}</name></author>${post.data.tags.map((t) => `<category term="${esc(t)}" />`).join('')}<summary type="html">${cdata(summary || postDescription(post))}</summary></entry>`;
    })
    .join('');

  const xml = `<?xml version="1.0" encoding="utf-8"?><feed xmlns="http://www.w3.org/2005/Atom" ><generator uri="https://astro.build/">Astro</generator><link href="${self}" rel="self" type="application/atom+xml" /><link href="${absoluteUrl('/')}" rel="alternate" type="text/html" /><updated>${xmlDate(new Date())}</updated><id>${self}</id><title type="html">${esc(site.title)}</title><subtitle>${esc(site.description)}</subtitle><author><name>${esc(site.author)}</name></author>${entries}</feed>\n`;

  return new Response(xml, { headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' } });
};
