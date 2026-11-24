'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/i18n/routing';

export interface BlogEntry {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  cover?: { src: string; width: number; height: number };
  isTranslated: boolean;
}

const PAGE = 24;

/**
 * The archive. Deliberately plain: a hairline between entries, a thumbnail, a
 * title, one line, a tag. It has to still work at four hundred entries.
 *
 * Filtering is by subject rather than by year, because the source carries a
 * usable date for two posts out of forty-four. DESIGN.md §0.
 */
export function BlogList({
  locale,
  entries,
  tags,
  labels,
}: {
  locale: Locale;
  entries: BlogEntry[];
  tags: Array<{ tag: string; label: string; count: number }>;
  labels: {
    filter: string;
    all: string;
    loadMore: string;
    showing: string;
    empty: string;
    translated: string;
  };
}) {
  const [active, setActive] = useState<string | null>(null);
  const [shown, setShown] = useState(PAGE);

  const filtered = useMemo(
    () => (active ? entries.filter((e) => e.tags.includes(active)) : entries),
    [entries, active],
  );
  const visible = filtered.slice(0, shown);

  function choose(tag: string | null) {
    setActive(tag);
    setShown(PAGE);
  }

  return (
    <>
      <div className="mb-10 flex flex-wrap items-center gap-x-4 gap-y-2" role="group" aria-label={labels.filter}>
        <FilterButton active={active === null} onClick={() => choose(null)}>
          {labels.all}
        </FilterButton>
        {tags.map(({ tag, label, count }) => (
          <FilterButton key={tag} active={active === tag} onClick={() => choose(tag)}>
            {label} <span className="text-muted">{count}</span>
          </FilterButton>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-muted">{labels.empty}</p>
      ) : (
        <ul className="border-t border-[color:var(--rule)]">
          {visible.map((entry) => (
            <li key={entry.slug} className="border-b border-[color:var(--rule)]">
              <Link
                href={`/${locale}/blog/${entry.slug}/`}
                className="group flex gap-5 py-5 transition-colors hover:bg-stone/40"
              >
                {entry.cover ? (
                  <span className="hidden h-[76px] w-[114px] shrink-0 overflow-hidden sm:block">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={entry.cover.src}
                      alt=""
                      width={114}
                      height={76}
                      loading="lazy"
                      decoding="async"
                      className="photo h-full w-full object-cover"
                    />
                  </span>
                ) : (
                  <span className="hidden h-[76px] w-[114px] shrink-0 border border-[color:var(--rule)] sm:block" />
                )}

                <span className="min-w-0 flex-1">
                  <span className="block font-display text-lg text-floor transition-colors group-hover:text-lamp">
                    {entry.title}
                  </span>
                  <span className="mt-1 block text-[0.9375rem] text-muted">{entry.excerpt}</span>
                  <span className="label mt-2 block">
                    {entry.tags.map((t) => tags.find((x) => x.tag === t)?.label ?? t).join(' · ')}
                    {entry.isTranslated ? <span className="text-muted"> · {labels.translated}</span> : null}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-6">
        {shown < filtered.length ? (
          <button
            type="button"
            onClick={() => setShown((n) => n + PAGE)}
            className="label border border-[color:var(--rule-strong)] px-5 py-3 text-floor transition-colors hover:border-lamp hover:text-lamp"
          >
            {labels.loadMore}
          </button>
        ) : null}
        <p className="label" aria-live="polite">
          {labels.showing
            .replace('{shown}', String(visible.length))
            .replace('{total}', String(filtered.length))}
        </p>
      </div>
    </>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`label transition-colors hover:text-floor ${active ? 'text-lamp' : ''}`}
    >
      {children}
    </button>
  );
}
