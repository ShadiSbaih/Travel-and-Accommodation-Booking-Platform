import { Box } from '@mui/material';
import HotelInfoBanner from './HotelInfoBanner';
import HotelLocationMap from './HotelLocationMap';
import AmenitiesList from './AmenitiesList';
import type { HotelSidebarProps } from '../../types';
import type { Review } from '@/shared/components/MuiReviewsSlider';

interface HotelSidebarWithReviewsProps extends HotelSidebarProps {
  reviews?: Review[];
}

function HotelSidebar({ hotel, reviews }: HotelSidebarWithReviewsProps) {
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: { lg: '400px' },
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
      <Box sx={{ display: { xs: 'block', lg: 'none' }, mb: { xs: 4, sm: 3 } }}>
        {hotel.amenities && hotel.amenities.length > 0 && (
          <AmenitiesList amenities={hotel.amenities} layout="vertical" reviews={reviews} />
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
          <AmenitiesList amenities={hotel.amenities} layout="vertical" reviews={reviews} />
        )}
      </Box>
    </Box>
  );
}

export default HotelSidebar;
