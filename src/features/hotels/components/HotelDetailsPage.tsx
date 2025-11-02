import { useParams, useNavigate } from 'react-router-dom';
import { useAvailableRooms, useHotel, useHotelGallery } from '../hooks/useHotels';
import ErrorState from '@/shared/components/ErrorState';
import { Container, Box } from '@mui/material';
import { HotelGallery, HotelSidebar } from './HotelCard';
import RoomsList from './RoomCard/RoomsList';
import { useCart } from '@/features/cart';
import { useNotification } from '@/shared/hooks/useNotification';
import type { SliderImage } from '@/shared/components/MuiImageSlider/types';
import { ErrorOutline as ErrorIcon } from '@mui/icons-material';
import { HotelDetailsPageSkeleton } from './skeletons';

function HotelDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const hotelId = Number(id);
  const { addToCart, removeFromCart, isInCart } = useCart();
  const notify = useNotification();

  const { data: hotel, isLoading: isLoadingHotel, error: hotelError, refetch: refetchHotel } = useHotel(hotelId);
  const { data: gallery, isLoading: isLoadingGallery, error: galleryError } = useHotelGallery(hotelId);
  const { data: rooms, isLoading: isLoadingRooms } = useAvailableRooms(hotelId);

  const isLoading = isLoadingHotel || isLoadingGallery || isLoadingRooms;
  const hasError = hotelError || galleryError || !hotel;

  if (isLoading) {
    return <HotelDetailsPageSkeleton />;
  }

  if (hasError) {
    return (
      <>
        <Container maxWidth="lg" sx={{ py: 8 }}>
          <ErrorState
            title="Unable to Load Hotel Details"
            message="We couldn't find the hotel you're looking for or there was an error loading the details."
            variant="error"
            icon={<ErrorIcon sx={{ fontSize: '3rem', color: 'error.main' }} />}
            showRetry
            onRetry={() => refetchHotel()}
            action={{
              label: 'Back to Search',
              onClick: () => navigate('/search-results'),
            }}
          />
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

  const cartItems = rooms?.filter((room) => isInCart(hotel.id, room.roomId)).map((r) => r.roomId) || [];

  const handleRoomBooking = (roomId: number) => {
    const room = rooms?.find((r) => r.roomId === roomId);
    if (!room) return;

    const itemId = `${hotel.id}-${room.roomId}`;
    const inCart = isInCart(hotel.id, room.roomId);

    if (inCart) {
      removeFromCart(itemId);
      notify('Room removed from cart', 'info');
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
        roomImage: room.roomPhotoUrl,
        hotelAmenities: room.roomAmenities,
        numberOfNights: 1,
      });
      notify('Room added to cart successfully!', 'success');
    }
  };

  return (
    <>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 6 }}>
        <Container maxWidth="xl" sx={{ mt: 3, px: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', lg: 'row' } }}>
            <Box sx={{ flex: { xs: '1 1 100%', lg: '0 0 65%' } }}>
              <HotelGallery images={sliderImages} />
              {rooms && <RoomsList rooms={rooms} onRoomSelect={handleRoomBooking} cartItems={cartItems} />}
            </Box>

            <Box sx={{ flex: { xs: '1 1 100%', lg: '0 0 calc(35% - 32px)' } }}>
              <HotelSidebar hotel={hotel} />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default HotelDetailsPage;