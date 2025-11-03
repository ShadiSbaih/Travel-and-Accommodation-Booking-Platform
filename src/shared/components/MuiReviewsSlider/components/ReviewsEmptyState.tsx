import { Box, Typography } from '@mui/material';
import { RateReview } from '@mui/icons-material';

interface ReviewsEmptyStateProps {
  message?: string;
  compact?: boolean;
}

export function ReviewsEmptyState({ 
  message = 'No reviews yet. Be the first to share your experience!',
  compact = false,
}: ReviewsEmptyStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: compact ? 4 : 6,
        px: 3,
        textAlign: 'center',
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: 1,
        borderColor: 'divider',
        borderStyle: 'dashed',
      }}
    >
      <RateReview
        sx={{
          fontSize: compact ? 48 : 64,
          color: 'text.disabled',
          mb: 2,
        }}
      />
      <Typography
        variant={compact ? 'subtitle1' : 'h6'}
        sx={{
          fontWeight: 600,
          color: 'text.primary',
          mb: 1,
        }}
      >
        No Reviews Available
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          maxWidth: 360,
          fontSize: compact ? '0.875rem' : '0.9375rem',
        }}
      >
        {message}
      </Typography>
    </Box>
  );
}
