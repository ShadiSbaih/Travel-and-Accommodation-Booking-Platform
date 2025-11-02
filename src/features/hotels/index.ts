/**
 * Hotels Feature Exports
 */

export { default as HotelDetailsPage } from './components/HotelDetailsPage';
export { default as HotelCard } from './components/HotelCard';

// Skeleton Components
export { 
  HotelDetailsPageSkeleton, 
  HotelGallerySkeleton, 
  HotelSidebarSkeleton, 
  RoomCardSkeleton 
} from './components/skeletons';

export { 
  useHotels, 
  useHotel, 
  useHotelGallery, 
  useHotelReviews,
  useCreateHotel,
  useUpdateHotel,
  useDeleteHotel 
} from './hooks/useHotels';

export * from './types/index';
