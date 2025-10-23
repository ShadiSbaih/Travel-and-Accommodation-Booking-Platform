import { Box, Typography } from '@mui/material';
import RoomCard from './RoomCard';
import type { Room } from '../../../admin/rooms/room.types';
import type { Amenity } from '../../types/amenities';

interface RoomsListProps {
  rooms: Room[];
  hotelAmenities?: Amenity[];
  roomImage?: string;
  onRoomSelect?: (roomId: number) => void;
}

function RoomsList({ rooms, hotelAmenities, roomImage, onRoomSelect }: RoomsListProps) {
  if (!rooms || rooms.length === 0) return null;

  return (
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
        Available Rooms ({rooms.length})
      </Typography>
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
        gap: 3
      }}>
        {rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            roomImage={roomImage}
            hotelAmenities={hotelAmenities}
            onBookNow={onRoomSelect}
          />
        ))}
      </Box>
    </Box>
  );
}

export default RoomsList;
