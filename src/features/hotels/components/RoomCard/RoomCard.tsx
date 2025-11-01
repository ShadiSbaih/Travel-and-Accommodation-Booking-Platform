import { Card, CardMedia, CardContent, Box, Typography, Chip, Button } from '@mui/material';
import { People, ChildCare } from '@mui/icons-material';
import type { RoomCardProps } from '../../types';

function RoomCard({ room, onBookNow, isInCart = false }: RoomCardProps) {
  const isDisabled = !room.availability;
  const buttonColor = isInCart ? 'error' : 'primary';
  const buttonText = isDisabled ? 'Unavailable' : isInCart ? 'Remove' : 'Book Now';

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
          borderColor: 'primary.main',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="220"
          image={room.roomPhotoUrl}
          alt={room.roomType}
          sx={{ objectFit: 'cover' }}
        />
        <Chip
          label={room.availability ? 'Available' : 'Unavailable'}
          size="small"
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            bgcolor: room.availability ? 'success.main' : 'grey.500',
            color: 'white',
            fontWeight: 600,
          }}
        />
      </Box>

      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{ fontWeight: 700, mb: 2, fontSize: '1.25rem' }}
        >
          {room.roomType} (Room {room.roomNumber})
        </Typography>

        <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
          <Chip
            icon={<People sx={{ fontSize: 18 }} />}
            label={`${room.capacityOfAdults} Adults`}
            size="small"
            sx={{
              bgcolor: 'rgba(25, 118, 210, 0.1)',
              color: 'primary.main',
              fontWeight: 600,
            }}
          />
          <Chip
            icon={<ChildCare sx={{ fontSize: 18 }} />}
            label={`${room.capacityOfChildren} Children`}
            size="small"
            sx={{
              bgcolor: 'rgba(46, 125, 50, 0.1)',
              color: 'success.main',
              fontWeight: 600,
            }}
          />
        </Box>

        <Box sx={{ mb: 3 }}>
          <Typography
            variant="caption"
            sx={{ fontWeight: 700, mb: 1, display: 'block', color: 'text.secondary' }}
          >
            Room Amenities
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {room.roomAmenities.map((amenity) => (
              <Chip
                key={amenity.id}
                label={amenity.name}
                size="small"
                variant="outlined"
                sx={{ fontSize: '0.75rem', borderColor: 'divider', color: 'text.secondary' }}
              />
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 800, color: 'primary.main', fontSize: '1.5rem' }}
          >
            ${room.price.toFixed(2)}
          </Typography>
          <Button
            variant="contained"
            color={isDisabled ? 'inherit' : buttonColor}
            onClick={() => onBookNow?.(room.roomId)}
            disabled={isDisabled}
            sx={{ fontWeight: 700 }}
          >
            {buttonText}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default RoomCard;
