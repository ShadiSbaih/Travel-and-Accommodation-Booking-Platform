import { useState, useEffect, useCallback, useRef } from 'react';

interface UseReviewsSliderProps {
  totalReviews: number;
  autoPlay: boolean;
  autoPlayInterval: number;
}

export function useReviewsSlider({ totalReviews, autoPlay, autoPlayInterval }: UseReviewsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const timerRef = useRef<number | null>(null);

  const nextReview = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalReviews);
  }, [totalReviews]);

  const prevReview = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalReviews) % totalReviews);
  }, [totalReviews]);

  const goToReview = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const toggleAutoplay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  // Autoplay effect
  useEffect(() => {
    if (isPlaying && autoPlay && totalReviews > 1) {
      timerRef.current = setInterval(nextReview, autoPlayInterval);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, autoPlay, autoPlayInterval, nextReview, totalReviews]);

  return {
    currentIndex,
    isPlaying,
    nextReview,
    prevReview,
    goToReview,
    toggleAutoplay,
  };
}
