/**
 * The root document itself is a real route (src/app/page.tsx), so it exists in
 * `next dev` too. This only adds the Cloudflare Pages rule, which redirects `/`
 * server-side so nobody has to wait for the client-side forward.
 */

import { writeFileSync, existsSync, readFileSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'out');

if (!existsSync(OUT)) {
  console.error('post-export: out/ does not exist — run the build first.');
  process.exit(1);
}

/**
 * Confirm the export really landed in out/. `distDir` relocates the exported
 * site when output is 'export', so a misconfigured dist directory sends the
 * build somewhere else and leaves a stale out/ behind — with every command
 * still reporting success. Read where Next says it wrote and check.
 */
const detail = join(ROOT, '.next', 'export-detail.json');
if (existsSync(detail)) {
  const { outDirectory } = JSON.parse(readFileSync(detail, 'utf8')) as { outDirectory?: string };
  if (outDirectory && resolve(outDirectory) !== resolve(OUT)) {
    console.error(
      `post-export: the export went to ${outDirectory}, not ${OUT}.\n` +
        '  distDir relocates the exported site — leave it at the default for builds.',
    );
    process.exit(1);
  }
}

if (!existsSync(join(OUT, 'index.html'))) {
  console.error('post-export: out/index.html is missing — src/app/page.tsx should have produced it.');
  process.exit(1);
}

writeFileSync(join(OUT, '_redirects'), '/  /ka/  302\n', 'utf8');

console.log('post-export: out/index.html present, wrote out/_redirects');
