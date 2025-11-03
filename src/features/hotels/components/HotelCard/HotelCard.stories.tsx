import type { Meta, StoryObj } from '@storybook/react';
import HotelCard from './index';
import type { SearchResultDTO } from '../../types';

const meta: Meta<typeof HotelCard> = {
  title: 'Features/Hotels/HotelCard',
  component: HotelCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Search results hotel card displaying hotel information, booking details, amenities, pricing, and a "View Details" button. Used in search results pages.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    hotel: {
      control: 'object',
      description: 'Hotel search result data including room info, pricing, and booking details',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockHotel: SearchResultDTO = {
  hotelId: 1,
  hotelName: 'Grand Plaza Hotel',
  starRating: 5,
  latitude: 48.8566,
  longitude: 2.3522,
  roomPrice: 250,
  roomType: 'Deluxe Suite',
  cityName: 'Paris',
  roomPhotoUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop',
  discount: 20,
  amenities: [
    { id: 1, name: 'Free WiFi', description: 'High-speed internet access' },
    { id: 2, name: 'Swimming Pool', description: 'Outdoor heated pool' },
    { id: 3, name: 'Gym', description: '24/7 fitness center' },
    { id: 4, name: 'Spa', description: 'Full-service spa' },
  ],
  numberOfChildren: 1,
  numberOfAdults: 2,
  numberOfRooms: 1,
  checkInDate: '2025-11-15',
  checkOutDate: '2025-11-18',
};

/**
 * Default hotel card with standard booking
 */
export const Default: Story = {
  args: {
    hotel: mockHotel,
  },
};

/**
 * Luxury 5-star hotel with high discount
 */
export const LuxuryWithDiscount: Story = {
  args: {
    hotel: {
      ...mockHotel,
      hotelId: 2,
      hotelName: 'The Ritz Carlton',
      roomPrice: 500,
      discount: 40,
      cityName: 'Dubai',
      roomType: 'Presidential Suite',
      starRating: 5,
      roomPhotoUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop',
      amenities: [
        { id: 1, name: 'Free WiFi', description: 'High-speed internet access' },
        { id: 2, name: 'Infinity Pool', description: 'Rooftop infinity pool' },
        { id: 3, name: 'Private Beach', description: 'Exclusive beach access' },
        { id: 4, name: 'Butler Service', description: '24/7 personal butler' },
        { id: 5, name: 'Spa & Wellness', description: 'Full-service spa & wellness center' },
      ],
    },
  },
};

/**
 * Budget 3-star hotel with no discount
 */
export const BudgetHotel: Story = {
  args: {
    hotel: {
      ...mockHotel,
      hotelId: 3,
      hotelName: 'Comfort Inn',
      roomPrice: 80,
      discount: 0,
      cityName: 'Los Angeles',
      roomType: 'Standard Room',
      starRating: 3,
      roomPhotoUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop',
      amenities: [
        { id: 1, name: 'Free WiFi', description: 'Complimentary WiFi' },
        { id: 2, name: 'Parking', description: 'Free parking' },
      ],
      numberOfAdults: 1,
      numberOfChildren: 0,
    },
  },
};

/**
 * Family booking with multiple rooms and children
 */
export const FamilyBooking: Story = {
  args: {
    hotel: {
      ...mockHotel,
      hotelId: 4,
      hotelName: 'Family Resort & Spa',
      roomPrice: 180,
      discount: 15,
      cityName: 'Orlando',
      roomType: 'Family Suite',
      starRating: 4,
      roomPhotoUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop',
      numberOfAdults: 2,
      numberOfChildren: 3,
      numberOfRooms: 2,
      amenities: [
        { id: 1, name: 'Kids Club', description: 'Supervised kids activities' },
        { id: 2, name: 'Water Park', description: 'On-site water park' },
        { id: 3, name: 'Game Room', description: 'Arcade & games' },
        { id: 4, name: 'Family Pool', description: 'Kids-friendly pool' },
      ],
    },
  },
};

/**
 * Long stay booking (extended dates)
 */
export const LongStay: Story = {
  args: {
    hotel: {
      ...mockHotel,
      hotelId: 5,
      hotelName: 'Extended Stay Suites',
      roomPrice: 120,
      discount: 25,
      cityName: 'New York',
      roomType: 'Studio Apartment',
      starRating: 4,
      checkInDate: '2025-11-15',
      checkOutDate: '2025-12-15',
      roomPhotoUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop',
      numberOfAdults: 2,
      numberOfChildren: 0,
      numberOfRooms: 1,
      amenities: [
        { id: 1, name: 'Kitchenette', description: 'In-room kitchenette' },
        { id: 2, name: 'Free WiFi', description: 'High-speed internet' },
        { id: 3, name: 'Laundry', description: 'On-site laundry' },
        { id: 4, name: 'Workspace', description: 'Dedicated work area' },
      ],
    },
  },
};

/**
 * Romantic getaway (2 adults, short stay)
 */
export const RomanticGetaway: Story = {
  args: {
    hotel: {
      ...mockHotel,
      hotelId: 6,
      hotelName: 'Boutique Romance Hotel',
      roomPrice: 300,
      discount: 30,
      cityName: 'Venice',
      roomType: 'Honeymoon Suite',
      starRating: 5,
      checkInDate: '2025-11-20',
      checkOutDate: '2025-11-22',
      roomPhotoUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop',
      numberOfAdults: 2,
      numberOfChildren: 0,
      numberOfRooms: 1,
      amenities: [
        { id: 1, name: 'Jacuzzi', description: 'Private jacuzzi' },
        { id: 2, name: 'Champagne', description: 'Complimentary champagne' },
        { id: 3, name: 'Canal View', description: 'Scenic canal views' },
        { id: 4, name: 'Room Service', description: '24/7 room service' },
      ],
    },
  },
};

/**
 * Business traveler (single adult, weekday)
 */
export const BusinessTravel: Story = {
  args: {
    hotel: {
      ...mockHotel,
      hotelId: 7,
      hotelName: 'Business Tower Hotel',
      roomPrice: 150,
      discount: 10,
      cityName: 'Singapore',
      roomType: 'Executive Room',
      starRating: 4,
      checkInDate: '2025-11-18',
      checkOutDate: '2025-11-20',
      roomPhotoUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop',
      numberOfAdults: 1,
      numberOfChildren: 0,
      numberOfRooms: 1,
      amenities: [
        { id: 1, name: 'Free WiFi', description: 'High-speed internet' },
        { id: 2, name: 'Workspace', description: 'Executive workspace' },
        { id: 3, name: 'Meeting Rooms', description: 'Business meeting facilities' },
        { id: 4, name: 'Business Lounge', description: 'Executive lounge access' },
      ],
    },
  },
};

/**
 * Many amenities (testing overflow)
 */
export const ManyAmenities: Story = {
  args: {
    hotel: {
      ...mockHotel,
      hotelId: 8,
      hotelName: 'All-Inclusive Resort',
      roomPrice: 400,
      discount: 35,
      cityName: 'Cancun',
      roomType: 'Ocean View Suite',
      starRating: 5,
      roomPhotoUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&auto=format&fit=crop',
      amenities: [
        { id: 1, name: 'Free WiFi', description: 'High-speed internet' },
        { id: 2, name: 'All-Inclusive', description: 'All meals & drinks included' },
        { id: 3, name: 'Beach Access', description: 'Private beach' },
        { id: 4, name: 'Multiple Pools', description: '5 swimming pools' },
        { id: 5, name: 'Spa', description: 'Full-service spa' },
        { id: 6, name: 'Gym', description: 'State-of-the-art gym' },
        { id: 7, name: 'Water Sports', description: 'Complimentary water sports' },
        { id: 8, name: 'Kids Club', description: 'Supervised kids activities' },
      ],
    },
  },
};
