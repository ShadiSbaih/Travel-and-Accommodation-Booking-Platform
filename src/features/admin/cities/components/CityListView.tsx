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
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(30, 41, 59, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: .5,

        overflow: 'hidden',

      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(51, 65, 85, 0.6)'
                  : 'rgba(226, 232, 240, 0.8)',
            }}
          >
            <TableCell
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
                fontWeight: 700,
                fontSize: '0.875rem',
              }}
            >
              City
            </TableCell>
            <TableCell
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
                fontWeight: 700,
                fontSize: '0.875rem',
              }}
            >
              ID
            </TableCell>
            <TableCell
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
                fontWeight: 700,
                fontSize: '0.875rem',
              }}
            >
              Description
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
                fontWeight: 700,
                fontSize: '0.875rem',
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cities.map((city) => (
            <TableRow
              key={city.id}
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
              </TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell>
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
              </TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                  <Tooltip title="Edit City" arrow>
                    <IconButton
                      size="small"
                      onClick={() => onEdit(city)}
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
                      onClick={() => handleDelete(city)}
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CityListView;
