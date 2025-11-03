import type { Meta, StoryObj } from '@storybook/react';
import ConfirmationPageSkeleton from './ConfirmationPageSkeleton';

const meta: Meta<typeof ConfirmationPageSkeleton> = {
  title: 'Features/Bookings/Skeletons/ConfirmationPageSkeleton',
  component: ConfirmationPageSkeleton,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Loading skeleton for the booking confirmation page. Displays placeholder for booking receipt and confirmation details.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default confirmation page loading skeleton
 */
export const Default: Story = {};
