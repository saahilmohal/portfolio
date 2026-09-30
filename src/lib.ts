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
  (await getCollection('projects')).sort((a, b) => (b.data.date ?? '').localeCompare(a.data.date ?? ''));

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

// Every image in src/photos/ becomes a gallery tile, newest filename first.
const photoFiles = import.meta.glob<{ default: ImageMetadata }>('./photos/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });
export const photos = Object.entries(photoFiles)
  .sort(([a], [b]) => b.localeCompare(a))
  .map(([path, mod]) => {
    const file = path.split('/').pop()!.replace(/\.[^.]+$/, '');
    const caption = file.replace(/^\d{4}(-\d{2})?(-\d{2})?-?/, '').replace(/[-_]+/g, ' ').trim();
    return { src: mod.default, caption };
  });

export const themePaths = () => THEMES.map((theme) => ({ params: { theme } }));
