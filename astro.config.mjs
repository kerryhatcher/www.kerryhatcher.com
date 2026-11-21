import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import remarkGfm from 'remark-gfm';

// Static output, deployed to Cloudflare Workers Static Assets (see wrangler.jsonc).
// URLs keep the Jekyll-era shape: /<slug>/, /about/, /page/N/, /404.html.
export default defineConfig({
  site: 'https://www.kerryhatcher.com',
  output: 'static',
  trailingSlash: 'always',
  // Keep inter-element whitespace so inline text spacing matches the Jekyll output.
  compressHTML: false,
  build: { format: 'directory' },
  markdown: {
    processor: unified({
      // kramdown (GFM input) only strikes through `~~x~~`; a lone `~` like "~$5.4M" is literal.
      gfm: false,
      remarkPlugins: [[remarkGfm, { singleTilde: false }]],
    }),
  },
  devToolbar: { enabled: false },
});
