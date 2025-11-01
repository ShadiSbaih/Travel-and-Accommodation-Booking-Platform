import { Box, Typography } from '@mui/material';
import RoomCard from './RoomCard';
import type { RoomsListProps } from '../../types';

function RoomsList({ rooms, onRoomSelect, cartItems }: RoomsListProps) {
  if (!rooms?.length) return null;

  return (
    <Box>
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 700, mb: 3, fontSize: { xs: '1.5rem', md: '1.75rem' } }}
      >
        Available Rooms ({rooms.length})
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' },
          gridAutoRows: '1fr',
          gap: 3,
        }}
      >
        {rooms.map((room) => (
          <RoomCard
            key={room.roomId}
            room={room}
            onBookNow={onRoomSelect}
            isInCart={cartItems.includes(room.roomId)}
          />
        ))}
      </Box>
    </Box>
  );
}

export default RoomsList;
