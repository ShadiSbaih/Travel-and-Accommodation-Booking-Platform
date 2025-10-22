export interface SliderImage {
  id: number;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  rating?: number;
}

export interface MuiImageSliderProps {
  images: SliderImage[];
  className?: string;
  height?: string | number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showThumbnails?: boolean;
}
