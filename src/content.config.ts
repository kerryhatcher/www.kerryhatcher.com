import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { basename, extname, join } from 'node:path';
import matter from 'gray-matter';
import { defineCollection } from 'astro:content';
import type { Loader } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Posts live in src/content/posts as `YYYY-MM-DD-slug.{html,md}`.
 *
 * `.html` posts are Ghost imports that Jekyll passed through verbatim, so they
 * are stored verbatim here too. `.md` posts go through Astro's Markdown
 * pipeline. Either way the entry's `rendered.html` is what pages emit.
 */
const postSchema = z.object({
  title: z.string(),
  dek: z.string().optional(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  authors: z.array(z.string()).default([]),
  feature_image: z.string().optional(),
  feature_image_alt: z.string().optional(),
  /** Raw HTML (Ghost captions contain markup). */
  feature_image_caption: z.string().optional(),
  ghost_id: z.string().optional(),
  /** Jekyll-style excerpt source: everything before the first blank line, as HTML. */
  excerptHtml: z.string(),
});

const DATE_PREFIX = /^\d{4}-\d{2}-\d{2}-/;

const postLoader: Loader = {
  name: 'posts',
  schema: postSchema,
  async load({ store, parseData, renderMarkdown, config, generateDigest, watcher, logger }) {
    const dir = fileURLToPath(new URL('src/content/posts/', config.root));

    const loadAll = async () => {
      store.clear();
      for (const file of (await readdir(dir)).sort()) {
        const ext = extname(file);
        if (ext !== '.html' && ext !== '.md') continue;
        const slug = basename(file, ext).replace(DATE_PREFIX, '');
        const raw = await readFile(join(dir, file), 'utf8');
        const { data: fm, content } = matter(raw);
        const isMarkdown = ext === '.md';

        const firstChunk = content.split('\n\n')[0];
        const html = isMarkdown ? (await renderMarkdown(content)).html : content;
        const excerptHtml = isMarkdown ? (await renderMarkdown(firstChunk)).html : firstChunk;

        const data = await parseData({ id: slug, data: { ...fm, excerptHtml } });
        store.set({ id: slug, data, body: content, rendered: { html }, filePath: `src/content/posts/${file}`, digest: generateDigest(raw) });
      }
      logger.info(`loaded ${store.keys().length} posts`);
    };

    await loadAll();
    watcher?.add(dir);
    watcher?.on('change', (p) => p.startsWith(dir) && loadAll());
  },
};

export const collections = {
  posts: defineCollection({ loader: postLoader }),
};
