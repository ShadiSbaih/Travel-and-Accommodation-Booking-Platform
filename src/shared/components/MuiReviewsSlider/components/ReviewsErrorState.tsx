import { Box, Typography, Button } from '@mui/material';
import { ErrorOutline, Refresh } from '@mui/icons-material';

interface ReviewsErrorStateProps {
  onRetry?: () => void;
  message?: string;
}

export function ReviewsErrorState({ 
  onRetry, 
  message = 'Unable to load reviews. Please try again.' 
}: ReviewsErrorStateProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        px: 3,
        textAlign: 'center',
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: 1,
        borderColor: 'error.light',
        borderStyle: 'dashed',
      }}
    >
      <ErrorOutline
        sx={{
          fontSize: 64,
          color: 'error.main',
          mb: 2,
        }}
      />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          color: 'text.primary',
          mb: 1,
        }}
      >
        Oops! Something went wrong
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          mb: 3,
          maxWidth: 360,
        }}
      >
        {message}
      </Typography>
      {onRetry && (
        <Button
          variant="outlined"
          color="error"
          startIcon={<Refresh />}
          onClick={onRetry}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          Try Again
        </Button>
      )}
    </Box>
  );
}
