import type { Meta, StoryObj } from '@storybook/react';
import FeaturedDealCard from './FeaturedDealCard';
import type { FeaturedDealDto } from '../types';

const meta = {
  title: 'Features/Home/FeaturedDealCard',
  component: FeaturedDealCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A card displaying featured hotel deals with discount badge, pricing, rating, and location. Shows original price, discount percentage, and final price. Includes a "View Deal" button.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    deal: {
      control: 'object',
      description: 'Featured deal data including pricing, discount, and hotel information',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '380px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FeaturedDealCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockDeal: FeaturedDealDto = {
  hotelId: 1,
  originalRoomPrice: 300,
  discount: 30,
  finalPrice: 210,
  cityName: 'Paris',
  hotelName: 'Grand Plaza Hotel',
  hotelStarRating: 5,
  title: 'Luxury Suite with Eiffel Tower View',
  description: 'Enjoy breathtaking views of the Eiffel Tower from your spacious suite with premium amenities',
  roomPhotoUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop',
};

/**
 * Default featured deal with 30% discount
 */
export const Default: Story = {
  args: {
    deal: mockDeal,
  },
};

/**
 * High discount (50% off)
 */
export const HighDiscount: Story = {
  args: {
    deal: {
      hotelId: 2,
      originalRoomPrice: 500,
      discount: 50,
      finalPrice: 250,
      cityName: 'Dubai',
      hotelName: 'Burj Al Arab',
      hotelStarRating: 5,
      title: 'Presidential Suite - Limited Offer',
      description: 'Experience ultimate luxury in our most exclusive suite with panoramic city views',
      roomPhotoUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop',
    },
  },
};

/**
 * Small discount (10% off)
 */
export const SmallDiscount: Story = {
  args: {
    deal: {
      hotelId: 3,
      originalRoomPrice: 150,
      discount: 10,
      finalPrice: 135,
      cityName: 'Barcelona',
      hotelName: 'Boutique Hotel Central',
      hotelStarRating: 4,
      title: 'Deluxe Room Special',
      description: 'Comfortable room in the heart of Barcelona with easy access to major attractions',
      roomPhotoUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop',
    },
  },
};

/**
 * Budget deal (3-star hotel)
 */
export const BudgetDeal: Story = {
  args: {
    deal: {
      hotelId: 4,
      originalRoomPrice: 100,
      discount: 25,
      finalPrice: 75,
      cityName: 'Los Angeles',
      hotelName: 'Comfort Inn Downtown',
      hotelStarRating: 3,
      title: 'Standard Double Room',
      description: 'Clean and comfortable room perfect for budget travelers exploring the city',
      roomPhotoUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop',
    },
  },
};

/**
 * Luxury deal (5-star hotel)
 */
export const LuxuryDeal: Story = {
  args: {
    deal: {
      hotelId: 5,
      originalRoomPrice: 800,
      discount: 40,
      finalPrice: 480,
      cityName: 'New York',
      hotelName: 'The Plaza Hotel',
      hotelStarRating: 5,
      title: 'Grand Suite with Central Park View',
      description: 'Iconic luxury suite overlooking Central Park with world-class service and amenities',
      roomPhotoUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop',
    },
  },
};

/**
 * Weekend getaway deal
 */
export const WeekendGetaway: Story = {
  args: {
    deal: {
      hotelId: 6,
      originalRoomPrice: 250,
      discount: 35,
      finalPrice: 162.5,
      cityName: 'Miami',
      hotelName: 'Oceanview Resort',
      hotelStarRating: 4,
      title: 'Ocean View Room - Weekend Special',
      description: 'Relax in a beautiful room with stunning ocean views, perfect for a weekend escape',
      roomPhotoUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop',
    },
  },
};

/**
 * Long title and description
 */
export const LongContent: Story = {
  args: {
    deal: {
      hotelId: 7,
      originalRoomPrice: 450,
      discount: 20,
      finalPrice: 360,
      cityName: 'Tokyo',
      hotelName: 'Imperial Palace Hotel & Resort',
      hotelStarRating: 5,
      title: 'Executive Suite with Premium Amenities and City Skyline View',
      description: 'Experience the height of luxury in our spacious executive suite featuring modern Japanese design, premium amenities, a stunning city skyline view, complimentary breakfast, and exclusive access to our executive lounge',
      roomPhotoUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop',
    },
  },
};

/**
 * No discount scenario
 */
export const NoDiscount: Story = {
  args: {
    deal: {
      hotelId: 8,
      originalRoomPrice: 200,
      discount: 0,
      finalPrice: 200,
      cityName: 'London',
      hotelName: 'Kensington Hotel',
      hotelStarRating: 4,
      title: 'Superior Room',
      description: 'Elegant room in central London with classic British decor',
      roomPhotoUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&auto=format&fit=crop',
    },
  },
};

/**
 * With fallback image
 */
export const WithFallbackImage: Story = {
  args: {
    deal: {
      hotelId: 9,
      originalRoomPrice: 180,
      discount: 15,
      finalPrice: 153,
      cityName: 'Rome',
      hotelName: 'Vatican View Hotel',
      hotelStarRating: 4,
      title: 'Classic Room near Vatican',
      description: 'Charming room with traditional Italian styling, close to major attractions',
      roomPhotoUrl: 'https://invalid-url-to-trigger-fallback.jpg',
    },
  },
};
