/**
 * Admin Core Types - Centralized type definitions
 * All admin types are exported from here for consistency
 */

// City Types
export interface City {
  id: number;
  name: string;
  description: string;
  thumbnailUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CityFilters {
  name?: string;
  country?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface CreateCityDto {
  name: string;
  description: string;
}

export interface UpdateCityDto {
  name?: string;
  description?: string;
}

// Hotel Types
export interface Hotel {
  id: number;
  hotelName: string;
  name: string;
  location: string;
  description: string;
  hotelType: string;
  starRating: number;
  latitude: number;
  longitude: number;
  imageUrl?: string;
  availableRooms: number;
  cityId: number;
  rooms?: Room[];
  amenities?: Amenity[];
  createdAt?: string;
  updatedAt?: string;
}

export interface HotelFilters {
  searchQuery?: string;
  name?: string;
  cityId?: number;
  hotelType?: string;
  starRating?: number;
  pageNumber?: number;
  pageSize?: number;
}

export interface CreateHotelDto {
  hotelName?: string;
  name: string;
  description: string;
  hotelType: string;
  starRating: number;
  latitude: number;
  longitude: number;
  location?: string;
  cityId: number;
  imageUrl?: string;
  availableRooms?: number;
}

export interface UpdateHotelDto {
  hotelName?: string;
  name?: string;
  description?: string;
  hotelType?: string;
  starRating?: number;
  latitude?: number;
  longitude?: number;
  location?: string;
  cityId?: number;
  imageUrl?: string;
  availableRooms?: number;
}

// Room Types
export interface Room {
  roomId: number;
  roomNumber: number;
  roomPhotoUrl?: string;
  roomType: string;
  capacityOfAdults: number;
  capacityOfChildren: number;
  amenities?: Amenity[];
  price: number;
  availability: boolean;
  hotelId?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface RoomFilters {
  searchQuery?: string;
  roomType?: string;
  minPrice?: number;
  maxPrice?: number;
  availability?: boolean;
  hotelId?: number;
  pageNumber?: number;
  pageSize?: number;
}

export interface CreateRoomDto {
  roomNumber: number;
  roomPhotoUrl?: string;
  roomType: string;
  capacityOfAdults: number;
  capacityOfChildren: number;
  amenities?: Amenity[];
  price: number;
  availability: boolean;
  hotelId?: number;
}

export interface UpdateRoomDto {
  roomNumber?: number;
  roomPhotoUrl?: string;
  roomType?: string;
  capacityOfAdults?: number;
  capacityOfChildren?: number;
  amenities?: Amenity[];
  price?: number;
  availability?: boolean;
  hotelId?: number;
}

// Shared Types
export interface Amenity {
  id: number;
  name: string;
  description: string;
}

// Component Types
export type AdminViewMode = 'grid' | 'list';

export interface AdminPageHeaderProps {
  title: string;
  count: number;
  singularLabel: string;
  pluralLabel?: string;
  hasSearchQuery: boolean;
  viewMode: AdminViewMode;
  onViewModeChange: (mode: AdminViewMode) => void;
  onAdd: () => void;
  addButtonLabel: string;
  addButtonShortLabel?: string;
  icon: React.ComponentType<{ sx?: Record<string, unknown> }>;
  addButtonIcon?: React.ComponentType<{ sx?: Record<string, unknown> }>;
}
