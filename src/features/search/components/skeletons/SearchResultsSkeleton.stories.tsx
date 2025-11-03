import type { Meta, StoryObj } from '@storybook/react';
import SearchResultsSkeleton from './SearchResultsSkeleton';

const meta: Meta<typeof SearchResultsSkeleton> = {
  title: 'Features/Search/Skeletons/SearchResultsSkeleton',
  component: SearchResultsSkeleton,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Loading skeleton for the entire search results page. Displays multiple hotel card skeletons while search results are being fetched.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default search results loading skeleton showing 6 hotel cards
 */
export const Default: Story = {};

/**
 * Shows 3 hotel cards loading
 */
export const ThreeResults: Story = {
  args: {
    count: 3,
  },
};

/**
 * Shows 9 hotel cards loading
 */
export const NineResults: Story = {
  args: {
    count: 9,
  },
};
