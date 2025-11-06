import type { SearchResultDTO, Amenity } from '@/features/hotels/types';
import type { BookingDetails, Discount, HotelRating } from '@/shared/types/base.types';

/**
 * Hotel card props
 */
export interface HotelCardProps {
  hotel: SearchResultDTO;
}

/**
 * Booking details badges props
 */
export type BookingDetailsBadgesProps = BookingDetails;

/**
 * Hotel card image props
 */
export interface HotelCardImageProps extends Discount, HotelRating {
  imageUrl: string;
  hotelName: string;
}

/**
 * Hotel card header props
 */
export interface HotelCardHeaderProps {
  hotelName: string;
  cityName: string;
  roomType: string;
}

/**
 * Amenities section props
 */
export interface AmenitiesSectionProps {
  amenities: Amenity[];
  maxDisplay?: number;
}

/**
 * Price display props
 */
export interface PriceDisplayProps extends Discount {
  originalPrice: number;
}
