import { Paper, Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HotelIcon from '@mui/icons-material/Hotel';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import type { EmptyHotelsStateProps } from '../types/component.types';

function EmptyHotelsState({ hasSearchQuery, onAddHotel }: EmptyHotelsStateProps) {
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
              ? 'rgba(6, 182, 212, 0.1)'
              : 'rgba(20, 184, 166, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          mb: 3,
        }}
      >
        {hasSearchQuery ? (
          <SearchOffIcon
            sx={{
              fontSize: 64,
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#22d3ee' : '#14b8a6',
            }}
          />
        ) : (
          <HotelIcon
            sx={{
              fontSize: 64,
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#22d3ee' : '#14b8a6',
            }}
          />
        )}
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
        {hasSearchQuery ? 'No Hotels Found' : 'No Hotels Yet'}
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
        {hasSearchQuery
          ? 'Try adjusting your search criteria to find what you\'re looking for.'
          : 'Get started by adding your first hotel to the system.'}
      </Typography>

      {!hasSearchQuery && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddHotel}
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
          Add Your First Hotel
        </Button>
      )}
    </Paper>
  );
}

export default EmptyHotelsState;
