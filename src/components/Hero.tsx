import { sitePhoto } from '@/lib/images';
import { Photo } from './Photo';
import { Wordmark } from './Wordmark';
import { Placeholder } from './Placeholder';

/**
 * Tried in order. Any of .jpg/.jpeg/.png/.webp under public/site/ is picked up,
 * so dropping `exterior-night.jpg` in supersedes the interim photograph with no
 * code change at all.
 */
const HERO_FILES = ['exterior-night', 'marani-interim'] as const;

/**
 * The building, after dark: lit doors, the tree burning inside, the sign uplit
 * on the plaster wall. It carries no overlaid type at all — the name is already
 * in the frame, in metal. DESIGN.md §4a.
 *
 * Until that photograph is supplied the panel falls back to the wordmark it
 * contains, with the gap named rather than hidden.
 */
/** The hero photograph, or null. Shared so metadata, JSON-LD and the markup
 *  can never disagree about which image the home page is showing. */
export function heroPhoto() {
  return HERO_FILES.reduce<ReturnType<typeof sitePhoto>>(
    (found, name) => found ?? sitePhoto(name),
    null,
  );
}

export function Hero({ place, alt }: { place: string; alt: string }) {
  const photo = heroPhoto();

  return (
    <>
      {photo ? (
        <div className="relative min-h-[68vh] overflow-hidden bg-stone sm:min-h-[86vh]">
          <Photo
            photo={photo}
            alt={alt}
            sizes="100vw"
            priority
            // The sign and the faces sit in the upper two-thirds of the night
            // photograph; the bottom third is empty forecourt. Bias the crop
            // upward so a wide viewport keeps the sign rather than the concrete.
            className="absolute inset-0 h-full w-full object-cover object-[50%_38%] shadow-none"
          />
        </div>
      ) : (
        <div className="relative flex min-h-[54vh] items-center overflow-hidden sm:min-h-[64vh]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-1/2 h-[62%] w-[min(58rem,94%)] -translate-x-1/2"
            style={{
              background:
                'radial-gradient(30% 96% at 31% 104%, rgba(211,160,28,.30), rgba(211,160,28,.09) 44%, transparent 70%),' +
                'radial-gradient(30% 96% at 69% 104%, rgba(211,160,28,.30), rgba(211,160,28,.09) 44%, transparent 70%)',
            }}
          />
          <div className="relative mx-auto w-full max-w-wide px-6 text-center">
            <Wordmark size="lg" className="justify-center" />
            <p className="mx-auto mt-8 max-w-measure text-[0.8125rem] text-muted">
              <Placeholder name="HERO_PHOTO" hint="save it as public/site/exterior-night.jpg" />
            </p>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-wide px-6 py-6">
        <p className="text-lg text-floor">{place}</p>
      </div>
    </>
  );
}
