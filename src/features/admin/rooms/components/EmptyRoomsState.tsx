import EmptyState from '@/shared/components/EmptyState';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';

interface EmptyRoomsStateProps {
  onCreateRoom: () => void;
}

function EmptyRoomsState({ onCreateRoom }: EmptyRoomsStateProps) {
  return (
    <EmptyState
      icon={<MeetingRoomIcon sx={{ fontSize: '3rem', color: 'text.secondary' }} />}
      title="No Rooms Yet"
      subtitle="Start by creating your first room to manage accommodations."
      action={{
        label: 'Create Room',
        onClick: onCreateRoom,
      }}
    />
  );
}

export default EmptyRoomsState;
