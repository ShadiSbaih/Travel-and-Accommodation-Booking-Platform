/**
 * Base Types - Core domain types used across the application
 * These are the foundation types that other types extend from
 */

// ==================== Entity Base Types ====================

/**
 * Base entity with common fields
 */
export interface BaseEntity {
  id: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Base entity with name and description
 */
export interface NamedEntity extends BaseEntity {
  name: string;
  description: string;
}

// ==================== Core Domain Types ====================

/**
 * Amenity - Features/facilities offered
 */
export type Amenity = NamedEntity;

/**
 * Geographic location data
 */
export interface GeoLocation {
  latitude: number;
  longitude: number;
}

/**
 * Location with name
 */
export interface NamedLocation extends GeoLocation {
  location: string;
}

/**
 * Image with URL
 */
export interface ImageEntity {
  imageUrl?: string;
  thumbnailUrl?: string;
}

/**
 * Photo with URL
 */
export interface PhotoEntity {
  photoUrl?: string;
}

// ==================== City Types ====================

/**
 * Base City interface
 */
export interface BaseCity extends NamedEntity, ImageEntity {
  thumbnailUrl?: string;
}

/**
 * City with country information
 */
export interface City extends BaseCity {
  country?: string;
}

// ==================== Room Types ====================

/**
 * Base Room capacity
 */
export interface RoomCapacity {
  capacityOfAdults: number;
  capacityOfChildren: number;
}

/**
 * Room pricing
 */
export interface RoomPricing {
  price: number;
}

/**
 * Room availability
 */
export interface RoomAvailability {
  availability: boolean;
}

/**
 * Base Room interface
 */
export interface BaseRoom extends RoomCapacity, RoomPricing, RoomAvailability {
  roomId: number;
  roomNumber: number | string;
  roomType: string;
  roomPhotoUrl?: string;
  amenities?: Amenity[];
}

/**
 * Room with hotel reference
 */
export interface Room extends BaseRoom {
  hotelId?: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Simplified room for legacy support
 */
export interface SimpleRoom {
  id: number;
  name: string;
  type: string;
  price: number;
  available: boolean;
  maxOccupancy: number;
}

// ==================== Hotel Types ====================

/**
 * Hotel rating
 */
export interface HotelRating {
  starRating: number;
}

/**
 * Hotel classification
 */
export interface HotelClassification {
  hotelType: string; // "Resort", "Hotel", "Lodge", "Boutique", "Inn"
}

/**
 * Base Hotel interface
 */
export interface BaseHotel
  extends NamedEntity,
    ImageEntity,
    NamedLocation,
    HotelRating,
    HotelClassification {
  hotelName?: string; // Some APIs use hotelName instead of name
  hotelId?: number; // Some APIs use hotelId instead of id
  cityId?: number;
}

/**
 * Hotel with relationships
 */
export interface Hotel extends BaseHotel {
  rooms?: Room[];
  availableRooms?: number;
  amenities?: Amenity[];
}

// ==================== Booking & Dates ====================

/**
 * Date range for bookings
 */
export interface DateRange {
  checkInDate: string;
  checkOutDate: string;
}

/**
 * Occupancy details
 */
export interface Occupancy {
  numberOfAdults: number;
  numberOfChildren: number;
  numberOfRooms: number;
}

/**
 * Complete booking details
 */
export interface BookingDetails extends DateRange, Occupancy {}

// ==================== Pricing ====================

/**
 * Discount information
 */
export interface Discount {
  discount: number;
}

/**
 * Price with discount
 */
export interface DiscountedPrice extends Discount {
  originalPrice: number;
  finalPrice: number;
}

/**
 * Simple pricing
 */
export interface SimplePricing {
  roomPrice: number;
}

// ==================== Filters ====================

/**
 * Base filter with search
 */
export interface BaseFilter {
  searchQuery?: string;
}

/**
 * Pagination
 */
export interface Pagination {
  pageNumber?: number;
  pageSize?: number;
}

/**
 * Filter with pagination
 */
export interface PaginatedFilter extends BaseFilter, Pagination {}

// ==================== Component Props Base Types ====================

/**
 * Base props for components with title
 */
export interface TitledProps {
  title: string;
}

/**
 * Base props for components with optional subtitle
 */
export interface SubtitledProps extends TitledProps {
  subtitle?: string;
}

/**
 * Base props for components with icon
 */
export interface IconProps {
  icon?: React.ReactNode;
}

/**
 * Base props for section headers
 */
export interface SectionHeaderBase extends SubtitledProps, IconProps {}

/**
 * Base props for action buttons
 */
export interface ActionProps {
  action?: {
    label: string;
    onClick: () => void;
  };
}

/**
 * Base props for components with className
 */
export interface StyledProps {
  className?: string;
}

/**
 * Base props for state components
 */
export interface StateComponentProps extends StyledProps, ActionProps {}
