import { filterHotelsByAmenities } from '../filter.utils';
import type { SearchResultDTO } from '@/features/hotels/types';

describe('filter utils', () => {
  const mockHotels: SearchResultDTO[] = [
    {
      hotelId: 1,
      hotelName: 'Hotel A',
      starRating: 5,
      latitude: 25.2048,
      longitude: 55.2708,
      roomPrice: 200,
      roomType: 'Deluxe',
      cityName: 'Dubai',
      roomPhotoUrl: 'photo1.jpg',
      discount: 0,
      numberOfChildren: 0,
      numberOfAdults: 2,
      numberOfRooms: 1,
      checkInDate: '2024-01-15',
      checkOutDate: '2024-01-20',
      amenities: [
        { id: 1, name: 'WiFi', description: 'Free WiFi' },
        { id: 2, name: 'Pool', description: 'Swimming pool' },
        { id: 3, name: 'Gym', description: 'Fitness center' },
      ],
    },
    {
      hotelId: 2,
      hotelName: 'Hotel B',
      starRating: 4,
      latitude: 25.2048,
      longitude: 55.2708,
      roomPrice: 150,
      roomType: 'Standard',
      cityName: 'Dubai',
      roomPhotoUrl: 'photo2.jpg',
      discount: 10,
      numberOfChildren: 0,
      numberOfAdults: 2,
      numberOfRooms: 1,
      checkInDate: '2024-01-15',
      checkOutDate: '2024-01-20',
      amenities: [
        { id: 4, name: 'WiFi', description: 'Free WiFi' },
        { id: 5, name: 'Parking', description: 'Free parking' },
      ],
    },
    {
      hotelId: 3,
      hotelName: 'Hotel C',
      starRating: 3,
      latitude: 25.2048,
      longitude: 55.2708,
      roomPrice: 100,
      roomType: 'Economy',
      cityName: 'Dubai',
      roomPhotoUrl: 'photo3.jpg',
      discount: 5,
      numberOfChildren: 0,
      numberOfAdults: 2,
      numberOfRooms: 1,
      checkInDate: '2024-01-15',
      checkOutDate: '2024-01-20',
      amenities: [
        { id: 6, name: 'Parking', description: 'Free parking' },
      ],
    },
  ];

  describe('filterHotelsByAmenities', () => {
    it('should return all hotels when no amenities selected', () => {
      const result = filterHotelsByAmenities(mockHotels, [], 'any');
      expect(result).toHaveLength(3);
      expect(result).toEqual(mockHotels);
    });

    it('should filter hotels with ANY selected amenity', () => {
      const result = filterHotelsByAmenities(mockHotels, ['wifi'], 'any');
      expect(result).toHaveLength(2);
      expect(result[0].hotelName).toBe('Hotel A');
      expect(result[1].hotelName).toBe('Hotel B');
    });

    it('should filter hotels with ALL selected amenities', () => {
      const result = filterHotelsByAmenities(mockHotels, ['wifi', 'pool'], 'all');
      expect(result).toHaveLength(1);
      expect(result[0].hotelName).toBe('Hotel A');
    });

    it('should handle multiple amenities with ANY mode', () => {
      const result = filterHotelsByAmenities(mockHotels, ['wifi', 'parking'], 'any');
      expect(result).toHaveLength(3);
    });

    it('should handle multiple amenities with ALL mode', () => {
      const result = filterHotelsByAmenities(mockHotels, ['wifi', 'parking'], 'all');
      expect(result).toHaveLength(1);
      expect(result[0].hotelName).toBe('Hotel B');
    });

    it('should be case insensitive', () => {
      const result = filterHotelsByAmenities(mockHotels, ['WIFI'], 'any');
      expect(result).toHaveLength(2);
    });

    it('should handle partial matches', () => {
      const result = filterHotelsByAmenities(mockHotels, ['park'], 'any');
      expect(result).toHaveLength(2);
      expect(result[0].hotelName).toBe('Hotel B');
      expect(result[1].hotelName).toBe('Hotel C');
    });

    it('should return empty array when no hotels match ALL criteria', () => {
      const result = filterHotelsByAmenities(mockHotels, ['wifi', 'pool', 'spa'], 'all');
      expect(result).toHaveLength(0);
    });

    it('should handle hotels with no amenities', () => {
      const hotelsWithNoAmenities: SearchResultDTO[] = [
        {
          ...mockHotels[0],
          amenities: [],
        },
      ];
      const result = filterHotelsByAmenities(hotelsWithNoAmenities, ['wifi'], 'any');
      expect(result).toHaveLength(0);
    });

    it('should handle hotels with missing amenities property', () => {
      const hotelsWithoutAmenities = [
        {
          ...mockHotels[0],
          amenities: [],
        },
      ] as SearchResultDTO[];
      const result = filterHotelsByAmenities(hotelsWithoutAmenities, ['wifi'], 'any');
      expect(result).toHaveLength(0);
    });

    it('should handle amenities with whitespace in hotel data', () => {
      const hotelsWithWhitespace: SearchResultDTO[] = [
        {
          ...mockHotels[0],
          amenities: [
            { id: 1, name: '  WiFi  ', description: 'Free WiFi' },
          ],
        },
      ];
      const result = filterHotelsByAmenities(hotelsWithWhitespace, ['wifi'], 'any');
      expect(result).toHaveLength(1);
    });
  });
});
