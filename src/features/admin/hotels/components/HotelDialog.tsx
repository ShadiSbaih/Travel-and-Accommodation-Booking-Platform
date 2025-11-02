import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import HotelIcon from '@mui/icons-material/Hotel';
import { useHotels } from '../hooks/useHotels';
import { useQuery } from '@tanstack/react-query';
import { citiesApi } from '@/features/admin/cities/api/cities.api';
import type { Hotel } from '../types';

interface HotelDialogProps {
  open: boolean;
  onClose: () => void;
  hotel: Hotel | null;
}

const hotelTypes = ['Resort', 'Hotel', 'Motel', 'Boutique', 'Inn', 'Lodge', 'Hostel'];

function HotelDialog({ open, onClose, hotel }: HotelDialogProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [hotelType, setHotelType] = useState('Hotel');
  const [starRating, setStarRating] = useState(3);
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [cityId, setCityId] = useState('');

  const { createHotel, updateHotel, isCreating, isUpdating } = useHotels();

  // Fetch cities for dropdown
  const { data: cities } = useQuery({
    queryKey: ['cities'],
    queryFn: () => citiesApi.getCities(),
  });

  useEffect(() => {
    if (hotel) {
      setName(hotel.name || hotel.hotelName);
      setDescription(hotel.description || '');
      setHotelType(hotel.hotelType || 'Hotel');
      setStarRating(hotel.starRating || 3);
      setLatitude(hotel.latitude?.toString() || '');
      setLongitude(hotel.longitude?.toString() || '');
      setCityId(hotel.cityId?.toString() || '');
    } else {
      setName('');
      setDescription('');
      setHotelType('Hotel');
      setStarRating(3);
      setLatitude('');
      setLongitude('');
      setCityId('');
    }
  }, [hotel, open]);

  const handleSubmit = () => {
    if (!name.trim() || !cityId) return;

    const hotelData = {
      name,
      description,
      hotelType,
      starRating: Number(starRating),
      latitude: parseFloat(latitude) || 0,
      longitude: parseFloat(longitude) || 0,
      cityId: Number(cityId),
    };

    if (hotel) {
      // Update hotel
      updateHotel(
        { hotelId: hotel.id, data: hotelData },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    } else {
      // Create hotel
      createHotel(hotelData, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const handleCancel = () => {
    setName('');
    setDescription('');
    setHotelType('Hotel');
    setStarRating(3);
    setLatitude('');
    setLongitude('');
    setCityId('');
    onClose();
  };

  const getTextFieldStyles = () => ({
    '& .MuiOutlinedInput-root': {
      borderRadius: 1.5,
      bgcolor: (theme: any) =>
        theme.palette.mode === 'dark' ? 'rgba(51, 65, 85, 0.3)' : 'white',
      '& fieldset': {
        borderColor: (theme: any) =>
          theme.palette.mode === 'dark'
            ? 'rgba(148, 163, 184, 0.2)'
            : 'rgba(0, 0, 0, 0.12)',
      },
      '&:hover fieldset': {
        borderColor: (theme: any) =>
          theme.palette.mode === 'dark' ? '#22d3ee' : '#14b8a6',
      },
      '&.Mui-focused fieldset': {
        borderWidth: 2,
        borderColor: (theme: any) =>
          theme.palette.mode === 'dark' ? '#06b6d4' : '#0d9488',
      },
      '& input, & textarea, & .MuiSelect-select': {
        color: (theme: any) =>
          theme.palette.mode === 'dark' ? '#e2e8f0' : 'inherit',
      },
    },
    '& .MuiInputLabel-root': {
      color: (theme: any) =>
        theme.palette.mode === 'dark' ? '#94a3b8' : 'inherit',
    },
  });

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
            <HotelIcon sx={{ color: 'white', fontSize: 32 }} />
          </Box>
          <Box>
            <Typography variant="h5" fontWeight="700" color="white">
              {hotel ? 'Edit Hotel' : 'Add New Hotel'}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', mt: 0.5 }}>
              {hotel
                ? 'Update hotel information below'
                : 'Fill in the details to create a new hotel'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <DialogContent sx={{ p: 4 }}>
        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Hotel Name */}
          <TextField
            label="Hotel Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
            sx={getTextFieldStyles()}
            placeholder="Enter hotel name..."
          />

          {/* Hotel Type and Star Rating - Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 3,
            }}
          >
            <TextField
              select
              label="Hotel Type"
              value={hotelType}
              onChange={(e) => setHotelType(e.target.value)}
              fullWidth
              required
              sx={getTextFieldStyles()}
            >
              {hotelTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              type="number"
              label="Star Rating"
              value={starRating}
              onChange={(e) => setStarRating(Number(e.target.value))}
              fullWidth
              required
              inputProps={{ min: 1, max: 5 }}
              sx={getTextFieldStyles()}
            />
          </Box>

          {/* City */}
          <TextField
            select
            label="City"
            value={cityId}
            onChange={(e) => setCityId(e.target.value)}
            fullWidth
            required
            sx={getTextFieldStyles()}
          >
            {cities?.map((city) => (
              <MenuItem key={city.id} value={city.id.toString()}>
                {city.name}
              </MenuItem>
            ))}
          </TextField>

          {/* Latitude and Longitude - Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 3,
            }}
          >
            <TextField
              type="number"
              label="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              fullWidth
              inputProps={{ step: 'any' }}
              sx={getTextFieldStyles()}
              placeholder="e.g., -8.3405"
            />

            <TextField
              type="number"
              label="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              fullWidth
              inputProps={{ step: 'any' }}
              sx={getTextFieldStyles()}
              placeholder="e.g., 115.0915"
            />
          </Box>

          {/* Description */}
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={5}
            sx={getTextFieldStyles()}
            placeholder="Describe the hotel..."
          />

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 1 }}>
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
              disabled={isCreating || isUpdating || !name.trim() || !cityId}
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
              {hotel ? 'Update Hotel' : 'Add Hotel'}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default HotelDialog;
