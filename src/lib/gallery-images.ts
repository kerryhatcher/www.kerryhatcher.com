const galleryWidths = [320, 640, 960, 1280];

/** Add responsive candidates to the local, lazy images in imported Ghost galleries. */
export function withCloudflareGalleryImages(html: string): string {
  return html.replace(/(<div class="kg-gallery-image">\s*<img)(\s[^>]*?)>/g, (image, start, attributes) => {
    const src = attributes.match(/\ssrc="(\/assets\/images\/[\w./@-]+\.(?:jpe?g|png|webp|avif))"/i)?.[1];
    const width = Number(attributes.match(/\swidth="(\d+)"/)?.[1]);
    if (!src || !width || !/\sloading="lazy"/.test(attributes) || /\s(?:srcset|sizes)\s*=/.test(attributes)) {
      return image;
    }

    const candidates = galleryWidths.filter(candidate => candidate < width);
    if (!candidates.length) return image;

    const srcset = candidates.map(candidate =>
      `/cdn-cgi/image/width=${candidate},fit=scale-down,format=auto,onerror=redirect${src} ${candidate}w`,
    );
    if (candidates.length < galleryWidths.length) srcset.push(`${src} ${width}w`);

    // Lazy images can use their laid-out width. The estimates cover browsers
    // without auto sizing, including wider desktop rows with fewer tiles.
    return `${start}${attributes} srcset="${srcset.join(', ')}" sizes="auto, (max-width: 600px) 50vw, 36rem">`;
  });
}
