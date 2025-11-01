import { Paper, Box, Typography, Chip } from '@mui/material';
import { LocationOn, Star } from '@mui/icons-material';
import type { HotelInfoBannerProps } from '../../types';



function HotelInfoBanner({ location, starRating, hotelType, description }: HotelInfoBannerProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
        mb: 3,
        bgcolor: 'background.paper',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* Location */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 2 }}>
        <LocationOn sx={{ fontSize: 20, color: 'error.main', mt: 0.25 }} />
        <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '1rem', lineHeight: 1.5 }}>
          {location}
        </Typography>
      </Box>

      {/* Star Rating and Hotel Type */}
      <Box sx={{ display: 'flex', gap: 1.25, mb: 3, flexWrap: 'wrap' }}>
        {starRating && (
          <Chip
            icon={<Star sx={{ fontSize: 16 }} />}
            label={`${starRating} Star Hotel`}
            size="medium"
            sx={{
              bgcolor: 'warning.main',
              color: 'white',
              fontWeight: 700,
              height: 32,
              fontSize: '0.875rem',
              px: 0.5,
              borderRadius: 0.5,
              '& .MuiChip-icon': { 
                color: 'white',
                ml: 0.5
              },
              boxShadow: '0 2px 4px rgba(237, 108, 2, 0.3)',
            }}
          />
        )}

        {hotelType && (
          <Chip
            label={hotelType}
            size="medium"
            sx={{
              bgcolor: 'info.main',
              color: 'white',
              fontWeight: 700,
              height: 32,
              fontSize: '0.875rem',
              px: 1,
              borderRadius: 0.5,
              boxShadow: '0 2px 4px rgba(25, 118, 210, 0.3)',
            }}
          />
        )}
      </Box>

      {/* About This Property */}
      <Box>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 700,
            mb: 1.5,
            fontSize: '1.05rem',
            color: 'text.primary'
          }}
        >
          About This Property
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.75,
            fontSize: '0.95rem'
          }}
        >
          {description}
        </Typography>
      </Box>
    </Paper>
  );
}

export default HotelInfoBanner;
