import type { Metadata } from 'next';
import Link from 'next/link';
import { locales, localeNames, defaultLocale } from '@/i18n/routing';
import { alternatesFor } from '@/lib/metadata';
import { SITE_URL } from '@/lib/contact';

/**
 * The root. A static export has no middleware, so `/` needs a real route or it
 * falls through to the 404 — which is exactly what happened in `next dev`,
 * where the generated out/index.html does not exist.
 *
 * It forwards to the default locale three ways, so it works with or without
 * JavaScript and on any host: a refresh meta, a replace() on load, and plain
 * links that stand on their own as a language chooser if both are blocked.
 * On Cloudflare Pages the _redirects rule usually gets there first and nobody
 * sees this page at all.
 */
export const metadata: Metadata = {
  title: 'RED ROSE',
  alternates: { canonical: `${SITE_URL}/${defaultLocale}/`, ...alternatesFor('') },
  robots: { index: false, follow: true },
};

export default function RootPage() {
  return (
    <html lang={defaultLocale}>
      <head>
        <meta httpEquiv="refresh" content={`0; url=/${defaultLocale}/`} />
      </head>
      <body
        style={{
          background: '#100E0A',
          color: '#DAD4C0',
          fontFamily: 'system-ui, sans-serif',
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <main style={{ padding: '3rem 1.5rem', textAlign: 'center' }}>
          <p style={{ letterSpacing: '0.22em', margin: '0 0 2rem' }}>RED ROSE</p>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
            }}
          >
            {locales.map((locale) => (
              <li key={locale}>
                <Link href={`/${locale}/`} hrefLang={locale} style={{ color: '#D3A01C' }}>
                  {localeNames[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </main>
        <script
          dangerouslySetInnerHTML={{ __html: `location.replace('/${defaultLocale}/')` }}
        />
      </body>
    </html>
  );
}
