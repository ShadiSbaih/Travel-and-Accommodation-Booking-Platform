import { Box, Typography, Chip } from '@mui/material';
import { LocationOn, Star } from '@mui/icons-material';
import type { HotelHeaderProps } from '../../types';



function HotelHeader({ hotelName, location, starRating, hotelType }: HotelHeaderProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 700,
          fontSize: { xs: '2rem', md: '2.5rem', lg: '3rem' },
          background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          mb: 1
        }}
      >
        {hotelName}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
        {location && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <LocationOn sx={{ fontSize: 20, color: 'error.main' }} />
            <Typography variant="body1" color="text.secondary" sx={{ fontWeight: 500 }}>
              {location}
            </Typography>
          </Box>
        )}

        {starRating && (
          <Chip
            icon={<Star sx={{ fontSize: 18 }} />}
            label={`${starRating} Star Hotel`}
            sx={{
              bgcolor: 'warning.main',
              color: 'white',
              fontWeight: 600,
              '& .MuiChip-icon': { color: 'white' }
            }}
          />
        )}

        {hotelType && (
          <Chip
            label={hotelType}
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              fontWeight: 600
            }}
          />
        )}
      </Box>
    </Box>
  );
}

export default HotelHeader;
