import { justifyRows, type Photo as PhotoData } from '@/lib/images';
import { Photo } from './Photo';

/**
 * Justified rows. Each figure grows in proportion to its own aspect ratio, so
 * every picture in a row ends up the same height and the row fills the measure
 * exactly — a contact sheet, not a grid. DESIGN.md §5.
 */
export function Gallery({ photos, alt }: { photos: PhotoData[]; alt: string }) {
  if (photos.length === 0) return null;

  if (photos.length === 1) {
    return (
      <figure className="my-10">
        <Photo photo={photos[0]} alt={alt} sizes="(max-width: 780px) 100vw, 720px" />
      </figure>
    );
  }

  return (
    <div className="my-10 flex flex-col gap-2">
      {justifyRows(photos).map((row, i) => (
        <div className="jrow" key={i}>
          {row.map((photo) => (
            <figure key={photo.src} style={{ ['--r' as string]: photo.ratio }}>
              <Photo photo={photo} alt={alt} sizes="(max-width: 640px) 50vw, 33vw" />
            </figure>
          ))}
        </div>
      ))}
    </div>
  );
}
