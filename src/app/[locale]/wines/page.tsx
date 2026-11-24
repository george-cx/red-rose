import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { isLocale, locales } from '@/i18n/routing';
import { pageMetadata } from '@/lib/metadata';
import { Section } from '@/components/Section';
import { Placeholder } from '@/components/Placeholder';
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
    path: 'wines',
    title: t('wines.title'),
    description: t('wines.lead'),
    siteName: t('site.name'),
  });
}

const VARIETIES = ['tsolikouri', 'krakhuna', 'aladasturi', 'aleksandrouli'] as const;
const BOTTLES = ['redRose', 'freedom'] as const;

export default async function WinesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t('nav.home'), url: `${SITE_URL}/${locale}/` },
          { name: t('wines.title'), url: `${SITE_URL}/${locale}/wines/` },
        ]}
      />

      <div className="mx-auto max-w-wide px-6 pb-6 pt-14">
        <h1 className="text-h1">{t('wines.title')}</h1>
        <p className="mt-4 max-w-measure text-lg text-muted">{t('wines.lead')}</p>
      </div>

      <Section heading={t('wines.varietiesHeading')} headingId="varieties">
        <DefList
          wide
          items={VARIETIES.map((key) => ({
            name: t(`wines.varieties.${key}.name`),
            note: t(`wines.varieties.${key}.note`),
          }))}
        />
        <p className="mt-6 text-[0.9375rem] text-muted">
          <Placeholder name="OTHER_VARIETIES" hint="the posts name four; there are more in the cellar" />
        </p>
      </Section>

      <Section heading={t('wines.bottlesHeading')} headingId="bottles">
        <DefList
          wide
          items={BOTTLES.map((key) => ({
            name: t(`wines.bottles.${key}.name`),
            note: t(`wines.bottles.${key}.note`),
          }))}
        />
        <p className="mt-6 flex flex-wrap gap-3 text-[0.9375rem]">
          <Placeholder name="CURRENT_VINTAGES" />
          <Placeholder name="BOTTLE_FORMATS" />
          <Placeholder name="PRICE_BOTTLE" hint="negotiated, so nothing is printed" />
        </p>
      </Section>

      <Section heading={t('wines.collectionHeading')} headingId="collection">
        <DefList
          wide
          items={[{ name: t('wines.collection.salkhino.name'), note: t('wines.collection.salkhino.note') }]}
        />
      </Section>

      <Section heading={t('eristavi.title')} headingId="eristavi">
        <p className="max-w-measure">{t('eristavi.lead')}</p>
        <p className="mt-4 max-w-measure text-muted">{t('eristavi.enquiries')}</p>
        <p className="mt-6 flex flex-wrap gap-3 text-[0.9375rem]">
          <Placeholder name="ERISTAVI_PRODUCTS" hint="which products the mark covers" />
          <Placeholder name="ERISTAVI_REGISTRATION" hint="registration number and date" />
          <Placeholder name="ERISTAVI_AVAILABILITY" hint="where it can be bought" />
        </p>
      </Section>

      <Section heading={t('wines.methodHeading')} headingId="method">
        <p className="max-w-measure">{t('wines.methodBody')}</p>
      </Section>
    </>
  );
}
