import { Box, Chip } from '@mui/material';
import { LocalOffer } from '@mui/icons-material';
import type { CartItemInfoProps } from '@/features/bookings/types';

function CartItemInfo({
  maxOccupancy,
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
