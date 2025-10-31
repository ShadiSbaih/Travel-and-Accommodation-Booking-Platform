export interface FeaturedDealDto {
  hotelId: number;
  originalRoomPrice: number;
  discount: number;
  finalPrice: number;
  cityName: string;
  hotelName: string;
  hotelStarRating: number;
  title: string;
  description: string;
  roomPhotoUrl: string;
}

export type FeaturedDealsDto = FeaturedDealDto[];

export interface TrendingDestinationDto {
  cityId: number;
  cityName: string;
  countryName: string;
  description: string;
  thumbnailUrl: string;
}

export type TrendingDestinationsDto = TrendingDestinationDto[];

export interface RecentlyVisitedHotelDto {
  hotelId: number;
  hotelName: string;
  starRating: number;
  visitDate: string;
  cityName: string;
  thumbnailUrl: string;
  priceLowerBound: number;
  priceUpperBound: number;
}

export type RecentlyVisitedHotelsDto = RecentlyVisitedHotelDto[];

// Component Props Types
export interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
}

export interface FeaturedDealCardProps {
  deal: FeaturedDealDto;
}

export interface TrendingDestinationCardProps {
  destination: TrendingDestinationDto;
}

export interface RecentlyVisitedCardProps {
  hotel: RecentlyVisitedHotelDto;
}

export interface HeroSectionProps {
  userName?: string;
}
