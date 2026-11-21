/**
 * Minimal static server that mimics Cloudflare Workers Static Assets with
 * `html_handling: auto-trailing-slash` and `not_found_handling: 404-page`
 * (see wrangler.jsonc), so tests exercise the same routing as production.
 */
import { existsSync, statSync } from 'node:fs';
import { join, normalize } from 'node:path';
import { PORT, SITE_DIR } from './site';

const isFile = (p: string) => existsSync(p) && statSync(p).isFile();
const isDir = (p: string) => existsSync(p) && statSync(p).isDirectory();

function serve(path: string, status = 200) {
  return new Response(Bun.file(path), { status });
}

Bun.serve({
  port: PORT,
  hostname: '127.0.0.1',
  fetch(req) {
    const url = new URL(req.url);
    const pathname = decodeURIComponent(url.pathname);
    const rel = normalize(pathname).replace(/^(\.\.[/\\])+/, '');
    const abs = join(SITE_DIR, rel);

    // Exact file (assets, feed.xml, 404.html, …)
    if (isFile(abs) && !pathname.endsWith('/')) {
      return serve(abs);
    }
    // Directory with index.html
    if (isDir(abs) && isFile(join(abs, 'index.html'))) {
      if (!pathname.endsWith('/')) {
        return Response.redirect(`${url.origin}${pathname}/${url.search}`, 308);
      }
      return serve(join(abs, 'index.html'));
    }
    // `/foo` → `foo.html`
    if (isFile(`${abs}.html`)) return serve(`${abs}.html`);

    const notFound = join(SITE_DIR, '404.html');
    return isFile(notFound) ? serve(notFound, 404) : new Response('Not found', { status: 404 });
  },
});

console.log(`serving ${SITE_DIR} on http://127.0.0.1:${PORT}`);
