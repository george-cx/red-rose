import { ADDRESS_PARTS, EMAIL, MAP, PHONE_TEL, SITE_URL, mapUrl } from '@/lib/contact';
import type { Locale } from '@/i18n/routing';

/** Structured data is emitted as a script tag; content is generated here, never
 *  user input, so the serialisation is safe. */
function Script({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

export function WineryJsonLd({
  locale,
  name,
  alternateName,
  description,
  image,
}: {
  locale: Locale;
  name: string;
  alternateName: string;
  description: string;
  image?: string;
}) {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': ['Winery', 'LocalBusiness'],
        '@id': `${SITE_URL}/#winery`,
        name,
        alternateName,
        description,
        url: `${SITE_URL}/${locale}/`,
        inLanguage: locale,
        telephone: PHONE_TEL,
        email: EMAIL,
        ...(image ? { image: `${SITE_URL}${image}` } : {}),
        address: {
          '@type': 'PostalAddress',
          // No streetAddress: the village is the address here, so the locality
          // carries it. Inventing a street would be worse than omitting one.
          addressLocality: ADDRESS_PARTS.locality,
          addressRegion: ADDRESS_PARTS.region,
          addressCountry: ADDRESS_PARTS.country,
        },
        areaServed: ADDRESS_PARTS.region,
        // Only emitted once a real pin exists; a guessed one would be worse
        // than none, because search results would send guests to it.
        ...(MAP.coords
          ? {
              geo: {
                '@type': 'GeoCoordinates',
                latitude: MAP.coords.lat,
                longitude: MAP.coords.lng,
              },
            }
          : {}),
        ...(mapUrl() ? { hasMap: mapUrl() } : {}),
        founder: { '@type': 'Person', name: 'Tariel Miqabadze' },
        servesCuisine: 'Georgian',
        makesOffer: ['Tsolikouri', 'Krakhuna', 'Aladasturi', 'Aleksandrouli'].map((variety) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Product', name: `${variety} wine`, category: 'Wine' },
        })),
      }}
    />
  );
}

export function ArticleJsonLd({
  locale,
  headline,
  description,
  url,
  image,
  inLanguage,
}: {
  locale: Locale;
  headline: string;
  description: string;
  url: string;
  image?: string;
  inLanguage: Locale;
}) {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline,
        description,
        url,
        inLanguage: locale,
        ...(inLanguage !== locale ? { translationOfWork: { '@type': 'Article', inLanguage } } : {}),
        ...(image ? { image: `${SITE_URL}${image}` } : {}),
        author: { '@type': 'Person', name: 'Tariel Miqabadze' },
        publisher: { '@id': `${SITE_URL}/#winery` },
        isPartOf: { '@type': 'Blog', name: 'RED ROSE', url: `${SITE_URL}/${locale}/blog/` },
      }}
    />
  );
}

export function BreadcrumbJsonLd({ items }: { items: Array<{ name: string; url: string }> }) {
  return (
    <Script
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}
