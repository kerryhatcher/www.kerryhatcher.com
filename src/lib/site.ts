/** Site-wide configuration (was _config.yml in the Jekyll era). */
export const site = {
  title: 'Kerry Hatcher',
  author: 'Kerry Hatcher',
  email: 'kerry@kerryhatcher.com',
  description: 'Notes, essays, and field reports from Kerry Hatcher.',
  url: 'https://www.kerryhatcher.com',
  timezone: 'America/Chicago',
  postsPerPage: 12,
  nav: [
    { label: 'Home', url: '/' },
    { label: 'About', url: '/about/' },
  ],
  social: [
    { label: 'Email', href: 'mailto:kerry@kerryhatcher.com' },
    { label: 'GitHub', href: 'https://github.com/kerryhatcher' },
  ],
} as const;

/** Absolute URL for a site-relative path. */
export const absoluteUrl = (path: string) => site.url + path;
