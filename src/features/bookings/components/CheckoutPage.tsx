import Navbar from '@/shared/components/Navbar';
import { Container, Box } from '@mui/material';
import EmptyCartState from './EmptyCartState';
import CartHeader from './CartHeader';
import CartItemsList from './CartItemsList';
import OrderSummary from './OrderSummary';
import { useCheckout } from '../hooks/useCheckout';

function CheckoutPage() {
  const {
    items,
    totalItems,
    serviceFee,
    taxes,
    total,
    totalPrice,
    handleRemoveItem,
    handleClearCart,
    handleProceedToCheckout,
    handleBrowseHotels,
  } = useCheckout();

  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <EmptyCartState onBrowseHotels={handleBrowseHotels} />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: 'background.default',
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <CartHeader totalItems={totalItems} onClearCart={handleClearCart} />

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
              gap: 3,
            }}
          >
            {/* Cart Items */}
            <Box>
              <CartItemsList items={items} onRemoveItem={handleRemoveItem} />
            </Box>

            {/* Order Summary */}
            <Box>
              <OrderSummary
                totalItems={totalItems}
                subtotal={totalPrice}
                serviceFee={serviceFee}
                taxes={taxes}
                total={total}
                onProceedToCheckout={handleProceedToCheckout}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default CheckoutPage;