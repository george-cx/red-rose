# RED ROSE

The website for მარანი RED ROSE — Tariel Miqabadze's family wine cellar in Tsitelkhevi,
Baghdati.

It is in three languages (Georgian, English, Russian), it has no database and no admin login,
and it is built from plain text files you can edit yourself.

---

## Adding a new visit post

This is the thing you will do most often. It takes about two minutes.

### 1. Pick a short name for the post

In English, lowercase, words joined by hyphens. It becomes the web address, so keep it
readable:

```
the-group-from-poland
```

Do not use Georgian letters here — only this one line is in English, everything a visitor
reads stays in Georgian.

### 2. Put the photographs in a folder

Make a folder with that same name inside `public/visits/`, and put the photographs in it named
`01.jpg`, `02.jpg`, `03.jpg` and so on:

```
public/visits/the-group-from-poland/01.jpg
public/visits/the-group-from-poland/02.jpg
```

Any number of photographs works — none, one, or twelve. Portrait and landscape mix fine; the
page arranges them.

### 3. Write the post

Copy any file from `content/visits/ka/` , rename it `the-group-from-poland.mdx`, and change
what is inside. It looks like this:

```
---
title: "ჯგუფი პოლონეთიდან"
excerpt: "ერთი წინადადება იმაზე, რაც იმ დღეს მოხდა."
order: 0
lang: "ka"
tags: ["guests"]
images: ["01.jpg", "02.jpg"]
cover: "01.jpg"
country: ["pl"]
---

აქ დაწერეთ თავად ჩანაწერი, ისე როგორც Facebook-ზე დაწერდით.
```

What each line means:

| Line | What to put |
|---|---|
| `title` | A short title. Not the first line of the post — something that says what the day was. |
| `excerpt` | One sentence. It shows in the list of visits. |
| `order` | Where it sits in the list. **`0` puts it at the top.** The rest are 1 to 43. |
| `lang` | `"ka"` if you wrote it in Georgian. |
| `tags` | One or more of: `guests`, `wine`, `vineyard`, `family`, `feast`. |
| `images` | The photograph filenames, in the order you want them. |
| `cover` | Which photograph shows in the list. |
| `country` | Optional. Where the guests came from — see the list at the bottom of this file. |
| `guestCount` | Optional. A number, if it is worth saying. |

Then the post itself, below the second `---`. Leave a blank line between paragraphs.

### 4. Publish

Two commands in the Terminal, from this folder:

```bash
pnpm prepare-images && pnpm build
```

The first makes the small, fast versions of your photographs. The second builds the site into
the `out/` folder, which is what gets uploaded.

**If you skip `prepare-images` the site still works** — the photographs are just heavier to
load. Nothing breaks.

### About the other two languages

The post will appear in all three languages straight away, showing your Georgian text where a
translation is missing. When you have the English and Russian versions, save them as the same
filename in `content/visits/en/` and `content/visits/ru/`. Translated posts are marked as
translations in the site, honestly, so nobody is misled.

---

## The home page photograph

The home page uses `public/site/exterior-night.jpg` — the group at night in front of the lit
sign. To change it, put the new photo there under the same name, in any common format
(including straight off an iPhone), and run:

```bash
pnpm prepare-images && pnpm build
```

Nothing in the code needs changing. If you ever delete that file the page falls back to the
name set in type, so it never breaks.

## The map pin

Open Google Maps, right-click the cellar gate, and the first item in the menu is a pair of
numbers — the latitude and longitude. Put them in `src/lib/contact.ts`:

```ts
export const MAP = {
  coords: { lat: 42.12345, lng: 42.67890 },   // ← your two numbers
  url: null,
};
```

That one line turns on the "Open in Google Maps" link on the Visiting and Contact pages, and
tells search engines where the cellar actually is. Then `pnpm build`.

## Changing the phone number, email, or address

One file: `src/lib/contact.ts`. Change it, then run `pnpm build`.

## The gaps

`PLACEHOLDERS.md` lists everything the site does not yet know — the address, the opening
hours, how long a visit lasts. Those show on the page as visible dashed markers, on purpose:
nothing on this site is invented. Fill them in and the markers disappear.

The largest one is the **address**. A guest with the phone number still cannot find the gate.

## Prices

There are none on the site, anywhere, in any language — because they are agreed per group.
The site says so and gives the phone number.

---

## For whoever maintains this

```bash
pnpm install          # once
brew install webp     # once, for the image script (optional — see below)
pnpm dev              # local preview at http://localhost:3000
pnpm build            # static export into out/
pnpm typecheck        # TypeScript
pnpm check-placeholders   # regenerates PLACEHOLDERS.md
```

- **Next.js App Router + TypeScript + Tailwind**, static export (`output: 'export'`),
  deploy target Cloudflare Pages. Upload the `out/` folder; `_redirects` sends `/` to `/ka/`.
- **No dates.** The source carried a usable date for two posts out of forty-four, so the
  archive is ordered by the `order` field and shows no dates. The blog filters by subject
  instead of by year.
- **`pnpm build` runs a font check first.** Georgian is the default locale and almost every
  serif on Google Fonts carries Cyrillic but not Mkhedruli, so `scripts/verify-fonts.ts` reads
  the font binaries and fails the build rather than letting a silent fallback ship.
- **Georgian labels are real Mtavruli**, mapped by codepoint in `src/lib/georgian.ts`.
  `text-transform: uppercase` does not do this — browsers deliberately leave Mkhedruli alone.
- **Two folders are deliberately not in git**: `Red Rose.pages` (134 MB) and `source-photos/`
  (129 MB). They are the original source material, not part of the website — the web-ready
  photographs in `public/visits/` are committed, so the site builds and deploys without them.
  **Keep both backed up somewhere else**; they are irreplaceable and git is no longer holding
  a copy. They are only needed to re-run `pnpm prepare-images`.
- **Photographs are served as WebP**, about a third lighter than the same JPEG.
  `prepare-images` makes them with `cwebp` (`brew install webp`). Without it the script says
  so and the site falls back to serving the full-size JPEG — nothing breaks, the pages are
  just heavier. The un-suffixed `.jpg` beside each set is kept on purpose: link previews on
  some platforms still want JPEG.
- `scripts/parse-visits.ts` built `content/visits/` from `visits-source.md` once. It does not
  need running again; new posts are added by hand as above.
- Design decisions and their reasons are in `DESIGN.md`. What the posts do and do not support
  is in `EXTRACTED-FACTS.md`.

### Country codes

`cz` Czechia · `de` Germany · `fi` Finland · `lt` Lithuania · `ru` Russia · `md` Moldova ·
`be` Belgium · `it` Italy · `ir` Iran · `us` United States · `gb-sct` Scotland · `hu` Hungary ·
`at` Austria · `baltic` The Baltic coast

To add a country, put its name in all three of `src/i18n/messages/ka.json`, `en.json` and
`ru.json`, under `countries`.
