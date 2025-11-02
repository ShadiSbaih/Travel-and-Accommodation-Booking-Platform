export interface Room {
  id: number;
  roomNumber: string;
  roomPhotoUrl?: string;
  roomType: string;
  capacityOfAdults: number;
  capacityOfChildren: number;
  roomAmenities?: string[];
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
  available?: boolean;
  hotelId?: number;
  pageNumber?: number;
  pageSize?: number;
}
