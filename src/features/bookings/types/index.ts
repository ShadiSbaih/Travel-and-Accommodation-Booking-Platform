import type { CartItem } from '@/features/cart';
import type { Amenity } from '@/features/hotels/types';

// Cart Item Component Props
export interface CartItemCardProps {
  item: CartItem;
  onRemove: (itemId: string) => void;
}

export interface CartItemsListProps {
  items: CartItem[];
  onRemoveItem: (itemId: string) => void;
}

export interface CartItemHeaderProps {
  roomName: string;
  hotelName: string;
  onRemove: () => void;
}

export interface CartItemInfoProps {
  maxOccupancy: number;
  numberOfNights: number;
  checkInDate?: string;
  checkOutDate?: string;
}

export interface CartItemAmenitiesProps {
  amenities: Amenity[];
  maxDisplay?: number;
}

export interface CartItemPriceProps {
  pricePerNight: number;
  numberOfNights: number;
  totalPrice: number;
}

// Order Summary Component Props
export interface OrderSummaryProps {
  totalItems: number;
  subtotal: number;
  serviceFee: number;
  taxes: number;
  total: number;
  onProceedToCheckout: () => void;
}

export interface OrderSummaryRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}
