import { Box } from '@mui/material';
import type { CartItemsListProps } from '@/features/bookings/types/booking.types';
import CartItemCard from './CartItemCard';

function CartItemsList({ items, onRemoveItem }: CartItemsListProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {items.map((item) => (
        <CartItemCard key={item.id} item={item} onRemove={onRemoveItem} />
      ))}
    </Box>
  );
}

export default CartItemsList;
