import { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardContent, Box, Button, Divider } from '@mui/material';
import type { HotelCardProps } from './types';
import HotelCardImage from './HotelCardImage';
import HotelCardHeader from './HotelCardHeader';
import BookingDetailsBadges from './BookingDetailsBadges';
import AmenitiesSection from './AmenitiesSection';
import PriceDisplay from './PriceDisplay';

const HotelCard = memo(function HotelCard({ hotel }: HotelCardProps) {

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
        }
      }}
    >
      <HotelCardImage
        imageUrl={hotel.roomPhotoUrl ?? ''}
        hotelName={hotel.hotelName ?? ''}
        discount={hotel.discount}
        starRating={hotel.starRating}
      />
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2, '&:last-child': { pb: 2 } }}>
        <HotelCardHeader
          hotelName={hotel.hotelName ?? ''}
          cityName={hotel.cityName ?? ''}
          roomType={hotel.roomType ?? ''}
        />
        
        <Divider sx={{ my: 1 }} />

        <BookingDetailsBadges
          numberOfAdults={hotel.numberOfAdults}
          numberOfChildren={hotel.numberOfChildren}
          numberOfRooms={hotel.numberOfRooms}
          checkInDate={hotel.checkInDate}
          checkOutDate={hotel.checkOutDate}
        />

        <AmenitiesSection amenities={hotel.amenities} maxDisplay={2} />

        <Box sx={{ mt: 'auto' }}>
          <Divider sx={{ mb: 1.5 }} />
          
          <PriceDisplay 
            originalPrice={hotel.roomPrice}
            discount={hotel.discount}
          />

          <Button
            component={NavLink}
            to={`/hotels/${hotel.hotelId}`}
            variant="contained"
            fullWidth
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              py: 1,
              boxShadow: 2,
              '&:hover': {
                boxShadow: 4
              }
            }}
          >
            View Details
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
});

export default HotelCard;