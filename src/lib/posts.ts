import { getCollection, type CollectionEntry } from 'astro:content';
import { site } from './site';
import { normalizeWhitespace, readingMinutes, separateBlocks, stripHtml, truncateWords } from './text';

export type Post = CollectionEntry<'posts'>;

/** All posts, newest first. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts');
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const postUrl = (post: Post) => `/${post.id}/`;
export const postHtml = (post: Post) => post.rendered?.html ?? '';
export const postMinutes = (post: Post) => readingMinutes(postHtml(post));
/** The post's first tag doubles as its category label on cards. */
export const postCategory = (post: Post) => post.data.tags[0];

/** Jekyll-style excerpt text: HTML stripped, whitespace untouched. */
export const excerptText = (post: Post) => stripHtml(post.data.excerptHtml);

/**
 * Use the editorial description when present. The legacy fallback uses
 * excerpt → strip HTML → normalise whitespace → 100 words max (with "…").
 * Returned *undecoded* (entities such as &nbsp; intact); consumers decode for
 * attributes and escape-once for JSON-LD, as seo-tag did.
 */
export function postDescription(post: Post): string {
  if (post.data.seo_description) return post.data.seo_description;
  const text = normalizeWhitespace(stripHtml(separateBlocks(post.data.excerptHtml))).trim();
  const dek = normalizeWhitespace(stripHtml(post.data.dek ?? '')).trim();
  return truncateWords(text || dek, 100, '…') || site.description;
}
