// Measure computed styles for body elements on local vs live.
import { chromium } from 'playwright';

const slug = process.argv[2] || 'trust-then-verify-1-035-reasons-why';
const sources = [
  ['LOCAL', `http://127.0.0.1:4000/${slug}/`, '.post__body'],
  ['LIVE',  `https://www.kerryhatcher.com/${slug}/`, '.gh-content'],
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1200, height: 900 } });

for (const [label, url, root] of sources) {
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 }).catch(() => {});
  const data = await page.evaluate((sel) => {
    const r = document.querySelector(sel);
    if (!r) return null;
    const pick = (el, props) => Object.fromEntries(props.map(p => [p, getComputedStyle(el)[p]]));
    const out = { width: r.getBoundingClientRect().width };
    for (const tag of ['h1','h2','h3','p','blockquote','hr','figure','ul','li']) {
      const el = r.querySelector(tag);
      if (el) out[tag] = pick(el, ['fontFamily','fontSize','fontWeight','lineHeight','marginTop','marginBottom','color','letterSpacing','paddingLeft','borderLeft','borderTop','background']);
    }
    return out;
  }, root);
  console.log(label, JSON.stringify(data, null, 2));
  await page.close();
}
await browser.close();
