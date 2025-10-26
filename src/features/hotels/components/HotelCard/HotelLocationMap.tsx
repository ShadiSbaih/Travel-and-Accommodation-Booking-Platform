import { Paper, Box, Typography } from '@mui/material';
import { MuiMap } from '@/shared/components/MuiMap';

interface HotelLocationMapProps {
  latitude: number;
  longitude: number;
  hotelName: string;
  location: string;
  height?: number;
  zoom?: number;
}

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
        p: 2,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        mb: 3
      }}
    >
      <Typography
        variant="subtitle2"
        component="h2"
        gutterBottom
        sx={{
          fontWeight: 700,
          mb: 1.5,
          fontSize: '0.95rem'
        }}
      >
        Location
      </Typography>
      <Box sx={{
        borderRadius: 2,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider'
      }}>
        <MuiMap
          latitude={latitude}
          longitude={longitude}
          hotelName={hotelName}
          location={location}
          height={height}
          zoom={zoom}
        />
      </Box>
    </Paper>
  );
}

export default HotelLocationMap;
