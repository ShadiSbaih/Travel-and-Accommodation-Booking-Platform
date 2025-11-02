import { useState } from 'react';
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
import BedIcon from '@mui/icons-material/Bed';
import { useRooms } from '../hooks/useRooms';
import { useAppDispatch } from '@/core/store/hooks';
import { openRoomDialog } from '@/core/store/slices/adminUiSlice';
import { useNotification } from '@/shared/hooks/useNotification';
import ConfirmDialog from '@/shared/components/ConfirmDialog';
import OptimizedImage from '@/shared/components/OptimizedImage';
import type { Room } from '../types';

interface RoomCardProps {
  room: Room;
}

function RoomCard({ room }: RoomCardProps) {
  const dispatch = useAppDispatch();
  const notify = useNotification();
  const { deleteRoom, isDeleting } = useRooms();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleEdit = () => {
    dispatch(openRoomDialog(room));
  };

  const handleDeleteClick = () => {
    setConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteRoom(room.roomId);
      setConfirmOpen(false);
      notify(`Room #${room.roomNumber} has been deleted successfully`, 'success');
    } catch (error) {
      console.error(error);
      notify('Failed to delete room. Please try again.', 'error');
    }
  };

  const handleDeleteCancel = () => {
    setConfirmOpen(false);
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
      {/* Room Image */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: 200,
          overflow: 'hidden',
        }}
      >
        <OptimizedImage
          src={room.roomPhotoUrl || 'https://t3.ftcdn.net/jpg/02/94/19/40/360_F_294194023_disE35GtlVLDQx4caNDaWewZI8LbxWFQ.jpg'}
          alt={`${room.roomType} Room #${room.roomNumber}`}
          width={400}
          height={200}
          objectFit="cover"
          sx={{
            borderRadius: '8px 8px 0 0',
          }}
        />
        {/* Room Number Badge */}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            left: 12,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(6, 182, 212, 0.95)'
                : 'rgba(20, 184, 166, 0.95)',
            color: 'white',
            px: 2,
            py: 0.75,
            borderRadius: 1.5,
            fontWeight: 700,
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <BedIcon sx={{ fontSize: 18 }} />
          Room #{room.roomNumber}
        </Box>
        {/* Availability Badge */}
        <Box
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: room.availability
              ? 'rgba(34, 197, 94, 0.95)'
              : 'rgba(239, 68, 68, 0.95)',
            color: 'white',
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            fontWeight: 600,
            fontSize: '0.75rem',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          {room.availability ? 'Available' : 'Unavailable'}
        </Box>
      </Box>

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
            variant="outlined"
            startIcon={<EditIcon />}
            onClick={handleEdit}
            fullWidth
            size="medium"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              borderWidth: 2,
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? '#22d3ee' : '#14b8a6',
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#22d3ee' : '#14b8a6',
              py: 1,
              '&:hover': {
                borderWidth: 2,
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#06b6d4' : '#0d9488',
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(6, 182, 212, 0.08)'
                    : 'rgba(20, 184, 166, 0.08)',
              },
            }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            startIcon={<DeleteIcon />}
            onClick={handleDeleteClick}
            disabled={isDeleting}
            fullWidth
            size="medium"
            sx={{
              textTransform: 'none',
              fontWeight: 600,
              borderRadius: 2,
              borderWidth: 2,
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? '#f87171' : '#ef4444',
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#f87171' : '#ef4444',
              py: 1,
              '&:hover': {
                borderWidth: 2,
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#ef4444' : '#dc2626',
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(239, 68, 68, 0.08)'
                    : 'rgba(239, 68, 68, 0.08)',
              },
            }}
          >
            Delete
          </Button>
        </Stack>
      </CardContent>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Room"
        message={`Are you sure you want to delete Room #${room.roomNumber}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isLoading={isDeleting}
      />
    </Card>
  );
}

export default RoomCard;
