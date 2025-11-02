import { useEffect } from 'react';
import type { RefObject } from 'react';

interface UseInfiniteScrollOptions {
  ref: RefObject<HTMLElement | null>;
  hasMore: boolean;
  isLoading: boolean;
  onLoadMore: () => void;
  threshold?: number;
}

export function useInfiniteScroll({
  ref,
  hasMore,
  isLoading,
  onLoadMore,
  threshold = 0.1,
}: UseInfiniteScrollOptions) {
  useEffect(() => {
    if (!ref.current || !hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { threshold }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, hasMore, isLoading, onLoadMore, threshold]);
}
