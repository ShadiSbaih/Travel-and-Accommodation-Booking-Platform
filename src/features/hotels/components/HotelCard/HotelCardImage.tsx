import { Box, CardMedia, Chip, Rating } from '@mui/material';
import { LocalOffer } from '@mui/icons-material';
import type { HotelCardImageProps } from './types';

function HotelCardImage({ imageUrl, hotelName, discount, starRating }: HotelCardImageProps) {
  return (
    <Box sx={{ position: 'relative', flexShrink: 0 }}>
      <CardMedia
        component="img"
        image={imageUrl}
        alt={hotelName}
        sx={{ 
          height: 200,
          width: '100%',
          objectFit: 'cover',
          display: 'block'
        }}
      />
      
      {discount > 0 && (
        <Chip
          icon={<LocalOffer />}
          label={`${discount}% OFF`}
          color="error"
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            fontWeight: 'bold',
            boxShadow: 2
          }}
        />
      )}
      
      <Box
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 1,
          px: 0.75,
          py: 0.25,
          display: 'flex',
          alignItems: 'center',
          boxShadow: 2
        }}
      >
        <Rating 
          value={starRating} 
          readOnly 
          size="small"
          sx={{ color: '#FFD700' }}
        />
      </Box>
    </Box>
  );
}

export default HotelCardImage;
