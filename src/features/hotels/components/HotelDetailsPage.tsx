import Navbar from '@/shared/components/Navbar';
import { useParams } from 'react-router-dom';
import { useHotel, useHotelGallery } from '../hooks/useHotels';
import { MuiImageSlider } from '@/shared/components/MuiImageSlider';
import type { SliderImage } from '@/shared/components/MuiImageSlider/types';
import LoadingState from '@/shared/components/LoadingState';
import ErrorState from '@/shared/components/ErrorState';
import { MuiMap } from '@/shared/components/MuiMap';
import { Container, Typography, Paper, Box, Chip } from '@mui/material';
import { LocationOn, Star } from '@mui/icons-material';

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

  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 4 }}>
        {/* Image Slider */}
        {sliderImages.length > 0 && (
          <Box sx={{ maxWidth: { xs: '100%', md: '85%', lg: '75%', xl: '66%' }, mx: 'auto' }}>
            <MuiImageSlider images={sliderImages} />
          </Box>
        )}

        {/* Hotel Location Map */}
        {hotel && (
          <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Hotel Location
            </Typography>
            <MuiMap
              latitude={hotel.latitude}
              longitude={hotel.longitude}
              hotelName={hotel.name}
              location={hotel.location}
              height={450}
              zoom={15}
            />
          </Container>
        )}

        {/* Hotel Details Content */}
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
              {hotel?.name}
            </Typography>
            
            {hotel?.location && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="h6" color="text.secondary">
                  {hotel.location}
                </Typography>
              </Box>
            )}

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3, fontSize: '1.1rem' }}>
              {hotel?.description}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              {hotel?.starRating && (
                <Chip
                  icon={<Star />}
                  label={`${hotel.starRating} Star Hotel`}
                  color="primary"
                  variant="outlined"
                  sx={{ fontSize: '1rem', py: 2.5 }}
                />
              )}
              
              {hotel?.hotelType && (
                <Chip
                  label={hotel.hotelType}
                  color="secondary"
                  variant="outlined"
                  sx={{ fontSize: '1rem', py: 2.5 }}
                />
              )}
            </Box>
           
            {hotel?.rooms && hotel.rooms.length > 0 && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                  Available Rooms
                </Typography>
                {hotel.rooms.map((room) => (
                  <Paper key={room.id} elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      {room.type}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 1 }}>
                      {room?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Capacity: {room.maxOccupancy} person{room.maxOccupancy > 1 ? 's' : ''}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {room.available? 'Available' : 'Not Available'}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      Price per night: ${room.price.toFixed(2)}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default HotelDetailsPage;