import Navbar from '@/shared/components/Navbar';
import { useParams } from 'react-router-dom';
import { useHotel, useHotelGallery } from '../hooks/useHotels';
import { MuiImageSlider } from '@/shared/components/MuiImageSlider';
import type { SliderImage } from '@/shared/components/MuiImageSlider/types';
import LoadingState from '@/shared/components/LoadingState';
import ErrorState from '@/shared/components/ErrorState';
import { MuiMap } from '@/shared/components/MuiMap';
import { Container, Typography, Paper, Box, Chip, Button, Card, CardMedia, CardContent } from '@mui/material';
import { LocationOn, Star, People, ChildCare, ShoppingCart } from '@mui/icons-material';

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
        <Container maxWidth="xl" sx={{ mt: 4 }}>
          <Box sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', md: 'row' } }}>
            {/* Left Column - Hotel Information and Map */}
            <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 33%' } }}>
              {/* Hotel Details Section */}
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Hotel Information
                </Typography>
                
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 2 }}>
                  {hotel?.name}
                </Typography>

                {hotel?.location && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOn sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body1" color="text.secondary">
                      {hotel.location}
                    </Typography>
                  </Box>
                )}

                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  {hotel?.description}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                  {hotel?.starRating && (
                    <Chip
                      icon={<Star />}
                      label={`${hotel.starRating} Star`}
                      color="primary"
                      variant="outlined"
                    />
                  )}

                  {hotel?.hotelType && (
                    <Chip label={hotel.hotelType} color="secondary" variant="outlined" />
                  )}
                </Box>

                {hotel?.amenities && hotel.amenities.length > 0 && (
                  <Box sx={{ mt: 3 }}>
                    <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                      Amenities
                    </Typography>
                    {hotel.amenities.map((amenity) => (
                      <Box key={amenity.id} sx={{ mb: 2 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                          • {amenity.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                          {amenity.description}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Paper>

              {/* Location on Map Section */}
              {hotel && (
                <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
                  <Typography variant="h6" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                    Location on Map
                  </Typography>
                  <MuiMap
                    latitude={hotel.latitude}
                    longitude={hotel.longitude}
                    hotelName={hotel.name}
                    location={hotel.location}
                    height={300}
                    zoom={15}
                  />
                </Paper>
              )}
            </Box>

            {/* Right Column - Picture Gallery and Rooms */}
            <Box sx={{ flex: { xs: '1 1 100%', md: '0 0 calc(67% - 24px)' } }}>
              {/* Picture Gallery Section */}
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
                  Picture Gallery
                </Typography>
                {sliderImages.length > 0 && (
                  <Box>
                    <MuiImageSlider images={sliderImages} />
                  </Box>
                )}
              </Paper>

              {/* List of Available Rooms Section */}
              {hotel?.rooms && hotel.rooms.length > 0 && (
                <Box>
                  <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 600, mb: 4, textAlign: 'center' }}>
                    Available Rooms
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {hotel.rooms.map((room) => (
                      <Card 
                        key={room.id} 
                        sx={{ 
                          width: { xs: '100%', sm: '48%', lg: '48%' },
                          borderRadius: 3,
                          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                          transition: 'transform 0.2s, box-shadow 0.2s',
                          '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
                          }
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="200"
                          image={gallery?.[0]?.url || 'https://via.placeholder.com/400x200'}
                          alt={room.name}
                          sx={{ objectFit: 'cover' }}
                        />
                        <CardContent sx={{ p: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                            <Typography variant="h5" component="h3" sx={{ fontWeight: 600 }}>
                              {room.name}
                            </Typography>
                            <Box sx={{ textAlign: 'right' }}>
                              <Typography variant="h5" sx={{ fontWeight: 700, color: 'success.main' }}>
                                $ {room.price.toFixed(0)}
                              </Typography>
                            </Box>
                          </Box>

                          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                            <Chip 
                              icon={<People />} 
                              label={`Adults: ${Math.floor(room.maxOccupancy / 2)}`}
                              size="small"
                              sx={{ bgcolor: '#1976d2', color: 'white' }}
                            />
                            <Chip 
                              icon={<ChildCare />} 
                              label={`Children: ${room.maxOccupancy % 2 || 1}`}
                              size="small"
                              sx={{ bgcolor: '#2e7d32', color: 'white' }}
                            />
                          </Box>

                          <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: 'text.primary' }}>
                              Amenities
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                              {hotel.amenities?.slice(0, 2).map((amenity) => (
                                <Chip 
                                  key={amenity.id}
                                  label={amenity.name}
                                  size="small"
                                  variant="outlined"
                                  sx={{ 
                                    bgcolor: 'rgba(156, 39, 176, 0.08)',
                                    borderColor: 'transparent',
                                    color: 'text.secondary'
                                  }}
                                />
                              ))}
                            </Box>
                          </Box>

                          <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<ShoppingCart />}
                            sx={{
                              py: 1.5,
                              borderRadius: 2,
                              textTransform: 'none',
                              fontSize: '1rem',
                              fontWeight: 600,
                              borderColor: '#1976d2',
                              color: '#1976d2',
                              '&:hover': {
                                borderColor: '#1565c0',
                                bgcolor: 'rgba(25, 118, 210, 0.04)',
                              }
                            }}
                          >
                            Add to Cart
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default HotelDetailsPage;