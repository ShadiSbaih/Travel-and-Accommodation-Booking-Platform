import type {
  BaseEntity,
  SectionHeaderBase,
  DiscountedPrice,
  HotelRating,
  ImageEntity,
} from '@/shared/types/base.types';

// ==================== DTO Types ====================

/**
 * Featured deal DTO
 */
export interface FeaturedDealDto extends DiscountedPrice, HotelRating, ImageEntity {
  hotelId: number;
  originalRoomPrice: number;
  cityName: string;
  hotelName: string;
  hotelStarRating: number;
  title: string;
  description: string;
  roomPhotoUrl: string;
}

/**
 * Featured deals array
 */
export type FeaturedDealsDto = FeaturedDealDto[];

/**
 * Trending destination DTO
 */
export interface TrendingDestinationDto extends BaseEntity, ImageEntity {
  cityId: number;
  cityName: string;
  countryName: string;
  description: string;
}

/**
 * Trending destinations array
 */
export type TrendingDestinationsDto = TrendingDestinationDto[];

/**
 * Price range
 */
export interface PriceRange {
  priceLowerBound: number;
  priceUpperBound: number;
}

/**
 * Recently visited hotel DTO
 */
export interface RecentlyVisitedHotelDto extends HotelRating, ImageEntity, PriceRange {
  hotelId: number;
  hotelName: string;
  visitDate: string;
  cityName: string;
}

/**
 * Recently visited hotels array
 */
export type RecentlyVisitedHotelsDto = RecentlyVisitedHotelDto[];

// ==================== Component Props Types ====================

/**
 * Section header props
 */
export type SectionHeaderProps = SectionHeaderBase;

/**
 * Featured deal card props
 */
export interface FeaturedDealCardProps {
  deal: FeaturedDealDto;
}

/**
 * Trending destination card props
 */
export interface TrendingDestinationCardProps {
  destination: TrendingDestinationDto;
}

/**
 * Recently visited card props
 */
export interface RecentlyVisitedCardProps {
  hotel: RecentlyVisitedHotelDto;
}

/**
 * Hero section props
 */
export interface HeroSectionProps {
  userName?: string;
}
