import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  FormControlLabel,
  Switch,
  Stack,
  Autocomplete,
  Chip,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useFormik } from 'formik';
import { useQuery } from '@tanstack/react-query';
import amenitiesApi from '@/core/api/amenities.api';
import { useRooms } from '../hooks/useRooms';
import { roomValidationSchema } from '../utils/validation.utils';
import type { Room, Amenity } from '../types';

interface RoomDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  room: Room | null;
}

function RoomDialog({ open, onClose, onSuccess, room }: RoomDialogProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { createRoom, updateRoom, isCreating, isUpdating } = useRooms();

  // Fetch available amenities
  const { data: availableAmenities = [] } = useQuery({
    queryKey: ['amenities'],
    queryFn: amenitiesApi.getAmenities,
  });

  const formik = useFormik({
    initialValues: {
      roomNumber: room?.roomNumber || '',
      roomType: room?.roomType || '',
      capacityOfAdults: room?.capacityOfAdults || 2,
      capacityOfChildren: room?.capacityOfChildren || 0,
      price: room?.price || '',
      availability: room?.availability ?? true,
      roomPhotoUrl: room?.roomPhotoUrl || '',
      amenities: room?.amenities || ([] as Amenity[]),
    },
    validationSchema: roomValidationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const roomData = {
        roomNumber: Number(values.roomNumber),
        roomType: values.roomType,
        capacityOfAdults: Number(values.capacityOfAdults),
        capacityOfChildren: Number(values.capacityOfChildren),
        price: Number(values.price),
        availability: values.availability,
        roomPhotoUrl: values.roomPhotoUrl || undefined,
        amenities: values.amenities.length > 0 ? values.amenities : undefined,
      };

      if (room) {
        updateRoom(
          { roomId: room.roomId, data: roomData },
          {
            onSuccess: () => {
              onSuccess();
              formik.resetForm();
            },
          }
        );
      } else {
        createRoom(roomData, {
          onSuccess: () => {
            onSuccess();
            formik.resetForm();
          },
        });
      }
    },
  });

  const handleClose = () => {
    if (formik.dirty) {
      setShowConfirmDialog(true);
    } else {
      formik.resetForm();
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmDialog(false);
    formik.resetForm();
    onClose();
  };

  const handleCancelClose = () => {
    setShowConfirmDialog(false);
  };

  const isLoading = isCreating || isUpdating;

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        slotProps={{
        paper: {
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
          onClick={handleClose}
          size="small"
          aria-label="Close dialog"
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
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Stack spacing={2.5}>
            <Box sx={{ display: 'flex', gap: 2.5 }}>
              <TextField
                label="Room Number"
                type="number"
                name="roomNumber"
                value={formik.values.roomNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.roomNumber && Boolean(formik.errors.roomNumber)}
                helperText={formik.touched.roomNumber && formik.errors.roomNumber}
                fullWidth
                required
                placeholder="Enter room number"
              />
              <TextField
                label="Room Type"
                name="roomType"
                value={formik.values.roomType}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.roomType && Boolean(formik.errors.roomType)}
                helperText={formik.touched.roomType && formik.errors.roomType}
                fullWidth
                required
                placeholder="e.g., Deluxe, Suite, Standard"
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2.5 }}>
              <TextField
                label="Adults Capacity"
                type="number"
                name="capacityOfAdults"
                value={formik.values.capacityOfAdults}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.capacityOfAdults && Boolean(formik.errors.capacityOfAdults)}
                helperText={formik.touched.capacityOfAdults && formik.errors.capacityOfAdults}
                fullWidth
                required
                slotProps={{
                  htmlInput: { min: 1 }
                }}
              />
              <TextField
                label="Children Capacity"
                type="number"
                name="capacityOfChildren"
                value={formik.values.capacityOfChildren}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.capacityOfChildren && Boolean(formik.errors.capacityOfChildren)}
                helperText={formik.touched.capacityOfChildren && formik.errors.capacityOfChildren}
                fullWidth
                required
                slotProps={{
                  htmlInput: { min: 0 }
                }}
              />
            </Box>
            <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'center' }}>
              <TextField
                label="Price per Night"
                type="number"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.price && Boolean(formik.errors.price)}
                helperText={formik.touched.price && formik.errors.price}
                fullWidth
                required
                placeholder="0.00"
                slotProps={{
                  htmlInput: { min: 0, step: 0.01 }
                }}
              />
              <FormControlLabel
                control={
                  <Switch
                    name="availability"
                    checked={formik.values.availability}
                    onChange={formik.handleChange}
                  />
                }
                label="Available"
                sx={{ minWidth: '150px' }}
              />
            </Box>
            <TextField
              label="Room Photo URL (optional)"
              name="roomPhotoUrl"
              value={formik.values.roomPhotoUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.roomPhotoUrl && Boolean(formik.errors.roomPhotoUrl)}
              helperText={formik.touched.roomPhotoUrl && formik.errors.roomPhotoUrl}
              fullWidth
              placeholder="https://example.com/room-photo.jpg"
            />
            <Autocomplete
              multiple
              options={availableAmenities}
              value={formik.values.amenities}
              onChange={(_, newValue) => formik.setFieldValue('amenities', newValue)}
              getOptionLabel={(option) => option.name}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Amenities (optional)"
                  placeholder="Select amenities"
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option.name}
                    {...getTagProps({ index })}
                    key={option.id}
                    size="small"
                    sx={{
                      bgcolor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(6, 182, 212, 0.2)'
                          : 'rgba(20, 184, 166, 0.15)',
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#22d3ee' : '#0d9488',
                    }}
                  />
                ))
              }
              sx={{
                '& .MuiOutlinedInput-root': {
                  padding: '8px',
                },
              }}
            />
          </Stack>
        </Box>
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
          onClick={handleClose}
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
          onClick={() => formik.handleSubmit()}
          variant="contained"
          disabled={isLoading || !formik.isValid}
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

    {/* Confirmation Dialog */}
    <Dialog
      open={showConfirmDialog}
      onClose={handleCancelClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
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
            border: (theme) =>
              theme.palette.mode === 'dark'
                ? '1px solid rgba(148, 163, 184, 0.1)'
                : 'none',
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          pb: 2,
          borderBottom: (theme) =>
            theme.palette.mode === 'dark'
              ? '1px solid rgba(148, 163, 184, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1.5,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(251, 191, 36, 0.2)'
                : 'rgba(251, 191, 36, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <WarningAmberIcon
            sx={{
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#fbbf24' : '#f59e0b',
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
          Unsaved Changes
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ pt: 3, pb: 2 }}>
        <Typography
          variant="body1"
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#cbd5e1' : 'text.secondary',
          }}
        >
          You have unsaved changes. Are you sure you want to close this form? All changes will be lost.
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          p: 2.5,
          gap: 1,
          borderTop: (theme) =>
            theme.palette.mode === 'dark'
              ? '1px solid rgba(148, 163, 184, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <Button
          onClick={handleCancelClose}
          variant="outlined"
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
          Keep Editing
        </Button>
        <Button
          onClick={handleConfirmClose}
          variant="contained"
          color="warning"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? '#f59e0b' : '#f97316',
            '&:hover': {
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? '#d97706' : '#ea580c',
            },
          }}
        >
          Discard Changes
        </Button>
      </DialogActions>
    </Dialog>
  </>
  );
}

export default RoomDialog;
