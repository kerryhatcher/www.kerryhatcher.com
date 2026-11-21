import { decodeHTML } from 'entities';

/** Ruby's `\s` / `split` only know ASCII whitespace (not &nbsp; or U+2028), unlike JS's `\s`. */
const WS = /[ \t\n\v\f\r]+/;
const WS_G = /[ \t\n\v\f\r]+/g;

/**
 * Small ports of the Liquid / Jekyll text filters the old templates relied on,
 * kept faithful so reading times, excerpts and meta descriptions don't drift.
 */

/** Liquid `strip_html` (scripts, comments and styles are dropped with their contents). */
export function stripHtml(input: string): string {
  return input
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<style[\s\S]*?<\/style>/g, '')
    .replace(/<[\s\S]*?>/g, '');
}

/** Liquid `normalize_whitespace`. */
export const normalizeWhitespace = (s: string) => s.replace(WS_G, ' ');

/** Jekyll `number_of_words`. */
export const numberOfWords = (s: string) => s.split(WS).filter(Boolean).length;

/** Liquid `truncate: n` (counts the "..." ellipsis toward n; code points, not UTF-16 units). */
export function truncate(input: string, n: number, ellipsis = '...'): string {
  const chars = Array.from(input);
  if (chars.length <= n) return input;
  return chars.slice(0, Math.max(0, n - Array.from(ellipsis).length)).join('') + ellipsis;
}

/** Liquid `truncatewords: n, ellipsis`. */
export function truncateWords(input: string, n: number, ellipsis = '...'): string {
  const words = input.split(WS).filter(Boolean);
  return words.length <= n ? input : words.slice(0, n).join(' ') + ellipsis;
}

/** Reading time exactly as the old layouts computed it: words / 220 (integer) + 1. */
export const readingMinutes = (html: string) => Math.floor(numberOfWords(stripHtml(html)) / 220) + 1;

/**
 * jekyll-seo-tag piped titles and excerpts through kramdown before stripping HTML.
 * Two visible effects are reproduced so metadata didn't change in the migration:
 *  - top-level block elements are separated by whitespace (so `</p><p>` doesn't glue words together)
 *  - typographic quotes/dashes/ellipses (smartypants)
 */
const BLOCKS = new Set('p div section article header footer aside nav main h1 h2 h3 h4 h5 h6 ul ol dl blockquote pre table figure iframe hr form details'.split(' '));
const VOID = new Set('area base br col embed hr img input link meta param source track wbr'.split(' '));

/**
 * kramdown emitted a newline between *top-level* block elements of an HTML
 * fragment, but left everything nested inside them untouched. Walk the tags
 * and add a space after each top-level block so text of adjacent blocks
 * doesn't run together once the tags are stripped.
 */
export function separateBlocks(html: string): string {
  let depth = 0;
  let out = '';
  let last = 0;
  for (const m of html.matchAll(/<(\/?)([a-zA-Z][\w-]*)\b[^>]*?(\/?)>/g)) {
    const [tag, closing, name, selfClose] = m;
    const n = name.toLowerCase();
    const isVoid = VOID.has(n) || selfClose === '/';
    if (!closing && !isVoid) depth++;
    const endsTopLevelBlock = BLOCKS.has(n) && ((closing && depth === 1) || (!closing && isVoid && depth === 0));
    if (closing) depth = Math.max(0, depth - 1);
    if (endsTopLevelBlock) {
      const at = m.index + tag.length;
      out += html.slice(last, at) + ' ';
      last = at;
    }
  }
  return out + html.slice(last);
}

export function smartypants(s: string): string {
  return s
    .replace(/---/g, '—')
    .replace(/--/g, '–')
    .replace(/\.\.\./g, '…')
    .replace(/(^|[\s([{—–])"/g, '$1“')
    .replace(/"/g, '”')
    .replace(/(^|[\s([{—–])'/g, '$1‘')
    .replace(/'/g, '’');
}

/**
 * Title text as jekyll-seo-tag rendered it (og:title, twitter:title, JSON-LD headline, <title>).
 * NOTE: kramdown read a lone "|" as a table-cell delimiter and dropped it, so
 * "Networking 101 | Document everything" became "Networking 101 Document everything".
 * That quirk is preserved here for parity; remove the replace() to keep the pipe.
 */
export const seoTitle = (title: string) => normalizeWhitespace(smartypants(title.replace(/\|/g, ' '))).trim();

export const decodeEntities = decodeHTML;

/** Liquid `escape_once`: escape `& < > " '` but leave existing entities alone. */
export const escapeOnce = (s: string) =>
  s.replace(/&(?!(?:[a-zA-Z][a-zA-Z0-9]*|#\d+|#[xX][\dA-Fa-f]+);)|[<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!,
  );
