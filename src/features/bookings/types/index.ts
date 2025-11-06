import type { CartItem } from '@/features/cart';
import type { Amenity } from '@/features/hotels/types';
import type { DateRange } from '@/shared/types/base.types';

// ==================== Booking API Types ====================

/**
 * Payment information
 */
export interface PaymentInfo {
  paymentMethod: string;
  totalCost: number;
}

/**
 * Customer information
 */
export interface CustomerInfo {
  customerName: string;
}

/**
 * Create booking request
 */
export interface CreateBookingRequest extends CustomerInfo, PaymentInfo {
  items: CartItem[];
}

/**
 * Create booking response
 */
export interface CreateBookingResponse {
  receipt: BookingReceipt;
}

// ==================== Booking Receipt Types ====================

/**
 * Room booking details
 */
export interface RoomBookingDetails {
  roomNumber: string;
  roomType: string;
}

/**
 * Booking status
 */
export interface BookingStatus {
  bookingStatus: string;
  confirmationNumber: string;
}

/**
 * Booking receipt
 */
export interface BookingReceipt
  extends CustomerInfo,
    RoomBookingDetails,
    PaymentInfo,
    BookingStatus {
  hotelName: string;
  bookingDateTime: string;
}

/**
 * Booking receipt component props
 */
export interface BookingReceiptProps {
  receipt: BookingReceipt;
}

// ==================== Cart Item Component Props ====================

/**
 * Remove action
 */
export interface RemoveAction {
  onRemove: () => void;
}

/**
 * Cart item card props
 */
export interface CartItemCardProps {
  item: CartItem;
  onRemove: (itemId: string) => void;
}

/**
 * Cart items list props
 */
export interface CartItemsListProps {
  items: CartItem[];
  onRemoveItem: (itemId: string) => void;
}

/**
 * Cart item header props
 */
export interface CartItemHeaderProps extends RemoveAction {
  roomName: string;
  hotelName: string;
}

/**
 * Cart item info props
 */
export interface CartItemInfoProps extends Partial<DateRange> {
  maxOccupancy: number;
}

/**
 * Cart item amenities props
 */
export interface CartItemAmenitiesProps {
  amenities: Amenity[];
  maxDisplay?: number;
}

/**
 * Cart item price props
 */
export interface CartItemPriceProps {
  pricePerNight: number;
}

// ==================== Order Summary Component Props ====================

/**
 * Order costs breakdown
 */
export interface OrderCosts {
  subtotal: number;
  serviceFee: number;
  taxes: number;
  total: number;
}

/**
 * Order summary props
 */
export interface OrderSummaryProps extends OrderCosts {
  totalItems: number;
  onProceedToCheckout: () => void;
}

/**
 * Order summary row props
 */
export interface OrderSummaryRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

// ==================== Clear Cart Dialog Props ====================

/**
 * Dialog actions
 */
export interface DialogActions {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

/**
 * Clear cart dialog props
 */
export interface ClearCartDialogProps extends DialogActions {
  itemCount: number;
}
