import type { SliderImage } from "@/shared/components/MuiImageSlider";
import type {
  Amenity,
  Hotel as BaseHotel,
  Room as BaseRoom,
  SimpleRoom,
  BaseEntity,
  NamedLocation,
  BookingDetails,
  SimplePricing,
  Discount,
  PaginatedFilter,
} from '@/shared/types/base.types';

// Re-export base types for convenience
export type { Amenity, SimpleRoom as Room };

/**
 * Hotel type - extends base hotel
 */
export type Hotel = BaseHotel;

/**
 * Hotel filters
 */
export interface HotelFilters
  extends Pick<PaginatedFilter, 'searchQuery'>,
    Partial<Pick<Hotel, 'name' | 'starRating' | 'hotelType'>> {
  city?: string;
}

/**
 * Hotel gallery image
 */
export interface HotelGallery extends BaseEntity {
  hotelId: number;
  url: string;
}

/**
 * Hotel review
 */
export interface HotelReview extends BaseEntity {
  hotelId: number;
  customerName: string;
  rating: number;
  description: string;
}

/**
 * Search result DTO with booking details
 */
export interface SearchResultDTO
  extends Pick<
      Hotel,
      'hotelId' | 'hotelName' | 'starRating' | 'latitude' | 'longitude'
    >,
    BookingDetails,
    SimplePricing,
    Discount {
  roomType: string;
  cityName: string;
  roomPhotoUrl: string;
  amenities: Amenity[];
}

/**
 * Available room for booking
 */
export interface AvailableRoom
  extends Pick<
      BaseRoom,
      'roomId' | 'roomType' | 'capacityOfAdults' | 'capacityOfChildren' | 'price' | 'availability'
    > {
  roomNumber: string;
  roomPhotoUrl: string;
  roomAmenities: Amenity[];
}

// ==================== Component Props ====================

/**
 * Rooms list component props
 */
export interface RoomsListProps {
  rooms: AvailableRoom[];
  onRoomSelect: (roomId: number) => void;
  cartItems: number[];
}

/**
 * Room card component props
 */
export interface RoomCardProps {
  room: AvailableRoom;
  onBookNow?: (roomId: number) => void;
  isInCart?: boolean;
}

/**
 * Amenities layout options
 */
export type AmenitiesLayout = 'vertical' | 'grid';

/**
 * Amenities list component props
 */
export interface AmenitiesListProps {
  amenities: Amenity[];
  layout?: AmenitiesLayout;
  showTitle?: boolean;
}

/**
 * Hotel gallery component props
 */
export interface HotelGalleryProps {
  images: SliderImage[];
}

/**
 * Hotel header component props
 */
export interface HotelHeaderProps
  extends Pick<Hotel, 'hotelName'>,
    Partial<Pick<Hotel, 'location' | 'starRating' | 'hotelType'>> {}

/**
 * Hotel info banner component props
 */
export interface HotelInfoBannerProps
  extends Required<Pick<Hotel, 'location' | 'description'>>,
    Partial<Pick<Hotel, 'starRating' | 'hotelType'>> {}

/**
 * Hotel location map component props
 */
export interface HotelLocationMapProps extends NamedLocation, Pick<Hotel, 'hotelName'> {
  height?: number;
  zoom?: number;
}

/**
 * Hotel sidebar component props
 */
export interface HotelSidebarProps {
  hotel: Hotel;
}