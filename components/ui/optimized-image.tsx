"use client";

import NextImage from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Config } from '@/config/Config';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  fill = false,
  priority = false,
  unoptimized = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Normalize image URL - handle both relative and absolute paths
  let imageUrl = '';
  try {
    if (!src) {
      throw new Error('No image source provided');
    }
    
    // If it's already a full URL, use it as is
    if (src.startsWith('http')) {
      imageUrl = src;
    } 
    // If it's a relative path starting with /, append to storage URL
    else if (src.startsWith('/')) {
      imageUrl = `${Config.BACKEND_STORASE_URL}${src}`;
    } 
    // If it's just a filename, append to storage URL with /
    else {
      imageUrl = `${Config.BACKEND_STORASE_URL}/${src}`;
    }
      
    // Validate that the URL is properly formed
    new URL(imageUrl);
  } catch (error) {
    // Fallback to a lightweight placeholder
    imageUrl = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMThweCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgZmlsbD0iIzg4ODg4OCI+SW1hZ2UgTm90IEZvdW5kPC90ZXh0Pjwvc3ZnPg==';
  }

  // Generate a simple blur placeholder
  const defaultBlurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bvK6iuAEVvvhw/8AMq/Z';

  if (hasError) {
    return (
      <div 
        className={cn(
          "bg-gray-200 dark:bg-gray-700 flex items-center justify-center",
          className
        )}
        style={{ width, height }}
      >
        <span className="text-gray-500 text-sm">Image not found</span>
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden w-full h-full", className)}>
      <NextImage
        src={imageUrl}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        unoptimized={unoptimized}
        sizes={sizes}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL || defaultBlurDataURL}
        className={cn(
          "duration-300 ease-out",
          isLoading && !priority ? "scale-100 blur-sm" : "scale-100 blur-0",
          fill ? "object-cover" : ""
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          // Avoid triggering mismatch by deferring state update to next tick
          Promise.resolve().then(() => {
            setHasError(true);
            setIsLoading(false);
          });
        }}
      />
      
      {isLoading && !priority && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800/50 animate-pulse pointer-events-none" />
      )}
    </div>
  );
}

// Product image component with specific optimizations
export function ProductImage({
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
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      priority={priority}
      className={className}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
      quality={90}
      placeholder="blur"
    />
  );
}

// Category/Collection image component
export function CategoryImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      className={className}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 200px"
      quality={85}
      placeholder="blur"
    />
  );
}

// Hero/Banner image component
export function HeroImage({
  src,
  alt,
  className,
  priority = true,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      priority={priority}
      className={className}
      sizes="100vw"
      quality={95}
      placeholder="blur"
    />
  );
}

// Thumbnail image component for small images
export function ThumbnailImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      className={className}
      sizes="(max-width: 768px) 80px, 100px"
      quality={75}
      placeholder="blur"
    />
  );
}
