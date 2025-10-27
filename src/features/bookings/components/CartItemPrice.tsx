import { Box, Typography } from '@mui/material';
import type { CartItemPriceProps } from '@/features/bookings/types/booking.types';

function CartItemPrice({
  pricePerNight,
  numberOfNights,
  totalPrice,
}: CartItemPriceProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        mt: 'auto',
      }}
    >
      <Box sx={{ textAlign: 'right' }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block' }}
        >
          ${pricePerNight}/night × {numberOfNights}{' '}
          {numberOfNights === 1 ? 'night' : 'nights'}
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: 'primary.main' }}
        >
          ${totalPrice.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
}

export default CartItemPrice;
