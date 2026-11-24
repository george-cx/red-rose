import type { Metadata } from 'next';
import { locales, type Locale } from '@/i18n/routing';
import { SITE_URL } from './contact';

/**
 * Canonical plus hreflang across all three locales, and x-default pointing at
 * Georgian — the default locale.
 */
export function alternatesFor(path: string): NonNullable<Metadata['alternates']> {
  const suffix = path ? `${path}/` : '';
  const languages: Record<string, string> = {};
  for (const locale of locales) languages[locale] = `${SITE_URL}/${locale}/${suffix}`;
  languages['x-default'] = `${SITE_URL}/ka/${suffix}`;
  return { languages };
}

export function pageMetadata({
  locale,
  path,
  title,
  description,
  image,
  siteName,
  type = 'website',
}: {
  locale: Locale;
  /** Path after the locale segment, no leading or trailing slash. */
  path: string;
  title: string;
  description: string;
  image?: string;
  siteName: string;
  type?: 'website' | 'article';
}): Metadata {
  const url = `${SITE_URL}/${locale}/${path ? `${path}/` : ''}`;
  const alternates = alternatesFor(path);
  const images = image ? [{ url: `${SITE_URL}${image}`, width: 1200, height: 800, alt: title }] : undefined;

  return {
    title,
    description,
    alternates: { canonical: url, ...alternates },
    openGraph: { type, title, description, url, siteName, locale, images },
    twitter: { card: image ? 'summary_large_image' : 'summary', title, description, images: images?.map((i) => i.url) },
  };
}
