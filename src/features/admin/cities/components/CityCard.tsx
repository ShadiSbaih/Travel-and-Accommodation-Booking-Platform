import { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Tooltip,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useCities } from '../hooks/useCities';
import { useAppDispatch } from '@/core/store/hooks';
import { openCityDialog } from '@/core/store/slices/adminUiSlice';
import { useNotification } from '@/shared/hooks/useNotification';
import ConfirmDialog from '@/shared/components/ConfirmDialog';
import type { City } from '../types';

interface CityCardProps {
  city: City;
}

function CityCard({ city }: CityCardProps) {
  const dispatch = useAppDispatch();
  const notify = useNotification();
  const { deleteCity, isDeleting } = useCities();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleEdit = () => {
    dispatch(openCityDialog(city));
  };

  const handleDeleteClick = () => {
    setConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteCity(city.id);
      setConfirmOpen(false);
      notify(`${city.name} has been deleted successfully`, 'success');
    } catch (error) {
      console.error(error);
      notify('Failed to delete city. Please try again.', 'error');
    }
  };

  const handleDeleteCancel = () => {
    setConfirmOpen(false);
  };

  return (
    <Card
      sx={{
        height: '100%',
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
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        {/* City Icon & Name */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 1.5,
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(6, 182, 212, 0.2)'
                    : 'rgba(20, 184, 166, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <LocationOnIcon
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#22d3ee' : '#0d9488',
                  fontSize: 24,
                }}
              />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="h6"
                fontWeight="700"
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {city.name}
              </Typography>
              <Chip
                label={`ID: ${city.id}`}
                size="small"
                sx={{
                  height: 18,
                  fontSize: '0.65rem',
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(100, 116, 139, 0.3)'
                      : 'grey.200',
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
                  mt: 0.5,
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Description */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="body2"
            sx={{
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#cbd5e1' : 'text.secondary',
              lineHeight: 1.6,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {city.description || 'No description available'}
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: 'flex', gap: 1.5 }}>
          <Tooltip title="Edit City" arrow>
            <Button
              variant="outlined"
              size="medium"
              startIcon={<EditIcon />}
              onClick={handleEdit}
              sx={{
                flex: 1,
                textTransform: 'none',
                borderRadius: 2,
                borderWidth: 2,
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#22d3ee' : '#14b8a6',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#22d3ee' : '#14b8a6',
                fontWeight: 600,
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
          </Tooltip>
          <Tooltip title="Delete City" arrow>
            <Button
              variant="outlined"
              size="medium"
              startIcon={<DeleteIcon />}
              onClick={handleDeleteClick}
              disabled={isDeleting}
              sx={{
                flex: 1,
                textTransform: 'none',
                borderRadius: 2,
                borderWidth: 2,
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#f87171' : '#ef4444',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#f87171' : '#ef4444',
                fontWeight: 600,
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
          </Tooltip>
        </Box>
      </CardContent>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete City"
        message={`Are you sure you want to delete "${city.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isLoading={isDeleting}
      />
    </Card>
  );
}

export default CityCard;
