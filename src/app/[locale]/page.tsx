import type { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { isLocale, locales, type Locale } from '@/i18n/routing';
import { getVisits, getCountries } from '@/lib/visits';
import { heroPhoto } from '@/components/Hero';
import { pageMetadata } from '@/lib/metadata';
import { EMAIL, PHONE_DISPLAY, PHONE_TEL } from '@/lib/contact';
import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { Thumb } from '@/components/Photo';
import { DefList } from '@/components/DefList';
import { WineryJsonLd } from '@/components/JsonLd';
import { labelCase } from '@/lib/georgian';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale });
  return pageMetadata({
    locale,
    path: '',
    title: t('home.title'),
    description: t('site.description'),
    image: heroPhoto()?.src,
    siteName: t('site.name'),
  });
}

const VISIT_ITEMS = ['supra', 'tamada', 'kunkula', 'vakhtanguri', 'cellar', 'bottles'] as const;
const VARIETIES = ['tsolikouri', 'krakhuna', 'aladasturi', 'aleksandrouli'] as const;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale });
  const visits = getVisits(locale as Locale);
  const recent = visits.slice(0, 3);
  const countries = getCountries(locale as Locale);

  return (
    <>
      <WineryJsonLd
        locale={locale}
        name={t('site.name')}
        alternateName={t('site.alternateName')}
        description={t('site.description')}
        image={heroPhoto()?.src}
      />

      <Hero place={t('site.place')} alt={t('home.heroAlt')} />

      <Section eyebrow={t('home.visitHeading')} headingId="visit" heading={t('home.visitLead')}>
        <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {VISIT_ITEMS.map((item) => (
            <li key={item} className="flex items-baseline gap-3 border-b border-[color:var(--rule)] pb-3">
              <span aria-hidden="true" className="h-[6px] w-[6px] shrink-0 rounded-full bg-oxblood" />
              {t(`home.visitItems.${item}`)}
            </li>
          ))}
        </ul>
        <Link href={`/${locale}/visit/`} className="label mt-8 inline-block text-lamp hover:text-floor">
          {labelCase(locale, t('home.visitMore'))} →
        </Link>
      </Section>

      {/* The two claims the cellar rests on, stated plainly and linked to the
          page that evidences them. */}
      <Section className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-16">
          {([
            { id: 'heritage', title: t('heritage.title'), lead: t('heritage.lead') },
            { id: 'eco', title: t('eco.title'), lead: t('eco.lead') },
          ] as const).map((claim) => (
            <div key={claim.id} className="flex flex-col gap-3">
              <span className="rule-oxblood" aria-hidden="true" />
              <h2 className="text-h3">{claim.title}</h2>
              <p className="max-w-measure text-muted">{claim.lead}</p>
              <Link
                href={`/${locale}/cellar/#${claim.id}`}
                className="label mt-1 inline-block text-lamp hover:text-floor"
              >
                {labelCase(locale, t('nav.cellar'))} →
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow={t('offer.title')} headingId="offer" heading={t('offer.lead')}>
        <DefList
          items={(['tasting', 'cooking', 'supra'] as const).map((key) => ({
            name: t(`offer.${key}.name`),
            note: t(`offer.${key}.note`),
          }))}
        />
        <Link href={`/${locale}/visit/`} className="label mt-8 inline-block text-lamp hover:text-floor">
          {labelCase(locale, t('home.visitMore'))} →
        </Link>
      </Section>

      <Section eyebrow={t('home.winesHeading')} headingId="wines" heading={t('wines.varietiesHeading')}>
        <DefList
          items={VARIETIES.map((variety) => ({
            name: t(`wines.varieties.${variety}.name`),
            note: t(`wines.varieties.${variety}.note`),
          }))}
        />
        <Link href={`/${locale}/wines/`} className="label mt-8 inline-block text-lamp hover:text-floor">
          {labelCase(locale, t('home.winesMore'))} →
        </Link>
      </Section>

      <Section eyebrow={t('home.quoteHeading')} headingId="quote">
        <blockquote className="max-w-[46rem]">
          <p className="font-display text-h3 leading-snug text-floor">{t('home.quote')}</p>
          <footer className="label mt-5">{labelCase(locale, t('home.quoteAttribution'))}</footer>
        </blockquote>
      </Section>

      <Section eyebrow={t('home.visitsHeading')} headingId="recent">
        <ul className="grid gap-8 sm:grid-cols-3">
          {recent.map((visit) => (
            <li key={visit.slug}>
              <Link href={`/${locale}/blog/${visit.slug}/`} className="group block">
                {visit.cover ? (
                  <span className="mb-3 block aspect-[3/2] overflow-hidden">
                    <Thumb photo={visit.cover} alt={visit.title} />
                  </span>
                ) : null}
                <span className="block font-display text-lg transition-colors group-hover:text-lamp">
                  {visit.title}
                </span>
                <span className="mt-1 block text-[0.9375rem] text-muted">{visit.excerpt}</span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href={`/${locale}/blog/`} className="label mt-8 inline-block text-lamp hover:text-floor">
          {labelCase(locale, t('home.visitsMore'))} →
        </Link>
      </Section>

      <Section
        eyebrow={t('home.countriesHeading')}
        headingId="countries"
        lead={t('home.countriesLead')}
      >
        <p className="max-w-[46rem] font-display text-h3 leading-relaxed">
          {countries.map((code, i) => (
            <span key={code}>
              {t(`countries.${code}`)}
              {i < countries.length - 1 ? <span className="text-oxblood"> · </span> : null}
            </span>
          ))}
        </p>
      </Section>

      <Section eyebrow={t('home.bookHeading')} headingId="book" lead={t('home.bookLead')}>
        <div className="flex flex-col gap-3">
          <a href={`tel:${PHONE_TEL}`} className="font-display text-h1 text-lamp hover:text-floor">
            {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${EMAIL}`} className="text-lg text-lamp hover:text-floor">
            {EMAIL}
          </a>
        </div>
      </Section>
    </>
  );
}
