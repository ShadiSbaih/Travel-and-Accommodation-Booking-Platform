export interface Amenity {
  id: number;
  name: string;
  description: string;
}

export interface Room {
  id: number;
  name: string;
  type: string;
  price: number;
  available: boolean;
  maxOccupancy: number;
}

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

// Export component types
export * from './component.types.ts';
