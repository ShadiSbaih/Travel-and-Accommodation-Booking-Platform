/**
 * Admin Core Constants
 */

// UI Constants
export const SEARCH_DEBOUNCE_DELAY = 300;
export const INFINITE_SCROLL_DELAY = 300;

// Query Keys
export const QUERY_KEYS = {
  CITIES: 'cities',
  CITY: 'city',
  HOTELS: 'hotels',
  HOTEL: 'hotel',
  ROOMS: 'rooms',
  ROOM: 'room',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  CITY_CREATED: 'City created successfully',
  CITY_UPDATED: 'City updated successfully',
  CITY_DELETED: 'City deleted successfully',
  HOTEL_CREATED: 'Hotel created successfully',
  HOTEL_UPDATED: 'Hotel updated successfully',
  HOTEL_DELETED: 'Hotel deleted successfully',
  ROOM_CREATED: 'Room created successfully',
  ROOM_UPDATED: 'Room updated successfully',
  ROOM_DELETED: 'Room deleted successfully',
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  CITY_CREATE_FAILED: 'Failed to create city',
  CITY_UPDATE_FAILED: 'Failed to update city',
  CITY_DELETE_FAILED: 'Failed to delete city',
  HOTEL_CREATE_FAILED: 'Failed to create hotel',
  HOTEL_UPDATE_FAILED: 'Failed to update hotel',
  HOTEL_DELETE_FAILED: 'Failed to delete hotel',
  ROOM_CREATE_FAILED: 'Failed to create room',
  ROOM_UPDATE_FAILED: 'Failed to update room',
  ROOM_DELETE_FAILED: 'Failed to delete room',
} as const;
