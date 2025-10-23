import Navbar from '@/shared/components/Navbar';
import { useParams } from 'react-router-dom';
import { useHotel, useHotelGallery } from '../hooks/useHotels';
import type { SliderImage } from '@/shared/components/MuiImageSlider/types';
import LoadingState from '@/shared/components/LoadingState';
import ErrorState from '@/shared/components/ErrorState';
import { Container, Box } from '@mui/material';
import { HotelGallery, HotelSidebar } from './HotelCard';
import { RoomsList } from './RoomCard';

function HotelDetailsPage() {
  const { id } = useParams();
  const hotelId = Number(id);

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
    // TODO: Navigate to booking page or add to cart
    console.log('Booking room:', roomId);
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

              {/* Available Rooms Section */}
              {hotel?.rooms && hotel.rooms.length > 0 && (
                <RoomsList
                  rooms={hotel.rooms}
                  hotelAmenities={hotel.amenities}
                  roomImage={gallery?.[0]?.url}
                  onRoomSelect={handleRoomBooking}
                />
              )}
            </Box>

            {/* Right Column - Info Banner, Location Map & Amenities */}
            <Box sx={{ flex: { xs: '1 1 100%', lg: '0 0 calc(35% - 32px)' } }}>
              {hotel && <HotelSidebar hotel={hotel} />}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default HotelDetailsPage;