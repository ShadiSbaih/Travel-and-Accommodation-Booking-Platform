import {
  Box,
  Paper,
  Typography,
  Divider,
  Button,
  Stack,
} from '@mui/material';
import {
  CheckCircle,
  Hotel,
  Event,
  Person,
  Payment,
  ConfirmationNumber,
  Download,
} from '@mui/icons-material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import type { BookingReceiptProps } from '../types';
import { formatDate, formatCurrency } from '../utils';

function BookingReceipt({ receipt }: BookingReceiptProps) {
  const handleDownloadPDF = async () => {
    const element = document.getElementById('booking-receipt');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save(`booking-receipt-${receipt.confirmationNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Box sx={{ maxWidth: 700, mx: 'auto', p: 2 }}>
      {/* Action Buttons - Don't print these */}
      <Stack
        direction="row"
        spacing={2}
        sx={{
          mb: 2,
          '@media print': {
            display: 'none',
          },
        }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<Download />}
          onClick={handleDownloadPDF}
          fullWidth
        >
          Download PDF
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handlePrint}
          fullWidth
        >
          Print
        </Button>
      </Stack>

      {/* Receipt Content */}
      <Paper
        id="booking-receipt"
        elevation={3}
        sx={{
          p: 3,
          '@media print': {
            boxShadow: 'none',
            p: 2,
          },
        }}
      >
        {/* Success Header */}
        <Box
          sx={{
            textAlign: 'center',
            mb: 3,
            pb: 2,
            borderBottom: '2px solid',
            borderColor: 'primary.main',
          }}
        >
          <CheckCircle
            sx={{
              fontSize: 48,
              color: 'success.main',
              mb: 1,
            }}
          />
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Booking Confirmed
          </Typography>
        </Box>

        {/* Confirmation Number */}
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'white',
            p: 1.5,
            borderRadius: 1,
            mb: 2,
            textAlign: 'center',
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <ConfirmationNumber fontSize="small" />
            <Typography variant="body2">Confirmation Number</Typography>
          </Stack>
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 0.5 }}>
            {receipt.confirmationNumber}
          </Typography>
        </Box>

        {/* Main Details in Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 2,
            mb: 2,
          }}
        >
          {/* Customer Name */}
          <Box>
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 0.5 }}>
              <Person fontSize="small" color="primary" />
              <Typography variant="caption" color="text.secondary">
                Customer Name
              </Typography>
            </Stack>
            <Typography variant="body2" fontWeight="medium">
              {receipt.customerName}
            </Typography>
          </Box>

          {/* Status */}
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
              Status
            </Typography>
            <Typography variant="body2" fontWeight="medium" sx={{ color: 'success.main' }}>
              {receipt.bookingStatus}
            </Typography>
          </Box>

          {/* Hotel Name */}
          <Box>
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 0.5 }}>
              <Hotel fontSize="small" color="primary" />
              <Typography variant="caption" color="text.secondary">
                Hotel
              </Typography>
            </Stack>
            <Typography variant="body2" fontWeight="medium">
              {receipt.hotelName}
            </Typography>
          </Box>

          {/* Room Info */}
          <Box>
            <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
              Room
            </Typography>
            <Typography variant="body2" fontWeight="medium">
              {receipt.roomType} - #{receipt.roomNumber}
            </Typography>
          </Box>

          {/* Booking Date */}
          <Box>
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 0.5 }}>
              <Event fontSize="small" color="primary" />
              <Typography variant="caption" color="text.secondary">
                Booking Date
              </Typography>
            </Stack>
            <Typography variant="body2" fontWeight="medium">
              {formatDate(receipt.bookingDateTime)}
            </Typography>
          </Box>

          {/* Payment Method */}
          <Box>
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 0.5 }}>
              <Payment fontSize="small" color="primary" />
              <Typography variant="caption" color="text.secondary">
                Payment Method
              </Typography>
            </Stack>
            <Typography variant="body2" fontWeight="medium">
              {receipt.paymentMethod}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Total */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2,
            bgcolor: 'grey.50',
            borderRadius: 1,
          }}
        >
          <Typography variant="body1" fontWeight="bold">
            Total Amount
          </Typography>
          <Typography variant="h5" fontWeight="bold" sx={{ color: 'primary.main' }}>
            {formatCurrency(receipt.totalCost)}
          </Typography>
        </Box>

        {/* Footer */}
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mt: 2, textAlign: 'center' }}
        >
          This is a computer-generated receipt. For queries, contact us with your confirmation number.
        </Typography>
      </Paper>
    </Box>
  );
}

export default BookingReceipt;
