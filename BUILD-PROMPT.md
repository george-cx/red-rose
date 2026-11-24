# Build prompt — wine cellar website

Paste this into Claude Code with `visits-source.md` (the 45-post document) in the project root.
Replace `[[CELLAR NAME]]` if you know it; if you don't, leave it — the extraction step should find it.

---

## Project

Build a complete website for a family wine cellar in Georgia. The owner receives tourists almost every day for tastings and cellar tours, and posts about each visit on Facebook with a description and photos.

`visits-source.md` contains 45 of those posts. **It is the only source material for this entire project.** There are no links, no external references, no brand guidelines, no existing site — just descriptions and photos. Everything on the finished site is either extracted from those posts or written by you based on them.

## Phase 1 — Extract before you build

Read all 45 posts carefully, then produce `EXTRACTED-FACTS.md` summarising everything the posts collectively tell you about the business. Work like a researcher reading primary sources: the facts are scattered across posts and stated in passing, not listed anywhere.

Look for:

- Cellar name, family name, village, region
- What a visit actually consists of — tasting, tour, meal, how long
- Which wines, which grape varieties, qvevri vs conventional, vintages mentioned
- Whether food is served, and what
- Group sizes, and where guests come from (extract every country you can find — this becomes a real section of the site)
- Seasonality: harvest, rtveli, which months appear
- Any prices, phone numbers, booking methods, addresses
- Any other activities mentioned: bread baking, churchkhela, distilling, guesthouse, transport
- The owner's voice — how they talk about guests and wine. You will be writing copy in that voice.

For each fact, note which post numbers support it and how confident you are.

Then list, separately and explicitly, **what the posts do not tell you**. Address, phone number, price, opening hours, and booking process may simply not be there. Do not invent any of them. Where a real value is missing, use an obvious placeholder like `[[PHONE]]` in the code so I can find and fill it — never a plausible-looking fake.

Stop after `EXTRACTED-FACTS.md` and wait for me to confirm or correct it. Everything downstream depends on it being right.

## Phase 2 — Design plan

Read `/mnt/skills/public/frontend-design/SKILL.md` and follow its two-pass process. Produce `DESIGN.md`: a token system of 4–6 named hex values, typefaces and their roles, a layout concept with ASCII wireframes, and the principles specific to this project. Review it against this brief, revise anything that reads as a default, say what you changed and why. Wait for my approval before writing code.

Constraints:

- **Do not** use the cream background / high-contrast serif / terracotta accent combination. That is the default look for every wine and artisan-food site generated in the last two years and it will make this cellar interchangeable with all of them.
- Ground the palette in what a Georgian marani actually looks like: underground, cool, lime-washed walls, clay qvevri mouths set flush into the floor. The wine is the brightest thing in the room, and it is amber, not burgundy. That relationship — dark ground, one luminous colour — is a stronger starting point than a warm neutral page.
- Georgian script is a design asset, not a localisation chore. Mkhedruli has shapes Latin type does not. If you use it as a display element, verify the typeface has real Georgian glyphs and is not silently falling back.
- The hero opens on the cellar, the qvevri, or the wine. Not a headline over a gradient.
- Spend the boldness once. The blog archive stays quiet and legible — it will hold hundreds of entries eventually.

Photography is phone snapshots with mixed lighting and inconsistent aspect ratios. Design so that looks intentional. Do not build a layout that needs a professional shoot.

## Phase 3 — Build

### Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS + shadcn/ui
- MDX content files on disk. No CMS, no database, no runtime API calls.
- Static export (`output: 'export'`), deploy target Cloudflare Pages
- `next/image` with local images
- pnpm

### Content pipeline

Write `scripts/parse-visits.ts` that converts `visits-source.md` into `content/visits/*.mdx`, one file per post.

- Slug: `YYYY-MM-DD`, with a counter when a date repeats. Never derive slugs from Georgian text.
- Frontmatter: `title`, `date` (ISO), `lang` (original language of the post), `excerpt`, `tags`, `images`, `cover`, plus `country` and `guestCount` where the post makes them clear.
- Titles: write a short descriptive title per post. Do not mechanically truncate the first line.
- Photos go at `public/visits/<slug>/`. I will place them. Templates must render correctly with zero, one, or twelve images.
- Print a report of anything skipped or ambiguous rather than silently dropping it.
- The MDX files are committed and are what the site builds from. The script runs once; new visits are added later as new MDX files by hand.

### Languages

Georgian, English, Russian. Georgian is the default locale. App Router `[locale]` segments with `next-intl` or equivalent.

All three locales are fully populated, including the visit posts. The source posts are mixed-language, so for each post store the original text and produce translations for the other two locales, with `lang` recording which one is original. Translated posts carry a small, honest marker in the UI. Translate faithfully and keep the owner's plain voice — these are short informal notes about guests, not marketing copy.

### Routes

- `/` — home. Built from the extracted facts: what the cellar is, what a visit is like, the wines, a strip of recent visits, where guests have come from, a clear call to book.
- `/cellar` — the family, the marani, how the wine is made
- `/wines` — what is in the qvevri, by variety
- `/visit` — practical page: what a tasting includes, how long, when, how to get here, how to book. Placeholders where the posts don't tell you.
- `/blog` — index of all 45 posts. Newest first, cover image, title, date, excerpt. Paginated or lazy-loaded from the start, and filterable by year. Keep it simple — this page's job is to show the posts.
- `/blog/[slug]` — single post: full text, photo gallery, date, links to the previous and next visit.
- `/contact`

Plus `sitemap.xml`, `robots.txt`, and a 404.

### Copy

Write all non-post copy yourself, in Georgian and English and Russian, based on `EXTRACTED-FACTS.md` and nothing else. Plain and specific: say what a visit is, what you drink, how long it takes. No "immerse yourself in centuries of tradition." Match the owner's voice from the posts. Never state a fact the posts don't support.

### SEO

Per-page metadata and OG tags, `Winery` and `LocalBusiness` JSON-LD, canonical URLs, `hreflang` across all three locales. Blog posts individually indexable and internally linked from the index and from adjacent visits.

## Definition of done

- `pnpm build` produces a clean static export with no type errors
- All 45 posts render at their own URL in all three locales
- Every route works in all three locales with no untranslated strings
- Lighthouse ≥ 95 across the board on `/` and on a blog post
- Keyboard navigable, visible focus, `prefers-reduced-motion` respected
- `PLACEHOLDERS.md` listing every `[[...]]` left in the codebase and what it needs
- `README.md` explaining how to add a new visit post in under two minutes, written for someone who is not a developer
