import type { CartItem } from '@/features/cart';
import type { Amenity } from '@/features/hotels/types';

// Booking API Types
export interface CreateBookingRequest {
  customerName: string;
  items: CartItem[];
  paymentMethod: string;
  totalCost: number;
}

export interface CreateBookingResponse {
  receipt: BookingReceipt;
}

// Booking Receipt Types
export interface BookingReceipt {
  customerName: string;
  hotelName: string;
  roomNumber: string;
  roomType: string;
  bookingDateTime: string;
  totalCost: number;
  paymentMethod: string;
  bookingStatus: string;
  confirmationNumber: string;
}

export interface BookingReceiptProps {
  receipt: BookingReceipt;
}

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
  checkInDate?: string;
  checkOutDate?: string;
}

export interface CartItemAmenitiesProps {
  amenities: Amenity[];
  maxDisplay?: number;
}

export interface CartItemPriceProps {
  pricePerNight: number;
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

// Clear Cart Dialog Props
export interface ClearCartDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemCount: number;
}
