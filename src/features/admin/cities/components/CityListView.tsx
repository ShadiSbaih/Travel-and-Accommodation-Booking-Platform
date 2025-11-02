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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useCities } from '../hooks/useCities';
import type { City } from '../types';

interface CityListViewProps {
  cities: City[];
  onEdit: (city: City) => void;
}

function CityListView({ cities, onEdit }: CityListViewProps) {
  const { deleteCity, isDeleting } = useCities();

  const handleDelete = (city: City) => {
    if (window.confirm(`Are you sure you want to delete ${city.name}?`)) {
      deleteCity(city.id);
    }
  };

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        borderRadius: 4,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>
              City
            </TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 700, fontSize: '0.875rem' }}>
              ID
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
          {cities.map((city, index) => (
            <TableRow
              key={city.id}
              sx={{
                '&:nth-of-type(odd)': { bgcolor: 'grey.50' },
                '&:hover': {
                  bgcolor: 'action.hover',
                  transition: 'background-color 0.2s',
                },
                animation: `fadeIn 0.3s ease-in ${index * 0.05}s`,
                '@keyframes fadeIn': {
                  from: { opacity: 0, transform: 'translateY(10px)' },
                  to: { opacity: 1, transform: 'translateY(0)' },
                },
              }}
            >
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
                    }}
                  >
                    <LocationOnIcon sx={{ color: 'white', fontSize: 20 }} />
                  </Box>
                  <Typography variant="body1" fontWeight={600}>
                    {city.name}
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>
                <Chip
                  label={city.id}
                  size="small"
                  sx={{
                    bgcolor: 'grey.200',
                    fontWeight: 600,
                  }}
                />
              </TableCell>
              <TableCell>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    maxWidth: 400,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {city.description || 'No description available'}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  <Tooltip title="Edit City" arrow>
                    <IconButton
                      size="small"
                      onClick={() => onEdit(city)}
                      sx={{
                        color: 'primary.main',
                        '&:hover': {
                          bgcolor: 'primary.50',
                        },
                      }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete City" arrow>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(city)}
                      disabled={isDeleting}
                      sx={{
                        color: 'error.main',
                        '&:hover': {
                          bgcolor: 'error.50',
                        },
                      }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CityListView;
