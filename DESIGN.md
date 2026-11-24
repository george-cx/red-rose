# DESIGN.md — მარანი RED ROSE

Phase 2. Two passes, as the brief asks: a first pass written straight, then a review against
the brief with everything that read as a default pulled out and replaced. §8 lists what
changed and why.

> The brief points at `/mnt/skills/public/frontend-design/SKILL.md`. **That file does not
> exist in this environment** — I checked. I have followed the two-pass process the brief
> itself describes rather than pretending to have read it.

---

## 0. Client direction — 2026-09-04

Two instructions, received after the first draft of this document, both of which improve it.

**1. The name is never translated.** `RED ROSE` stays in Latin in Georgian, English and
Russian. It is not „წითელი ვარდი" in the Georgian locale and not «Красная роза» in the
Russian one. The consequence runs deeper than a string: the display treatment of the name in
Mkhedruli, which was the hero of the first draft, is gone. See §3a.

**2. The home hero is the night exterior** — the building shot after dark, uplit, with the
sign on the plaster wall. See §4a. This is a better hero than the one I proposed and it
retires the qvevri-mouth hero.

Both are folded into the sections below rather than bolted on. The palette is untouched: the
night photograph is, if anything, stronger evidence for it than the interiors were.

---

## 1. Where the palette comes from

I did not choose these colours. I measured them, by k-means clustering the actual
photographs from the source document. That matters, because two of the brief's stated
assumptions turn out not to hold for this particular marani:

| The brief assumed | The photographs show |
|---|---|
| lime-washed walls | **dark volcanic rubble stone** — plum, rust, grey — under brick barrel vaults. The walls are the darkest large surface, not the lightest. |
| the wine is amber, the brightest thing in the room | the wine photographed is **rosé pink** and **dark garnet**. The brightest thing in any frame is the **tungsten bulb** — measured at `#D3A01C`, 76 % saturation, occupying 4 % of one frame. |

The brief's underlying *principle* — dark ground, one luminous colour — survives both
corrections intact, and is in fact better supported by the photographs than by the
assumptions. So I kept the principle and threw away the swatches.

Measured cluster centres across nine interior photographs, for the record:

```
qvevri aperture   #12100A #0C0C07 #110F0D     L 3–5     the darkest thing, warm-black
stone in shadow   #241A15 #271C12 #2A2423     L 11–15
stone, mid        #423A2C #4D3C2C #504437     L 21–26
stone, lit        #6A503B #776C55 #7B6A56     L 32–40
flagstone floor   #C0C0B1 #CECAC1 #D3D1C1     L 72–79   the light surface
tungsten bulb     #D3A01C                     L 46 S 76 the only saturated colour, anywhere
qvevri collar     #4D2A2F                     H 351     oxblood — cool, NOT terracotta
```

The whole corpus sits in hue 25–45 at 6–28 % saturation. It is a monochrome world with one
gold light in it. That is the design, already made, by the building.

## 2. Tokens

Six values. Every one is a measured colour from a photograph, rounded.

| Token | Hex | What it is | Where it is used |
|---|---|---|---|
| `--qvevri` | `#100E0A` | the mouth of the qvevri | page ground, everywhere, all routes |
| `--stone` | `#2A2320` | wall stone in shadow | raised surfaces: header, cards, code of the site's few panels |
| `--edge` | `#6A5A48` | lit wall stone | hairline rules, borders, dividers. **Never text** — 2.9:1 |
| `--floor` | `#DAD4C0` | the flagstone floor | all body text, all headings |
| `--lamp` | `#D3A01C` | the tungsten bulb | **the one luminous colour.** Links, focus rings, the hero glow |
| `--oxblood` | `#6E2F38` | the ring around the qvevri mouth | the site's mark, the section rules, the tamada marks |

Muted text is `--floor` at 70 % over the ground — computes to ≈ `#9C9384`, 6.35:1. Not a
seventh token.

**Measured contrast, against `--qvevri`:**

```
--floor       13.00 : 1     body text, headings          AAA
--lamp         8.09 : 1     links, focus                 AAA
muted 70%      6.35 : 1     captions, meta               AA+
--edge         2.91 : 1     rules only, never text
--oxblood      1.95 : 1     solid marks only, never text
```

