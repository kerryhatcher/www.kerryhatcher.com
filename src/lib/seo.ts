import { absoluteUrl, site } from './site';
import { decodeEntities, escapeOnce } from './text';

export interface SeoInput {
  /** `<title>` text. */
  title: string;
  /** og:title / twitter:title / JSON-LD headline. */
  headline: string;
  /** Raw text; may still contain HTML entities (decoded for meta tags, escape-once for JSON-LD). */
  description: string;
  /** Site-relative path including trailing slash (or /404.html). */
  path: string;
  kind: 'website' | 'article';
  jsonLdType: 'WebSite' | 'WebPage' | 'BlogPosting';
  published?: string;
}

/** The meta tags and JSON-LD that jekyll-seo-tag used to emit, as data. */
export function buildSeo(i: SeoInput) {
  const url = absoluteUrl(i.path);
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': i.jsonLdType,
    author: { '@type': 'Person', name: site.author },
    // seo-tag escaped these once *before* JSON-encoding, so entities show up literally in JSON-LD.
    description: escapeOnce(i.description),
    headline: escapeOnce(i.headline),
    url,
  };
  if (i.jsonLdType === 'WebSite') jsonLd.name = site.title;
  if (i.jsonLdType === 'BlogPosting') {
    jsonLd.dateModified = i.published;
    jsonLd.datePublished = i.published;
    jsonLd.mainEntityOfPage = { '@type': 'WebPage', '@id': url };
  }
  return { ...i, description: decodeEntities(i.description), url, jsonLd: JSON.stringify(jsonLd) };
}
