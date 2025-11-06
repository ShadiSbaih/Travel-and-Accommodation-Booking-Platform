import { Box, Typography } from '@mui/material';
import type { CartItemPriceProps } from '@/features/bookings/types';

function CartItemPrice({
  pricePerNight,
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
          ${pricePerNight}/night
        </Typography>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: 'primary.main' }}
        >
          ${pricePerNight.toFixed(2)}
        </Typography>
      </Box>
    </Box>
  );
}

export default CartItemPrice;
