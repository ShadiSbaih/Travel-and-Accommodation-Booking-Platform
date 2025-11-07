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

// /**
//  * Image utility functions
//  */

// /**
//  * Calculates aspect ratio percentage for responsive images
//  * @param width - Image width
//  * @param height - Image height
//  * @returns Aspect ratio as percentage
//  */
// export const calculateAspectRatio = (width: number, height: number): number => {
//   return (height / width) * 100;
// };

// /**
//  * Preloads an image with optional abort signal
//  * @param src - Image source URL
//  * @param signal - Optional AbortSignal to cancel loading
//  * @returns Promise that resolves when image is loaded
//  */
// export const preloadImage = (src: string, signal?: AbortSignal): Promise<void> => {
//   return new Promise((resolve, reject) => {
//     if (signal?.aborted) {
//       reject(new DOMException('Aborted', 'AbortError'));
//       return;
//     }

//     const img = new Image();

//     const cleanup = () => {
//       img.onload = null;
//       img.onerror = null;
//       signal?.removeEventListener('abort', onAbort);
//     };

//     const onAbort = () => {
//       cleanup();
//       reject(new DOMException('Aborted', 'AbortError'));
//     };

//     img.onload = () => {
//       cleanup();
//       resolve();
//     };

//     img.onerror = () => {
//       cleanup();
//       reject(new Error('Failed to load image'));
//     };

//     signal?.addEventListener('abort', onAbort);
//     img.src = src;
//   });
// };
