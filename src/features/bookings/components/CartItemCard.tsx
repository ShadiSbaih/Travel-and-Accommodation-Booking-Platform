import { Card, CardContent, CardMedia, Box } from '@mui/material';
import type { CartItemCardProps } from '@/features/bookings/types';
import CartItemHeader from './CartItemHeader';
import CartItemInfo from './CartItemInfo';
import CartItemAmenities from './CartItemAmenities';
import CartItemPrice from './CartItemPrice';

function CartItemCard({ item, onRemove }: CartItemCardProps) {
  const maxOccupancy = (item.room.capacityOfAdults || 0) + (item.room.capacityOfChildren || 0);

  return (
    <Card
      elevation={0}
      sx={{
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: '1fr 2fr',
              md: '1fr 3fr',
            },
            gap: 2,
          }}
        >
          {/* Room Image */}
          <Box>
            <CardMedia
              component="img"
              image={item.roomImage || 'https://via.placeholder.com/300x200'}
              alt={item.room.roomType}
              sx={{
                borderRadius: 2,
                height: { xs: 200, sm: '100%' },
                objectFit: 'cover',
              }}
            />
          </Box>

          {/* Room Details */}
          <Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <CartItemHeader
                roomName={item.room.roomType}
                hotelName={item.hotelName}
                onRemove={() => onRemove(item.id)}
              />

              <Box sx={{ mb: 2 }}>
                <CartItemInfo
                  maxOccupancy={maxOccupancy}
                  checkInDate={item.checkInDate}
                  checkOutDate={item.checkOutDate}
                />

                {item.hotelAmenities && item.hotelAmenities.length > 0 && (
                  <CartItemAmenities amenities={item.hotelAmenities} />
                )}
              </Box>

              <CartItemPrice
                pricePerNight={item.room.price}
              />
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CartItemCard;
