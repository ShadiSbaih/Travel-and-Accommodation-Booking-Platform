import { useState } from 'react';
import { Box, IconButton, Tooltip, Chip, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AdminEntityTable from '@/shared/components/AdminEntityTable';
import type { AdminEntityTableColumn } from '@/shared/components/AdminEntityTable';
import { useCities } from '../hooks/useCities';
import { useAppDispatch } from '@/core/store/hooks';
import { openCityDialog } from '@/core/store/slices/adminUiSlice';
import { useNotification } from '@/shared/hooks/useNotification';
import ConfirmDialog from '@/shared/components/ConfirmDialog';
import type { City } from '../types';

interface CityListViewProps {
  cities: City[];
}

function CityListView({ cities }: CityListViewProps) {
  const dispatch = useAppDispatch();
  const notify = useNotification();
  const { deleteCity, isDeleting } = useCities();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [cityToDelete, setCityToDelete] = useState<City | null>(null);

  const handleEdit = (city: City) => {
    dispatch(openCityDialog(city));
  };

  const handleDeleteClick = (city: City) => {
    setCityToDelete(city);
    setConfirmOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!cityToDelete) return;
    
    try {
      await deleteCity(cityToDelete.id);
      setConfirmOpen(false);
      setCityToDelete(null);
      notify(`${cityToDelete.name} has been deleted successfully`, 'success');
    } catch (error) {
      console.error(error);
      notify('Failed to delete city. Please try again.', 'error');
    }
  };

  const handleDeleteCancel = () => {
    setConfirmOpen(false);
    setCityToDelete(null);
  };

  const columns: AdminEntityTableColumn<City>[] = [
    {
      id: 'city',
      header: 'City',
      render: (city) => (
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
            <LocationOnIcon
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#22d3ee' : '#0d9488',
                fontSize: 20,
              }}
            />
          </Box>
          <Typography
            variant="body1"
            fontWeight={600}
            sx={{
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
            }}
          >
            {city.name}
          </Typography>
        </Box>
      ),
    },
    {
      id: 'id',
      header: 'ID',
      width: 120,
      render: (city) => (
        <Chip
          label={city.id}
          size="small"
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(100, 116, 139, 0.3)'
                : 'grey.200',
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#cbd5e1' : 'text.primary',
            fontWeight: 600,
            borderRadius: 1,
          }}
        />
      ),
    },
    {
      id: 'description',
      header: 'Description',
      render: (city) => (
        <Typography
          variant="body2"
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
            maxWidth: 400,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {city.description || 'No description available'}
        </Typography>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      align: 'center',
      width: 160,
      render: (city) => (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          <Tooltip title="Edit City" arrow>
            <IconButton
              size="small"
              onClick={() => handleEdit(city)}
              aria-label="Edit City"
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
          <Tooltip title="Delete City" arrow>
            <IconButton
              size="small"
              onClick={() => handleDeleteClick(city)}
              disabled={isDeleting}
              aria-label="Delete City"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#f87171' : 'error.main',
                '&:hover': {
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(248, 113, 113, 0.1)'
                      : 'rgba(239, 68, 68, 0.1)',
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  return (
    <>
      <AdminEntityTable
        rows={cities}
        columns={columns}
        getRowKey={(city) => city.id}
        emptyMessage="No cities found"
      />
      
      <ConfirmDialog
        open={confirmOpen}
        title="Delete City"
        message={`Are you sure you want to delete "${cityToDelete?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        isLoading={isDeleting}
      />
    </>
  );
}

export default CityListView;
