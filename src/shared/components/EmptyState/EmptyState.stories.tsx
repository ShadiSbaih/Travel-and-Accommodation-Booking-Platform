import type { Meta, StoryObj } from '@storybook/react';
import EmptyState from './index';
import {
  ErrorOutline as ErrorIcon,
  FilterListOff as FilterIcon,
  ShoppingCartOutlined,
  HistoryOutlined as HistoryIcon,
  LocalOfferOutlined as OfferIcon,
  TrendingUpOutlined as TrendingIcon,
} from '@mui/icons-material';

/**
 * EmptyState component displays a message when there's no content to show.
 * Used throughout the app for empty search results, empty cart, no history, etc.
 */
const meta = {
  title: 'Shared/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile empty state component that displays a message with an optional icon and action button when there is no content to display. Used in search results, cart, hotel history, featured deals, and trending destinations.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'The main heading text',
      table: {
        type: { summary: 'string' },
      },
    },
    subtitle: {
      control: 'text',
      description: 'Optional descriptive text below the title',
      table: {
        type: { summary: 'string' },
      },
    },
    icon: {
      control: false,
      description: 'Optional custom icon (ReactNode)',
      table: {
        type: { summary: 'ReactNode' },
      },
    },
    action: {
      control: false,
      description: 'Optional action button with label and onClick handler',
      table: {
        type: { summary: '{ label: string; onClick: () => void; }' },
      },
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: '600px', minHeight: '400px' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default empty state with just a title
 */
export const Default: Story = {
  args: {
    title: 'No items found',
  },
};

/**
 * No hotels found in search (from SearchResultsSection)
 */
export const NoHotelsFound: Story = {
  args: {
    title: 'No hotels found for your search',
    subtitle: 'Try adjusting your search criteria or dates',
    icon: <ErrorIcon sx={{ fontSize: '3rem', color: 'text.secondary' }} />,
  },
};

/**
 * No hotels match filters (from SearchResultsSection)
 */
export const NoFilterMatches: Story = {
  args: {
    title: 'No hotels match your selected filters',
    subtitle: 'Try removing some filters to see more results',
    icon: <FilterIcon sx={{ fontSize: '3rem', color: 'text.secondary' }} />,
  },
};

/**
 * Empty cart (from EmptyCartState)
 */
export const EmptyCart: Story = {
  args: {
    title: 'Your cart is empty',
    subtitle: 'Browse hotels and add rooms to get started',
    icon: <ShoppingCartOutlined sx={{ fontSize: 80 }} />,
  },
};

/**
 * Sign in to see history (from RecentlyVisitedHotels)
 */
export const SignInForHistory: Story = {
  args: {
    title: 'Sign in to see your hotel history',
    subtitle: 'Log in to view hotels you\'ve recently explored',
    icon: <HistoryIcon sx={{ fontSize: '3rem', color: 'text.secondary' }} />,
  },
};

/**
 * No featured deals (from FeaturedDeals)
 */
export const NoFeaturedDeals: Story = {
  args: {
    title: 'No featured deals available',
    subtitle: 'Check back later for exciting offers',
    icon: <OfferIcon sx={{ fontSize: '3rem', color: 'text.secondary' }} />,
  },
};

/**
 * No trending destinations (from TrendingDestinations)
 */
export const NoTrendingDestinations: Story = {
  args: {
    title: 'No trending destinations available',
    subtitle: 'Explore our search to find your perfect destination',
    icon: <TrendingIcon sx={{ fontSize: '3rem', color: 'text.secondary' }} />,
  },
};
