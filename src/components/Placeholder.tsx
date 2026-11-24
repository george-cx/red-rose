/**
 * Anything the posts do not tell us is a visible placeholder, never a
 * plausible-looking guess. Every one of these is listed in PLACEHOLDERS.md.
 */
export function Placeholder({ name, hint }: { name: string; hint?: string }) {
  return (
    <span
      className="inline-flex items-baseline gap-1.5 border border-dashed border-oxblood px-2 py-0.5 align-baseline text-[0.8125rem] text-floor"
      data-placeholder={name}
    >
      <span className="font-mono text-oxblood" aria-hidden="true">[[</span>
      {name}
      {hint ? <span className="text-muted">— {hint}</span> : null}
      <span className="font-mono text-oxblood" aria-hidden="true">]]</span>
    </span>
  );
}
