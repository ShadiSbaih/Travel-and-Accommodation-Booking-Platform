import type { Meta, StoryObj } from '@storybook/react';
import TrendingDestinationCard from './TrendingDestinationCard';
import type { TrendingDestinationDto } from '../types';

const meta = {
  title: 'Features/Home/TrendingDestinationCard',
  component: TrendingDestinationCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A card displaying trending travel destinations with city image, name, and description. Navigates to search results when clicked.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    destination: {
      control: 'object',
      description: 'Trending destination data including city info and thumbnail',
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '380px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TrendingDestinationCard>;

export default meta;
type Story = StoryObj<typeof meta>;

const mockDestination: TrendingDestinationDto = {
  cityId: 1,
  cityName: 'Paris',
  countryName: 'France',
  description: 'Experience the magic of the City of Light with its iconic landmarks, world-class cuisine, and romantic atmosphere',
  thumbnailUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop',
};

/**
 * Default trending destination card showing Paris
 */
export const Default: Story = {
  args: {
    destination: mockDestination,
  },
};

/**
 * Tokyo destination
 */
export const Tokyo: Story = {
  args: {
    destination: {
      cityId: 2,
      cityName: 'Tokyo',
      countryName: 'Japan',
      description: 'Discover the perfect blend of ancient tradition and modern innovation in Japan\'s vibrant capital city',
      thumbnailUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&auto=format&fit=crop',
    },
  },
};

/**
 * New York destination
 */
export const NewYork: Story = {
  args: {
    destination: {
      cityId: 3,
      cityName: 'New York',
      countryName: 'United States',
      description: 'The city that never sleeps offers endless entertainment, iconic landmarks, and diverse cultural experiences',
      thumbnailUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&auto=format&fit=crop',
    },
  },
};

/**
 * Dubai destination
 */
export const Dubai: Story = {
  args: {
    destination: {
      cityId: 4,
      cityName: 'Dubai',
      countryName: 'United Arab Emirates',
      description: 'Experience luxury and innovation in this desert metropolis with stunning architecture and world-class shopping',
      thumbnailUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&auto=format&fit=crop',
    },
  },
};

/**
 * Long destination name and description
 */
export const LongContent: Story = {
  args: {
    destination: {
      cityId: 5,
      cityName: 'Saint Petersburg',
      countryName: 'Russia',
      description: 'Explore the former Russian capital with its magnificent palaces, beautiful canals, world-renowned museums like the Hermitage, and stunning architecture that reflects centuries of imperial grandeur and cultural excellence',
      thumbnailUrl: 'https://images.unsplash.com/photo-1555481980-09cf0c0a4c9d?w=800&auto=format&fit=crop',
    },
  },
};

/**
 * Fallback image scenario (broken image URL)
 */
export const WithFallbackImage: Story = {
  args: {
    destination: {
      cityId: 6,
      cityName: 'Barcelona',
      countryName: 'Spain',
      description: 'Stunning Mediterranean city known for Gaudí\'s architecture, beautiful beaches, and vibrant culture',
      thumbnailUrl: 'https://invalid-url-to-trigger-fallback.jpg',
    },
  },
};
