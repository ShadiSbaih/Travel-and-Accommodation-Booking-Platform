import { Box } from '@mui/material';
import type { CartItem } from '@/features/cart';
import CartItemCard from './CartItemCard';

interface CartItemsListProps {
  items: CartItem[];
  onRemoveItem: (itemId: string) => void;
}

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
