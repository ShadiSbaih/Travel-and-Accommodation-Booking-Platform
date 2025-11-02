import { Box } from '@mui/material';
import RoomCard from './RoomCard';
import type { Room } from '../types';

interface RoomGridViewProps {
  rooms: Room[];
}

function RoomGridView({ rooms }: RoomGridViewProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        },
        gap: 3,
      }}
    >
      {rooms.map((room) => (
        <RoomCard 
          key={room.roomId?.toString() || `room-${room.roomNumber}`} 
          room={room} 
        />
      ))}
    </Box>
  );
}

export default RoomGridView;
