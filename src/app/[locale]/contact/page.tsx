import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

import { isLocale, locales, type Locale } from '@/i18n/routing';
import { pageMetadata } from '@/lib/metadata';
import { MapLink } from '@/components/MapLink';
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
    path: 'contact',
    title: t('contact.title'),
    description: t('contact.lead'),
    siteName: t('site.name'),
  });
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale });

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: t('nav.home'), url: `${SITE_URL}/${locale}/` },
          { name: t('contact.title'), url: `${SITE_URL}/${locale}/contact/` },
        ]}
      />

      <div className="mx-auto max-w-wide px-6 py-14">
        <h1 className="text-h1">{t('contact.title')}</h1>
        <p className="mt-4 max-w-measure text-lg text-muted">{t('contact.lead')}</p>

        <dl className="mt-12 flex max-w-[46rem] flex-col">
          <div className="flex flex-col gap-1 border-t border-[color:var(--rule)] py-5 sm:flex-row sm:gap-8">
            <dt className="label sm:w-40 sm:shrink-0">{labelCase(locale, t('contact.phoneLabel'))}</dt>
            <dd>
              <a href={`tel:${PHONE_TEL}`} className="font-display text-h2 text-lamp hover:text-floor">
                {PHONE_DISPLAY}
              </a>
            </dd>
          </div>
          <div className="flex flex-col gap-1 border-t border-[color:var(--rule)] py-5 sm:flex-row sm:gap-8">
            <dt className="label sm:w-40 sm:shrink-0">{labelCase(locale, t('contact.emailLabel'))}</dt>
            <dd>
              <a href={`mailto:${EMAIL}`} className="text-lg text-lamp hover:text-floor">
                {EMAIL}
              </a>
            </dd>
          </div>
          <div className="flex flex-col gap-1 border-t border-[color:var(--rule)] py-5 sm:flex-row sm:gap-8">
            <dt className="label sm:w-40 sm:shrink-0">{labelCase(locale, t('contact.addressLabel'))}</dt>
            <dd>
              <address className="not-italic">{ADDRESS[locale as Locale]}</address>
            </dd>
          </div>
          <div className="flex flex-col gap-1 border-t border-[color:var(--rule)] py-5 sm:flex-row sm:gap-8">
            <dt className="label sm:w-40 sm:shrink-0">{labelCase(locale, t('visit.gettingHereHeading'))}</dt>
            <dd><MapLink /></dd>
          </div>
          <div className="flex flex-col gap-1 border-y border-[color:var(--rule)] py-5 sm:flex-row sm:gap-8">
            <dt className="label sm:w-40 sm:shrink-0">{labelCase(locale, t('contact.hoursLabel'))}</dt>
            <dd>{t('visit.whenBody')}</dd>
          </div>
        </dl>

        <p className="mt-8 max-w-measure text-muted">{t('contact.bookingNote')}</p>
      </div>
    </>
  );
}
