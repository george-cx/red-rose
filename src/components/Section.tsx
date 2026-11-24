import { getLocale } from 'next-intl/server';
import { cn } from '@/lib/utils';
import { labelCase } from '@/lib/georgian';
import type { Locale } from '@/i18n/routing';

export async function Section({
  eyebrow,
  heading,
  lead,
  children,
  className,
  headingId,
}: {
  eyebrow?: string;
  heading?: string;
  lead?: string;
  children?: React.ReactNode;
  className?: string;
  headingId?: string;
}) {
  const locale = (await getLocale()) as Locale;
  return (
    <section
      className={cn('border-t border-[color:var(--rule)] py-14 sm:py-20', className)}
      // Only claim a label when an element with that id is actually rendered;
      // a dangling aria-labelledby names the section after nothing.
      aria-labelledby={heading || eyebrow ? headingId : undefined}
    >
      <div className="mx-auto max-w-wide px-6">
        {(eyebrow || heading) && (
          <div className="mb-8 flex flex-col gap-3">
            <span className="rule-oxblood" aria-hidden="true" />
            {/* When a section has no separate heading the eyebrow *is* the
                heading — small and set in Mtavruli, but still an h2, so the
                document outline is real and aria-labelledby resolves. */}
            {eyebrow ? (
              heading ? (
                <span className="label">{labelCase(locale, eyebrow)}</span>
              ) : (
                <h2 id={headingId} className="label">
                  {labelCase(locale, eyebrow)}
                </h2>
              )
            ) : null}
            {heading ? (
              <h2 id={headingId} className="text-h2">
                {heading}
              </h2>
            ) : null}
            {lead ? <p className="max-w-measure text-muted">{lead}</p> : null}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
