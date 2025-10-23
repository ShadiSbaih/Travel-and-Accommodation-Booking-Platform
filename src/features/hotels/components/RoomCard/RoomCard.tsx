import { Card, CardMedia, CardContent, Box, Typography, Chip, Button } from '@mui/material';
import { People, ChildCare, ShoppingCart, LocalOffer } from '@mui/icons-material';
import type { Room } from '../../../admin/rooms/room.types';
import type { Amenity } from '../../types/amenities';

interface RoomCardProps {
  room: Room;
  roomImage?: string;
  hotelAmenities?: Amenity[];
  onBookNow?: (roomId: number) => void;
}

function RoomCard({ room, roomImage, hotelAmenities, onBookNow }: RoomCardProps) {
  const defaultImage = 'https://via.placeholder.com/400x220';
  const adultsCount = Math.floor(room.maxOccupancy / 2);
  const childrenCount = room.maxOccupancy % 2 || 1;

  const handleBookNow = () => {
    if (onBookNow) {
      onBookNow(room.id);
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          transform: 'translateY(-4px)',
          borderColor: 'primary.main'
        }
      }}
    >
      {/* Room Image */}
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="220"
          image={roomImage || defaultImage}
          alt={room.name}
          sx={{ objectFit: 'cover' }}
        />
        <Chip
          icon={<LocalOffer sx={{ fontSize: 16 }} />}
          label="Best Value"
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: 'success.main',
            color: 'white',
            fontWeight: 600,
            '& .MuiChip-icon': { color: 'white' }
          }}
        />
      </Box>

      <CardContent sx={{ p: 3 }}>
        {/* Room Name */}
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
            fontSize: '1.25rem'
          }}
        >
          {room.name}
        </Typography>

        {/* Occupancy Chips */}
        <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
          <Chip
            icon={<People sx={{ fontSize: 18 }} />}
            label={`${adultsCount} Adults`}
            size="small"
            sx={{
              bgcolor: 'rgba(25, 118, 210, 0.1)',
              color: 'primary.main',
              fontWeight: 600,
              '& .MuiChip-icon': { color: 'primary.main' }
            }}
          />
          <Chip
            icon={<ChildCare sx={{ fontSize: 18 }} />}
            label={`${childrenCount} Children`}
            size="small"
            sx={{
              bgcolor: 'rgba(46, 125, 50, 0.1)',
              color: 'success.main',
              fontWeight: 600,
              '& .MuiChip-icon': { color: 'success.main' }
            }}
          />
        </Box>

        {/* Room Amenities */}
        {hotelAmenities && hotelAmenities.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 700,
                mb: 1,
                display: 'block',
                color: 'text.secondary',
                textTransform: 'uppercase',
                letterSpacing: 0.5
              }}
            >
              Room Amenities
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {hotelAmenities.slice(0, 3).map((amenity) => (
                <Chip
                  key={amenity.id}
                  label={amenity.name}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: '0.75rem',
                    borderColor: 'divider',
                    color: 'text.secondary'
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Price and Book Button */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 2, sm: 0 },
            justifyContent: 'space-between',
            alignItems: { xs: 'stretch', sm: 'center' },
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                display: 'block',
                fontWeight: 500
              }}
            >
              Starting from
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: 'primary.main',
                fontSize: { xs: '1.5rem', sm: '1.75rem' }
              }}
            >
              ${room.price.toFixed(0)}
              <Typography
                component="span"
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                  ml: 0.5
                }}
              >
                /night
              </Typography>
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<ShoppingCart />}
            onClick={handleBookNow}
            sx={{
              py: 1.5,
              px: { xs: 2, sm: 3 },
              borderRadius: 2,
              textTransform: 'none',
              fontSize: { xs: '0.95rem', sm: '1rem' },
              fontWeight: 700,
              bgcolor: 'primary.main',
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
              '&:hover': {
                bgcolor: 'primary.dark',
                boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            Book Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default RoomCard;