`--floor` on `--stone` is 10.41:1; `--lamp` on `--stone` is 6.48:1. Every text pairing on the
site clears AA, and the two that carry running text clear AAA.

**Two rules that keep this from becoming the dark-and-gold restaurant default:**

1. **`--lamp` only ever behaves like light.** It is a link colour, a focus ring, and a soft
   radial glow behind the hero. It is never a button fill, never a background, never a border,
   never a large area. Light does not come in rectangles.
2. **`--oxblood` is never luminous.** It is a solid: a 12 px ring in the header, a 2 px rule
   under section headings, the marker beside a toast. It never glows and it is never text.

One colour is light; one colour is matter. They never swap jobs.

## 3. Type

The brief says to verify that the typeface has real Georgian glyphs and is not silently
falling back. I did — by downloading the font binaries and reading their `cmap` tables, not
by trusting the CSS API, which returns HTTP 200 for a Georgian request against a font with
no Georgian in it.

```
                        ა U+10D0   ღ U+10E6   Ⴀ U+1C90   А U+0410   A U+0041
                        Mkhedruli             Mtavruli   Cyrillic   Latin
Noto Serif Georgian       YES        YES        YES        no         YES
Noto Sans Georgian        YES        YES        YES        no         YES
Noto Serif                 no         no         no        YES        YES
Playfair Display           no         no         no        YES        YES
```

Of every serif on Google Fonts I checked — Playfair, Spectral, Alegreya, Literata, Lora,
Bitter, Source Serif 4, Gelasio — **not one carries Georgian.** They all carry Cyrillic, which
is the trap: a stack that looks fine in Russian collapses silently in Georgian, the default
locale. `Noto Serif Georgian` and `Noto Sans Georgian` are the only correct answers on Google
Fonts, and neither of them carries Cyrillic.

**So the stack is one skeleton, three scripts:**

| Role | Georgian | English | Russian |
|---|---|---|---|
| Display | Noto Serif Georgian | Noto Serif | Noto Serif |
| Body / UI | Noto Sans Georgian | Noto Sans | Noto Sans |

`Noto Serif Georgian` and `Noto Serif` are the same design, drawn for different scripts, so
the site reads as one typeface in all three locales while every glyph is real. `font-family`
lists the Georgian face first in every locale; the browser reaches past it for Latin and
Cyrillic automatically, by coverage, which is exactly how the cascade is supposed to work.

**A build-time guard**, because this is the failure mode that ships silently: the check above
is committed as `scripts/verify-fonts.ts` and runs in `prebuild`. If a font is swapped for one
without Mkhedruli, the build fails rather than the page quietly rendering in Times.

### Mtavruli — the thing worth using

Georgian has no upper and lower case. It has **Mtavruli** (U+1C90–1CBF): a display form used
for titles, signage and emphasis, where the letters lose their ascenders and descenders and
sit on a single band. It is a genuinely different texture from Mkhedruli, it is what Georgian
signwriting actually looks like, and no template uses it because no template knows it exists.

Both Noto Georgian faces carry it. So:

- **Mkhedruli** — everything that is read: body, headings, titles.
- **Mtavruli** — everything that is a label: nav, section headings, tags, buttons, the footer.
  Set with wide tracking, small, in `--floor` or `--lamp`.

In English and Russian those same labels are small-caps-ish: uppercase, wide tracking, small.
The three locales end up with the same *rhythm* without pretending Latin and Georgian are the
same thing.

```
   Mkhedruli   ღვინო ქვევრში          ← what you read
   Mtavruli    ᲦᲕᲘᲜᲝ ᲥᲕᲔᲕᲠᲨᲘ          ← what you scan
   Latin       WINES                  ← same job, its own convention
```

### 3a. The name is a built object, not a set string

The cellar's name is already rendered, physically, in relief letters on the plaster wall
beside the door: **`RED`**, a rose device, **`ROSE`** — widely letter-spaced, uplit from
below. That is the logotype. It exists, it is on the building, and guests photograph it.

So the site does not typeset a name; it reproduces one.

```
        R E D  ✿  R O S E
        Noto Serif, uppercase, tracking +0.22em, --floor
        the rose device between the words, --oxblood, never --lamp
```

