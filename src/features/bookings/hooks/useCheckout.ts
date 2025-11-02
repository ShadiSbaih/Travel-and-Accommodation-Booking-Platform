import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { removeFromCart, clearCart } from '@/features/cart';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '@/shared/hooks/useNotification';
import { calculateCheckoutTotals } from '../utils/checkout.utils';
import { useBooking } from './useBooking';

export const useCheckout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const notify = useNotification();
  const { items, totalItems, totalPrice } = useAppSelector((state) => state.cart);
  const { createBooking, navigateToConfirmation, isLoading: isBookingLoading } = useBooking();

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeFromCart(itemId));
    notify('Room removed from cart', 'info');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    notify('Cart has been cleared successfully', 'success');
  };

  const handleProceedToCheckout = async (customerName: string, paymentMethod: string) => {
    const receipt = await createBooking(customerName, items, paymentMethod, total);
    
    if (receipt) {
      // Clear cart after successful booking
      dispatch(clearCart());
      // Navigate to confirmation page with receipt
      navigateToConfirmation(receipt);
    }
  };

  const handleBrowseHotels = () => {
    navigate('/search-results');
  };

  const { serviceFee, taxes, total } = useMemo(
    () => calculateCheckoutTotals(totalPrice),
    [totalPrice]
  );

  return {
    items,
    totalItems,
    totalPrice,
    serviceFee,
    taxes,
    total,
    handleRemoveItem,
    handleClearCart,
    handleProceedToCheckout,
    handleBrowseHotels,
    isBookingLoading,
  };
};
