import Navbar from '@/shared/components/Navbar';
import { useParams } from 'react-router-dom';
import { useAvailableRooms, useHotel, useHotelGallery } from '../hooks/useHotels';
import LoadingState from '@/shared/components/LoadingState';
import ErrorState from '@/shared/components/ErrorState';
import { Container, Box, Snackbar, Alert } from '@mui/material';
import { HotelGallery, HotelSidebar } from './HotelCard';
import RoomsList from './RoomCard/RoomsList';
import { useCart } from '@/features/cart';
import { useState } from 'react';
import type { SliderImage } from '@/shared/components/MuiImageSlider/types';

function HotelDetailsPage() {
  const { id } = useParams();
  const hotelId = Number(id);
  const { addToCart, removeFromCart, isInCart } = useCart();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { data: hotel, isLoading: isLoadingHotel, error: hotelError } = useHotel(hotelId);
  const { data: gallery, isLoading: isLoadingGallery, error: galleryError } = useHotelGallery(hotelId);
  const { data: rooms, isLoading: isLoadingRooms } = useAvailableRooms(hotelId);

  if (isLoadingHotel || isLoadingGallery || isLoadingRooms) {
    return (
      <>
        <Navbar />
        <LoadingState message="Loading hotel details..." />
      </>
    );
  }

  if (hotelError || galleryError || !hotel) {
    return (
      <>
        <Navbar />
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <ErrorState message="Failed to load hotel details. Please try again later." variant="error" />
        </Container>
      </>
    );
  }

  const sliderImages: SliderImage[] =
    gallery?.map((img, index) => ({
      id: img.id,
      src: img.url,
      alt: `${hotel.name} - Image ${index + 1}`,
    })) || [];

  const handleRoomBooking = (roomId: number) => {
    const room = rooms?.find((r) => r.roomId === roomId);

    if (room) {
      const itemId = `${hotel.id}-${room.roomId}`;

      if (isInCart(hotel.id, room.roomId)) {
        removeFromCart(itemId);
        setSuccessMessage('Room removed from cart');
        setShowSuccessMessage(true);
      } else {
        addToCart({
          room: {
            id: room.roomId,
            name: room.roomType,
            type: room.roomType,
            available: room.availability,
            maxOccupancy: room.capacityOfAdults + room.capacityOfChildren,
            price: room.price,
          },
          hotelId: hotel.id,
          hotelName: hotel.name,
          roomImage: gallery?.[0]?.url,
          hotelAmenities: hotel.amenities,
          numberOfNights: 1,
        });
        setSuccessMessage('Room added to cart successfully!');
        setShowSuccessMessage(true);
      }
    }
  };

  const handleCloseSuccessMessage = () => {
    setShowSuccessMessage(false);
  };

  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 6 }}>
        <Container maxWidth="xl" sx={{ mt: 3, px: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', lg: 'row' } }}>
            <Box sx={{ flex: { xs: '1 1 100%', lg: '0 0 65%' } }}>
              <HotelGallery images={sliderImages} />
              <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                {rooms && rooms.length > 0 && (
                  <RoomsList
                    rooms={rooms}
                    onRoomSelect={handleRoomBooking}
                    cartItems={rooms.filter((room) => isInCart(hotel.id, room.roomId)).map((r) => r.roomId)}
                  />
                )}
              </Box>
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', lg: '0 0 calc(35% - 32px)' } }}>
              <HotelSidebar hotel={hotel} />
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%' }, display: { xs: 'block', lg: 'none' } }}>
              {rooms && rooms.length > 0 && (
                <RoomsList
                  rooms={rooms}
                  onRoomSelect={handleRoomBooking}
                  cartItems={rooms.filter((room) => isInCart(hotel.id, room.roomId)).map((r) => r.roomId)}
                />
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={3000}
        onClose={handleCloseSuccessMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSuccessMessage}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {successMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default HotelDetailsPage;