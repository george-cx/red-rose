/**
 * Supplied by the owner on 2026-09-04. Not from the posts — the posts carry no
 * contact details at all. See EXTRACTED-FACTS.md §12.
 */
export const PHONE_DISPLAY = '555 33 09 09';
export const PHONE_TEL = '+995555330909';
export const EMAIL = 'tarielmiqabadze295@gmail.com';

/**
 * Supplied by the owner on 2026-11-24. There is no street address — in rural
 * Georgia the village is the address, so this is the whole of it rather than a
 * gap. Directions and a map pin are a separate matter, still open.
 */
export const ADDRESS = {
  ka: 'სოფელი წითელხევი, ბაღდათის მუნიციპალიტეტი, იმერეთი, საქართველო',
  en: 'Tsitelkhevi village, Baghdati municipality, Imereti, Georgia',
  ru: 'Село Цительхеви, Багдатский муниципалитет, Имерети, Грузия',
};

/**
 * The map pin. Fill in `coords` with the cellar's latitude and longitude and
 * everything that depends on a map turns on by itself: the "open in Google
 * Maps" link on /visit and /contact, and `geo` + `hasMap` in the JSON-LD, which
 * is what actually puts a business on the map in search results.
 *
 * To get them: open Google Maps, right-click the cellar's gate, and the first
 * item in the menu is the pair of numbers. Paste them here.
 *
 * Deliberately no embedded iframe — it loads third-party scripts on every page
 * view, sets cookies before a guest has agreed to anything, and is the single
 * easiest way to lose the perfect Lighthouse scores this site currently has.
 * A link costs nothing and goes to the same place.
 */
export const MAP: { coords: { lat: number; lng: number } | null; url: string | null } = {
  coords: null,
  url: null,
};

/** The Google Maps URL for the pin, derived from the coordinates. */
export function mapUrl(): string | null {
  if (MAP.url) return MAP.url;
  if (!MAP.coords) return null;
  const { lat, lng } = MAP.coords;
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
}

/** Structured parts, for the LocalBusiness JSON-LD. */
export const ADDRESS_PARTS = {
  locality: 'Tsitelkhevi',
  region: 'Imereti',
  country: 'GE',
} as const;

/** No public URL for the cellar has been supplied yet; used for canonicals. */
export const SITE_URL = 'https://redrose.ge';
