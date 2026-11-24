/** Shared reader for visits-source.md, used by parse-visits and prepare-images. */

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');

export interface SourcePost {
  post: number;
  text: string;
  /** Original filenames as they appear inside the Pages package. */
  images: string[];
}

export function readSource(): SourcePost[] {
  const raw = readFileSync(join(ROOT, 'visits-source.md'), 'utf8');
  const body = raw.slice(raw.indexOf('\n## Post '));

  return body
    .split(/\n## Post\s+/)
    .filter(Boolean)
    .map((chunk) => {
      const nl = chunk.indexOf('\n');
      const post = Number(chunk.slice(0, nl).trim());
      let rest = chunk.slice(nl + 1);

      const images: string[] = [];
      rest = rest.replace(/^Images:.*$/gm, (line) => {
        for (const m of line.matchAll(/`([^`]+)`/g)) images.push(m[1]);
        return '';
      });

      rest = rest
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/^_\(no text in source[^\n]*$/gm, '')
        // The Pages document left the odd stray control character behind.
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
        .replace(/\n{3,}/g, '\n\n')
        .trim();

      return { post, text: rest, images };
    });
}

/** Photographs are republished as 01.jpg, 02.jpg ... under public/visits/<slug>/. */
export function webImageNames(count: number): string[] {
  return Array.from({ length: count }, (_, i) => `${String(i + 1).padStart(2, '0')}.jpg`);
}
