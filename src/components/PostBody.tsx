import { Fragment } from 'react';

/**
 * Renders a visit post.
 *
 * The posts are plain prose — across all 129 files there is not one JSX tag,
 * expression or import — so they are rendered as paragraphs rather than put
 * through an MDX compiler. That removes the whole class of risk behind
 * HCSEC-2026-01 (arbitrary code execution when server-rendering MDX) instead
 * of version-bumping away from it, and drops a build-time compiler the content
 * never needed.
 *
 * The files stay `.mdx`. If a post ever does need a component, this is the one
 * place that has to change.
 *
 * Text goes through React as text, so it is escaped — nothing here can inject
 * markup, whatever ends up in a post.
 */
export function PostBody({ text }: { text: string }) {
  const paragraphs = text
    .trim()
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return null;

  return (
    <div className="prose-visit max-w-measure text-floor">
      {paragraphs.map((paragraph, i) => (
        <p key={i}>
          {/* A single newline inside a paragraph is the author's own line
              break — eight of the posts rely on it — so it is kept. */}
          {paragraph.split('\n').map((line, j, lines) => (
            <Fragment key={j}>
              {line.trim()}
              {j < lines.length - 1 ? <br /> : null}
            </Fragment>
          ))}
        </p>
      ))}
    </div>
  );
}
