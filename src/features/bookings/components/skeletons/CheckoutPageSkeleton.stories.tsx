import type { Meta, StoryObj } from '@storybook/react';
import CheckoutPageSkeleton from './CheckoutPageSkeleton';

const meta: Meta<typeof CheckoutPageSkeleton> = {
  title: 'Features/Bookings/Skeletons/CheckoutPageSkeleton',
  component: CheckoutPageSkeleton,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Loading skeleton for the checkout page. Displays placeholder for booking form and order summary.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default checkout page loading skeleton
 */
export const Default: Story = {};
