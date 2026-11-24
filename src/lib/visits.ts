import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';
import { locales, type Locale } from '@/i18n/routing';
import { photosFor, type Photo } from './images';

const CONTENT = join(process.cwd(), 'content', 'visits');

export type Tag = 'guests' | 'vineyard' | 'wine' | 'family' | 'feast';

export interface VisitMeta {
  slug: string;
  title: string;
  excerpt: string;
  order: number;
  /** The language Tariel wrote the post in. */
  lang: Locale;
  sourcePost: number;
  tags: Tag[];
  country: string[];
  guestCount?: number;
  photos: Photo[];
  cover?: Photo;
  /** True when the reader is not seeing the language it was written in. */
  isTranslated: boolean;
  /** True when this locale has no file and we fell back to another. */
  isFallback: boolean;
}

export interface Visit extends VisitMeta {
  body: string;
}

function fileFor(locale: Locale, slug: string) {
  return join(CONTENT, locale, `${slug}.mdx`);
}

function allSlugs(): string[] {
  const set = new Set<string>();
  for (const locale of locales) {
    const dir = join(CONTENT, locale);
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir)) {
      if (file.endsWith('.mdx')) set.add(file.replace(/\.mdx$/, ''));
    }
  }
  return [...set];
}

function load(locale: Locale, slug: string): Visit | null {
  let path = fileFor(locale, slug);
  let isFallback = false;

  if (!existsSync(path)) {
    // A hand-added post may exist in Georgian only. Show it rather than 404.
    const alternative = locales.map((l) => fileFor(l, slug)).find(existsSync);
    if (!alternative) return null;
    path = alternative;
    isFallback = true;
  }

  const { data, content } = matter(readFileSync(path, 'utf8'));
  const names: string[] = Array.isArray(data.images) ? data.images : [];
  const photos = photosFor(slug, names);
  const lang = (typeof data.lang === 'string' && locales.includes(data.lang as Locale)
    ? data.lang
    : 'ka') as Locale;

  const coverName = typeof data.cover === 'string' ? data.cover : names[0];
  const cover = photos.find((p) => p.src.endsWith(`/${coverName}`)) ?? photos[0];

  return {
    slug,
    title: String(data.title ?? slug),
    excerpt: String(data.excerpt ?? ''),
    order: Number(data.order ?? 9999),
    lang,
    sourcePost: Number(data.sourcePost ?? 0),
    tags: (Array.isArray(data.tags) ? data.tags : []) as Tag[],
    country: Array.isArray(data.country) ? data.country : [],
    guestCount: typeof data.guestCount === 'number' ? data.guestCount : undefined,
    photos,
    cover,
    isTranslated: lang !== locale,
    isFallback,
    body: content.trim(),
  };
}

let indexCache: Partial<Record<Locale, Visit[]>> = {};

/** All visits for a locale, in archive order. */
export function getVisits(locale: Locale): Visit[] {
  const cached = indexCache[locale];
  if (cached) return cached;

  const list = allSlugs()
    .map((slug) => load(locale, slug))
    .filter((v): v is Visit => v !== null)
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));

  indexCache[locale] = list;
  return list;
}

export function getVisit(locale: Locale, slug: string): Visit | null {
  return getVisits(locale).find((v) => v.slug === slug) ?? null;
}

export function getAdjacent(locale: Locale, slug: string) {
  const all = getVisits(locale);
  const i = all.findIndex((v) => v.slug === slug);
  return {
    previous: i > 0 ? all[i - 1] : null,
    next: i >= 0 && i < all.length - 1 ? all[i + 1] : null,
  };
}

/** Tags actually in use, in a fixed order, with counts. */
export function getTagCounts(locale: Locale): Array<{ tag: Tag; count: number }> {
  const order: Tag[] = ['guests', 'wine', 'vineyard', 'family', 'feast'];
  const counts = new Map<Tag, number>();
  for (const visit of getVisits(locale)) {
    for (const tag of visit.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return order.filter((t) => counts.has(t)).map((tag) => ({ tag, count: counts.get(tag)! }));
}

/** Every country mentioned across the archive, most-mentioned first. */
export function getCountries(locale: Locale): string[] {
  const counts = new Map<string, number>();
  for (const visit of getVisits(locale)) {
    for (const code of visit.country) counts.set(code, (counts.get(code) ?? 0) + 1);
  }
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).map(([c]) => c);
}

export function getAllSlugs(): string[] {
  return allSlugs();
}
