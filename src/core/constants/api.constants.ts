/**
 * API configuration constants
 */

export const API_BASE_URL = 'http://localhost:5000/api';

export const API_HEADERS = {
  'Content-Type': 'application/json',
} as const;

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  
  // Amenities
  AMENITIES: '/search-results/amenities',
  
  // Search
  SEARCH: '/search-results',
  
  // Hotels
  HOTELS: '/hotels',
  HOTEL_GALLERY: '/hotels/:id/gallery',
  HOTEL_REVIEWS: '/hotels/:id/reviews',
  AVAILABLE_ROOMS: '/hotels/:id/available-rooms',
  
  // Admin
  ADMIN_HOTELS: '/admin/hotels',
  ADMIN_CITIES: '/admin/cities',
  ADMIN_ROOMS: '/admin/rooms',
  
  // Bookings
  BOOKINGS: '/bookings',
} as const;
