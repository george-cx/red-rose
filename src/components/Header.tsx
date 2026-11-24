import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Wordmark } from './Wordmark';
import { LocaleSwitcher } from './LocaleSwitcher';
import { PHONE_DISPLAY, PHONE_TEL } from '@/lib/contact';
import { labelCase } from '@/lib/georgian';

const ROUTES = ['cellar', 'wines', 'visit', 'blog', 'contact'] as const;

export async function Header({ locale, path = '' }: { locale: Locale; path?: string }) {
  const t = await getTranslations('nav');

  return (
    <header className="border-b border-[color:var(--rule)]">
      <div className="mx-auto flex max-w-wide flex-wrap items-center gap-x-6 gap-y-3 px-6 py-4">
        <Link href={`/${locale}/`} className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="h-[13px] w-[13px] shrink-0 rounded-full border-[3px] border-oxblood"
          />
          <Wordmark />
        </Link>

        <nav aria-label={t('menu')} className="order-3 flex w-full flex-wrap gap-x-5 gap-y-2 sm:order-none sm:w-auto">
          {ROUTES.map((route) => (
            <Link
              key={route}
              href={`/${locale}/${route}/`}
              className="label transition-colors hover:text-floor"
            >
              {labelCase(locale, t(route))}
            </Link>
          ))}
        </nav>

        <div className="ms-auto flex items-center gap-5">
          <LocaleSwitcher current={locale} path={path} label={t('language')} />
          <a
            href={`tel:${PHONE_TEL}`}
            className="label whitespace-nowrap text-floor transition-colors hover:text-lamp"
          >
            {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </header>
  );
}
