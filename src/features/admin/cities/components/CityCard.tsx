import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCities } from '../hooks/useCities';
import type { City } from '../types/city.types';

interface CityCardProps {
  city: City;
  onEdit: (city: City) => void;
}

function CityCard({ city, onEdit }: CityCardProps) {
  const { deleteCity } = useCities();

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${city.name}?`)) {
      deleteCity(city.id);
    }
  };

  // Color variants for cards
  const cardColors = [
    { bg: '#E3F2FD', text: '#1565C0' }, // Light blue
    { bg: '#FCE4EC', text: '#C2185B' }, // Light pink
    { bg: '#F1F8E9', text: '#558B2F' }, // Light green
  ];

  const colorIndex = city.id % cardColors.length;
  const cardStyle = cardColors[colorIndex];

  return (
    <Card
      sx={{
        backgroundColor: cardStyle.bg,
        borderRadius: 3,
        boxShadow: 1,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          component="h3"
          fontWeight="600"
          sx={{ color: cardStyle.text, mb: 2 }}
        >
          {city.name}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: cardStyle.text,
            opacity: 0.8,
            mb: 3,
            minHeight: 48,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {city.description}
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="text"
            startIcon={<EditIcon />}
            onClick={() => onEdit(city)}
            sx={{
              color: '#1976D2',
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Edit
          </Button>
          <Button
            variant="text"
            startIcon={<DeleteIcon />}
            onClick={handleDelete}
            sx={{
              color: '#D32F2F',
              textTransform: 'none',
              fontWeight: 500,
            }}
          >
            Delete
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default CityCard;
