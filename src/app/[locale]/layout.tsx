import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Noto_Sans, Noto_Sans_Georgian, Noto_Serif, Noto_Serif_Georgian } from 'next/font/google';

import '../globals.css';
import { locales, htmlLang, isLocale, type Locale } from '@/i18n/routing';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { alternatesFor } from '@/lib/metadata';
import { SITE_URL } from '@/lib/contact';

/**
 * Only the two Noto Georgian families carry Mkhedruli and Mtavruli; every other
 * serif on Google Fonts would silently fall back on the default locale. Their
 * Latin/Cyrillic siblings are the same design drawn for another script, so the
 * site reads as one typeface in all three locales. Verified in
 * scripts/verify-fonts.ts, which runs on prebuild. DESIGN.md §3.
 */
const serifKa = Noto_Serif_Georgian({
  subsets: ['georgian', 'latin'],
  weight: ['400', '600'],
  variable: '--font-serif-ka',
  display: 'swap',
});
const sansKa = Noto_Sans_Georgian({
  subsets: ['georgian', 'latin'],
  weight: ['400', '500', '700'],
  variable: '--font-sans-ka',
  display: 'swap',
});
const serif = Noto_Serif({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '600'],
  variable: '--font-serif',
  display: 'swap',
});
const sans = Noto_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#100E0A',
  colorScheme: 'dark',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslations({ locale, namespace: 'site' });

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t('name'), template: `%s — ${t('name')}` },
    description: t('description'),
    applicationName: t('name'),
    alternates: { canonical: `${SITE_URL}/${locale}/`, ...alternatesFor('') },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  const t = await getTranslations({ locale, namespace: 'nav' });

  return (
    <html
      lang={htmlLang[locale as Locale]}
      className={`${serifKa.variable} ${sansKa.variable} ${serif.variable} ${sans.variable}`}
    >
      <body className="font-body">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-stone focus:px-4 focus:py-2 focus:text-floor"
          >
            {t('skip')}
          </a>
          <Header locale={locale as Locale} />
          <main id="main">{children}</main>
          <Footer locale={locale as Locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
