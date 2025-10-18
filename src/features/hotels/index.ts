/**
 * Hotels Feature Exports
 */

export { default as HotelDetailsPage } from './components/HotelDetailsPage';
export { default as HotelCard } from './components/HotelCard';

export { 
  useHotels, 
  useHotel, 
  useHotelGallery, 
  useHotelReviews,
  useCreateHotel,
  useUpdateHotel,
  useDeleteHotel 
} from './hooks/useHotels';

export * from './types/hotel.types';
