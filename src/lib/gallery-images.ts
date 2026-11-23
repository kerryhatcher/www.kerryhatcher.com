import { resolve } from 'node:path';
import sharp from 'sharp';

const imageWidths = [320, 640, 960, 1280];

export function isLocalResizableImage(src: string | undefined): src is string {
  return !!src && /^\/assets\/images\/[\w./@-]+\.(?:jpe?g|png|webp|avif)$/i.test(src) &&
    !src.split('/').includes('..');
}

export async function localImageDimensions(src: string | undefined) {
  if (!isLocalResizableImage(src)) return;
  const metadata = await sharp(resolve('public', `.${src}`)).metadata().catch(() => undefined);
  return metadata?.autoOrient;
}

export function cloudflareImageSrcset(src: string, width: number): string | undefined {
  const candidates = imageWidths.filter(candidate => candidate < width);
  if (!candidates.length) return;

  const srcset = candidates.map(candidate =>
    `/cdn-cgi/image/width=${candidate},fit=scale-down,format=auto,onerror=redirect${src} ${candidate}w`,
  );
  if (candidates.length < imageWidths.length) srcset.push(`${src} ${width}w`);
  return srcset.join(', ');
}

export function unsplashImageSrcset(src: string | undefined): string | undefined {
  if (!src?.startsWith('https://images.unsplash.com/')) return;
  const url = new URL(src);
  const originalWidth = Number(url.searchParams.get('w'));
  const candidates = imageWidths.filter(candidate => candidate < originalWidth);
  if (!candidates.length) return;

  return candidates.map(width => {
    url.searchParams.set('w', String(width));
    return `${url.href} ${width}w`;
  }).join(', ');
}

/** Add responsive candidates to the local, lazy images in imported Ghost galleries. */
export function withCloudflareGalleryImages(html: string): string {
  return html.replace(/(<div class="kg-gallery-image">\s*<img)(\s[^>]*?)>/g, (image, start, attributes) => {
    const src = attributes.match(/\ssrc="([^"]+)"/)?.[1];
    const width = Number(attributes.match(/\swidth="(\d+)"/)?.[1]);
    if (!isLocalResizableImage(src) || !/\sloading="lazy"/.test(attributes) || /\s(?:srcset|sizes)\s*=/.test(attributes)) {
      return image;
    }

    const srcset = cloudflareImageSrcset(src, width);
    if (!srcset) return image;

    // Lazy images can use their laid-out width. The estimates cover browsers
    // without auto sizing, including wider desktop rows with fewer tiles.
    return `${start}${attributes} srcset="${srcset}" sizes="auto, (max-width: 600px) 50vw, 36rem">`;
  });
}
