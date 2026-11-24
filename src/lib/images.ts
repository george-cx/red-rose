import { existsSync, readdirSync, openSync, readSync, closeSync } from 'node:fs';
import { join } from 'node:path';

export interface Photo {
  /** Web path, e.g. /visits/a-train-from-prague/01.jpg */
  src: string;
  width: number;
  height: number;
  /** width / height, used to justify gallery rows. */
  ratio: number;
  /**
   * Whether the -480/-960/-1600 files exist. A photograph dropped in by hand
   * has none until `pnpm prepare-images` is run, and must be served straight
   * rather than through the loader, which would point at files that aren't
   * there.
   */
  hasVariants: boolean;
}

const VARIANT_WIDTHS = [480, 960, 1600];

/**
 * The loader serves .webp, so that is what has to be on disk. When cwebp was
 * unavailable at prepare time these are missing, and the photograph is served
 * straight from its original instead of pointing at files that do not exist.
 */
function variantsExist(dir: string, name: string): boolean {
  const stem = name.replace(/\.[^.]+$/, '');
  return VARIANT_WIDTHS.every((w) => existsSync(join(dir, `${stem}-${w}.webp`)));
}

const PUBLIC = join(process.cwd(), 'public');

/**
 * Reads a JPEG or PNG header far enough to get its dimensions. Doing this at
 * build time rather than from a manifest means photographs dropped into
 * public/visits/<slug>/ by hand simply work, with no script to remember.
 */
function readDimensions(file: string): { width: number; height: number } | null {
  const fd = openSync(file, 'r');
  try {
    const head = Buffer.alloc(64 * 1024);
    const read = readSync(fd, head, 0, head.length, 0);

    // PNG: IHDR is always at byte 16.
    if (read > 24 && head.readUInt32BE(0) === 0x89504e47) {
      return { width: head.readUInt32BE(16), height: head.readUInt32BE(20) };
    }

    // JPEG: walk the segment markers to the start-of-frame.
    if (read > 4 && head[0] === 0xff && head[1] === 0xd8) {
      let offset = 2;
      while (offset + 9 < read) {
        if (head[offset] !== 0xff) {
          offset += 1;
          continue;
        }
        const marker = head[offset + 1];
        // SOF0..SOF15, excluding the non-frame markers DHT/JPG/DAC.
        if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
          return { height: head.readUInt16BE(offset + 5), width: head.readUInt16BE(offset + 7) };
        }
        offset += 2 + head.readUInt16BE(offset + 2);
      }
    }
    return null;
  } finally {
    closeSync(fd);
  }
}

const cache = new Map<string, Photo[]>();

/**
 * Every photograph belonging to a visit, in filename order. `names` comes from
 * the MDX frontmatter; when it is empty we simply read the directory, so a
 * hand-added post needs no frontmatter for its pictures.
 */
export function photosFor(slug: string, names: string[] = []): Photo[] {
  const cached = cache.get(slug);
  if (cached) return cached;

  const dir = join(PUBLIC, 'visits', slug);
  if (!existsSync(dir)) {
    cache.set(slug, []);
    return [];
  }

  const onDisk = readdirSync(dir)
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .filter((f) => !/-(480|960|1600)\.(jpe?g|png)$/i.test(f))
    .sort();

  const ordered = names.length ? names.filter((n) => onDisk.includes(n)) : onDisk;

  const photos = ordered.flatMap<Photo>((name) => {
    const dims = readDimensions(join(dir, name));
    if (!dims) return [];
    return [{
      src: `/visits/${slug}/${name}`,
      width: dims.width,
      height: dims.height,
      ratio: dims.width / dims.height,
      hasVariants: variantsExist(dir, name),
    }];
  });

  cache.set(slug, photos);
  return photos;
}

/** The pre-generated width nearest to `want`, or the original when there are none. */
export function variantSrc(photo: Photo, want: 480 | 960 | 1600): string {
  if (!photo.hasVariants) return photo.src;
  const dot = photo.src.lastIndexOf('.');
  return `${photo.src.slice(0, dot)}-${want}.webp`;
}

/**
 * A site-level photograph, e.g. the home page hero. `name` may be given with or
 * without an extension — the file is matched case-insensitively across the
 * formats a phone or a Mac is likely to produce, so dropping in
 * `Exterior-Night.JPEG` works as well as the documented name.
 */
export function sitePhoto(name: string): Photo | null {
  const dir = join(PUBLIC, 'site');
  if (!existsSync(dir)) return null;

  const stem = name.replace(/\.[^.]+$/, '').toLowerCase();
  const found = readdirSync(dir)
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .filter((f) => !/-(480|960|1600)\.[^.]+$/i.test(f))
    .find((f) => f.replace(/\.[^.]+$/, '').toLowerCase() === stem);
  if (!found) return null;

  name = found;
  const file = join(dir, name);
  const dims = readDimensions(file);
  if (!dims) return null;
  return {
    src: `/site/${name}`,
    width: dims.width,
    height: dims.height,
    ratio: dims.width / dims.height,
    hasVariants: variantsExist(dir, name),
  };
}

/**
 * Groups photographs into rows that each fill the measure, with equal heights.
 * Widths end up proportional to each picture's own aspect ratio, so mixed
 * ratios read as rhythm instead of breakage. DESIGN.md §5.
 */
export function justifyRows(photos: Photo[], targetPerRow = 3): Photo[][] {
  if (photos.length === 0) return [];
  if (photos.length <= 2) return [photos];

  const rows: Photo[][] = [];
  let row: Photo[] = [];

  for (const photo of photos) {
    row.push(photo);
    // Portraits are narrow, so a row of them can hold one more.
    const widthSoFar = row.reduce((sum, p) => sum + p.ratio, 0);
    if (row.length >= targetPerRow || widthSoFar >= 3.2) {
      rows.push(row);
      row = [];
    }
  }
  if (row.length) rows.push(row);
  return rows;
}
