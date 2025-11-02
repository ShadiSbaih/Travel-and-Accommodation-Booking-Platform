import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Chip,
  Box,
  Typography,
  Rating,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HotelIcon from '@mui/icons-material/Hotel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useHotels } from '../hooks/useHotels';
import type { Hotel } from '../types';

interface HotelListViewProps {
  hotels: Hotel[];
  onEdit: (hotel: Hotel) => void;
}

function HotelListView({ hotels, onEdit }: HotelListViewProps) {
  const { deleteHotel, isDeleting } = useHotels();

  const handleDelete = (hotel: Hotel) => {
    if (window.confirm(`Are you sure you want to delete ${hotel.name || hotel.hotelName}?`)) {
      deleteHotel(hotel.id);
    }
  };

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(30, 41, 59, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)'
                  : 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
            }}
          >
            <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>
              Hotel
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>
              Type
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>
              Location
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>
              Rating
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>
              Rooms
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>
              Description
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: 'white', fontWeight: 700, fontSize: '0.875rem' }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hotels.map((hotel, index) => {
            const displayName = hotel.name || hotel.hotelName;
            return (
              <TableRow
                key={`hotel-list-${hotel.id}-${index}`}
                sx={{
                  '&:nth-of-type(odd)': {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(51, 65, 85, 0.3)'
                        : 'grey.50',
                  },
                  '&:hover': {
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(6, 182, 212, 0.1)'
                        : 'rgba(20, 184, 166, 0.05)',
                  },
                }}
              >
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 1,
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
                      <HotelIcon sx={{ color: 'white', fontSize: 20 }} />
                    </Box>
                    <Box>
                      <Typography
                        variant="body2"
                        fontWeight="600"
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
                </TableCell>
                <TableCell>
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
                    }}
                  />
                </TableCell>
                <TableCell>
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
                      {hotel.location}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Rating value={hotel.starRating} readOnly size="small" />
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
                    }}
                  >
                    {hotel.availableRooms} available
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body2"
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
                      maxWidth: 250,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {hotel.description || 'No description'}
                  </Typography>
                </TableCell>
                <TableCell align="center">
                  <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                    <Tooltip title="Edit Hotel" arrow>
                      <IconButton
                        size="small"
                        onClick={() => onEdit(hotel)}
                        sx={{
                          color: (theme) =>
                            theme.palette.mode === 'dark' ? '#22d3ee' : '#14b8a6',
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
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default HotelListView;
