import { Paper, Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface PaymentFormProps {
  total: number;
  onSubmit: (customerName: string, paymentMethod: string) => void;
  isLoading: boolean;
  onBackToCart?: () => void;
}

const paymentMethods = [
  { value: 'Credit Card', label: 'Credit Card' },
  { value: 'Debit Card', label: 'Debit Card' },
  { value: 'PayPal', label: 'PayPal' },
  { value: 'Bank Transfer', label: 'Bank Transfer' },
];

function PaymentForm({ total, onSubmit, isLoading, onBackToCart }: PaymentFormProps) {
  const [customerName, setCustomerName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerName.trim()) {
      onSubmit(customerName, paymentMethod);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2.5 }}>
          Complete Your Booking
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            autoComplete='off'
            label="Customer Name"
            placeholder="Enter your full name"
            fullWidth
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            label="Payment Method"
            select
            fullWidth
            required
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            sx={{ mb: 2.5 }}
          >
            {paymentMethods.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 2.5,
              p: 2,
              bgcolor: 'primary.main',
              color: 'white',
              borderRadius: 1,
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Total Amount
            </Typography>
            <Typography variant="h5" fontWeight="bold">
              ${total.toFixed(2)}
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: { xs: 'column-reverse', sm: 'row' },
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="success"
              fullWidth
              disabled={isLoading || !customerName.trim()}
              sx={{
                py: 0.875,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'white',
              }}
            >
              {isLoading ? 'Processing...' : 'Complete Booking '}
            </Button>

            {onBackToCart && (
              <Button
                variant="outlined"
                fullWidth
                onClick={onBackToCart}
                startIcon={<ArrowBackIcon />}
                sx={{
                  py: 0.875,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                }}
              >
                Back to Cart
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

export default PaymentForm;
