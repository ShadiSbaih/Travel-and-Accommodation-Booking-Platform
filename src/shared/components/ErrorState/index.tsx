import { Box, Typography, Button } from '@mui/material';
import {
  ErrorOutline as ErrorIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import type { ErrorStateProps } from '@/shared/types/common.types';

function ErrorState({
  title,
  message = 'An error occurred. Please try again.',
  className = '',
  variant = 'error',
  icon,
  action,
  showRetry = false,
  onRetry,
}: ErrorStateProps) {
  const variantConfig = {
    error: {
      icon: <ErrorIcon sx={{ fontSize: '3rem', color: 'error.main' }} />,
      color: 'error.main',
      bgColor: 'error.lighter',
    },
    warning: {
      icon: <WarningIcon sx={{ fontSize: '3rem', color: 'warning.main' }} />,
      color: 'warning.main',
      bgColor: 'warning.lighter',
    },
    info: {
      icon: <InfoIcon sx={{ fontSize: '3rem', color: 'info.main' }} />,
      color: 'info.main',
      bgColor: 'info.lighter',
    },
  };

  const config = variantConfig[variant];
  const displayIcon = icon || config.icon;

  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: { xs: 6, sm: 8, md: 12 },
        px: { xs: 2, sm: 3 },
        minHeight: '200px',
      }}
    >
      <Box sx={{ mb: 3 }}>{displayIcon}</Box>

      {title && (
        <Typography
          variant="h5"
          sx={{
            mb: 1,
            fontWeight: 600,
            color: 'text.primary',
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
          }}
        >
          {title}
        </Typography>
      )}

      <Typography
        variant="body1"
        sx={{
          color: 'text.secondary',
          maxWidth: '600px',
          mb: action || showRetry ? 3 : 0,
          fontSize: { xs: '0.875rem', sm: '1rem' },
        }}
      >
        {message}
      </Typography>

      {(action || showRetry) && (
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
          {showRetry && onRetry && (
            <Button
              variant="outlined"
              color={variant}
              startIcon={<RefreshIcon />}
              onClick={onRetry}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                px: 3,
              }}
            >
              Try Again
            </Button>
          )}
          {action && (
            <Button
              variant="contained"
              color={variant}
              onClick={action.onClick}
              sx={{
                textTransform: 'none',
                fontWeight: 500,
                px: 3,
              }}
            >
              {action.label}
            </Button>
          )}
        </Box>
      )}
    </Box>
  );
}

export default ErrorState;