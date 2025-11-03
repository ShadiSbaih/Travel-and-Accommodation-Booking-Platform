import type { Meta, StoryObj } from '@storybook/react';
import RecentlyVisitedCard from './RecentlyVisitedCard';
import type { RecentlyVisitedHotelDto } from '../types';

const meta: Meta<typeof RecentlyVisitedCard> = {
  title: 'Features/Home/RecentlyVisitedCard',
  component: RecentlyVisitedCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A card displaying recently visited hotels with image, name, rating, location, price range, and visit date. Navigates to hotel details when clicked.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    hotel: {
      control: 'object',
      description: 'Recently visited hotel data including name, rating, and pricing',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '380px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockHotel: RecentlyVisitedHotelDto = {
  hotelId: 1,
  hotelName: 'Grand Plaza Hotel',
  starRating: 5,
  visitDate: '2025-10-15T10:30:00Z',
  cityName: 'Paris',
  thumbnailUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&auto=format&fit=crop',
  priceLowerBound: 150,
  priceUpperBound: 450,
};

/**
 * Default recently visited hotel card
 */
export const Default: Story = {
  args: {
    hotel: mockHotel,
  },
};

/**
 * Luxury 5-star hotel
 */
export const LuxuryHotel: Story = {
  args: {
    hotel: {
      hotelId: 2,
      hotelName: 'The Ritz Carlton',
      starRating: 5,
      visitDate: '2025-10-28T14:20:00Z',
      cityName: 'New York',
      thumbnailUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop',
      priceLowerBound: 400,
      priceUpperBound: 1200,
    },
  },
};

/**
 * Budget-friendly 3-star hotel
 */
export const BudgetHotel: Story = {
  args: {
    hotel: {
      hotelId: 3,
      hotelName: 'Comfort Inn Downtown',
      starRating: 3,
      visitDate: '2025-10-20T09:15:00Z',
      cityName: 'Los Angeles',
      thumbnailUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&auto=format&fit=crop',
      priceLowerBound: 80,
      priceUpperBound: 150,
    },
  },
};

/**
 * Mid-range 4-star hotel
 */
export const MidRangeHotel: Story = {
  args: {
    hotel: {
      hotelId: 4,
      hotelName: 'Marriott City Center',
      starRating: 4,
      visitDate: '2025-10-25T16:45:00Z',
      cityName: 'Tokyo',
      thumbnailUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop',
      priceLowerBound: 200,
      priceUpperBound: 500,
    },
  },
};

/**
 * Recently visited (today)
 */
export const VisitedToday: Story = {
  args: {
    hotel: {
      hotelId: 5,
      hotelName: 'Seaside Resort & Spa',
      starRating: 4,
      visitDate: new Date().toISOString(),
      cityName: 'Miami',
      thumbnailUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop',
      priceLowerBound: 180,
      priceUpperBound: 400,
    },
  },
};

/**
 * Long hotel name
 */
export const LongName: Story = {
  args: {
    hotel: {
      hotelId: 6,
      hotelName: 'The Grand Imperial Palace Hotel & Resort Spa',
      starRating: 5,
      visitDate: '2025-10-10T11:00:00Z',
      cityName: 'Dubai',
      thumbnailUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop',
      priceLowerBound: 300,
      priceUpperBound: 900,
    },
  },
};

/**
 * Wide price range
 */
export const WidePriceRange: Story = {
  args: {
    hotel: {
      hotelId: 7,
      hotelName: 'Resort Paradise',
      starRating: 4,
      visitDate: '2025-09-15T13:30:00Z',
      cityName: 'Bali',
      thumbnailUrl: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&auto=format&fit=crop',
      priceLowerBound: 50,
      priceUpperBound: 800,
    },
  },
};

/**
 * With fallback image
 */
export const WithFallbackImage: Story = {
  args: {
    hotel: {
      hotelId: 8,
      hotelName: 'Boutique Hotel Central',
      starRating: 4,
      visitDate: '2025-10-05T10:00:00Z',
      cityName: 'Barcelona',
      thumbnailUrl: 'https://invalid-url-to-trigger-fallback.jpg',
      priceLowerBound: 120,
      priceUpperBound: 280,
    },
  },
};
