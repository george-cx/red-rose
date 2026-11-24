/**
 * Copies the photographs out of source-photos/ into public/visits/<slug>/ and
 * generates the three widths the image loader expects.
 *
 *   pnpm exec tsx scripts/prepare-images.ts
 *
 * Uses macOS `sips`, so it runs on the author's machine, not on the deploy
 * host. The generated files are committed — Cloudflare Pages only serves them.
 *
 * Adding photographs later needs none of this: drop full-size JPEGs into
 * public/visits/<slug>/ and the site reads whatever is there. Running this
 * script again regenerates the responsive widths for them.
 */

import { existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join } from 'node:path';
import { ROOT, readSource, webImageNames } from './source';
import { visits } from './visits-data';

const WIDTHS = [480, 960, 1600];
const BASE_WIDTH = 1200; // the un-suffixed file, used for OG images

/**
 * Quality falls as the width rises. These are noisy phone snapshots, so the
 * large sizes carry compression well, and the payload is what Lighthouse
 * actually measures.
 */
const QUALITY: Record<number, string> = { 480: '72', 960: '60', 1200: '58', 1600: '50' };

/**
 * WebP for the responsive variants — about a third smaller than the same JPEG
 * at matching quality, which is worth having for guests on rural connections.
 * The un-suffixed .jpg stays: link previews on some platforms still want JPEG,
 * and it is what the site falls back to if cwebp is not installed.
 */
const HAS_CWEBP = (() => {
  try {
    execFileSync('cwebp', ['-version'], { stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
})();

const WEBP_QUALITY = '78';

/**
 * The resized JPEG is only an intermediate for cwebp. Once the WebP exists
 * nothing serves it — the loader asks for .webp and link previews use the
 * un-suffixed base file — so it is removed rather than committed as dead
 * weight. If cwebp is missing the JPEG stays and is served instead.
 */
function webp(input: string, output: string) {
  if (!HAS_CWEBP) return;
  execFileSync('cwebp', ['-q', WEBP_QUALITY, '-quiet', input, '-o', output], { stdio: 'ignore' });
  if (existsSync(output)) rmSync(input);
}

function sips(input: string, output: string, width: number) {
  execFileSync(
    'sips',
    ['-Z', String(width), '-s', 'format', 'jpeg', '-s', 'formatOptions', QUALITY[width] ?? '60', input, '--out', output],
    { stdio: 'ignore' },
  );
}

function main() {
  const byPost = new Map(readSource().map((p) => [p.post, p]));
  let made = 0;
  const missing: string[] = [];

  for (const entry of visits) {
    const src = byPost.get(entry.post);
    if (!src || src.images.length === 0) continue;

    const dir = join(ROOT, 'public', 'visits', entry.slug);
    mkdirSync(dir, { recursive: true });
    const names = webImageNames(src.images.length);

    src.images.forEach((original, i) => {
      const from = join(ROOT, 'source-photos', original);
      if (!existsSync(from)) {
        missing.push(`${entry.slug} -> ${original}`);
        return;
      }
      const stem = names[i].replace(/\.jpg$/, '');
      sips(from, join(dir, `${stem}.jpg`), BASE_WIDTH);
      for (const w of WIDTHS) {
        sips(from, join(dir, `${stem}-${w}.jpg`), w);
        webp(join(dir, `${stem}-${w}.jpg`), join(dir, `${stem}-${w}.webp`));
      }
      made += 1;
    });
  }

  // Site-level photographs (the hero) live under public/site/.
  const siteDir = join(ROOT, 'public', 'site');
  if (existsSync(siteDir)) {
    for (const file of readdirSync(siteDir)) {
      // HEIC comes straight off an iPhone; sips converts it like anything else.
      if (!/\.(jpe?g|png|webp|heic)$/i.test(file)) continue;
      if (/-(480|960|1600)\.jpg$/i.test(file)) continue;
      const stem = file.replace(/\.[^.]+$/, '');
      const from = join(siteDir, file);
      sips(from, join(siteDir, `${stem}.jpg`), BASE_WIDTH);
      for (const w of WIDTHS) {
        sips(from, join(siteDir, `${stem}-${w}.jpg`), w);
        webp(join(siteDir, `${stem}-${w}.jpg`), join(siteDir, `${stem}-${w}.webp`));
      }
      made += 1;
    }
  }

  console.log('\nprepare-images');
  console.log(`  photographs processed : ${made}`);
  console.log(`  webp variants         : ${HAS_CWEBP ? 'yes' : 'SKIPPED — cwebp not found (brew install webp)'}`);
  if (missing.length) {
    console.log(`\n  MISSING SOURCE FILES (${missing.length}):`);
    for (const m of missing) console.log(`    ! ${m}`);
  }
  console.log('');
}

main();
