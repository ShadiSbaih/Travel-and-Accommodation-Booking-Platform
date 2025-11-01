import { Card, CardMedia, CardContent, Box, Typography, Chip, Button } from '@mui/material';
import { People, ChildCare } from '@mui/icons-material';
import type { RoomCardProps } from '../../types';

function RoomCard({ room, onBookNow, isInCart = false }: RoomCardProps) {
  const isDisabled = !room.availability;
  const buttonColor = isInCart ? 'error' : 'primary';
  const buttonText = isDisabled ? 'Unavailable' : isInCart ? 'Remove from Cart' : 'Add to Cart';

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 1,
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 580,
        '&:hover': {
          boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
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

      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{ fontWeight: 700, mb: 2, fontSize: '1.25rem' }}
        >
          {room.roomType} (Room {room.roomNumber})
        </Typography>

        <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
          <Chip
            icon={<People sx={{ fontSize: 20 }} />}
            label={`${room.capacityOfAdults} Adults`}
            size="medium"
            sx={{
              bgcolor: 'rgba(25, 118, 210, 0.1)',
              color: 'primary.main',
              fontWeight: 600,
              fontSize: '0.9rem',
              height: 36,
            }}
          />
          <Chip
            icon={<ChildCare sx={{ fontSize: 20 }} />}
            label={`${room.capacityOfChildren} Children`}
            size="medium"
            sx={{
              bgcolor: 'rgba(46, 125, 50, 0.1)',
              color: 'success.main',
              fontWeight: 600,
              fontSize: '0.9rem',
              height: 36,
            }}
          />
        </Box>

        <Box sx={{ mb: 3, flexGrow: 1, minHeight: 80 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: 700, mb: 1.5, display: 'block', color: 'text.secondary', fontSize: '0.9rem' }}
          >
            Room Amenities
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {room.roomAmenities.map((amenity) => (
              <Chip
                key={amenity.id}
                label={amenity.name}
                size="medium"
                variant="outlined"
                sx={{ 
                  fontSize: '0.85rem', 
                  borderColor: 'divider', 
                  color: 'text.secondary',
                  height: 32,
                }}
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
