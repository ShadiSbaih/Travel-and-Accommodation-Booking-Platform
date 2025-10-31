import { Box, Typography } from '@mui/material';
import type { OrderSummaryRowProps } from '@/features/bookings/types';

function OrderSummaryRow({ label, value, highlight = false }: OrderSummaryRowProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mb: 1,
      }}
    >
      <Typography
        variant={highlight ? 'h6' : 'body2'}
        color={highlight ? 'text.primary' : 'text.secondary'}
        sx={highlight ? { fontWeight: 700 } : undefined}
      >
        {label}
      </Typography>
      <Typography
        variant={highlight ? 'h6' : 'body2'}
        sx={
          highlight
            ? { fontWeight: 700, color: 'primary.main' }
            : { fontWeight: 600 }
        }
      >
        {value}
      </Typography>
    </Box>
  );
}

export default OrderSummaryRow;
