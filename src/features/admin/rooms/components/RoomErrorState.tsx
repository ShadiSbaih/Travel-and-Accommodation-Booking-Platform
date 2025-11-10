import { Paper, Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';

interface RoomErrorStateProps {
  onRetry: () => void;
  error?: Error;
}

function RoomErrorState({ onRetry }: RoomErrorStateProps) {
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
        p: 6,
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: 3,
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(248, 113, 113, 0.1)'
              : 'rgba(239, 68, 68, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          mb: 3,
        }}
      >
        <ErrorOutlineIcon
          sx={{
            fontSize: 64,
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#f87171' : 'error.main',
          }}
        />
      </Box>

      <Typography
        variant="h5"
        fontWeight="700"
        gutterBottom
        sx={{
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
          mb: 1,
        }}
      >
        Failed to Load Rooms
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
          mb: 4,
          maxWidth: 400,
          mx: 'auto',
        }}
      >
        Something went wrong while fetching the rooms. Please try again.
      </Typography>

      <Button
        variant="contained"
        startIcon={<RefreshIcon />}
        onClick={onRetry}
        sx={{
          textTransform: 'none',
          borderRadius: 1.5,
          px: 4,
          py: 1.5,
          fontWeight: 600,
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#0891b2' : '#14b8a6',
          color: 'white',
          '&:hover': {
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? '#0e7490' : '#0d9488',
          },
        }}
      >
        Retry
      </Button>
    </Paper>
  );
}

export default RoomErrorState;
