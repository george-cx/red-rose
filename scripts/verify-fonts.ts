/**
 * Guards the one failure that ships silently.
 *
 * Georgian is the default locale. Almost every serif on Google Fonts carries
 * Cyrillic but not Mkhedruli, so a font swap that looks fine in Russian would
 * quietly render the most important text on the site in a system fallback.
 *
 * This reads the font binaries' cmap tables and checks the glyphs are really
 * there. Runs on `prebuild`. A confirmed-missing glyph fails the build; a
 * network problem only warns, so an offline build is still possible.
 */

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LAYOUT = join(ROOT, 'src', 'app', '[locale]', 'layout.tsx');

/** ა (Mkhedruli), ღ (a distinctive descender), Ⴀ (Mtavruli). */
const REQUIRED_GEORGIAN = [0x10d0, 0x10e6, 0x1c90];
const REQUIRED_CYRILLIC = [0x0410, 0x044f];

const UA = 'Mozilla/5.0'; // an old UA makes Google Fonts serve TTF, not woff2

function cmapCodepoints(data: Buffer): Set<number> {
  const numTables = data.readUInt16BE(4);
  let cmapOffset = -1;
  for (let i = 0; i < numTables; i += 1) {
    const o = 12 + 16 * i;
    if (data.toString('latin1', o, o + 4) === 'cmap') cmapOffset = data.readUInt32BE(o + 8);
  }
  if (cmapOffset < 0) return new Set();

  const n = data.readUInt16BE(cmapOffset + 2);
  let best = -1;
  let bestFormat = -1;
  for (let i = 0; i < n; i += 1) {
    const sub = cmapOffset + data.readUInt32BE(cmapOffset + 4 + 8 * i + 4);
    const format = data.readUInt16BE(sub);
    if ((format === 4 || format === 12) && format > bestFormat) {
      best = sub;
      bestFormat = format;
    }
  }
  if (best < 0) return new Set();

  const out = new Set<number>();
  if (bestFormat === 4) {
    const segX2 = data.readUInt16BE(best + 6);
    const seg = segX2 / 2;
    for (let i = 0; i < seg; i += 1) {
      const end = data.readUInt16BE(best + 14 + 2 * i);
      const start = data.readUInt16BE(best + 16 + segX2 + 2 * i);
      if (start === 0xffff) continue;
      for (let c = start; c <= end && c !== 0x10000; c += 1) out.add(c);
    }
  } else {
    const groups = data.readUInt32BE(best + 12);
    for (let i = 0; i < groups; i += 1) {
      const g = best + 16 + 12 * i;
      const start = data.readUInt32BE(g);
      const end = data.readUInt32BE(g + 4);
      for (let c = start; c <= Math.min(end, start + 5000); c += 1) out.add(c);
    }
  }
  return out;
}

async function coverage(family: string): Promise<Set<number>> {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@400&display=swap`,
    { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(20_000) },
  ).then((r) => r.text());

  const urls = [...css.matchAll(/url\((https:\/\/[^)]+\.ttf)\)/g)].map((m) => m[1]);
  const all = new Set<number>();
  for (const url of [...new Set(urls)]) {
    const response = await fetch(url, { headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(20_000) });
    const buf = Buffer.from(new Uint8Array(await response.arrayBuffer()));
    for (const cp of cmapCodepoints(buf)) all.add(cp);
  }
  return all;
}

async function main() {
  const layout = readFileSync(LAYOUT, 'utf8');

  const families = [...layout.matchAll(/^import \{([^}]+)\} from 'next\/font\/google';/gm)]
    .flatMap((m) => m[1].split(','))
    .map((s) => s.trim().replace(/_/g, ' '))
    .filter(Boolean);

  const georgianFamilies = families.filter((f) => /Georgian/.test(f));
  const otherFamilies = families.filter((f) => !/Georgian/.test(f));

  if (georgianFamilies.length < 2) {
    console.error(
      '\nverify-fonts: FAILED\n' +
        '  The layout must load a Georgian display face and a Georgian body face.\n' +
        `  Found: ${families.join(', ') || 'none'}\n`,
    );
    process.exit(1);
  }

  let checked = 0;
  const failures: string[] = [];

  for (const family of [...georgianFamilies, ...otherFamilies]) {
    let cps: Set<number>;
    try {
      cps = await coverage(family);
    } catch {
      console.warn(`verify-fonts: could not reach Google Fonts for "${family}" — skipping the live check.`);
      continue;
    }
    checked += 1;

    const wanted = /Georgian/.test(family) ? REQUIRED_GEORGIAN : REQUIRED_CYRILLIC;
    const missing = wanted.filter((cp) => !cps.has(cp));
    if (missing.length) {
      failures.push(`  ${family} is missing ${missing.map((c) => `U+${c.toString(16).toUpperCase()}`).join(', ')}`);
    }
  }

  if (failures.length) {
    console.error(`\nverify-fonts: FAILED\n${failures.join('\n')}\n`);
    process.exit(1);
  }

  console.log(
    `verify-fonts: ok — ${families.length} families declared, ${checked} verified against their cmap tables.`,
  );
}

main();
