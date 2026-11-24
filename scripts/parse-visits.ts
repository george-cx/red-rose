/**
 * Converts visits-source.md into content/visits/<locale>/<slug>.mdx.
 *
 * Run once:  pnpm parse-visits
 *
 * The original text of every post comes from visits-source.md and is never
 * retyped. Everything editorial — slug, title, excerpt, tags, sequence and the
 * two translations — comes from scripts/visits-data.ts. New visits are added
 * afterwards by hand as MDX; this script is not needed again.
 *
 * Anything it cannot place is reported rather than dropped.
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { visits, type Lang } from './visits-data';
import { ROOT, readSource, webImageNames } from './source';

const OUT = join(ROOT, 'content', 'visits');
const LOCALES: Lang[] = ['ka', 'en', 'ru'];

function yamlString(value: string): string {
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

function frontmatter(fields: Array<[string, string | undefined]>): string {
  const lines = fields.filter((f): f is [string, string] => f[1] !== undefined);
  return ['---', ...lines.map(([k, v]) => `${k}: ${v}`), '---'].join('\n');
}

function main() {
  const source = readSource();
  const byPost = new Map(source.map((p) => [p.post, p]));
  const problems: string[] = [];
  const notes: string[] = [];

  const seenPosts = new Set(visits.map((v) => v.post));
  for (const p of source) {
    if (!seenPosts.has(p.post)) {
      problems.push(
        `Post ${p.post} is in visits-source.md but has no entry in visits-data.ts — NOT published.`,
      );
    }
  }

  let written = 0;

  for (const entry of visits) {
    const src = byPost.get(entry.post);
    if (!src) {
      problems.push(`Post ${entry.post} (${entry.slug}) is in visits-data.ts but not in the source — skipped.`);
      continue;
    }

    const images = webImageNames(src.images.length);
    if (images.length === 0) {
      notes.push(`Post ${entry.post} (${entry.slug}) has no photograph. Templates handle this.`);
    }

    for (const locale of LOCALES) {
      const isOriginal = locale === entry.lang;
      const text = isOriginal ? src.text : (entry.body[locale] ?? '').trim();

      if (!isOriginal && !text && src.text) {
        problems.push(`Post ${entry.post} (${entry.slug}) has no ${locale} translation — falls back to ${entry.lang}.`);
        continue;
      }
      if (!src.text && isOriginal) {
        notes.push(`Post ${entry.post} (${entry.slug}) has no text in the source — published as a photograph only.`);
      }

      const fm = frontmatter([
        ['title', yamlString(entry.title[locale])],
        ['excerpt', yamlString(entry.excerpt[locale])],
        // No `date`. The source dates 2 posts out of 44, so the archive is
        // ordered editorially instead. See DESIGN.md §0.
        ['order', String(entry.order)],
        ['lang', yamlString(entry.lang)],
        ['sourcePost', String(entry.post)],
        ['tags', `[${entry.tags.map(yamlString).join(', ')}]`],
        ['images', `[${images.map(yamlString).join(', ')}]`],
        ['cover', images.length ? yamlString(images[0]) : undefined],
        ['country', entry.country ? `[${entry.country.map(yamlString).join(', ')}]` : undefined],
        ['guestCount', entry.guestCount !== undefined ? String(entry.guestCount) : undefined],
      ]);

      const dir = join(OUT, locale);
      if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
      writeFileSync(join(dir, `${entry.slug}.mdx`), `${fm}\n\n${text}\n`, 'utf8');
      written += 1;
    }
  }

  console.log(`\nparse-visits`);
  console.log(`  source posts read : ${source.length}`);
  console.log(`  entries published : ${visits.length}`);
  console.log(`  mdx files written : ${written}`);

  if (notes.length) {
    console.log(`\n  notes (${notes.length}):`);
    for (const n of notes) console.log(`    · ${n}`);
  }
  if (problems.length) {
    console.log(`\n  NEEDS ATTENTION (${problems.length}):`);
    for (const p of problems) console.log(`    ! ${p}`);
  } else {
    console.log(`\n  nothing skipped, nothing ambiguous.`);
  }
  console.log('');
}

main();
