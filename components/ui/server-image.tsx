import NextImage from 'next/image';
import { Config } from '@/config/Config';

interface ServerImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  quality?: number;
}

export function ServerImage({
  src,
  alt,
  width,
  height,
  className,
  fill = false,
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
}: ServerImageProps) {
  // Ensure the src is a full URL or use a fallback
  let imageUrl = '';
  
  try {
    if (!src) {
      throw new Error('Image source is empty');
    }
    
    imageUrl = src.startsWith('http') 
      ? src 
      : src.startsWith('/') 
      ? `${Config.BACKEND_STORASE_URL}${src}`
      : `${Config.BACKEND_STORASE_URL}/${src}`;
  } catch (error) {
    console.error('Error processing image URL:', error);
    // Use a placeholder image
    imageUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMThweCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iIzg4ODg4OCI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg==';
  }

  return (
    <NextImage
      src={imageUrl}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      priority={priority}
      sizes={sizes}
      quality={quality}
      className={className}
    />
  );
}

// Product image component with specific optimizations
export function ServerProductImage({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <ServerImage
      src={src}
      alt={alt}
      fill
      priority={priority}
      className={className}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
      quality={90}
    />
  );
}

// Category/Collection image component
export function ServerCategoryImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <ServerImage
      src={src}
      alt={alt}
      fill
      className={className}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 200px"
      quality={85}
    />
  );
}
