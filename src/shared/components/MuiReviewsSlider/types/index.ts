export interface Review {
  reviewId: number;
  customerName: string;
  rating: number;
  description: string;
}

export interface MuiReviewsSliderProps {
  reviews: Review[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}
