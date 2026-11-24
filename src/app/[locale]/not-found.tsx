import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations();
  return (
    <div className="mx-auto max-w-wide px-6 py-24">
      <h1 className="text-h1">{t('notFound.title')}</h1>
      <p className="mt-4 max-w-measure text-muted">{t('notFound.body')}</p>
      <p className="mt-8 flex flex-wrap gap-6">
        <Link href="/ka/" className="label text-lamp hover:text-floor">
          {t('notFound.home')} →
        </Link>
        <Link href="/ka/blog/" className="label text-lamp hover:text-floor">
          {t('notFound.blog')} →
        </Link>
      </p>
    </div>
  );
}
