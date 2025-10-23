import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSliderStateProps {
  maxSlides: number;
  autoPlay: boolean;
  autoPlayInterval: number;
}

interface UseSliderStateReturn {
  currentSlide: number;
  isPlaying: boolean;
  progress: number;
  goToSlide: (index: number) => void;
  nextSlide: () => void;
  prevSlide: () => void;
  toggleAutoplay: () => void;
}

export function useSliderState({
  maxSlides,
  autoPlay,
  autoPlayInterval,
}: UseSliderStateProps): UseSliderStateReturn {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [progress, setProgress] = useState(0);
  const slideTimerRef = useRef<number | null>(null);
  const progressTimerRef = useRef<number | null>(null);

  // Clear timers helper
  const clearTimers = useCallback(() => {
    if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
  }, []);

  // Combined effect for auto-advance and progress
  useEffect(() => {
    if (!autoPlay || !isPlaying || maxSlides <= 1) {
      clearTimers();
      setProgress(0);
      return;
    }

    setProgress(0);
    const startTime = Date.now();

    // Progress animation
    progressTimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / autoPlayInterval) * 100, 100);
      setProgress(newProgress);
    }, 100);

    // Auto-advance slide
    slideTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % maxSlides);
    }, autoPlayInterval);

    return clearTimers;
  }, [currentSlide, isPlaying, autoPlay, autoPlayInterval, maxSlides, clearTimers]);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  }, [maxSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  }, [maxSlides]);

  const toggleAutoplay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  return {
    currentSlide,
    isPlaying,
    progress,
    goToSlide,
    nextSlide,
    prevSlide,
    toggleAutoplay,
  };
}
