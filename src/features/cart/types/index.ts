import type { AvailableRoom, Amenity } from '@/features/hotels/types';
import type { DateRange } from '@/shared/types/base.types';

/**
 * Hotel reference info
 */
export interface HotelReference {
  hotelId: number;
  hotelName: string;
}

/**
 * Cart item
 */
export interface CartItem extends HotelReference, Partial<DateRange> {
  id: string; // Unique identifier for cart item (roomId-hotelId)
  room: AvailableRoom;
  roomImage?: string;
  hotelAmenities?: Amenity[];
}

/**
 * Cart state
 */
export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

/**
 * Add to cart payload
 */
export type AddToCartPayload = Omit<CartItem, 'id'>;
