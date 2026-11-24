import { cn } from '@/lib/utils';

export interface DefItem {
  name: string;
  note: string;
  /** Optional short qualifier shown under the name — an age, a size. */
  meta?: string;
}

/** Name on the left, one paragraph on the right, a hairline between. The site's
 *  only list pattern, used for wines, artefacts, offerings and practice. */
export function DefList({ items, wide = false }: { items: DefItem[]; wide?: boolean }) {
  return (
    <dl className="flex flex-col">
      {items.map((item) => (
        <div
          key={item.name}
          className="flex flex-col gap-1 border-b border-[color:var(--rule)] py-5 sm:flex-row sm:gap-8"
        >
          <dt className={cn('shrink-0 font-display', wide ? 'text-h3 sm:w-64' : 'text-lg sm:w-56')}>
            {item.name}
            {item.meta ? <span className="label mt-1 block">{item.meta}</span> : null}
          </dt>
          <dd className="max-w-measure text-muted">{item.note}</dd>
        </div>
      ))}
    </dl>
  );
}
