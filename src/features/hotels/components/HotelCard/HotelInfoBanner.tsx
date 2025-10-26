import { Paper, Box, Typography, Chip } from '@mui/material';
import { LocationOn, Star } from '@mui/icons-material';

interface HotelInfoBannerProps {
  location: string;
  starRating?: number;
  hotelType?: string;
  description: string;
}

function HotelInfoBanner({ location, starRating, hotelType, description }: HotelInfoBannerProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        mb: 3,
        background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(33, 203, 243, 0.05) 100%)'
      }}
    >
      {/* Location */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.5 }}>
        <LocationOn sx={{ fontSize: 18, color: 'error.main' }} />
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', fontSize: '0.9rem' }}>
          {location}
        </Typography>
      </Box>

      {/* Star Rating and Hotel Type */}
      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
        {starRating && (
          <Chip
            icon={<Star sx={{ fontSize: 14 }} />}
            label={`${starRating} Star Hotel`}
            size="small"
            sx={{
              bgcolor: 'warning.main',
              color: 'white',
              fontWeight: 600,
              height: 24,
              fontSize: '0.75rem',
              '& .MuiChip-icon': { color: 'white' }
            }}
          />
        )}

        {hotelType && (
          <Chip
            label={hotelType}
            size="small"
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              fontWeight: 600,
              height: 24,
              fontSize: '0.75rem'
            }}
          />
        )}
      </Box>

      {/* About This Property */}
      <Box>
        <Typography
          variant="subtitle2"
          component="h3"
          sx={{
            fontWeight: 700,
            mb: 1,
            fontSize: '0.95rem',
            color: 'text.primary'
          }}
        >
          About This Property
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.6,
            fontSize: '0.85rem'
          }}
        >
          {description}
        </Typography>
      </Box>
    </Paper>
  );
}

export default HotelInfoBanner;
