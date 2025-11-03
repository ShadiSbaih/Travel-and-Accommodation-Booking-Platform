import api from '@/core/api/axios';
import type { Review } from '@/shared/components/MuiReviewsSlider';

export async function fetchReviews(hotelId: number): Promise<Review[]> {
  const { data } = await api.get(`/hotels/${hotelId}/reviews`);
  return data;
}
