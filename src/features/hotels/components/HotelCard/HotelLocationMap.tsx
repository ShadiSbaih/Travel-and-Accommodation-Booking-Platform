import { Paper, Box, Typography } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import { MuiMap } from '@/shared/components/MuiMap';
import type { HotelLocationMapProps } from '../../types';



function HotelLocationMap({ 
  latitude, 
  longitude, 
  hotelName, 
  location,
  height = 300,
  zoom = 15
}: HotelLocationMapProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
        mb: 3,
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.06)',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
        <LocationOn sx={{ fontSize: 24, color: 'primary.main' }} />
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 700,
            fontSize: '1.05rem',
            color: 'text.primary'
          }}
        >
          Location
        </Typography>
      </Box>
      <Box sx={{
        borderRadius: 0.5,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)',
      }}>
        <MuiMap
          latitude={latitude}
          longitude={longitude}
          hotelName={hotelName ?? ''}
          location={location ?? ''}
          height={height}
          zoom={zoom}
        />
      </Box>
    </Paper>
  );
}

export default HotelLocationMap;
