import { Box, Typography, Chip } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import type { HotelCardHeaderProps } from './types';

function HotelCardHeader({ hotelName, cityName, roomType }: HotelCardHeaderProps) {
  return (
    <>
      <Typography
        variant="h6"
        component="h3"
        sx={{
          fontWeight: 700,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          mb: 0.5,
          fontSize: '1.1rem'
        }}
      >
        {hotelName}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LocationOn sx={{ fontSize: 16, color: 'text.secondary', mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary" fontSize="0.875rem">
            {cityName}
          </Typography>
        </Box>
        <Chip
          label={roomType}
          size="small"
          sx={{
            fontWeight: 500,
            height: 22,
            fontSize: '0.75rem'
          }}
        />
      </Box>
    </>
  );
}

export default HotelCardHeader;
