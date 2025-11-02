import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import { useCities } from '../hooks/useCities';
import type { City } from '../types';

interface CityDialogProps {
  open: boolean;
  onClose: () => void;
  city: City | null;
}

function CityDialog({ open, onClose, city }: CityDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const { createCity, updateCity, isCreating, isUpdating } = useCities();

  useEffect(() => {
    if (city) {
      setName(city.name);
      setDescription(city.description || '');
    } else {
      setName('');
      setDescription('');
    }
  }, [city, open]);

  const handleSubmit = () => {
    if (!name.trim()) return;

    if (city) {
      // PUT /cities/{cityId} - Update city
      updateCity(
        { cityId: city.id, data: { name, description } },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    } else {
      // POST /cities - Create city
      createCity(
        { name, description },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    }
  };

  const handleCancel = () => {
    setName('');
    setDescription('');
    onClose();
  };

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
      {/* Header with Gradient */}
      <Box
        sx={{
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)'
              : 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
          p: 3,
          position: 'relative',
        }}
      >
        <IconButton
          onClick={handleCancel}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: 'white',
            bgcolor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 1.5,
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AddLocationIcon sx={{ color: 'white', fontSize: 32 }} />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight="700" color="white">
              {city ? 'Edit City' : 'Add New City'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mt: 0.5 }}>
              {city
                ? 'Update city information below'
                : 'Fill in the details to create a new city'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <DialogContent sx={{ p: 4 }}>
        <Box sx={{ mt: 1 }}>
          <TextField
            label="City Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            variant="outlined"
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 1.5,
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(51, 65, 85, 0.3)' : 'white',
                '& fieldset': {
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(148, 163, 184, 0.2)'
                      : 'rgba(0, 0, 0, 0.12)',
                },
                '&:hover fieldset': {
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#22d3ee' : '#14b8a6',
                },
                '&.Mui-focused fieldset': {
                  borderWidth: 2,
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#06b6d4' : '#0d9488',
                },
                '& input': {
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#e2e8f0' : 'inherit',
                },
              },
              '& .MuiInputLabel-root': {
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#94a3b8' : 'inherit',
              },
            }}
            placeholder="Enter city name..."
          />

          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={5}
            variant="outlined"
            sx={{
              mb: 4,
              '& .MuiOutlinedInput-root': {
                borderRadius: 1.5,
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(51, 65, 85, 0.3)' : 'white',
                '& fieldset': {
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(148, 163, 184, 0.2)'
                      : 'rgba(0, 0, 0, 0.12)',
                },
                '&:hover fieldset': {
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#22d3ee' : '#14b8a6',
                },
                '&.Mui-focused fieldset': {
                  borderWidth: 2,
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#06b6d4' : '#0d9488',
                },
                '& textarea': {
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#e2e8f0' : 'inherit',
                },
              },
              '& .MuiInputLabel-root': {
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#94a3b8' : 'inherit',
              },
            }}
            placeholder="Describe the city..."
          />

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={handleCancel}
              disabled={isCreating || isUpdating}
              sx={{
                textTransform: 'none',
                borderRadius: 1.5,
                px: 4,
                py: 1.2,
                fontWeight: 600,
                borderColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(148, 163, 184, 0.3)'
                    : 'grey.400',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
                '&:hover': {
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#475569' : 'grey.600',
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(51, 65, 85, 0.3)'
                      : 'grey.50',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isCreating || isUpdating || !name.trim()}
              startIcon={<SaveIcon />}
              sx={{
                textTransform: 'none',
                borderRadius: 1.5,
                px: 4,
                py: 1.2,
                fontWeight: 600,
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)'
                    : 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
                '&:hover': {
                  background: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'linear-gradient(135deg, #0e7490 0%, #0891b2 100%)'
                      : 'linear-gradient(135deg, #0d9488 0%, #0891b2 100%)',
                },
                '&:disabled': {
                  background: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(100, 116, 139, 0.3)'
                      : 'grey.300',
                  boxShadow: 'none',
                },
              }}
            >
              {city ? 'Update City' : 'Add City'}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default CityDialog;
