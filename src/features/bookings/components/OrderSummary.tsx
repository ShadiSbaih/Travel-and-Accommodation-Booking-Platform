import { Paper, Box, Typography, Button, Divider } from '@mui/material';
import type { OrderSummaryProps } from '@/features/bookings/types';
import OrderSummaryRow from './OrderSummaryRow';

function OrderSummary({
  totalItems,
  subtotal,
  serviceFee,
  taxes,
  total,
  onProceedToCheckout,
}: OrderSummaryProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        position: 'sticky',
        top: 24,
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
          Order Summary
        </Typography>

        <Box sx={{ mb: 2 }}>
          <OrderSummaryRow
            label={`Subtotal (${totalItems} ${totalItems === 1 ? 'item' : 'items'})`}
            value={`$${subtotal.toFixed(2)}`}
          />
          <OrderSummaryRow label="Service Fee" value={`$${serviceFee.toFixed(2)}`} />
          <OrderSummaryRow label="Taxes" value={`$${taxes.toFixed(2)}`} />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ mb: 3 }}>
          <OrderSummaryRow label="Total" value={`$${total.toFixed(2)}`} highlight />
        </Box>

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={onProceedToCheckout}
          sx={{
            py: 1.5,
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 700,
          }}
        >
          Proceed to Checkout
        </Button>
      </Box>
    </Paper>
  );
}

export default OrderSummary;
