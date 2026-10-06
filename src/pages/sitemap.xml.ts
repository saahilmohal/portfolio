// Lists every page of the default theme for search engines.
import { getExperience, getProjects, site } from '../lib';
export async function GET() {
  const t = site.defaultTheme === 's' ? 's' : 'r';
  const paths = ['', '/experience', '/projects', '/photography',
    ...(await getExperience()).map((e) => `/experience/${e.id}`),
    ...(await getProjects()).map((p) => `/projects/${p.id}`)];
  const urls = paths.map((p) => `  <url><loc>https://www.saahilmohal.com/${t}${p}/</loc></url>`).join('\n');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`, { headers: { 'Content-Type': 'application/xml' } });
}
