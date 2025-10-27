import Navbar from '@/shared/components/Navbar';
import { useParams } from 'react-router-dom';
import { useHotel, useHotelGallery } from '../hooks/useHotels';
import type { SliderImage } from '@/shared/components/MuiImageSlider/types';
import LoadingState from '@/shared/components/LoadingState';
import ErrorState from '@/shared/components/ErrorState';
import { Container, Box, Snackbar, Alert } from '@mui/material';
import { HotelGallery, HotelSidebar } from './HotelCard';
import { RoomsList } from './RoomCard';
import { useCart } from '@/features/cart';
import { useState } from 'react';

function HotelDetailsPage() {
  const { id } = useParams();
  const hotelId = Number(id);
  const { addToCart, removeFromCart, isInCart } = useCart();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Fetch hotel data and gallery
  const { data: hotel, isLoading: isLoadingHotel, error: hotelError } = useHotel(hotelId);
  const { data: gallery, isLoading: isLoadingGallery, error: galleryError } = useHotelGallery(hotelId);
  

  // Show loading state
  if (isLoadingHotel || isLoadingGallery) {
    return (
      <>
        <Navbar />
        <LoadingState message="Loading hotel details..." />
      </>
    );
  }

  // Show error state
  if (hotelError || galleryError) {
    return (
      <>
        <Navbar />
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <ErrorState message="Failed to load hotel details. Please try again later." variant="error" />
        </Container>
      </>
    );
  }

  // Transform gallery images to slider format
  const sliderImages: SliderImage[] =
    gallery?.map((img, index) => ({
      id: img.id,
      src: img.url,
      alt: `${hotel?.name} - Image ${index + 1}`,
    })) || [];

  const handleRoomBooking = (roomId: number) => {
    const room = hotel?.rooms?.find(r => r.id === roomId);
    
    if (room && hotel) {
      const itemId = `${hotel.id}-${room.id}`;
      
      if (isInCart(hotel.id, room.id)) {
        // Remove from cart
        removeFromCart(itemId);
        setSuccessMessage('Room removed from cart');
        setShowSuccessMessage(true);
      } else {
        // Add to cart
        addToCart({
          room,
          hotelId: hotel.id,
          hotelName: hotel.name || hotel.hotelName || 'Unknown Hotel',
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
      <Box sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        pb: 6
      }}>
        <Container maxWidth="xl" sx={{ mt: 3, px: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', lg: 'row' } }}>
            {/* Left Column - Picture Gallery and Rooms */}
            <Box sx={{ flex: { xs: '1 1 100%', lg: '0 0 65%' } }}>
              {/* Picture Gallery Section */}
              <HotelGallery images={sliderImages} />

              {/* Available Rooms Section - Hidden on mobile/tablet, shown on desktop */}
              <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
                {hotel?.rooms && hotel.rooms.length > 0 && (
                  <RoomsList
                    rooms={hotel.rooms}
                    hotelAmenities={hotel.amenities}
                    roomImage={gallery?.[0]?.url}
                    onRoomSelect={handleRoomBooking}
                    cartItems={hotel.rooms.filter(room => isInCart(hotel.id, room.id)).map(r => r.id)}
                  />
                )}
              </Box>
            </Box>

            {/* Right Column - Info Banner, Location Map & Amenities */}
            <Box sx={{ flex: { xs: '1 1 100%', lg: '0 0 calc(35% - 32px)' } }}>
              {hotel && <HotelSidebar hotel={hotel} />}
            </Box>

            {/* Available Rooms Section - Shown on mobile/tablet, hidden on desktop */}
            <Box sx={{ 
              flex: { xs: '1 1 100%' },
              display: { xs: 'block', lg: 'none' }
            }}>
              {hotel?.rooms && hotel.rooms.length > 0 && (
                <RoomsList
                  rooms={hotel.rooms}
                  hotelAmenities={hotel.amenities}
                  roomImage={gallery?.[0]?.url}
                  onRoomSelect={handleRoomBooking}
                  cartItems={hotel.rooms.filter(room => isInCart(hotel.id, room.id)).map(r => r.id)}
                />
              )}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Success Snackbar */}
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