import type { SliderImage } from "@/shared/components/MuiImageSlider";

export interface Amenity {
    id: number;
    name: string;
    description: string;
}

export interface Room {
    id: number;
    name: string;
    type: string;
    price: number;
    available: boolean;
    maxOccupancy: number;
}

export interface Hotel {
    id: number;
    hotelName?: string; // Some hotels use hotelName
    name: string;
    location?: string;
    description: string;
    hotelType: string; // Changed from number to string (e.g., "Resort", "Hotel", "Lodge", "Boutique", "Inn")
    starRating: number;
    latitude: number;
    longitude: number;
    rooms?: Room[];
    imageUrl?: string;
    availableRooms?: number;
    cityId?: number;
    amenities?: Amenity[];
}

export interface HotelFilters {
    name?: string;
    city?: string;
    starRating?: number;
    hotelType?: string; // Changed from number to string to match Hotel interface
}

export interface HotelGallery {
    id: number;
    hotelId: number;
    url: string;
}

export interface HotelReview {
    id: number;
    hotelId: number;
    customerName: string;
    rating: number;
    description: string;
}

export interface SearchResultDTO {
    hotelId: number;
    hotelName: string;
    starRating: number;
    latitude: number;
    longitude: number;
    roomPrice: number;
    roomType: string;
    cityName: string;
    roomPhotoUrl: string;
    discount: number;
    amenities: Amenity[];
    numberOfChildren: number;
    numberOfAdults: number;
    numberOfRooms: number;
    checkInDate: string;
    checkOutDate: string;
}

export interface AvailableRoom {
    roomId: number;
    roomNumber: string;
    roomPhotoUrl: string;
    roomType: string;
    capacityOfAdults: number;
    capacityOfChildren: number;
    roomAmenities: Amenity[];
    price: number;
    availability: boolean;
}

export interface RoomsListProps {
    rooms: AvailableRoom[];
    onRoomSelect: (roomId: number) => void;
    cartItems: number[];
}

export interface RoomCardProps {
    room: AvailableRoom;
    onBookNow?: (roomId: number) => void;
}
export interface AmenitiesListProps {
    amenities: Amenity[];
    layout?: 'vertical' | 'grid';
    showTitle?: boolean;
}

export interface HotelGalleryProps {
    images: SliderImage[];
}

export interface HotelHeaderProps {
    hotelName: string;
    location?: string;
    starRating?: number;
    hotelType?: string;
}

export interface HotelInfoBannerProps {
    location: string;
    starRating?: number;
    hotelType?: string;
    description: string;
}

export interface HotelLocationMapProps {
  latitude: number;
  longitude: number;
  hotelName: string;
  location: string;
  height?: number;
  zoom?: number;
}

export interface HotelSidebarProps {
  hotel: Hotel;
}