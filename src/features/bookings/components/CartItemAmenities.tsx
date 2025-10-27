import { Box, Typography, Chip } from '@mui/material';
import type { CartItemAmenitiesProps } from '@/features/bookings/types/booking.types';

function CartItemAmenities({ amenities, maxDisplay = 4 }: CartItemAmenitiesProps) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <Box sx={{ mt: 1 }}>
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ fontWeight: 600, mb: 0.5, display: 'block' }}
      >
        Amenities:
      </Typography>
      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
        {amenities.slice(0, maxDisplay).map((amenity) => (
          <Chip
            key={amenity.id}
            label={amenity.name}
            size="small"
            sx={{ fontSize: '0.7rem' }}
          />
        ))}
      </Box>
    </Box>
  );
}

export default CartItemAmenities;
