import { Box, Typography, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import type { CartItemHeaderProps } from '@/features/bookings/types/booking.types';

function CartItemHeader({ roomName, hotelName, onRemove }: CartItemHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mb: 1,
      }}
    >
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
          {roomName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {hotelName}
        </Typography>
      </Box>
      <IconButton onClick={onRemove} color="error" size="small">
        <Delete />
      </IconButton>
    </Box>
  );
}

export default CartItemHeader;
