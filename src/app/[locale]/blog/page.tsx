import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { isLocale, locales, type Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/metadata';
import { getVisits, getTagCounts } from '@/lib/visits';
import { variantSrc } from '@/lib/images';
import { BlogList, type BlogEntry } from '@/components/BlogList';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/contact';
import { labelCase } from '@/lib/georgian';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale });
  return pageMetadata({
    locale,
    path: 'blog',
    title: t('blog.title'),
    description: t('blog.lead'),
    siteName: t('site.name'),
  });
}

export default async function BlogIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale });
  const visits = getVisits(locale as Locale);

  const entries: BlogEntry[] = visits.map((v) => ({
    slug: v.slug,
    title: v.title,
    excerpt: v.excerpt,
    tags: v.tags,
    cover: v.cover
      ? { src: variantSrc(v.cover, 480), width: v.cover.width, height: v.cover.height }
      : undefined,
    isTranslated: v.isTranslated,
  }));

  const tags = getTagCounts(locale as Locale).map(({ tag, count }) => ({
    tag,
    count,
    label: labelCase(locale, t(`tags.${tag}`)),
  }));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t('nav.home'), url: `${SITE_URL}/${locale}/` },
          { name: t('blog.title'), url: `${SITE_URL}/${locale}/blog/` },
        ]}
      />

      <div className="mx-auto max-w-wide px-6 pb-10 pt-14">
        <h1 className="text-h1">{t('blog.title')}</h1>
        <p className="mt-4 max-w-measure text-lg text-muted">{t('blog.lead')}</p>
        <p className="label mt-3">{labelCase(locale, t('blog.count', { count: entries.length }))}</p>
      </div>

      <div className="mx-auto max-w-wide px-6 pb-16">
        <BlogList
          locale={locale as Locale}
          entries={entries}
          tags={tags}
          labels={{
            filter: t('blog.filterLabel'),
            all: labelCase(locale, t('blog.all')),
            loadMore: labelCase(locale, t('blog.loadMore')),
            showing: labelCase(locale, t('blog.showing', { shown: '{shown}', total: '{total}' })),
            empty: t('blog.empty'),
            translated: labelCase(locale, t('post.translatedShort')),
          }}
        />
      </div>
    </>
  );
}
