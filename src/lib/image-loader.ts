'use client';

/**
 * Static export cannot run the Next image optimiser, so we pre-generate three
 * widths per photograph (scripts/prepare-images.ts) and map to the nearest one
 * here. That keeps a real srcset on a fully static site — DESIGN.md §5.
 */
const WIDTHS = [480, 960, 1600] as const;

export default function imageLoader({ src, width }: { src: string; width: number }) {
  // Anything that isn't one of our prepared photographs is served as-is.
  if (!src.startsWith('/visits/') && !src.startsWith('/site/')) return src;

  const target = WIDTHS.find((w) => w >= width) ?? WIDTHS[WIDTHS.length - 1];
  const dot = src.lastIndexOf('.');
  if (dot === -1) return src;
  // Variants are WebP — roughly a third lighter than the equivalent JPEG.
  return `${src.slice(0, dot)}-${target}.webp`;
}
