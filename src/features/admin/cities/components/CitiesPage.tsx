import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Fade,
  Paper,
  Chip,
  Stack,
  IconButton,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import { useCities } from '../hooks/useCities';
import CityCard from './CityCard';
import CityDialog from './CityDialog';
import CityListView from './CityListView';
import type { City } from '../types';

function CitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Use 'name' filter as per API requirements (GET /cities?name=...)
  const { cities, isLoading } = useCities({ name: searchQuery });

  const handleOpenDialog = (city?: City) => {
    setSelectedCity(city || null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedCity(null);
    setDialogOpen(false);
  };

  const handleReset = () => {
    setSearchQuery('');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {/* Main Container */}
      <Fade in timeout={800}>
        <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
          {/* Header Section with Glass Morphism */}
          <Paper
            elevation={0}
            sx={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              borderRadius: 4,
              p: 3,
              mb: 3,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'stretch', md: 'center' },
                gap: 2,
              }}
            >
              {/* Title & Stats */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                  }}
                >
                  <LocationCityIcon sx={{ color: 'white', fontSize: 32 }} />
                </Box>
                <Box>
                  <Typography
                    variant="h4"
                    component="h1"
                    fontWeight="700"
                    sx={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Cities Management
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                    <Chip
                      label={`${cities?.length || 0} Cities`}
                      size="small"
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white',
                        fontWeight: 600,
                      }}
                    />
                  </Stack>
                </Box>
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                {/* View Toggle */}
                <Paper
                  elevation={0}
                  sx={{
                    display: 'flex',
                    p: 0.5,
                    borderRadius: 2,
                    bgcolor: 'grey.100',
                  }}
                >
                  <Tooltip title="Grid View">
                    <IconButton
                      size="small"
                      onClick={() => setViewMode('grid')}
                      sx={{
                        borderRadius: 1.5,
                        bgcolor: viewMode === 'grid' ? 'white' : 'transparent',
                        '&:hover': { bgcolor: viewMode === 'grid' ? 'white' : 'grey.200' },
                      }}
                    >
                      <ViewModuleIcon
                        sx={{ color: viewMode === 'grid' ? 'primary.main' : 'grey.600' }}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="List View">
                    <IconButton
                      size="small"
                      onClick={() => setViewMode('list')}
                      sx={{
                        borderRadius: 1.5,
                        bgcolor: viewMode === 'list' ? 'white' : 'transparent',
                        '&:hover': { bgcolor: viewMode === 'list' ? 'white' : 'grey.200' },
                      }}
                    >
                      <ViewListIcon
                        sx={{ color: viewMode === 'list' ? 'primary.main' : 'grey.600' }}
                      />
                    </IconButton>
                  </Tooltip>
                </Paper>

                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog()}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    textTransform: 'none',
                    borderRadius: 2.5,
                    px: 3,
                    py: 1.2,
                    fontWeight: 600,
                    boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5568d3 0%, #6a3f8f 100%)',
                      boxShadow: '0 6px 25px rgba(102, 126, 234, 0.5)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Add City
                </Button>
              </Box>
            </Box>

            {/* Search Bar */}
            <Box sx={{ mt: 3 }}>
              <TextField
                fullWidth
                placeholder="Search cities by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'primary.main' }} />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <Tooltip title="Clear search">
                        <IconButton
                          size="small"
                          onClick={handleReset}
                          sx={{
                            bgcolor: 'grey.100',
                            '&:hover': { bgcolor: 'grey.200' },
                          }}
                        >
                          <RefreshIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 3,
                    bgcolor: 'white',
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                }}
              />
            </Box>
          </Paper>

          {/* Content Area */}
          {isLoading ? (
            <Paper
              elevation={0}
              sx={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: 4,
                p: 8,
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Typography variant="h6" color="text.secondary">
                Loading cities...
              </Typography>
            </Paper>
          ) : cities && cities.length > 0 ? (
            <Fade in timeout={600}>
              <Box>
                {viewMode === 'grid' ? (
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: {
                        xs: '1fr',
                        sm: 'repeat(2, 1fr)',
                        lg: 'repeat(3, 1fr)',
                      },
                      gap: 3,
                    }}
                  >
                    {cities.map((city, index) => (
                      <Fade in timeout={400 + index * 100} key={city.id}>
                        <Box>
                          <CityCard city={city} onEdit={handleOpenDialog} />
                        </Box>
                      </Fade>
                    ))}
                  </Box>
                ) : (
                  <CityListView cities={cities} onEdit={handleOpenDialog} />
                )}
              </Box>
            </Fade>
          ) : (
            <Paper
              elevation={0}
              sx={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                borderRadius: 4,
                p: 8,
                textAlign: 'center',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
              <LocationCityIcon sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No cities found
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {searchQuery
                  ? 'Try adjusting your search query'
                  : 'Start by adding your first city'}
              </Typography>
              {!searchQuery && (
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog()}
                  sx={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    textTransform: 'none',
                    borderRadius: 2.5,
                    px: 3,
                    py: 1.2,
                    fontWeight: 600,
                  }}
                >
                  Add Your First City
                </Button>
              )}
            </Paper>
          )}
        </Box>
      </Fade>

      {/* Add/Edit Dialog */}
      <CityDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        city={selectedCity}
      />
    </Box>
  );
}

export default CitiesPage;
