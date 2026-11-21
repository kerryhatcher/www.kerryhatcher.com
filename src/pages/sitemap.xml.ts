import type { APIRoute } from 'astro';
import { xmlDate } from '../lib/dates';
import { getPosts, postUrl } from '../lib/posts';
import { absoluteUrl } from '../lib/site';

/** Every post plus /about/. (Home, paginated pages, the 404 and the legacy redirect are intentionally omitted, as before.) */
export const GET: APIRoute = async () => {
  const posts = (await getPosts()).slice().reverse();
  const urls = [
    ...posts.map((p) => `<url>\n<loc>${absoluteUrl(postUrl(p))}</loc>\n<lastmod>${xmlDate(p.data.date)}</lastmod>\n</url>`),
    `<url>\n<loc>${absoluteUrl('/about/')}</loc>\n</url>`,
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
