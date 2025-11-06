

import type { AvailableRoom, Amenity } from '@/features/hotels/types';

export interface CartItem {
  id: string; // Unique identifier for cart item (roomId-hotelId)
  room: AvailableRoom;
  hotelId: number;
  hotelName: string;
  roomImage?: string;
  hotelAmenities?: Amenity[];
  checkInDate?: string;
  checkOutDate?: string;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}
export interface AddToCartPayload {
  room: AvailableRoom;
  hotelId: number;
  hotelName: string;
  roomImage?: string;
  hotelAmenities?: Amenity[];
  checkInDate?: string;
  checkOutDate?: string;
}
