import { ErrorBoundary } from 'react-error-boundary';
import type { ErrorInfo } from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';
import type { ErrorFallbackProps, AppErrorBoundaryProps } from '@/shared/types/common.types';
import ErrorIcon from './ErrorIcon';
import ErrorDetails from './ErrorDetails';
import ErrorActions from './ErrorActions';

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <Box
      role="alert"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 4,
        px: 2,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative background */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 6,
              background: 'linear-gradient(90deg, #f44336 0%, #e91e63 100%)',
            }}
          />

          {/* Error Icon */}
          <ErrorIcon />

          {/* Error Title */}
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              mb: 2,
              color: 'text.primary',
            }}
          >
            Oops! Something Went Wrong
          </Typography>

          {/* Error Description */}
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 3, maxWidth: 500, mx: 'auto' }}
          >
            We're sorry for the inconvenience. An unexpected error occurred while processing
            your request. Please try refreshing the page or return to the home page.
          </Typography>

          {/* Error Details */}
          <ErrorDetails error={error} />

          {/* Action Buttons */}
          <ErrorActions onRetry={resetErrorBoundary} onGoHome={handleGoHome} />

          {/* Help Text */}
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              display: 'block',
              mt: 4,
              fontStyle: 'italic',
            }}
          >
            If this problem persists, please contact support or try again later.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

/**
 * Application-wide Error Boundary
 * Wraps the entire application to catch and handle React errors gracefully
 */
export function AppErrorBoundary({ children }: AppErrorBoundaryProps) {
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    // Log error to console in development
    console.error('Error caught by ErrorBoundary:', {
      error,
      errorInfo,
      timestamp: new Date().toISOString(),
    });

    // TODO: Send error to monitoring service (e.g., Sentry, LogRocket)
    // Example:
    // Sentry.captureException(error, {
    //   contexts: {
    //     react: {
    //       componentStack: errorInfo.componentStack,
    //     },
    //   },
    // });
  };

  const handleReset = () => {
    // Clear any potentially corrupted state
    try {
      // Clear session storage if needed
      sessionStorage.clear();
    } catch (error) {
      console.error('Failed to clear session storage:', error);
    }

    // Reload the page to reset the entire application state
    window.location.reload();
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={handleReset}
      onError={handleError}
      resetKeys={['user', 'location']} // Reset when these change
    >
      {children}
    </ErrorBoundary>
  );
}

export default AppErrorBoundary;