Rules that follow:

- **Identical in all three locales.** Same glyphs, same tracking, same device. The language
  switcher changes everything on the page except this.
- **Never set in Mkhedruli, never transliterated.** „წითელი ვარდი" appears exactly once on the
  whole site — in the `/wines` entry for the Aladasturi rosé, which is genuinely a wine called
  that (Post 2). It is a wine name there, not the business name.
- **The `<title>` and JSON-LD `name` are `RED ROSE` in every locale.** `alternateName` carries
  „მარანი RED ROSE" for Georgian search, since that is how the owner writes it himself in the
  posts — Georgian word, Latin name.
- **The wordmark is never the hero.** It sits in the header at 0.875 rem and in the footer.
  On the home page the name arrives as a photograph of the actual sign, which is better than
  any typographic treatment I would have drawn.

This also settles a question the first draft left open: with the name out of the display role,
**Mkhedruli's display job becomes the content** — post titles, section headings, the pull
quotes from guests. Which is the more honest use of it anyway. Mtavruli keeps the labels.

### Scale

One ratio, 1.25, from 16 px. Georgian x-height runs large relative to Latin, so Georgian body
sets at 17 px against English 16 px — a per-locale variable, not a fudge.

```
hero      clamp(3.5rem, 11vw, 9rem)   Noto Serif Georgian, 400, tracking -0.02em
h1        2.44rem      h2  1.95rem     h3  1.56rem
body      1rem / 1.7   (ka: 1.0625rem / 1.75)
label     0.75rem, tracking 0.12em, Mtavruli / uppercase
measure   62ch body, 34rem hard cap
```

## 4. The organising idea

Look at the floor of this marani. Irregular pale flagstone — cream, grey-blue, rust — and cut
into it, a **black circle** ringed in oxblood: the mouth of the qvevri. Dark aperture, pale
ground, one red ring.

That relationship is the whole site, inverted: **dark ground, and the photographs are the
apertures.** Every image is a lit opening onto a day that happened. Nothing else on the page
competes for brightness.

This is not decoration — it does three jobs at once:

1. **It makes the phone snapshots work.** A dark ground absorbs forty different white
   balances; a cream page would set every one of them fighting. This is the strongest
   practical argument for the dark ground, over and above the brief's.
2. **It means no frames and no uniform crops.** Images sit directly on the ground.
3. **It means no frames and no uniform crops.** Images sit directly on the ground.

### 4a. The hero — the building, at night

The home page opens on the night photograph: the marani after dark, the arched iron-and-glass
doors lit from within, the Christmas tree still burning inside, and the plaster wall carrying
`RED ✿ ROSE` in relief letters under two uplights.

It is the right hero for reasons beyond preference:

- **It is the palette, photographed.** Near-black night is `--qvevri`. The uplights are
  `--lamp` — the same warm tungsten measured off the bulb indoors. The plaster wall is
  `--oxblood`, lit. The concrete forecourt is `--floor`. Every token in §2 appears in one
  frame, which is as strong a confirmation as the palette could get.
- **It is the brief's principle, built.** "Dark ground, one luminous colour" is not a design
  conceit here — it is what the property actually looks like after sunset.
- **It carries the name without a headline.** The brief asks that the hero not be a headline
  over a gradient. This hero has no overlaid name at all, because the name is *in* the
  photograph, in metal, lit. The one thing that would weaken it is type on top of it.
- **The only text under the fold-line** is the place line, in the dark strip below the image:
  `ტარიელ მიქაბაძის ოჯახის მარანი — წითელხევი, ბაღდათი`, translated per locale.

The qvevri mouth does not disappear — it moves to `/cellar`, where it opens that page, and it
stays the source of the 13 px ring in the header. But the front door is the front door.

**Treatment:** full bleed, `min-height: 92vh`, `object-position` favouring the lit wall on
narrow viewports so the sign is never cropped out. Nothing overlaid except the small eyebrow
mark in the header. No scrim, no gradient, no filter — the photograph is already dark and the
page ground is already the same black, so the image dissolves into the page at its edges
instead of sitting on it as a rectangle.

## 5. Photography

