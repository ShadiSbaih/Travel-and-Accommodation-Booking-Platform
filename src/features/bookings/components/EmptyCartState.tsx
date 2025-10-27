import { Container, Box, Button } from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';
import EmptyState from '@/shared/components/EmptyState';

interface EmptyCartStateProps {
  onBrowseHotels: () => void;
}

function EmptyCartState({ onBrowseHotels }: EmptyCartStateProps) {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <EmptyState
        icon={<ShoppingCartOutlined sx={{ fontSize: 80 }} />}
        title="Your cart is empty"
        subtitle="Browse hotels and add rooms to get started"
      />
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Button variant="contained" size="large" onClick={onBrowseHotels}>
          Browse Hotels
        </Button>
      </Box>
    </Container>
  );
}

export default EmptyCartState;
