import type { Meta, StoryObj } from '@storybook/react';
import { Box, Container } from '@mui/material';
import ErrorState from '@/shared/components/ErrorState';
import { ErrorOutline as ErrorIcon } from '@mui/icons-material';

const meta: Meta = {
  title: 'Features/Hotels/HotelDetails/Error States',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', display: 'flex', alignItems: 'center' }}>
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <ErrorState
          title="Unable to Load Hotel Details"
          message="We couldn't find the hotel you're looking for or there was an error loading the details."
          variant="error"
          icon={<ErrorIcon sx={{ fontSize: '3rem', color: 'error.main' }} />}
          showRetry
          onRetry={() => console.log('Retry clicked')}
          action={{
            label: 'Back to Search',
            onClick: () => console.log('Navigate to search'),
          }}
        />
      </Container>
    </Box>
  ),
};
