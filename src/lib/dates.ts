import { site } from './site';

/** Date formatting in the site timezone, matching Jekyll's `date` filter output. */
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const fmt = new Intl.DateTimeFormat('en-US', {
  timeZone: site.timezone,
  hourCycle: 'h23',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZoneName: 'longOffset',
});

function parts(d: Date) {
  const p = Object.fromEntries(fmt.formatToParts(d).map((x) => [x.type, x.value]));
  // longOffset renders "GMT-05:00" (or bare "GMT" for UTC).
  const offset = p.timeZoneName === 'GMT' ? '+00:00' : p.timeZoneName.replace('GMT', '');
  return { year: p.year, month: Number(p.month), day: Number(p.day), hh: p.hour, mm: p.minute, ss: p.second, offset };
}

/** `2026-05-27T07:00:00-05:00` (Liquid `date_to_xmlschema`). */
export function xmlDate(d: Date): string {
  const t = parts(d);
  return `${t.year}-${String(t.month).padStart(2, '0')}-${String(t.day).padStart(2, '0')}T${t.hh}:${t.mm}:${t.ss}${t.offset}`;
}

/** `27 May 2026` (`%-d %b %Y`). */
export function shortDate(d: Date): string {
  const t = parts(d);
  return `${t.day} ${MONTHS[t.month - 1].slice(0, 3)} ${t.year}`;
}

/** `May 27, 2026` (`%B %-d, %Y`). */
export function longDate(d: Date): string {
  const t = parts(d);
  return `${MONTHS[t.month - 1]} ${t.day}, ${t.year}`;
}

/** `May 2026` (`%B %Y`). */
export function monthYear(d: Date): string {
  const t = parts(d);
  return `${MONTHS[t.month - 1]} ${t.year}`;
}
