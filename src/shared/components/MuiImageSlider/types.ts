export interface SliderImage {
  id: number;
  src: string;
  alt: string;
}

export interface MuiImageSliderProps {
  images: SliderImage[];
  className?: string;
  height?: string | number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showThumbnails?: boolean;
}