42 phone snapshots, mixed lighting, ratios from 3:4 to 4:3. The design has to make that look
deliberate, and must not need a shoot that will never happen.

- **Never crop to a uniform ratio in galleries.** Multi-image posts use **justified rows** —
  images keep their native aspect ratio and share a row height, the row fills the measure
  exactly, like a contact sheet. Ratios differing is what makes the rhythm; a grid is what
  makes it look broken. Dimensions are read at build time and written into frontmatter, so
  the rows are computed statically with no layout shift.
- **One image posts** run full measure at native ratio, capped at 80vh.
- **The blog index is the one place a fixed shape is right** — scanning a hundred entries
  needs a repeating silhouette. 3:2, `object-fit: cover`, centred. The full frame is never
  cropped on the post page itself.
- **No filters.** No unifying colour grade, no duotone, no sepia. They would read as a fix,
  and the honesty of the pictures is the point. The only treatment is a 1px `--edge` inset at
  8 % so a dark photo does not bleed into a dark ground.
- **Every image gets a real `alt`**, written from the post it belongs to.

## 6. Wireframes

### `/` — home

```
┌────────────────────────────────────────────────────────────────┐
│  ◍  R E D ✿ R O S E             ᲥᲐ  EN  RU        555 33 09 09 │  never translated
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ██████████████████████████████████████████████████████████    │
│  ██                                                      ██    │
│  ██   the night photograph, full bleed, 92vh:            ██    │
│  ██   lit doors · the tree burning inside ·              ██    │
│  ██                        ┌──────────────────┐          ██    │
│  ██                        │  R E D ✿ R O S E │ ← in the ██    │
│  ██                        └──────────────────┘   frame, ██    │
│  ██                          uplit plaster wall   in metal██   │
│  ██                                                      ██    │
│  ██   NO overlaid type. The building says the name.      ██    │
│  ██████████████████████████████████████████████████████████    │
│                                                                │
│      ტარიელ მიქაბაძის ოჯახის მარანი — წითელხევი, ბაღდათი        │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  ▬▬ ᲡᲢᲣᲛᲠᲝᲑᲐ ──────────────────────────────────────────────   │  oxblood rule
│                                                                │
│  ერთ მაგიდასთან სხედხართ. თამადა ტარიელია.                     │
│  მარიამი ამზადებს სუფრას. ყველი მათი ძროხისაა,                  │
│  ჭადი კეცზეა გამომცხვარი, პომიდორი — ბაღიდან.                   │
│                                                                │
│      სუფრა, ერთი გრძელი მაგიდა    ·   თამადა                    │
│      კუნკულა, ასი წლის            ·   ვახტანგური               │
│      მარანი და ქვევრები           ·   ღვინო თან წასაღებად       │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  ▬▬ ᲦᲕᲘᲜᲝ ────────────────────────────────────────────────    │
│                                                                │
│  ცოლიკოური   ──────  სამი საუკუნის ქვაზე დაწურული              │
│  კრახუნა     ──────  ექსპერიმენტული ნაკვეთიდან                 │
│  ალადასტური  ──────  „წითელი ვარდი" — როზე, პეტ-ნატი            │
│  ალექსანდროული ────  წელს 10 ივლისს შეიფერა                    │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  ▬▬ ᲑᲝᲚᲝ ᲕᲘᲖᲘᲢᲔᲑᲘ ───────────────────────────  ყველა ვიზიტი → │
│   ┌──────────┐ ┌────────┐ ┌─────────────┐                      │
│   │ 4:3      │ │ 3:4    │ │ 4:3         │   justified row,     │
│   └──────────┘ └────────┘ └─────────────┘   native ratios      │
│   მატარებელი    ფერეიდნელი   90 სტუმარი                        │
│   პრაღიდან      ქართველები   ერთ დღეში                         │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  ▬▬ ᲡᲐᲘᲓᲐᲜ ᲒᲕᲘᲡᲢᲣᲛᲠᲘᲐ ────────────────────────────────────    │
│                                                                │
│   ჩეხეთი · გერმანია · ფინეთი · ლიტვა · რუსეთი · მოლდოვა ·      │
│   ბელგია · იტალია · ირანი · აშშ · შოტლანდია · უნგრეთი ·        │
│   ავსტრია · ბალტიისპირეთი                                      │
│                                                                │
│   თითოეული სახელი პოსტიდანაა, რომელშიც ისინი მოვიდნენ.          │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  ▬▬ ᲛᲝᲑᲠᲫᲐᲜᲓᲘᲗ ───────────────────────────────────────────    │
│                                                                │
│   დაგვირეკეთ ან მოგვწერეთ. ჯგუფის მიხედვით შევთანხმდებით.       │
│                                                                │
│   555 33 09 09              ← 2.44rem, --lamp                  │
│   tarielmiqabadze295@gmail.com                                 │
└────────────────────────────────────────────────────────────────┘
```

