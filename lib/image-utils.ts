import { Config } from '@/config/Config';

/**
 * Normalizes image URLs to ensure consistent handling across the application
 * @param src - The image source (can be relative path, filename, or full URL)
 * @returns Normalized full URL
 */
export function normalizeImageUrl(src: string): string {
  if (!src) {
    return '';
  }

  // If it's already a full URL, return as is
  if (src.startsWith('http')) {
    return src;
  }

  // If it's a relative path starting with /, append to storage URL
  if (src.startsWith('/')) {
    return `${Config.BACKEND_STORASE_URL}${src}`;
  }

  // If it's just a filename, append to storage URL with /
  return `${Config.BACKEND_STORASE_URL}/${src}`;
}

/**
 * Generates appropriate sizes attribute for different image contexts
 * @param context - The context where the image is used
 * @returns Sizes attribute string
 */
export function getImageSizes(context: 'hero' | 'product' | 'category' | 'thumbnail' | 'gallery'): string {
  switch (context) {
    case 'hero':
      return '100vw';
    case 'product':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px';
    case 'category':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 25vw, 200px';
    case 'thumbnail':
      return '(max-width: 768px) 80px, 100px';
    case 'gallery':
      return '(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 600px';
    default:
      return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
  }
}

/**
 * Determines if an image should have priority loading
 * @param context - The context where the image is used
 * @param index - The index of the image in a list (for above-the-fold detection)
 * @returns Whether the image should have priority loading
 */
export function shouldPrioritizeImage(context: 'hero' | 'product' | 'category' | 'thumbnail', index: number = 0): boolean {
  if (context === 'hero') return true;
  if (context === 'product' && index < 4) return true; // First 4 products above the fold
  if (context === 'category' && index < 2) return true; // First 2 categories above the fold
  return false;
}

/**
 * Gets appropriate quality setting for different image contexts
 * @param context - The context where the image is used
 * @returns Quality value (1-100)
 */
export function getImageQuality(context: 'hero' | 'product' | 'category' | 'thumbnail'): number {
  switch (context) {
    case 'hero':
      return 95;
    case 'product':
      return 90;
    case 'category':
      return 85;
    case 'thumbnail':
      return 75;
    default:
      return 85;
  }
}

/**
 * Creates a blur placeholder data URL for images
 * @returns Base64 encoded blur placeholder
 */
export function getBlurPlaceholder(): string {
  return 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bvK6iuAEVvvhw/8AMq/Z';
}
