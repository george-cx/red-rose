import { cn } from '@/lib/utils';

/**
 * The name is never translated and never typeset from scratch: it exists as
 * relief letters on the plaster wall by the door, widely spaced, with a rose
 * device between the words. This reproduces that. DESIGN.md §3a.
 */
export function Wordmark({
  className,
  size = 'sm',
}: {
  className?: string;
  size?: 'sm' | 'lg';
}) {
  return (
    // role="img" with a name: the rose device sits between the two words, so
    // without it the accessible name computes as "REDROSE" and no longer
    // matches the visible text.
    <span
      role="img"
      aria-label="RED ROSE"
      className={cn(
        'inline-flex items-center whitespace-nowrap font-display text-floor',
        size === 'sm' ? 'text-[0.875rem] tracking-[0.22em]' : 'text-h2 tracking-[0.2em]',
        className,
      )}
    >
      RED
      <RoseDevice className={size === 'sm' ? 'mx-[0.45em] h-[0.72em] w-[0.72em]' : 'mx-[0.4em] h-[0.7em] w-[0.7em]'} />
      ROSE
    </span>
  );
}

export function RoseDevice({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={cn('shrink-0', className)}>
      <g fill="var(--oxblood)">
        <circle cx="12" cy="5.2" r="3.9" />
        <circle cx="18.9" cy="8.6" r="3.9" />
        <circle cx="18.9" cy="16.4" r="3.9" />
        <circle cx="12" cy="19.8" r="3.9" />
        <circle cx="5.1" cy="16.4" r="3.9" />
        <circle cx="5.1" cy="8.6" r="3.9" />
      </g>
      <circle cx="12" cy="12.5" r="3.4" fill="var(--qvevri)" />
    </svg>
  );
}
