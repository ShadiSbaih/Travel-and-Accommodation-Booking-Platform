import { Paper, Box, Typography, TextField, Button, MenuItem } from '@mui/material';
import { useState } from 'react';

interface PaymentFormProps {
  total: number;
  onSubmit: (customerName: string, paymentMethod: string) => void;
  isLoading: boolean;
}

const paymentMethods = [
  { value: 'Credit Card', label: 'Credit Card' },
  { value: 'Debit Card', label: 'Debit Card' },
  { value: 'PayPal', label: 'PayPal' },
  { value: 'Bank Transfer', label: 'Bank Transfer' },
];

function PaymentForm({ total, onSubmit, isLoading }: PaymentFormProps) {
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
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
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
            sx={{ mb: 3 }}
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
              mb: 3,
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

          <Button
            type="submit"
            variant="contained"
            color="success"
            fullWidth
            size="large"
            disabled={isLoading || !customerName.trim()}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 700,
            }}
          >
            {isLoading ? 'Processing...' : 'Complete Booking & Pay'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default PaymentForm;
