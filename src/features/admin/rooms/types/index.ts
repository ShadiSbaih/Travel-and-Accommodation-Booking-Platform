export interface Amenity {
  id: number;
  name: string;
  description: string;
}

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
