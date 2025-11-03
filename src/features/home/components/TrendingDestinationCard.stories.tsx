import type { Meta, StoryObj } from '@storybook/react';
import TrendingDestinationCard from './TrendingDestinationCard';
import type { TrendingDestinationDto } from '../types';

const meta: Meta<typeof TrendingDestinationCard> = {
  title: 'Features/Home/TrendingDestinationCard',
  component: TrendingDestinationCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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

const mockDestination: TrendingDestinationDto = {
  cityId: 1,
  cityName: 'Paris',
  countryName: 'France',
  description: 'Experience the magic of the City of Light with its iconic landmarks, world-class cuisine, and romantic atmosphere',
  thumbnailUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
};

export const Default: Story = {
  args: {
    destination: mockDestination,
  },
};
