import type { Locale } from '@/i18n/routing';

/**
 * Georgian has no case. It has Mtavruli — a display form used for titles and
 * signage, where the letters lose their ascenders and descenders and sit on one
 * band. It is what Georgian signwriting looks like, and it is the right texture
 * for a label.
 *
 * `text-transform: uppercase` does not produce it: browsers deliberately leave
 * Mkhedruli alone so running text is not mangled. So the mapping is done here,
 * by codepoint — Mkhedruli U+10D0..U+10FA and U+10FD..U+10FF shift to Mtavruli
 * at +0x0BC0. DESIGN.md §3.
 */
export function toMtavruli(text: string): string {
  let out = '';
  for (const char of text) {
    const cp = char.codePointAt(0)!;
    const isMkhedruli = (cp >= 0x10d0 && cp <= 0x10fa) || (cp >= 0x10fd && cp <= 0x10ff);
    out += isMkhedruli ? String.fromCodePoint(cp + 0x0bc0) : char;
  }
  return out;
}

/** Label text for the current locale: Mtavruli in Georgian, unchanged elsewhere. */
export function labelCase(locale: Locale, text: string): string {
  return locale === 'ka' ? toMtavruli(text) : text;
}
