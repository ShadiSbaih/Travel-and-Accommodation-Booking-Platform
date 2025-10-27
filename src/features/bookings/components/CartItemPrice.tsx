import { Box, Typography } from '@mui/material';

interface CartItemPriceProps {
  pricePerNight: number;
  numberOfNights: number;
  totalPrice: number;
}

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
