import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';

import { isLocale, locales, type Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/metadata';
import { getVisit, getAdjacent, getAllSlugs } from '@/lib/visits';
import { Gallery } from '@/components/Gallery';
import { Photo } from '@/components/Photo';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/contact';
import { labelCase } from '@/lib/georgian';

export function generateStaticParams() {
  return locales.flatMap((locale) => getAllSlugs().map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const visit = getVisit(locale, slug);
  if (!visit) return {};
  const t = await getTranslations({ locale });

  return pageMetadata({
    locale,
    path: `blog/${slug}`,
    title: visit.title,
    description: visit.excerpt,
    image: visit.cover?.src,
    siteName: t('site.name'),
    type: 'article',
  });
}

export default async function VisitPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const visit = getVisit(locale, slug);
  if (!visit) notFound();

  const t = await getTranslations({ locale });
  const { previous, next } = getAdjacent(locale as Locale, slug);
  const [cover, ...rest] = visit.photos;

  return (
    <article className="mx-auto max-w-wide px-6 pb-16 pt-10">
      <ArticleJsonLd
        locale={locale}
        headline={visit.title}
        description={visit.excerpt}
        url={`${SITE_URL}/${locale}/blog/${slug}/`}
        image={visit.cover?.src}
        inLanguage={visit.lang}
      />
      <BreadcrumbJsonLd
        items={[
          { name: t('nav.home'), url: `${SITE_URL}/${locale}/` },
          { name: t('blog.title'), url: `${SITE_URL}/${locale}/blog/` },
          { name: visit.title, url: `${SITE_URL}/${locale}/blog/${slug}/` },
        ]}
      />

      <nav aria-label={t('blog.title')} className="mb-10 flex items-center justify-between gap-4">
        <Link href={`/${locale}/blog/`} className="label hover:text-floor">
          ← {labelCase(locale, t('post.backToAll'))}
        </Link>
      </nav>

      <header className="max-w-[46rem]">
        <p className="label">{labelCase(locale, visit.tags.map((tag) => t(`tags.${tag}`)).join(' · '))}</p>
        <h1 className="mt-3 text-h1">{visit.title}</h1>

        {visit.isTranslated ? (
          <p className="mt-4 inline-flex items-center gap-2 border border-[color:var(--rule-strong)] px-3 py-1.5 text-[0.8125rem] text-muted">
            <span aria-hidden="true" className="h-[6px] w-[6px] rounded-full bg-oxblood" />
            {t('post.translatedFrom', { lang: t(`post.langNames.${visit.lang}`) })}
          </p>
        ) : null}

        {visit.country.length ? (
          <p className="label mt-3">
            {labelCase(locale, t('post.guestsFrom', { country: visit.country.map((c) => t(`countries.${c}`)).join(', ') }))}
          </p>
        ) : null}
      </header>

      {cover ? (
        <div className="my-10">
          <Photo photo={cover} alt={visit.title} sizes="(max-width: 1024px) 100vw, 1024px" priority />
        </div>
      ) : null}

      {visit.body ? (
        <div className="prose-visit max-w-measure text-floor">
          <MDXRemote source={visit.body} />
        </div>
      ) : null}

      {rest.length ? <Gallery photos={rest} alt={visit.title} /> : null}

      <nav
        aria-label={t('blog.title')}
        className="mt-16 flex flex-col gap-6 border-t border-[color:var(--rule)] pt-8 sm:flex-row sm:justify-between"
      >
        {previous ? (
          <Link href={`/${locale}/blog/${previous.slug}/`} className="group max-w-[20rem]">
            <span className="label block">← {labelCase(locale, t('post.previous'))}</span>
            <span className="mt-1 block font-display transition-colors group-hover:text-lamp">{previous.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/${locale}/blog/${next.slug}/`} className="group max-w-[20rem] sm:text-right">
            <span className="label block">{labelCase(locale, t('post.next'))} →</span>
            <span className="mt-1 block font-display transition-colors group-hover:text-lamp">{next.title}</span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
