import { Box, Typography, Button, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';

interface CityErrorStateProps {
  onRetry?: () => void;
  message?: string;
}

function CityErrorState({ onRetry, message }: CityErrorStateProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(30, 41, 59, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: 2,
        p: 8,
        textAlign: 'center',
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 8px 32px rgba(0, 0, 0, 0.5)'
            : '0 8px 32px rgba(0, 0, 0, 0.1)',
        border: (theme) =>
          theme.palette.mode === 'dark'
            ? '1px solid rgba(148, 163, 184, 0.1)'
            : 'none',
      }}
    >
      <Box
        sx={{
          width: 80,
          height: 80,
          borderRadius: 2,
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(239, 68, 68, 0.1)'
              : 'rgba(239, 68, 68, 0.05)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          mb: 3,
        }}
      >
        <ErrorOutlineIcon
          sx={{
            fontSize: 48,
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#ef4444' : '#dc2626',
          }}
        />
      </Box>

      <Typography
        variant="h5"
        fontWeight="600"
        sx={{
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
          mb: 1,
        }}
      >
        Oops! Something went wrong
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
          mb: 4,
          maxWidth: 500,
          mx: 'auto',
        }}
      >
        {message || 'Unable to load cities. Please check your connection and try again.'}
      </Typography>

      {onRetry && (
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={onRetry}
          sx={{
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)'
                : 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
            textTransform: 'none',
            borderRadius: 1.5,
            px: 4,
            py: 1.2,
            fontWeight: 600,
            '&:hover': {
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #0e7490 0%, #0891b2 100%)'
                  : 'linear-gradient(135deg, #0d9488 0%, #0891b2 100%)',
            },
          }}
        >
          Try Again
        </Button>
      )}
    </Paper>
  );
}

export default CityErrorState;
