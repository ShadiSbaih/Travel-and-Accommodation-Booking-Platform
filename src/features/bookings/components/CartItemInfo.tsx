import { Box, Chip } from '@mui/material';
import { LocalOffer } from '@mui/icons-material';
import type { CartItemInfoProps } from '@/features/bookings/types/booking.types';

function CartItemInfo({
  maxOccupancy,
  numberOfNights,
  checkInDate,
  checkOutDate,
}: CartItemInfoProps) {
  return (
    <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
      <Chip
        label={`Max: ${maxOccupancy} guests`}
        size="small"
        variant="outlined"
      />
      <Chip
        label={`${numberOfNights} ${numberOfNights === 1 ? 'night' : 'nights'}`}
        size="small"
        variant="outlined"
      />
      {checkInDate && checkOutDate && (
        <Chip
          icon={<LocalOffer sx={{ fontSize: 16 }} />}
          label={`${checkInDate} - ${checkOutDate}`}
          size="small"
          color="primary"
          variant="outlined"
        />
      )}
    </Box>
  );
}

export default CartItemInfo;
