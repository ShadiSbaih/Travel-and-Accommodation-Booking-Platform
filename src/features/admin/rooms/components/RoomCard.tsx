import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Stack,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PeopleIcon from '@mui/icons-material/People';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import { useRooms } from '../hooks/useRooms';
import { useAppDispatch } from '@/core/store/hooks';
import { openRoomDialog } from '@/core/store/slices/adminUiSlice';
import type { Room } from '../types';

interface RoomCardProps {
  room: Room;
}

function RoomCard({ room }: RoomCardProps) {
  const dispatch = useAppDispatch();
  const { deleteRoom, isDeleting } = useRooms();

  const handleEdit = () => {
    dispatch(openRoomDialog(room));
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete Room #${room.roomNumber}?`)) {
      deleteRoom(room.roomId);
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(30, 41, 59, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: 2,
        boxShadow: (theme) =>
          theme.palette.mode === 'dark'
            ? '0 4px 20px rgba(0, 0, 0, 0.3)'
            : '0 4px 20px rgba(0, 0, 0, 0.08)',
        border: (theme) =>
          theme.palette.mode === 'dark'
            ? '1px solid rgba(148, 163, 184, 0.1)'
            : 'none',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 8px 30px rgba(0, 0, 0, 0.4)'
              : '0 8px 30px rgba(0, 0, 0, 0.12)',
        },
      }}
    >

   

      <CardContent sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Room Type & Price */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
              fontSize: '1.1rem',
            }}
          >
            {room.roomType} Room
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#22d3ee' : '#0d9488',
              fontSize: '1.1rem',
            }}
          >
            $ {room.price}
          </Typography>
        </Box>

        {/* Capacity Badges */}
        <Stack direction="row" spacing={1.5} sx={{ mb: 2.5 }}>
          <Chip
            icon={<PeopleIcon sx={{ fontSize: 18 }} />}
            label={`Adults: ${room.capacityOfAdults}`}
            size="small"
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(59, 130, 246, 0.2)'
                  : 'rgba(59, 130, 246, 0.1)',
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#93c5fd' : '#2563eb',
              fontWeight: 600,
              '& .MuiChip-icon': {
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#93c5fd' : '#2563eb',
              },
            }}
          />
          <Chip
            icon={<ChildCareIcon sx={{ fontSize: 18 }} />}
            label={`Children: ${room.capacityOfChildren}`}
            size="small"
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(34, 197, 94, 0.2)'
                  : 'rgba(34, 197, 94, 0.1)',
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#86efac' : '#16a34a',
              fontWeight: 600,
              '& .MuiChip-icon': {
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#86efac' : '#16a34a',
              },
            }}
          />
        </Stack>

        {/* Amenities Section */}
        <Box sx={{ mb: 3, flexGrow: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 700,
              mb: 1,
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
            }}
          >
            Amenities
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {room.amenities && room.amenities.length > 0 ? (
              room.amenities.map((amenity) => (
                <Chip
                  key={amenity.id}
                  label={amenity.name}
                  size="small"
                  sx={{
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(148, 163, 184, 0.2)'
                        : 'rgba(148, 163, 184, 0.1)',
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? '#cbd5e1' : '#475569',
                    fontSize: '0.75rem',
                  }}
                />
              ))
            ) : (
              <Typography
                variant="body2"
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
                  fontSize: '0.875rem',
                }}
              >
                No amenities listed
              </Typography>
            )}
          </Stack>
        </Box>

        {/* Action Buttons */}
        <Stack direction="row" spacing={1.5}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEdit}
            fullWidth
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(234, 88, 12, 0.9)'
                  : '#ea580c',
              '&:hover': {
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? '#ea580c' : '#c2410c',
              },
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            disabled={isDeleting}
            fullWidth
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(239, 68, 68, 0.9)'
                  : '#ef4444',
              '&:hover': {
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? '#ef4444' : '#dc2626',
              },
            }}
          >
            Delete
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default RoomCard;
