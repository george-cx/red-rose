import Link from 'next/link';
import { locales, localeNames, localeShort, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

/** Three real links, not a dropdown — they carry hreflang and work without JS. */
export function LocaleSwitcher({
  current,
  path,
  label,
}: {
  current: Locale;
  /** Path after the locale segment, e.g. "blog/a-train-from-prague" or "". */
  path: string;
  label: string;
}) {
  return (
    <nav aria-label={label} className="flex items-center gap-3">
      {locales.map((locale) => {
        const href = `/${locale}${path ? `/${path}` : ''}/`;
        const isCurrent = locale === current;
        return (
          <Link
            key={locale}
            href={href}
            hrefLang={locale}
            lang={locale}
            aria-current={isCurrent ? 'true' : undefined}
            className={cn(
              'label transition-colors hover:text-floor',
              isCurrent && 'text-lamp',
            )}
          >
            <span className="sr-only">{localeNames[locale]}</span>
            <span aria-hidden="true">{localeShort[locale]}</span>
          </Link>
        );
      })}
    </nav>
  );
}
