import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  FormControlLabel,
  Switch,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { useRooms } from '../hooks/useRooms';
import type { Room } from '../types';

interface RoomDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  room: Room | null;
}

function RoomDialog({ open, onClose, onSuccess, room }: RoomDialogProps) {
  const [roomNumber, setRoomNumber] = useState('');
  const [roomType, setRoomType] = useState('');
  const [capacityOfAdults, setCapacityOfAdults] = useState('2');
  const [capacityOfChildren, setCapacityOfChildren] = useState('0');
  const [price, setPrice] = useState('');
  const [availability, setAvailability] = useState(true);
  const [roomPhotoUrl, setRoomPhotoUrl] = useState('');

  const { createRoom, updateRoom, isCreating, isUpdating } = useRooms();

  useEffect(() => {
    if (room) {
      setRoomNumber(room.roomNumber.toString());
      setRoomType(room.roomType);
      setCapacityOfAdults(room.capacityOfAdults.toString());
      setCapacityOfChildren(room.capacityOfChildren.toString());
      setPrice(room.price.toString());
      setAvailability(room.availability);
      setRoomPhotoUrl(room.roomPhotoUrl || '');
    } else {
      setRoomNumber('');
      setRoomType('');
      setCapacityOfAdults('2');
      setCapacityOfChildren('0');
      setPrice('');
      setAvailability(true);
      setRoomPhotoUrl('');
    }
  }, [room, open]);

  const handleSubmit = () => {
    if (!roomNumber.trim() || !roomType.trim() || !price.trim()) return;

    const roomData = {
      roomNumber: parseInt(roomNumber, 10),
      roomType,
      capacityOfAdults: parseInt(capacityOfAdults, 10),
      capacityOfChildren: parseInt(capacityOfChildren, 10),
      price: parseFloat(price),
      availability,
      roomPhotoUrl: roomPhotoUrl || undefined,
    };

    if (room) {
      updateRoom(
        { roomId: room.roomId, data: roomData },
        {
          onSuccess: () => {
            onSuccess();
          },
        }
      );
    } else {
      createRoom(roomData, {
        onSuccess: () => {
          onSuccess();
        },
      });
    }
  };

  const handleCancel = () => {
    setRoomNumber('');
    setRoomType('');
    setCapacityOfAdults('2');
    setCapacityOfChildren('0');
    setPrice('');
    setAvailability(true);
    setRoomPhotoUrl('');
    onClose();
  };

  const isLoading = isCreating || isUpdating;

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(30, 41, 59, 0.98)'
              : 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(20px)',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 20px 60px rgba(0, 0, 0, 0.6)'
              : '0 20px 60px rgba(0, 0, 0, 0.3)',
          overflow: 'hidden',
          border: (theme) =>
            theme.palette.mode === 'dark'
              ? '1px solid rgba(148, 163, 184, 0.1)'
              : 'none',
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(6, 182, 212, 0.15)'
              : 'rgba(20, 184, 166, 0.1)',
          p: 2.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: (theme) =>
            theme.palette.mode === 'dark'
              ? '1px solid rgba(148, 163, 184, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1.5,
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(6, 182, 212, 0.2)'
                  : 'rgba(20, 184, 166, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MeetingRoomIcon
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#22d3ee' : '#0d9488',
                fontSize: 24,
              }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
            }}
          >
            {room ? 'Edit Room' : 'Create New Room'}
          </Typography>
        </Box>
        <IconButton
          onClick={handleCancel}
          size="small"
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Content */}
      <DialogContent sx={{ p: 3 }}>
        <Stack spacing={2.5}>
          <Box sx={{ display: 'flex', gap: 2.5 }}>
            <TextField
              label="Room Number"
              type="number"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              fullWidth
              required
              placeholder="Enter room number"
            />
            <TextField
              label="Room Type"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
              fullWidth
              required
              placeholder="e.g., Deluxe, Suite, Standard"
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2.5 }}>
            <TextField
              label="Adults Capacity"
              type="number"
              value={capacityOfAdults}
              onChange={(e) => setCapacityOfAdults(e.target.value)}
              fullWidth
              required
              inputProps={{ min: 1 }}
            />
            <TextField
              label="Children Capacity"
              type="number"
              value={capacityOfChildren}
              onChange={(e) => setCapacityOfChildren(e.target.value)}
              fullWidth
              required
              inputProps={{ min: 0 }}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'center' }}>
            <TextField
              label="Price per Night"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              fullWidth
              required
              placeholder="0.00"
              inputProps={{ min: 0, step: 0.01 }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={availability}
                  onChange={(e) => setAvailability(e.target.checked)}
                />
              }
              label="Available"
              sx={{ minWidth: '150px' }}
            />
          </Box>
          <TextField
            label="Room Photo URL (optional)"
            value={roomPhotoUrl}
            onChange={(e) => setRoomPhotoUrl(e.target.value)}
            fullWidth
            placeholder="https://example.com/room-photo.jpg"
          />
        </Stack>
      </DialogContent>

      {/* Footer */}
      <Box
        sx={{
          p: 2.5,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 1.5,
          borderTop: (theme) =>
            theme.palette.mode === 'dark'
              ? '1px solid rgba(148, 163, 184, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <Button
          onClick={handleCancel}
          variant="outlined"
          disabled={isLoading}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(148, 163, 184, 0.3)' : 'grey.300',
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
            '&:hover': {
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? '#94a3b8' : 'grey.400',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isLoading || !roomNumber.trim() || !roomType.trim() || !price.trim()}
          startIcon={<SaveIcon />}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? '#06b6d4' : '#0d9488',
            '&:hover': {
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? '#0891b2' : '#0f766e',
            },
          }}
        >
          {isLoading ? 'Saving...' : room ? 'Update Room' : 'Create Room'}
        </Button>
      </Box>
    </Dialog>
  );
}

export default RoomDialog;
