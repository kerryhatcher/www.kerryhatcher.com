import type { APIRoute } from 'astro';
import { xmlDate } from '../lib/dates';
import { getPosts, postUrl } from '../lib/posts';
import { absoluteUrl, site } from '../lib/site';

/** Canonical content pages, including Home and each archive page. */
export const GET: APIRoute = async () => {
  const posts = (await getPosts()).slice().reverse();
  const pageCount = Math.max(1, Math.ceil(posts.length / site.postsPerPage));
  const archivePages = Array.from({ length: pageCount }, (_, index) =>
    index === 0 ? '/' : `/page/${index + 1}/`,
  );
  const urls = [
    ...archivePages.map(path => `<url>\n<loc>${absoluteUrl(path)}</loc>\n</url>`),
    ...posts.map((p) => `<url>\n<loc>${absoluteUrl(postUrl(p))}</loc>\n<lastmod>${xmlDate(p.data.date)}</lastmod>\n</url>`),
    `<url>\n<loc>${absoluteUrl('/about/')}</loc>\n</url>`,
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
