import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
} from '@mui/material';
import { useCities } from '../hooks/useCities';
import type { City } from '../types/city.types';

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
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          p: 2,
        },
      }}
    >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', pb: 1 }}>
        {city ? 'Edit City' : 'Add City'}
      </DialogTitle>

      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{ mb: 3, fontWeight: 500, color: 'text.secondary' }}
          >
            City Information
          </Typography>

          <TextField
            label="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ mb: 3 }}
            required
          />

          <TextField
            label="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            sx={{ mb: 4 }}
          />

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={isCreating || isUpdating || !name.trim()}
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                px: 4,
                py: 1,
              }}
            >
              {city ? 'Update' : 'Add'}
            </Button>
            <Button
              variant="contained"
              onClick={handleCancel}
              disabled={isCreating || isUpdating}
              sx={{
                textTransform: 'none',
                borderRadius: 2,
                px: 4,
                py: 1,
                bgcolor: '#D32F2F',
                '&:hover': {
                  bgcolor: '#B71C1C',
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default CityDialog;
