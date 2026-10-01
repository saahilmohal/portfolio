// Shared helpers: settings, sorted content, photos, date labels.
import YAML from 'yaml';
import raw from './content/site.yaml?raw';
import { getCollection } from 'astro:content';

export const site = YAML.parse(raw);
export const THEMES = ['s', 'r'] as const;
export type Theme = (typeof THEMES)[number];
export const themeName: Record<Theme, string> = { s: 'Sonar', r: 'Rolling Hills' };

export const getExperience = async () =>
  (await getCollection('experience')).sort((a, b) => b.data.start.localeCompare(a.data.start));
export const getProjects = async () =>
  (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);

const year = (s?: string) => (s ? s.slice(0, 4) : 'Now');
export const span = (a: string, b?: string) => (year(a) === year(b) ? year(a) : `${year(a)}–${year(b)}`);
export const yearOf = (s?: string) => (s ? s.slice(0, 4) : '—');
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthYear = (s?: string) => {
  if (!s) return 'Present';
  const [y, m] = s.split('-');
  return m ? `${MONTHS[+m - 1]} ${y}` : y;
};
export const dateRange = (a: string, b?: string) => `${monthYear(a)} – ${monthYear(b)}`;

// Every image in src/photos/ becomes a gallery tile.
// "Taken" date comes from the photo's EXIF metadata; if a photo has none, a date at the
// start of the file name (e.g. 2026-05-madrid.jpg) is used, and otherwise it sorts last.
import exifr from 'exifr';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const photoFiles = import.meta.glob<{ default: ImageMetadata }>('./photos/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });
const nameDate = (file: string) => {
  const m = file.match(/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/);
  return m ? new Date(+m[1], (+(m[2] ?? 1)) - 1, +(m[3] ?? 1)).getTime() : 0;
};
// Caption = file name without a leading date or a trailing "(1)", e.g. "Kotor, Montenegro (1).jpg" → "Kotor, Montenegro"
const captionOf = (file: string) => file.replace(/^\d{4}(-\d{2})?(-\d{2})?-?/, '').replace(/\s*\(\d+\)\s*$/, '').replace(/[-_]+/g, ' ').replace(/,\s*$/, '').trim();

export const photos = await Promise.all(
  Object.entries(photoFiles).map(async ([path, mod]) => {
    const fileName = path.split('/').pop()!;
    const base = fileName.replace(/\.[^.]+$/, '');
    let taken = 0;
    try {
      const exif = await exifr.parse(readFileSync(join(process.cwd(), 'src', 'photos', fileName)), ['DateTimeOriginal', 'CreateDate']);
      const d = exif?.DateTimeOriginal ?? exif?.CreateDate;
      if (d instanceof Date && !isNaN(+d)) taken = d.getTime();
    } catch {}
    if (!taken) taken = nameDate(base);
    return { src: mod.default, caption: captionOf(base), taken, file: base };
  }),
).then((list) => list.sort((a, b) => b.taken - a.taken || a.file.localeCompare(b.file)));

export const photoOrder: 'date' | 'random' = site.photoOrder === 'random' ? 'random' : 'date';

// Photos for one job or project live in a folder named like its file, next to it:
//   src/content/experience/odin-dynamics.md  →  src/content/experience/odin-dynamics/*.jpg
// They show as a gallery on that entry's page, in file-name order (prefix 01-, 02- to control order).
const entryFiles = import.meta.glob<{ default: ImageMetadata }>('./content/{experience,projects}/*/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });
export const entryPhotos = (collection: 'experience' | 'projects', slug: string) =>
  Object.entries(entryFiles)
    .filter(([path]) => path.startsWith(`./content/${collection}/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([path, mod]) => {
      const base = path.split('/').pop()!.replace(/\.[^.]+$/, '');
      const caption = base.replace(/^\d+[-_ ]+/, '').replace(/\s*\(\d+\)\s*$/, '').replace(/[-_]+/g, ' ').trim();
      return { src: mod.default, caption };
    });

export const themePaths = () => THEMES.map((theme) => ({ params: { theme } }));
