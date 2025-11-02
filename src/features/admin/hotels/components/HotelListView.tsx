import { Box, IconButton, Tooltip, Chip, Typography, Rating } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HotelIcon from '@mui/icons-material/Hotel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AdminEntityTable from '@/shared/components/AdminEntityTable';
import type { AdminEntityTableColumn } from '@/shared/components/AdminEntityTable';
import { useHotels } from '../hooks/useHotels';
import { useCity } from '@/features/admin/cities/hooks/useCities';
import type { Hotel } from '../types';

interface HotelListViewProps {
  hotels: Hotel[];
  onEdit: (hotel: Hotel) => void;
}

function HotelNameCell({ hotel }: { hotel: Hotel }) {
  const displayName = hotel.name || hotel.hotelName;

  return (
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
          flexShrink: 0,
        }}
      >
        <HotelIcon
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#22d3ee' : '#0d9488',
            fontSize: 20,
          }}
        />
      </Box>
      <Box>
        <Typography
          variant="body1"
          fontWeight={600}
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
          }}
        >
          {displayName}
        </Typography>
        <Chip
          label={`ID: ${hotel.id}`}
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
  );
}

function HotelLocationCell({ hotel }: { hotel: Hotel }) {
  const { data: city } = useCity(hotel.cityId);
  const displayLocation = city?.name || hotel.location;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
      <LocationOnIcon
        sx={{
          fontSize: 16,
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
        }}
      />
      <Typography
        variant="body2"
        sx={{
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
        }}
      >
        {displayLocation}
      </Typography>
    </Box>
  );
}

function HotelListView({ hotels, onEdit }: HotelListViewProps) {
  const { deleteHotel, isDeleting } = useHotels();

  const handleDelete = (hotel: Hotel) => {
    if (window.confirm(`Are you sure you want to delete ${hotel.name || hotel.hotelName}?`)) {
      deleteHotel(hotel.id);
    }
  };

  const columns: AdminEntityTableColumn<Hotel>[] = [
    {
      id: 'hotel',
      header: 'Hotel',
      render: (hotel) => <HotelNameCell hotel={hotel} />,
    },
    {
      id: 'type',
      header: 'Type',
      width: 120,
      render: (hotel) => (
        <Chip
          label={hotel.hotelType}
          size="small"
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(6, 182, 212, 0.2)'
                : 'rgba(20, 184, 166, 0.1)',
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#22d3ee' : '#0d9488',
            fontWeight: 600,
            borderRadius: 1,
          }}
        />
      ),
    },
    {
      id: 'location',
      header: 'Location',
      render: (hotel) => <HotelLocationCell hotel={hotel} />,
    },
    {
      id: 'rating',
      header: 'Rating',
      width: 140,
      render: (hotel) => <Rating value={hotel.starRating} readOnly size="small" />,
    },
    {
      id: 'rooms',
      header: 'Rooms',
      width: 100,
      align: 'center',
      render: (hotel) => (
        <Typography
          variant="body2"
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
          }}
        >
          {hotel.availableRooms}
        </Typography>
      ),
    },
    {
      id: 'description',
      header: 'Description',
      render: (hotel) => (
        <Typography
          variant="body2"
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
            maxWidth: 300,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {hotel.description || 'No description available'}
        </Typography>
      ),
    },
    {
      id: 'actions',
      header: 'Actions',
      align: 'center',
      width: 160,
      render: (hotel) => (
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          <Tooltip title="Edit Hotel" arrow>
            <IconButton
              size="small"
              onClick={() => onEdit(hotel)}
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
          <Tooltip title="Delete Hotel" arrow>
            <IconButton
              size="small"
              onClick={() => handleDelete(hotel)}
              disabled={isDeleting}
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
    <AdminEntityTable
      rows={hotels}
      columns={columns}
      getRowKey={(hotel) => hotel.id}
      emptyMessage="No hotels found"
      containerSx={{ borderRadius: 0.5 }}
    />
  );
}

export default HotelListView;
