import { Button, Stack } from '@mui/material';
import { Home, Refresh } from '@mui/icons-material';

interface ErrorActionsProps {
  onRetry: () => void;
  onGoHome: () => void;
}

function ErrorActions({ onRetry, onGoHome }: ErrorActionsProps) {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={2}
      justifyContent="center"
      sx={{ mt: 4 }}
    >
      <Button
        variant="contained"
        color="primary"
        size="large"
        startIcon={<Refresh />}
        onClick={onRetry}
        sx={{
          px: 4,
          py: 1.5,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 2,
          '&:hover': {
            boxShadow: 4,
          },
        }}
      >
        Try Again
      </Button>
      <Button
        variant="outlined"
        color="inherit"
        size="large"
        startIcon={<Home />}
        onClick={onGoHome}
        sx={{
          px: 4,
          py: 1.5,
          textTransform: 'none',
          fontWeight: 600,
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
          },
        }}
      >
        Go to Home
      </Button>
    </Stack>
  );
}

export default ErrorActions;
