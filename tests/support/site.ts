import { resolve } from 'node:path';

/** Directory of the built site under test (Astro's output by default). */
export const SITE_DIR = resolve(process.env.SITE_DIR ?? 'dist');
export const PORT = Number(process.env.PORT ?? 4173);
export const ORIGIN = `http://127.0.0.1:${PORT}`;
