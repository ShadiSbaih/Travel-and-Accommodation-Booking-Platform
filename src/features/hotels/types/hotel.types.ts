export interface Amenity {
  id: number;
  name: string;
  description: string;
}

export interface Hotel {
  id: number;
  name: string;
  description: string;
  hotelType: number;
  starRating: number;
  latitude: number;
  longitude: number;
}

export interface HotelFilters {
  name?: string;
  city?: string;
  starRating?: number;
  hotelType?: number;
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