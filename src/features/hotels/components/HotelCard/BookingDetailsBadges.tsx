import { Stack, Chip } from '@mui/material';
import { People, Hotel as HotelIcon, DateRange } from '@mui/icons-material';
import type { BookingDetailsBadgesProps } from './types';

function BookingDetailsBadges({ 
  numberOfAdults, 
  numberOfChildren, 
  numberOfRooms, 
  checkInDate, 
  checkOutDate 
}: BookingDetailsBadgesProps) {
  return (
    <>
      <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
        <Chip
          icon={<People />}
          label={`${numberOfAdults} Adult${numberOfAdults > 1 ? 's' : ''}`}
          size="small"
          color="primary"
          variant="outlined"
          sx={{ height: 24, fontSize: '0.75rem' }}
        />
        {numberOfChildren > 0 && (
          <Chip
            label={`${numberOfChildren} Child${numberOfChildren > 1 ? 'ren' : ''}`}
            size="small"
            color="secondary"
            variant="outlined"
            sx={{ height: 24, fontSize: '0.75rem' }}
          />
        )}
        <Chip
          icon={<HotelIcon />}
          label={`${numberOfRooms} Room${numberOfRooms > 1 ? 's' : ''}`}
          size="small"
          color="info"
          variant="outlined"
          sx={{ height: 24, fontSize: '0.75rem' }}
        />
      </Stack>

      <Chip
        icon={<DateRange />}
        label={`${checkInDate} - ${checkOutDate}`}
        size="small"
        color="success"
        variant="outlined"
        sx={{ height: 24, fontSize: '0.75rem', mb: 1, width: 'fit-content' }}
      />
    </>
  );
}

export default BookingDetailsBadges;
