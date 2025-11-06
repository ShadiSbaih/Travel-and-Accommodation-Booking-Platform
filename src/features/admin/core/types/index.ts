/**
 * Admin Core Types - Centralized type definitions
 * All admin types are exported from here for consistency
 */

import type {
  BaseCity,
  Hotel as BaseHotel,
  Room as BaseRoom,
  Amenity,
  PaginatedFilter,
} from '@/shared/types/base.types';

// ==================== City Types ====================

/**
 * Admin City - extends base city
 */
export type City = BaseCity & {
  country?: string;
};

/**
 * City filters for admin panel
 */
export interface CityFilters extends PaginatedFilter {
  name?: string;
  country?: string;
}

/**
 * Create city DTO
 */
export type CreateCityDto = Pick<City, 'name' | 'description'>;

/**
 * Update city DTO - all fields optional
 */
export type UpdateCityDto = Partial<CreateCityDto>;

// ==================== Hotel Types ====================

/**
 * Admin Hotel - extends base hotel
 */
export type Hotel = BaseHotel & {
  rooms?: Room[];
  amenities?: Amenity[];
};

/**
 * Hotel filters for admin panel
 */
export interface HotelFilters extends PaginatedFilter {
  name?: string;
  cityId?: number;
  hotelType?: string;
  starRating?: number;
}

/**
 * Create hotel DTO
 */
export type CreateHotelDto = Pick<
  Hotel,
  | 'name'
  | 'description'
  | 'hotelType'
  | 'starRating'
  | 'latitude'
  | 'longitude'
  | 'cityId'
> &
  Partial<Pick<Hotel, 'hotelName' | 'location' | 'imageUrl' | 'availableRooms'>>;

/**
 * Update hotel DTO - all fields optional
 */
export type UpdateHotelDto = Partial<CreateHotelDto>;

// ==================== Room Types ====================

/**
 * Admin Room - extends base room with hotel reference
 */
export type Room = BaseRoom & {
  hotelId?: number;
  createdAt?: string;
  updatedAt?: string;
};

/**
 * Room filters for admin panel
 */
export interface RoomFilters extends PaginatedFilter {
  roomType?: string;
  minPrice?: number;
  maxPrice?: number;
  availability?: boolean;
  hotelId?: number;
}

/**
 * Create room DTO
 */
export type CreateRoomDto = Pick<
  Room,
  | 'roomNumber'
  | 'roomType'
  | 'capacityOfAdults'
  | 'capacityOfChildren'
  | 'price'
  | 'availability'
> &
  Partial<Pick<Room, 'roomPhotoUrl' | 'amenities' | 'hotelId'>>;

/**
 * Update room DTO - all fields optional
 */
export type UpdateRoomDto = Partial<CreateRoomDto>;

// ==================== Shared Types ====================

/**
 * Re-export Amenity from base types
 */
export type { Amenity };

// ==================== Component Types ====================

/**
 * Admin view mode
 */
export type AdminViewMode = 'grid' | 'list';

/**
 * Admin page header props
 */
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
