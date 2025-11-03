import type { Meta, StoryObj } from '@storybook/react';
import CityListView from './CityListView';
import type { City } from '../types';

const meta: Meta<typeof CityListView> = {
  title: 'Features/Admin/Cities/CityListView',
  component: CityListView,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockCities: City[] = [
  {
    id: 1,
    name: 'Paris',
    description: 'The City of Light, known for its art, fashion, and culture',
    thumbnailUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-11-01T14:30:00Z',
  },
  {
    id: 2,
    name: 'Tokyo',
    description: 'A vibrant metropolis blending tradition and modernity',
    thumbnailUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800',
    createdAt: '2024-01-16T10:00:00Z',
    updatedAt: '2024-11-01T14:30:00Z',
  },
  {
    id: 3,
    name: 'New York',
    description: 'The city that never sleeps, center of culture and commerce',
    thumbnailUrl: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800',
    createdAt: '2024-01-17T10:00:00Z',
    updatedAt: '2024-11-01T14:30:00Z',
  },
  {
    id: 4,
    name: 'Dubai',
    description: 'A modern oasis of luxury and innovation',
    thumbnailUrl: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800',
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-11-01T14:30:00Z',
  },
];

export const Default: Story = {
  args: {
    cities: mockCities,
  },
};
