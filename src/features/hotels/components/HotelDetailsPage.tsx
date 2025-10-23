import Navbar from '@/shared/components/Navbar';
import { useParams } from 'react-router-dom';
import { useHotel, useHotelGallery } from '../hooks/useHotels';
import { MuiImageSlider } from '@/shared/components/MuiImageSlider';
import type { SliderImage } from '@/shared/components/MuiImageSlider/types';
import LoadingState from '@/shared/components/LoadingState';
import ErrorState from '@/shared/components/ErrorState';
import { MuiMap } from '@/shared/components/MuiMap';
import {
  Container,
  Typography,
  Paper,
  Box,
  Chip,
  Button,
  Card,
  CardMedia,
  CardContent,
} from '@mui/material';
import {
  LocationOn,
  Star,
  People,
  ChildCare,
  ShoppingCart,
  LocalOffer,
  CheckCircle
} from '@mui/icons-material';

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
              <Paper
                elevation={0}
                sx={{
                  p: 0,
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: 'divider',
                  mb: 4
                }}
              >
                {sliderImages.length > 0 && (
                  <MuiImageSlider images={sliderImages} />
                )}
              </Paper>

              {/* Available Rooms Section */}
              {hotel?.rooms && hotel.rooms.length > 0 && (
                <Box>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      fontSize: { xs: '1.5rem', md: '1.75rem' }
                    }}
                  >
                    Available Rooms ({hotel.rooms.length})
                  </Typography>
                  <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
                    gap: 3
                  }}>
                    {hotel.rooms.map((room) => (
                      <Card
                        key={room.id}
                        elevation={0}
                        sx={{
                          borderRadius: 3,
                          border: '1px solid',
                          borderColor: 'divider',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                            transform: 'translateY(-4px)',
                            borderColor: 'primary.main'
                          }
                        }}
                      >
                        <Box sx={{ position: 'relative' }}>
                          <CardMedia
                            component="img"
                            height="220"
                            image={gallery?.[0]?.url || 'https://via.placeholder.com/400x220'}
                            alt={room.name}
                            sx={{ objectFit: 'cover' }}
                          />
                          <Chip
                            icon={<LocalOffer sx={{ fontSize: 16 }} />}
                            label="Best Value"
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 12,
                              right: 12,
                              bgcolor: 'success.main',
                              color: 'white',
                              fontWeight: 600,
                              '& .MuiChip-icon': { color: 'white' }
                            }}
                          />
                        </Box>
                        <CardContent sx={{ p: 3 }}>
                          <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                              fontWeight: 700,
                              mb: 2,
                              fontSize: '1.25rem'
                            }}
                          >
                            {room.name}
                          </Typography>

                          <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
                            <Chip
                              icon={<People sx={{ fontSize: 18 }} />}
                              label={`${Math.floor(room.maxOccupancy / 2)} Adults`}
                              size="small"
                              sx={{
                                bgcolor: 'rgba(25, 118, 210, 0.1)',
                                color: 'primary.main',
                                fontWeight: 600,
                                '& .MuiChip-icon': { color: 'primary.main' }
                              }}
                            />
                            <Chip
                              icon={<ChildCare sx={{ fontSize: 18 }} />}
                              label={`${room.maxOccupancy % 2 || 1} Children`}
                              size="small"
                              sx={{
                                bgcolor: 'rgba(46, 125, 50, 0.1)',
                                color: 'success.main',
                                fontWeight: 600,
                                '& .MuiChip-icon': { color: 'success.main' }
                              }}
                            />
                          </Box>

                          {hotel.amenities && hotel.amenities.length > 0 && (
                            <Box sx={{ mb: 3 }}>
                              <Typography
                                variant="caption"
                                sx={{
                                  fontWeight: 700,
                                  mb: 1,
                                  display: 'block',
                                  color: 'text.secondary',
                                  textTransform: 'uppercase',
                                  letterSpacing: 0.5
                                }}
                              >
                                Room Amenities
                              </Typography>
                              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {hotel.amenities?.slice(0, 3).map((amenity) => (
                                  <Chip
                                    key={amenity.id}
                                    label={amenity.name}
                                    size="small"
                                    variant="outlined"
                                    sx={{
                                      fontSize: '0.75rem',
                                      borderColor: 'divider',
                                      color: 'text.secondary'
                                    }}
                                  />
                                ))}
                              </Box>
                            </Box>
                          )}

                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              pt: 2,
                              borderTop: '1px solid',
                              borderColor: 'divider'
                            }}
                          >
                            <Box>
                              <Typography
                                variant="caption"
                                sx={{
                                  color: 'text.secondary',
                                  display: 'block',
                                  fontWeight: 500
                                }}
                              >
                                Starting from
                              </Typography>
                              <Typography
                                variant="h5"
                                sx={{
                                  fontWeight: 800,
                                  color: 'primary.main',
                                  fontSize: '1.75rem'
                                }}
                              >
                                ${room.price.toFixed(0)}
                                <Typography
                                  component="span"
                                  variant="body2"
                                  sx={{
                                    color: 'text.secondary',
                                    fontWeight: 500,
                                    ml: 0.5
                                  }}
                                >
                                  /night
                                </Typography>
                              </Typography>
                            </Box>
                            <Button
                              variant="contained"
                              startIcon={<ShoppingCart />}
                              sx={{
                                py: 1.5,
                                px: 3,
                                borderRadius: 2,
                                textTransform: 'none',
                                fontSize: '1rem',
                                fontWeight: 700,
                                bgcolor: 'primary.main',
                                boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                                '&:hover': {
                                  bgcolor: 'primary.dark',
                                  boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                                  transform: 'translateY(-2px)'
                                },
                                transition: 'all 0.3s ease'
                              }}
                            >
                              Book Now
                            </Button>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>

            {/* Right Column - Info Banner, Location Map & Amenities */}
            <Box sx={{ flex: { xs: '1 1 100%', lg: '0 0 calc(35% - 32px)' } }}>
              {hotel && (
                <Box
                  sx={{
                    position: { lg: 'sticky' },
                    top: { lg: 24 }
                  }}
                >
                  {/* Hotel Info Banner */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                      mb: 3,
                      background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(33, 203, 243, 0.05) 100%)'
                    }}
                  >
                    {/* Location */}
                    {hotel?.location && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <LocationOn sx={{ fontSize: 20, color: 'error.main' }} />
                        <Typography variant="body1" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {hotel.location}
                        </Typography>
                      </Box>
                    )}

                    {/* Star Rating and Hotel Type */}
                    <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
                      {hotel?.starRating && (
                        <Chip
                          icon={<Star sx={{ fontSize: 16 }} />}
                          label={`${hotel.starRating} Star Hotel`}
                          size="small"
                          sx={{
                            bgcolor: 'warning.main',
                            color: 'white',
                            fontWeight: 600,
                            '& .MuiChip-icon': { color: 'white' }
                          }}
                        />
                      )}

                      {hotel?.hotelType && (
                        <Chip
                          label={hotel.hotelType}
                          size="small"
                          sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            fontWeight: 600
                          }}
                        />
                      )}
                    </Box>

                    {/* About This Property */}
                    <Box>
                      <Typography
                        variant="h6"
                        component="h3"
                        sx={{
                          fontWeight: 700,
                          mb: 1.5,
                          fontSize: '1.1rem',
                          color: 'text.primary'
                        }}
                      >
                        About This Property
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.7,
                          fontSize: '0.95rem'
                        }}
                      >
                        {hotel?.description}
                      </Typography>
                    </Box>
                  </Paper>

                  {/* Location on Map */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      borderRadius: 3,
                      border: '1px solid',
                      borderColor: 'divider',
                      mb: 3
                    }}
                  >
                    <Typography
                      variant="h6"
                      component="h2"
                      gutterBottom
                      sx={{
                        fontWeight: 700,
                        mb: 2,
                        fontSize: '1.1rem'
                      }}
                    >
                      Location
                    </Typography>
                    <Box sx={{
                      borderRadius: 2,
                      overflow: 'hidden',
                      border: '1px solid',
                      borderColor: 'divider'
                    }}>
                      <MuiMap
                        latitude={hotel.latitude}
                        longitude={hotel.longitude}
                        hotelName={hotel.name}
                        location={hotel.location}
                        height={300}
                        zoom={15}
                      />
                    </Box>
                  </Paper>

                  {/* Amenities & Services */}
                  {hotel?.amenities && hotel.amenities.length > 0 && (
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        border: '1px solid',
                        borderColor: 'divider'
                      }}
                    >
                      <Typography
                        variant="h6"
                        component="h2"
                        gutterBottom
                        sx={{
                          fontWeight: 700,
                          mb: 2.5,
                          fontSize: '1.1rem'
                        }}
                      >
                        Amenities & Services
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        {hotel.amenities.map((amenity) => (
                          <Box
                            key={amenity.id}
                            sx={{
                              p: 2,
                              bgcolor: 'background.paper',
                              borderRadius: 2,
                              border: '1px solid',
                              borderColor: 'divider',
                              transition: 'all 0.3s ease',
                              '&:hover': {
                                borderColor: 'primary.main',
                                boxShadow: '0 2px 8px rgba(25, 118, 210, 0.12)',
                                transform: 'translateX(4px)'
                              }
                            }}
                          >
                            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                              <CheckCircle sx={{ color: 'success.main', fontSize: 20, mt: 0.2, flexShrink: 0 }} />
                              <Box sx={{ flex: 1 }}>
                                <Typography
                                  variant="subtitle2"
                                  sx={{
                                    fontWeight: 700,
                                    color: 'text.primary',
                                    mb: 0.5,
                                    fontSize: '0.95rem'
                                  }}
                                >
                                  {amenity.name}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: 'text.secondary',
                                    lineHeight: 1.5,
                                    fontSize: '0.85rem'
                                  }}
                                >
                                  {amenity.description}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Paper>
                  )}
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