import type { Config } from 'tailwindcss';

/**
 * Every colour here is measured from the cellar's own photographs
 * (k-means over nine interiors plus the night exterior). See DESIGN.md §1–2.
 */
const config: Config = {
  content: ['./src/**/*.{ts,tsx,mdx}', './content/**/*.mdx'],
  theme: {
    extend: {
      colors: {
        qvevri: '#100E0A',   // the mouth of the qvevri — page ground
        stone: '#2A2320',    // wall stone in shadow — raised surfaces
        edge: '#6A5A48',     // lit wall stone — hairlines only, never text
        floor: '#DAD4C0',    // the flagstone floor — all text
        lamp: '#D3A01C',     // the tungsten bulb — the one luminous colour
        oxblood: '#6E2F38',  // the ring round the qvevri — solids only
        muted: '#9C9384',    // floor at 70% over ground
      },
      fontFamily: {
        display: ['var(--font-serif-ka)', 'var(--font-serif)', 'Georgia', 'serif'],
        body: ['var(--font-sans-ka)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // one ratio, 1.25, from 16px — DESIGN.md §3
        label: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.12em' }],
        base: ['1rem', { lineHeight: '1.7' }],
        lg: ['1.25rem', { lineHeight: '1.5' }],
        h3: ['1.5625rem', { lineHeight: '1.3' }],
        h2: ['1.953rem', { lineHeight: '1.22' }],
        h1: ['2.441rem', { lineHeight: '1.15' }],
      },
      maxWidth: { measure: '34rem', wide: '64rem' },
      transitionDuration: { DEFAULT: '150ms' },
    },
  },
  plugins: [],
};

export default config;