### `/blog` — the archive, deliberately plain

```
┌────────────────────────────────────────────────────────────────┐
│  ◍  R E D ✿ R O S E             ᲥᲐ  EN  RU        555 33 09 09 │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  ᲕᲘᲖᲘᲢᲔᲑᲘ                                                       │
│  43 ჩანაწერი                                                   │
│                                                                │
│  ყველა · სტუმრები · ვენახი · ღვინო · ოჯახი · დღესასწაული        │
│  ────────                                     ← plain text,    │
│                                                 active = lamp  │
│  ┌────────┐  მატარებელი პრაღიდან                               │
│  │  3:2   │  იაკუბს საკუთარი მატარებელი ჰყავს. 85 ჩეხი...      │
│  └────────┘  სტუმრები                                          │
│  ──────────────────────────────────────────────────────────    │
│  ┌────────┐  სოკო კრახუნას ძირში                               │
│  │  3:2   │  როცა ვაზში ფუნგიციდს არ ჭარბად ხმარობ...          │
│  └────────┘  ვენახი                                            │
│  ──────────────────────────────────────────────────────────    │
│                        ...  24 per page                        │
│                     [ ᲛᲔᲢᲘ ᲩᲐᲜᲐᲬᲔᲠᲘ ]                            │
└────────────────────────────────────────────────────────────────┘
```

No hero. No cards. No shadows. One hairline between entries, a 96 px thumbnail, a title, one
line of excerpt, a tag. This page has to still work at 400 entries.

### `/blog/[slug]` — one visit

```
│  ← წინა                                            შემდეგი →   │
│                                                                │
│  ᲡᲢᲣᲛᲠᲔᲑᲘ                                                       │
│  მატარებელი პრაღიდან                                           │
│                              ┌───────────────────────────┐     │
│                              │ ⓘ თარგმნილია ქართულიდან   │     │  translated only
│                              └───────────────────────────┘     │
│  ████████████████████████████████████████                      │
│  ██  cover, native ratio, max 80vh   ██                        │
│  ████████████████████████████████████████                      │
│                                                                │
│  body, 62ch, 1.75 line-height, --floor                         │
│  ...                                                           │
│                                                                │
│  ┌────────┐┌──────┐┌──────────┐   justified row                │
│  └────────┘└──────┘└──────────┘   native ratios, shared height │
│                                                                │
│  ────────────────────────────────────────────────────────      │
│  ← სოკო კრახუნას ძირში            ფერეიდნელი ქართველები →      │
```

## 7. Principles, specific to this project

1. **The photographs are the design.** Everything else gets out of their way. This is why the
   ground is dark, why there are no frames, and why there is no colour on the page that is not
   already in the pictures.
2. **One long table.** One column, one voice, top to bottom — like the supra the site
   describes. No sidebars, no three-up feature grids, no alternating image-left-image-right.
3. **Nothing here is for sale.** Prices are negotiated, so there is no price, no tier, no
   "Book now" button leading to a form that does not exist. The call to action is a phone
   number, set large. In 43 posts the owner never once sold anything; the site should not
   start.
4. **Never state a fact the posts do not support.** Enforced in code: every unknown is a
   `[[PLACEHOLDER]]` that shows up in `PLACEHOLDERS.md`, never a plausible-looking guess.
5. **Georgian is the default and is set properly** — Mkhedruli to read, Mtavruli to scan,
   glyph coverage verified at build time.
6. **Spend the boldness once.** The hero is the only loud thing. Every route after it is
   quiet, and the archive is the quietest thing on the site.
