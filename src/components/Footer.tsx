import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n/routing';
import { Wordmark } from './Wordmark';
import { ADDRESS, EMAIL, PHONE_DISPLAY, PHONE_TEL } from '@/lib/contact';
import { labelCase } from '@/lib/georgian';

export async function Footer({ locale }: { locale: Locale }) {
  const t = await getTranslations();

  return (
    <footer className="mt-24 border-t border-[color:var(--rule)]">
      <div className="mx-auto flex max-w-wide flex-col gap-6 px-6 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-3">
          <Wordmark />
          <address className="text-[0.8125rem] not-italic text-muted">{ADDRESS[locale]}</address>
        </div>

        <div className="flex flex-col gap-2">
          <a href={`tel:${PHONE_TEL}`} className="text-lamp transition-colors hover:text-floor">
            {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${EMAIL}`} className="text-lamp transition-colors hover:text-floor">
            {EMAIL}
          </a>
          <Link href={`/${locale}/contact/`} className="label mt-2 transition-colors hover:text-floor">
            {labelCase(locale, t('nav.contact'))}
          </Link>
        </div>
      </div>
    </footer>
  );
}
