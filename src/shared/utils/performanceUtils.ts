/**
 * Performance optimization utility for CSS transformations
 * Adds will-change property to improve animation performance
 */

export const optimizedTransformStyles = {
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  willChange: 'transform, box-shadow',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
  },
};

export const optimizedImageStyles = {
  transition: 'transform 0.3s ease-in-out',
  willChange: 'transform',
  '&:hover': {
    transform: 'scale(1.05)',
  },
};

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
