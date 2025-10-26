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

      {/* Amenities & Services - Shown first on mobile/tablet */}
      <Box sx={{ display: { xs: 'block', lg: 'none' } }}>
        {hotel.amenities && hotel.amenities.length > 0 && (
          <AmenitiesList amenities={hotel.amenities} layout="vertical" />
        )}
      </Box>

      {/* Location on Map - Shown second on mobile/tablet */}
      <HotelLocationMap
        latitude={hotel.latitude}
        longitude={hotel.longitude}
        hotelName={hotel.name}
        location={hotel.location || ''}
        height={250}
        zoom={15}
      />

      {/* Amenities & Services - Shown after map on desktop */}
      <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
        {hotel.amenities && hotel.amenities.length > 0 && (
          <AmenitiesList amenities={hotel.amenities} layout="vertical" />
        )}
      </Box>
    </Box>
  );
}

export default HotelSidebar;
