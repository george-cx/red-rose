import type { MetadataRoute } from 'next';
import { locales } from '@/i18n/routing';
import { getAllSlugs } from '@/lib/visits';
import { SITE_URL } from '@/lib/contact';

const ROUTES = ['', 'cellar', 'wines', 'visit', 'blog', 'contact'];

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const slugs = getAllSlugs();

  const url = (locale: string, path: string) => `${SITE_URL}/${locale}/${path ? `${path}/` : ''}`;
  const languages = (path: string) =>
    Object.fromEntries(locales.map((l) => [l, url(l, path)])) as Record<string, string>;

  const paths = [...ROUTES, ...slugs.map((slug) => `blog/${slug}`)];

  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: url(locale, path),
      changeFrequency: path === 'blog' || path === '' ? ('weekly' as const) : ('monthly' as const),
      priority: path === '' ? 1 : path.startsWith('blog/') ? 0.6 : 0.8,
      alternates: { languages: languages(path) },
    })),
  );
}
