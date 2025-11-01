import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import { removeFromCart, clearCart } from '@/features/cart';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '@/shared/hooks/useNotification';

export const useCheckout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const notify = useNotification();
  const { items, totalItems, totalPrice } = useAppSelector((state) => state.cart);

  const handleRemoveItem = (itemId: string) => {
    dispatch(removeFromCart(itemId));
    notify('Room removed from cart', 'info');
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    notify('Cart cleared', 'info');
  };

  const handleProceedToCheckout = () => {
    // TODO: Navigate to payment/confirmation page
    // Placeholder for checkout logic
  };

  const handleBrowseHotels = () => {
    navigate('/search-results');
  };

  const { serviceFee, taxes, total } = useMemo(() => ({
    serviceFee: 0,
    taxes: totalPrice * 0.1,
    total: totalPrice + totalPrice * 0.1,
  }), [totalPrice]);

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
  };
};