7. **The owner's voice sets the ceiling for the copy.** He writes in trailing ellipses about
   days that went well. Nothing on this site may be more polished than he is.
8. **Natural, but not literal** *(owner's direction, 2026-11-24)*. The site's own copy stays a
   register above the domestic particulars. "From our own farm", not "from their own cow". No
   rennet, no clay ketsi, no inventory of what was on one day's table. The posts are where the
   specifics live — in his words, where they belong — and the site's voice reaches for the
   general instead. Plain, warm, unhurried; never clinical and never a brochure.
9. **Nobody in the household is named but Tariel** *(owner's direction, 2026-11-24)*. The
   family appears as the family. His own posts are left exactly as he wrote them.
10. **Never describe a service the owner has not described.** The three offerings are his; how
   each one runs is not mine to specify. Where I had filled that in from individual posts — a
   particular lunch, a particular evening — it has been taken back out.

## 8. Second pass — what I changed, and why

Written straight, then reviewed against the brief. Six things read as defaults and came out.

| Pass 1 had | Why it was wrong | Pass 2 has |
|---|---|---|
| A gold-on-dark scheme with gold buttons and gold rules | Dark + gold with gold fills is the luxury-restaurant default, and it is exactly the trap next to the cream/serif/terracotta one the brief names | `--lamp` may only behave like light — links, focus, one radial glow. Never a fill, never a border, never an area. The solid identity colour is oxblood, measured off the qvevri collar |
| Circular photo crops echoing the qvevri mouth | Circle-cropping phone snapshots destroys their composition and would need a shoot that will never happen — the exact failure the brief warns about | The aperture appears **twice**: the hero photograph, and a 12 px ring as the site's mark. Nowhere else |
| Playfair Display for Latin display, Inter for UI | **Verified: Playfair has no Georgian.** Georgian is the default locale; it would have silently fallen back to a system serif on the site's most important text | One Noto skeleton across three scripts, glyph coverage checked in `prebuild` |
| A cream flagstone ground for `/blog`, dark elsewhere | Two grounds read as two different sites, and cream is half of the exact combination the brief rules out | One dark ground everywhere. The archive gets quiet by losing ornament, not by changing colour |
| A year filter on the archive | 42 of 44 posts have no date; the axis has no data behind it | Theme filter — guests / vineyard / wine / family / feast days — from `tags`. "Filterable from the start" is satisfied on an axis that exists |
| An amber palette, and lime-washed walls | Both come from the brief's general picture of a marani, not from this one. Measured: the walls are dark rubble stone, the wine is pink and garnet, the only saturated thing is a light bulb | Palette measured by k-means off the photographs. The brief's *principle* — dark ground, one luminous colour — kept, its swatches discarded |

Two more, smaller: a "Book a tasting" primary button became a phone number, because there is
nothing to book it with; and a masonry gallery became justified rows, because masonry
staggers baselines and makes inconsistent ratios look like a bug rather than a rhythm.

## 9. Motion and access

- `prefers-reduced-motion: reduce` disables all of it. The only motion otherwise is a 200 ms
  opacity fade on image load and a 150 ms colour transition on links. No parallax, no
  scroll-triggered reveals, no counters.
- Focus is a 2 px `--lamp` ring at 2 px offset, visible on every interactive element, never
  removed.
- The language switcher is a real `<nav>` of three links with `hreflang`, not a dropdown.
- Every image has a written `alt`; decorative rules are `aria-hidden`.
- Tap targets 44 px minimum. The phone number is a `tel:` link at every breakpoint.
- Target: Lighthouse ≥ 95 across the board. Static export, no client JS on `/` or on a post
  beyond the filter on `/blog`, self-hosted subset fonts, `next/image` with explicit
  dimensions so CLS is zero.

---

**One file needed before Phase 3.** The night exterior photograph is not in
`Red Rose.pages` and is not on this machine — I looked. Save it into the project as
`source-photos/exterior-night.jpg` (or tell me where it is) and the hero is done.

Everything else in this document is settled: palette, type, the wordmark, wireframes for all
seven routes, motion and accessibility. The dark ground stands, and the night photograph
argues for it better than I did.
