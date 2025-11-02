import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Tooltip,
  Chip,
  Rating,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HotelIcon from '@mui/icons-material/Hotel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { MuiMap } from '@/shared/components/MuiMap';
import { useHotels } from '../hooks/useHotels';
import type { Hotel } from '../types';

interface HotelCardProps {
  hotel: Hotel;
  onEdit: (hotel: Hotel) => void;
}

function HotelCard({ hotel, onEdit }: HotelCardProps) {
  const { deleteHotel, isDeleting } = useHotels();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${hotel.name || hotel.hotelName}?`)) {
      deleteHotel(hotel.id);
    }
  };

  const displayName = hotel.name || hotel.hotelName;

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
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Hotel Map */}
      <Box
        sx={{
          width: '100%',
          height: 200,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <MuiMap
          latitude={hotel.latitude}
          longitude={hotel.longitude}
          hotelName={displayName}
          location={hotel.location}
          zoom={13}
          height={200}
        />
        <Chip
          label={hotel.hotelType}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            fontWeight: 600,
            backdropFilter: 'blur(8px)',
            zIndex: 10,
          }}
        />
      </Box>

      <CardContent sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Hotel Icon & Name */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1, minWidth: 0 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 1.5,
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)'
                    : 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <HotelIcon sx={{ color: 'white', fontSize: 24 }} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="h6"
                component="h3"
                fontWeight="700"
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {displayName}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                <Rating value={hotel.starRating} readOnly size="small" />
                <Chip
                  label={`ID: ${hotel.id}`}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: '0.7rem',
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(100, 116, 139, 0.3)'
                        : 'grey.100',
                    color: (theme) =>
                      theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Location */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <LocationOnIcon
            sx={{
              fontSize: 18,
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#22d3ee' : '#14b8a6',
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
            }}
          >
            {hotel.location}
          </Typography>
        </Box>

        {/* Available Rooms */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <MeetingRoomIcon
            sx={{
              fontSize: 18,
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#22d3ee' : '#14b8a6',
            }}
          />
          <Typography
            variant="body2"
            sx={{
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
            }}
          >
            {hotel.availableRooms} rooms available
          </Typography>
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
            mb: 3,
            minHeight: 60,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.6,
            flex: 1,
          }}
        >
          {hotel.description || 'No description available'}
        </Typography>

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            pt: 2,
            borderTop: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(148, 163, 184, 0.1)'
                : 'grey.200',
          }}
        >
          <Tooltip title="Edit Hotel" arrow>
            <Button
              variant="outlined"
              size="small"
              startIcon={<EditIcon />}
              onClick={() => onEdit(hotel)}
              sx={{
                flex: 1,
                textTransform: 'none',
                borderRadius: 1,
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#22d3ee' : '#14b8a6',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#67e8f9' : '#0d9488',
                fontWeight: 600,
                '&:hover': {
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#06b6d4' : '#0d9488',
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(6, 182, 212, 0.1)'
                      : 'rgba(20, 184, 166, 0.05)',
                },
              }}
            >
              Edit
            </Button>
          </Tooltip>
          <Tooltip title="Delete Hotel" arrow>
            <Button
              variant="outlined"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              disabled={isDeleting}
              sx={{
                flex: 1,
                textTransform: 'none',
                borderRadius: 1,
                borderColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#f87171' : 'error.main',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#fca5a5' : 'error.main',
                fontWeight: 600,
                '&:hover': {
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#ef4444' : 'error.dark',
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(248, 113, 113, 0.1)'
                      : 'rgba(239, 68, 68, 0.05)',
                },
              }}
            >
              Delete
            </Button>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
}

export default HotelCard;
