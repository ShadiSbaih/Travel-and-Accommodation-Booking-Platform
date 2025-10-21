import React from 'react';

// Image interface for the slider
export interface SliderImage {
  id: string | number;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  link?: string;
  category?: string;
  rating?: number;
  releaseDate?: string;
  players?: string;
}

// Configuration options for the slider
export interface SliderConfig {
  autoplay?: {
    enabled: boolean;
    delay: number;
    pauseOnHover?: boolean;
  };
  navigation?: {
    enabled: boolean;
    customIcons?: {
      prev?: React.ReactNode;
      next?: React.ReactNode;
    };
  };
  pagination?: {
    enabled: boolean;
    type: 'bullets' | 'thumbnails' | 'progress';
    clickable?: boolean;
  };
  effect?: 'slide' | 'fade';
  loop?: boolean;
  slidesPerView?: number;
  spaceBetween?: number;
  speed?: number;
}

// Props for individual components
export interface NavigationControlsProps {
  onPrevious: () => void;
  onNext: () => void;
  isEnabled: boolean;
  customIcons?: {
    prev?: React.ReactNode;
    next?: React.ReactNode;
  };
}

export interface ThumbnailNavigationProps {
  images: SliderImage[];
  currentSlide: number;
  onSlideSelect: (index: number) => void;
  progress: number;
  isAutoplayEnabled: boolean;
  isPlaying: boolean;
}

export interface SlideContentProps {
  image: SliderImage;
  onImageClick: (image: SliderImage, index: number) => void;
  index: number;
}

export interface ProgressBarProps {
  progress: number;
  isVisible: boolean;
}

export interface AutoplayControlProps {
  isPlaying: boolean;
  onToggle: () => void;
  isEnabled: boolean;
}

export interface ImageSliderProps {
  images: SliderImage[];
  config?: Partial<SliderConfig>;
  className?: string;
  height?: string;
  width?: string;
  onSlideChange?: (index: number) => void;
  showOverlay?: boolean;
}