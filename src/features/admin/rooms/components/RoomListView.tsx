import { Chip, IconButton, Tooltip, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AdminEntityTable from '@/shared/components/AdminEntityTable';
import { useAppDispatch } from '@/core/store/hooks';
import { openRoomDialog } from '@/core/store/slices/adminUiSlice';
import type { AdminEntityTableColumn } from '@/shared/components/AdminEntityTable/types';
import type { Room } from '../types';

interface RoomListViewProps {
  rooms: Room[];
}

function RoomListView({ rooms }: RoomListViewProps) {
  const dispatch = useAppDispatch();

  const handleEdit = (room: Room) => {
    dispatch(openRoomDialog(room));
  };

  const columns: AdminEntityTableColumn<Room>[] = [
    {
      id: 'image',
      header: 'Image',
      align: 'center',
      render: (room) => (
        <Avatar
          src={room.roomPhotoUrl}
          alt={`Room ${room.roomNumber}`}
          variant="rounded"
          sx={{ width: 56, height: 56 }}
        />
      ),
    },
    {
      id: 'roomNumber',
      header: 'Room Number',
      render: (room) => `#${room.roomNumber}`,
    },
    {
      id: 'roomType',
      header: 'Type',
      render: (room) => room.roomType,
    },
    {
      id: 'capacity',
      header: 'Capacity',
      render: (room) => `${room.capacityOfAdults} Adults, ${room.capacityOfChildren} Children`,
    },
    {
      id: 'price',
      header: 'Price/Night',
      align: 'right',
      render: (room) => `$${room.price.toFixed(2)}`,
    },
    {
      id: 'availability',
      header: 'Status',
      align: 'center',
      render: (room) => (
        <Chip
          icon={room.availability ? <CheckCircleIcon /> : <CancelIcon />}
          label={room.availability ? 'Available' : 'Unavailable'}
          color={room.availability ? 'success' : 'error'}
          size="small"
          sx={{ fontWeight: 600 }}
        />
      ),
    },
    {
      id: 'amenities',
      header: 'Amenities',
      render: (room) => room.amenities?.length || 0,
    },
    {
      id: 'actions',
      header: 'Actions',
      align: 'center',
      render: (room) => (
        <Tooltip title="Edit Room">
          <IconButton
            onClick={() => handleEdit(room)}
            size="small"
            sx={{
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#22d3ee' : '#0d9488',
              '&:hover': {
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(6, 182, 212, 0.1)'
                    : 'rgba(20, 184, 166, 0.1)',
              },
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  return (
    <AdminEntityTable
      rows={rooms}
      columns={columns}
      getRowKey={(room) => room.roomId?.toString() || `room-${room.roomNumber}`}
      emptyMessage="No rooms found"
      size="medium"
    />
  );
}

export default RoomListView;
