import { expect, test } from '@playwright/test';
import { unsplashImageSrcset, withCloudflareGalleryImages } from '../src/lib/gallery-images';

const photo = '/assets/images/example.jpeg';
const galleryImage = (attributes: string) => `<div class="kg-gallery-image"><img ${attributes}></div>`;

test('gallery markup offers smaller Cloudflare candidates and keeps the original source', () => {
  const original = galleryImage(`src="${photo}" width="640" height="480" loading="lazy" alt="Example"`);
  const html = withCloudflareGalleryImages(original);
  expect(html).toContain(`src="${photo}" width="640" height="480" loading="lazy" alt="Example"`);
  expect(html).toContain(`srcset="/cdn-cgi/image/width=320,fit=scale-down,format=auto,onerror=redirect${photo} 320w, ${photo} 640w"`);
  expect(html).toContain('sizes="auto, (max-width: 600px) 50vw, 36rem"');
  expect(withCloudflareGalleryImages(html)).toBe(html);
});

test('gallery optimization preserves remote, small, authored, and non-gallery images', () => {
  const original = [
    galleryImage(`src="https://example.com/photo.jpeg" width="1600" loading="lazy"`),
    galleryImage(`src="${photo}" width="200" loading="lazy"`),
    galleryImage(`src="${photo}" width="1600" loading="lazy" srcset="/assets/images/authored.jpeg 640w"`),
    `<figure><img src="${photo}" width="1600" loading="lazy"></figure>`,
  ].join('');
  expect(withCloudflareGalleryImages(original)).toBe(original);
});

test('Unsplash variants preserve the photo identifier and attribution query', () => {
  expect(unsplashImageSrcset('https://images.unsplash.com/photo-test?ixid=example&w=640'))
    .toBe('https://images.unsplash.com/photo-test?ixid=example&w=320 320w');
  expect(unsplashImageSrcset('https://example.com/photo-test?w=640')).toBeUndefined();
});
