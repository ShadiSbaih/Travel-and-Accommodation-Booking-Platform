/**
 * Image utility functions
 */

/**
 * Calculates aspect ratio percentage for responsive images
 * @param width - Image width
 * @param height - Image height
 * @returns Aspect ratio as percentage
 */
export const calculateAspectRatio = (width: number, height: number): number => {
  return (height / width) * 100;
};

/**
 * Preloads an image
 * @param src - Image source URL
 */
export const preloadImage = (src: string): void => {
  const img = new Image();
  img.src = src;
};
