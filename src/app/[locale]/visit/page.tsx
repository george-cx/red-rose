import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { isLocale, locales, type Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/metadata';
import { Section } from '@/components/Section';
import { Placeholder } from '@/components/Placeholder';
import { MapLink } from '@/components/MapLink';
import { DefList } from '@/components/DefList';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { ADDRESS, EMAIL, PHONE_DISPLAY, PHONE_TEL, SITE_URL } from '@/lib/contact';
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
    path: 'visit',
    title: t('visit.title'),
    description: t('visit.lead'),
    siteName: t('site.name'),
  });
}

export default async function VisitPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t('nav.home'), url: `${SITE_URL}/${locale}/` },
          { name: t('visit.title'), url: `${SITE_URL}/${locale}/visit/` },
        ]}
      />

      <div className="mx-auto max-w-wide px-6 pb-6 pt-14">
        <h1 className="text-h1">{t('visit.title')}</h1>
        <p className="mt-4 max-w-measure text-lg text-muted">{t('visit.lead')}</p>
      </div>

      <Section heading={t('offer.title')} headingId="offer" lead={t('offer.lead')}>
        <DefList
          wide
          items={(['tasting', 'cooking', 'supra'] as const).map((key) => ({
            name: t(`offer.${key}.name`),
            note: t(`offer.${key}.note`),
          }))}
        />
      </Section>

      <Section heading={t('visit.includesHeading')} headingId="includes">
        <p className="max-w-measure">{t('visit.includesBody')}</p>
      </Section>

      <Section heading={t('visit.durationHeading')} headingId="duration">
        <p className="max-w-measure">{t('visit.durationBody')}</p>
      </Section>

      <Section heading={t('visit.priceHeading')} headingId="price">
        <p className="max-w-measure">{t('visit.priceBody')}</p>
      </Section>

      <Section heading={t('visit.groupsHeading')} headingId="groups">
        <p className="max-w-measure">{t('visit.groupsBody')}</p>
      </Section>

      <Section heading={t('visit.whenHeading')} headingId="when">
        <p className="max-w-measure">{t('visit.whenBody')}</p>
      </Section>

      <Section heading={t('visit.gettingHereHeading')} headingId="getting-here">
        <dl className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-8">
            <dt className="label sm:w-40 sm:shrink-0">{labelCase(locale, t('contact.addressLabel'))}</dt>
            <dd>
              <address className="not-italic">{ADDRESS[locale as Locale]}</address>
            </dd>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-8">
            <dt className="label sm:w-40 sm:shrink-0">{labelCase(locale, t('visit.gettingHereHeading'))}</dt>
            <dd className="flex flex-wrap gap-3">
              <MapLink />
            </dd>
          </div>
        </dl>
      </Section>

      <Section heading={t('visit.bookHeading')} headingId="book" lead={t('visit.bookBody')}>
        <dl className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-8">
            <dt className="label sm:w-40 sm:shrink-0">{labelCase(locale, t('visit.phoneLabel'))}</dt>
            <dd>
              <a href={`tel:${PHONE_TEL}`} className="font-display text-h3 text-lamp hover:text-floor">
                {PHONE_DISPLAY}
              </a>
            </dd>
          </div>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-8">
            <dt className="label sm:w-40 sm:shrink-0">{labelCase(locale, t('visit.emailLabel'))}</dt>
            <dd>
              <a href={`mailto:${EMAIL}`} className="text-lamp hover:text-floor">
                {EMAIL}
              </a>
            </dd>
          </div>
        </dl>
      </Section>
    </>
  );
}
