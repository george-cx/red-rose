import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { isLocale, locales } from '@/i18n/routing';
import { pageMetadata } from '@/lib/metadata';
import { getVisits } from '@/lib/visits';
import { Section } from '@/components/Section';
import { Photo } from '@/components/Photo';
import { DefList } from '@/components/DefList';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { SITE_URL } from '@/lib/contact';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale });
  return pageMetadata({
    locale,
    path: 'cellar',
    title: t('cellar.title'),
    description: t('cellar.lead'),
    siteName: t('site.name'),
  });
}

const BLOCKS = [
  ['familyHeading', 'familyBody'],
  ['generationsHeading', 'generationsBody'],
  ['historyHeading', 'historyBody'],
] as const;

const ARTEFACTS = ['sachache', 'press', 'qvevri', 'kunkula', 'chinchila'] as const;
const PRACTICE = ['soil', 'mycorrhiza', 'proof', 'table'] as const;

export default async function CellarPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale });
  // The qvevri mouth opens this page, now that the front door opens the home
  // page. DESIGN.md §4a.
  const qvevri = getVisits(locale).find((v) => v.slug === 'the-shortest-tour-i-have-given')?.cover;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t('nav.home'), url: `${SITE_URL}/${locale}/` },
          { name: t('cellar.title'), url: `${SITE_URL}/${locale}/cellar/` },
        ]}
      />

      <div className="mx-auto max-w-wide px-6 pb-4 pt-14">
        <h1 className="text-h1">{t('cellar.title')}</h1>
        <p className="mt-4 max-w-measure text-lg text-muted">{t('cellar.lead')}</p>
      </div>

      {qvevri ? (
        <div className="mx-auto max-w-wide px-6 py-8">
          <Photo photo={qvevri} alt={t('cellar.photoAlt')} sizes="(max-width: 1024px) 100vw, 1024px" priority />
        </div>
      ) : null}

      <Section heading={t('heritage.title')} headingId="heritage" lead={t('heritage.lead')}>
        <DefList
          wide
          items={ARTEFACTS.map((key) => ({
            name: t(`heritage.artefacts.${key}.name`),
            meta: t(`heritage.artefacts.${key}.age`),
            note: t(`heritage.artefacts.${key}.note`),
          }))}
        />
      </Section>

      {BLOCKS.map(([heading, body]) => (
        <Section key={heading} heading={t(`cellar.${heading}`)} headingId={heading}>
          <p className="max-w-measure">{t(`cellar.${body}`)}</p>
        </Section>
      ))}

      <Section heading={t('eco.title')} headingId="eco" lead={t('eco.lead')}>
        <DefList
          wide
          items={PRACTICE.map((key) => ({
            name: t(`eco.points.${key}.name`),
            note: t(`eco.points.${key}.note`),
          }))}
        />
      </Section>
    </>
  );
}
