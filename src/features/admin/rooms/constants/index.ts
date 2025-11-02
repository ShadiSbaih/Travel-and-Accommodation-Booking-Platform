/**
 * Constants for Rooms Admin Module
 */

// Debounce delay for search input (ms)
export const SEARCH_DEBOUNCE_DELAY = 300;

// Simulated loading delay for infinite scroll (ms)
export const INFINITE_SCROLL_DELAY = 300;

// Room form field labels
export const ROOM_FORM_LABELS = {
  roomNumber: 'Room Number',
  roomType: 'Room Type',
  capacityOfAdults: 'Adult Capacity',
  capacityOfChildren: 'Children Capacity',
  price: 'Price per Night',
  availability: 'Available',
  roomPhotoUrl: 'Room Photo URL',
  amenities: 'Amenities',
} as const;

// Room types
export const ROOM_TYPES = [
  'Standard Room',
  'Deluxe Room',
  'Suite Room',
  'Presidential Suite',
  'Family Room',
  'Twin Room',
  'Single Room',
  'Double Room',
] as const;
