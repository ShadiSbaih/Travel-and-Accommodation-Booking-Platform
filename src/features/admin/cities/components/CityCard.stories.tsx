import type { Meta, StoryObj } from '@storybook/react';
import CityCard from './CityCard';
import type { City } from '../types';

const meta: Meta<typeof CityCard> = {
  title: 'Features/Admin/Cities/CityCard',
  component: CityCard,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: '600px', padding: '20px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockCity: City = {
  id: 1,
  name: 'Paris',
  description: 'The City of Light, known for its art, fashion, gastronomy, and culture. Home to iconic landmarks like the Eiffel Tower and the Louvre Museum.',
  thumbnailUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&auto=format&fit=crop',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-11-01T14:30:00Z',
};

export const Default: Story = {
  args: {
    city: mockCity,
  },
};
