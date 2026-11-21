import { readFileSync } from 'node:fs';
import type { PageFacts } from './facts';
import type { FeedFacts, SitemapFacts } from './xml';

export interface Baseline {
  source: string;
  pages: Record<string, PageFacts>;
  redirects: Record<string, { target: string; canonical: string | null; robots: string | null }>;
  feed: FeedFacts;
  sitemap: SitemapFacts;
  robots: string;
}

export const baseline: Baseline = JSON.parse(
  readFileSync(new URL('../fixtures/baseline.json', import.meta.url), 'utf8'),
);

export const routes = Object.keys(baseline.pages);
export const postRoutes = routes.filter(
  (r) => !['/', '/about/', '/404.html'].includes(r) && !r.startsWith('/page/'),
);
export const pagedRoutes = routes.filter((r) => r.startsWith('/page/'));
