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
import type { City } from '../types';

interface CityCardProps {
  city: City;
  onEdit: (city: City) => void;
}

function CityCard({ city, onEdit }: CityCardProps) {
  const { deleteCity, isDeleting } = useCities();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${city.name}?`)) {
      deleteCity(city.id);
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: 3,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
        },
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
                borderRadius: 2,
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
              }}
            >
              <LocationOnIcon sx={{ color: 'white', fontSize: 24 }} />
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="h6"
                component="h3"
                fontWeight="700"
                sx={{
                  color: 'text.primary',
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
                  height: 20,
                  fontSize: '0.7rem',
                  bgcolor: 'grey.100',
                  color: 'text.secondary',
                  mt: 0.5,
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mb: 3,
            minHeight: 60,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.6,
          }}
        >
          {city.description || 'No description available'}
        </Typography>

        {/* Action Buttons */}
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'grey.200',
          }}
        >
          <Tooltip title="Edit City" arrow>
            <Button
              variant="outlined"
              size="small"
              startIcon={<EditIcon />}
              onClick={() => onEdit(city)}
              sx={{
                flex: 1,
                textTransform: 'none',
                borderRadius: 2,
                borderColor: 'primary.main',
                color: 'primary.main',
                fontWeight: 600,
                '&:hover': {
                  borderColor: 'primary.dark',
                  bgcolor: 'primary.50',
                },
              }}
            >
              Edit
            </Button>
          </Tooltip>
          <Tooltip title="Delete City" arrow>
            <Button
              variant="outlined"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={handleDelete}
              disabled={isDeleting}
              sx={{
                flex: 1,
                textTransform: 'none',
                borderRadius: 2,
                borderColor: 'error.main',
                color: 'error.main',
                fontWeight: 600,
                '&:hover': {
                  borderColor: 'error.dark',
                  bgcolor: 'error.50',
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

export default CityCard;
