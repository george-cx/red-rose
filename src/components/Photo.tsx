import Image from 'next/image';
import type { Photo as PhotoData } from '@/lib/images';
import { cn } from '@/lib/utils';

/**
 * Photographs sit directly on the ground: no frame, no uniform crop, native
 * aspect ratio. A hairline stops a dark picture bleeding into a dark page.
 */
export function Photo({
  photo,
  alt,
  sizes,
  priority = false,
  className,
}: {
  photo: PhotoData;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={photo.src}
      alt={alt}
      width={photo.width}
      height={photo.height}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      unoptimized={!photo.hasVariants}
      className={cn('photo', className)}
    />
  );
}

/** Fixed-ratio thumbnail. The only place the site crops — the archive needs a
 *  repeating silhouette to stay scannable at hundreds of entries. */
export function Thumb({ photo, alt }: { photo: PhotoData; alt: string }) {
  return (
    <Image
      src={photo.src}
      alt={alt}
      width={photo.width}
      height={photo.height}
      sizes="(max-width: 640px) 30vw, 176px"
      loading="lazy"
      unoptimized={!photo.hasVariants}
      className="photo h-full w-full object-cover"
    />
  );
}
