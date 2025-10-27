import { useAppDispatch, useAppSelector } from '@/core/store/hooks';
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  clearCart as clearCartAction,
  updateCartItemDates as updateCartItemDatesAction,
} from '../store/cartSlice';
import type { AddToCartPayload } from '../store/cartSlice';

export const useCart = () => {
  const dispatch = useAppDispatch();
  const { items, totalItems, totalPrice } = useAppSelector((state) => state.cart);

  const addToCart = (payload: AddToCartPayload) => {
    dispatch(addToCartAction(payload));
  };

  const removeFromCart = (itemId: string) => {
    dispatch(removeFromCartAction(itemId));
  };

  const clearCart = () => {
    dispatch(clearCartAction());
  };

  const updateCartItemDates = (
    itemId: string,
    checkInDate: string,
    checkOutDate: string,
    numberOfNights: number
  ) => {
    dispatch(
      updateCartItemDatesAction({
        itemId,
        checkInDate,
        checkOutDate,
        numberOfNights,
      })
    );
  };

  const isInCart = (hotelId: number, roomId: number): boolean => {
    const itemId = `${hotelId}-${roomId}`;
    return items.some((item) => item.id === itemId);
  };

  return {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    clearCart,
    updateCartItemDates,
    isInCart,
  };
};
