import { Box } from '@mui/material';
import HotelInfoBanner from './HotelInfoBanner';
import HotelLocationMap from './HotelLocationMap';
import AmenitiesList from './AmenitiesList';
import type { Hotel } from '../../types/hotel.types';

interface HotelSidebarProps {
  hotel: Hotel;
}

function HotelSidebar({ hotel }: HotelSidebarProps) {
  return (
    <Box
      sx={{
        position: { lg: 'sticky' },
        top: { lg: 24 }
      }}
    >
      {/* Hotel Info Banner */}
      <HotelInfoBanner
        location={hotel.location || ''}
        starRating={hotel.starRating}
        hotelType={hotel.hotelType}
        description={hotel.description}
      />

      {/* Location on Map */}
      <HotelLocationMap
        latitude={hotel.latitude}
        longitude={hotel.longitude}
        hotelName={hotel.name}
        location={hotel.location || ''}
        height={300}
        zoom={15}
      />

      {/* Amenities & Services */}
      {hotel.amenities && hotel.amenities.length > 0 && (
        <AmenitiesList amenities={hotel.amenities} layout="vertical" />
      )}
    </Box>
  );
}

export default HotelSidebar;
