import { Box, Container, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingReceipt from './BookingReceipt';
import type { BookingReceipt as BookingReceiptType } from '../types';
import { ArrowBack } from '@mui/icons-material';

function ConfirmationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const receipt = location.state?.receipt as BookingReceiptType | undefined;

  // Mock data as fallback if no receipt in state
  const mockReceipt: BookingReceiptType = {
    customerName: 'Alice Green',
    hotelName: 'Sunset Resort',
    roomNumber: '102',
    roomType: 'Ocean View Suite',
    bookingDateTime: '2025-02-10T14:30:00Z',
    totalCost: 1200.0,
    paymentMethod: 'Credit Card',
    bookingStatus: 'Confirmed',
    confirmationNumber: 'ABC123XYZ',
  };

  const displayReceipt = receipt || mockReceipt;

  return (
    <>
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          py: 4,
        }}
      >
        <Container maxWidth="lg">
          <Button
            variant="outlined"
            startIcon={<ArrowBack />}
            onClick={() => navigate('/')}
            sx={{
              mb: 3,
              '@media print': {
                display: 'none',
              },
            }}
          >
            Back to Home
          </Button>
          <BookingReceipt receipt={displayReceipt} />
        </Container>
      </Box>
    </>
  );
}

export default ConfirmationPage;