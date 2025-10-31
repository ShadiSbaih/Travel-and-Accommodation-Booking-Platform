import type { Room } from '@/features/admin/rooms/room.types';
import type { Amenity } from '@/features/hotels/types';

export interface CartItem {
  id: string; // Unique identifier for cart item (roomId-hotelId)
  room: Room;
  hotelId: number;
  hotelName: string;
  roomImage?: string;
  hotelAmenities?: Amenity[];
  checkInDate?: string;
  checkOutDate?: string;
  numberOfNights: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}
export interface AddToCartPayload {
  room: Room;
  hotelId: number;
  hotelName: string;
  roomImage?: string;
  hotelAmenities?: Amenity[];
  checkInDate?: string;
  checkOutDate?: string;
  numberOfNights?: number;
}
