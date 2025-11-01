import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBookingMock } from '../api/bookings.api';
import type { BookingReceipt } from '../types';
import type { CartItem } from '@/features/cart';
import { useNotification } from '@/shared/hooks/useNotification';

export const useBooking = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const notify = useNotification();

  const createBooking = async (
    customerName: string,
    items: CartItem[],
    paymentMethod: string,
    totalCost: number
  ): Promise<BookingReceipt | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await createBookingMock({
        customerName,
        items,
        paymentMethod,
        totalCost,
      });

      notify('Booking confirmed successfully!', 'success');
      return response.receipt;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create booking';
      setError(errorMessage);
      notify(errorMessage, 'error');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToConfirmation = (receipt: BookingReceipt) => {
    navigate('/confirmation', { state: { receipt } });
  };

  return {
    createBooking,
    navigateToConfirmation,
    isLoading,
    error,
  };
};
