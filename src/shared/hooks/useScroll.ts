import { useEffect, useState } from 'react';
import { throttle } from '@/shared/utils/performanceUtils';

interface ScrollPosition {
  x: number;
  y: number;
}

interface UseScrollOptions {
  throttleMs?: number;
}

/**
 * Custom hook to track scroll position with throttling for performance
 * @param options - Configuration options
 * @returns Current scroll position
 */
export function useScroll({ throttleMs = 100 }: UseScrollOptions = {}): ScrollPosition {
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleScroll = throttle(() => {
      setScrollPosition({
        x: window.scrollX,
        y: window.scrollY,
      });
    }, throttleMs);

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Get initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [throttleMs]);

  return scrollPosition;
}

/**
 * Hook to detect scroll direction
 */
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      
      setLastScrollY(currentScrollY);
    }, 100);

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return scrollDirection;
}
