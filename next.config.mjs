import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  /**
   * `next dev` and `next build` both write to .next by default, so building
   * while a dev server is running pulls the chunks out from under it and the
   * dev server dies with "Cannot find module './903.js'".
   *
   * The dev server gets its own directory, not the build: with
   * output: 'export', distDir relocates the exported site itself, so moving
   * the *build* would quietly leave out/ stale while every command still
   * reported success.
   */
  distDir: process.env.NEXT_DIST_DIR || '.next',
  trailingSlash: true,
  reactStrictMode: true,
  images: {
    // Static export cannot run the Next image optimiser. We pre-generate
    // 480/960/1600 variants in scripts/prepare-images.ts and pick between
    // them here, so srcset still works and Lighthouse stays happy.
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
    unoptimized: false,
  },
};

export default withNextIntl(nextConfig);
