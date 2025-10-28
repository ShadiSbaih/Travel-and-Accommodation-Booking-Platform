import type { SearchResultDTO } from '@/features/hotels/types';

export interface HotelCardProps {
  hotel: SearchResultDTO;
}

export interface BookingDetailsBadgesProps {
  numberOfAdults: number;
  numberOfChildren: number;
  numberOfRooms: number;
  checkInDate: string;
  checkOutDate: string;
}

export interface HotelCardImageProps {
  imageUrl: string;
  hotelName: string;
  discount: number;
  starRating: number;
}

export interface HotelCardHeaderProps {
  hotelName: string;
  cityName: string;
  roomType: string;
}

export interface Amenity {
  id: number;
  name: string;
}

export interface AmenitiesSectionProps {
  amenities: Amenity[];
  maxDisplay?: number;
}

export interface PriceDisplayProps {
  originalPrice: number;
  discount: number;
}
