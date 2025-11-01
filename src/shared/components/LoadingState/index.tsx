import { Box, CircularProgress, Typography } from '@mui/material';
import type { LoadingStateProps } from '@/shared/types/common.types';

function LoadingState({ message = 'Loading...', className = '' }: LoadingStateProps) {
  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 6, sm: 8, md: 12 },
        px: { xs: 2, sm: 3 },
        minHeight: '200px',
      }}
    >
      <CircularProgress
        sx={{
          mb: 3,
          color: 'primary.main',
        }}
      />
      <Typography
        variant="body1"
        sx={{
          color: 'text.secondary',
          fontSize: { xs: '0.875rem', sm: '1rem' },
        }}
      >
        {message}
      </Typography>
    </Box>
  );
}

export default LoadingState;