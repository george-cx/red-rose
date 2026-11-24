export const locales = ['ka', 'en', 'ru'] as const;
export type Locale = (typeof locales)[number];

/** Georgian is the default locale (BUILD-PROMPT.md → Languages). */
export const defaultLocale: Locale = 'ka';

/** BCP-47 tags for <html lang> and hreflang. */
export const htmlLang: Record<Locale, string> = { ka: 'ka-GE', en: 'en', ru: 'ru' };

export const localeNames: Record<Locale, string> = {
  ka: 'ქართული',
  en: 'English',
  ru: 'Русский',
};

/** Short switcher labels. Georgian uses Mtavruli — DESIGN.md §3. */
export const localeShort: Record<Locale, string> = { ka: 'ᲥᲐ', en: 'EN', ru: 'RU' };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
