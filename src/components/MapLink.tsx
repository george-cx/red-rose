import { getTranslations } from 'next-intl/server';
import { MAP, mapUrl } from '@/lib/contact';
import { Placeholder } from './Placeholder';

/**
 * A plain link to the pin, not an embedded map. An iframe would load
 * third-party script on every page view and set cookies before a guest has
 * agreed to anything; the link goes to exactly the same place for free.
 *
 * Until the coordinates are filled in, the gap is named rather than hidden.
 */
export async function MapLink() {
  const t = await getTranslations('contact');
  const href = mapUrl();

  if (!href) {
    return (
      <Placeholder name="GETTING_HERE" hint="paste the coordinates into src/lib/contact.ts" />
    );
  }

  return (
    <span className="flex flex-col gap-1">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-lamp transition-colors hover:text-floor"
      >
        {t('openInMaps')} ↗
      </a>
      {MAP.coords ? (
        <span className="text-[0.8125rem] tabular-nums text-muted">
          {t('coordsLabel')}: {MAP.coords.lat.toFixed(5)}, {MAP.coords.lng.toFixed(5)}
        </span>
      ) : null}
    </span>
  );
}
