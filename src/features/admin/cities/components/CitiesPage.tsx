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
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'linear-gradient(135deg, #0c4a6e 0%, #164e63 100%)'
            : 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      {/* Main Container */}
      <Fade in timeout={800}>
        <Box sx={{ maxWidth: 1400, mx: 'auto' }}>
          {/* Header Section */}
          <Paper
            elevation={0}
            sx={{
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(30, 41, 59, 0.95)'
                  : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderRadius: 2,
              p: 3,
              mb: 3,
              boxShadow: (theme) =>
                theme.palette.mode === 'dark'
                  ? '0 8px 32px rgba(0, 0, 0, 0.5)'
                  : '0 8px 32px rgba(0, 0, 0, 0.1)',
              border: (theme) =>
                theme.palette.mode === 'dark' ? '1px solid rgba(148, 163, 184, 0.1)' : 'none',
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
                    borderRadius: 1.5,
                    background: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)'
                        : 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
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
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#67e8f9' : '#14b8a6',
                    }}
                  >
                    Cities Management
                  </Typography>
                  <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                    <Chip
                      label={`${cities?.length || 0} Cities`}
                      size="small"
                      sx={{
                        background: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(6, 182, 212, 0.2)'
                            : '#14b8a6',
                        color: (theme) =>
                          theme.palette.mode === 'dark' ? '#67e8f9' : 'white',
                        fontWeight: 600,
                        borderRadius: 1,
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
                    borderRadius: 1,
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? 'rgba(51, 65, 85, 0.6)' : 'grey.100',
                  }}
                >
                  <Tooltip title="Grid View">
                    <IconButton
                      size="small"
                      onClick={() => setViewMode('grid')}
                      sx={{
                        borderRadius: 0.75,
                        bgcolor: (theme) =>
                          viewMode === 'grid'
                            ? theme.palette.mode === 'dark'
                              ? 'rgba(6, 182, 212, 0.2)'
                              : '#14b8a6'
                            : 'transparent',
                        color: (theme) =>
                          viewMode === 'grid'
                            ? theme.palette.mode === 'dark'
                              ? '#67e8f9'
                              : 'white'
                            : theme.palette.mode === 'dark'
                            ? 'grey.400'
                            : 'grey.600',
                        '&:hover': {
                          bgcolor: (theme) =>
                            viewMode === 'grid'
                              ? theme.palette.mode === 'dark'
                                ? 'rgba(6, 182, 212, 0.3)'
                                : '#0d9488'
                              : theme.palette.mode === 'dark'
                              ? 'rgba(51, 65, 85, 0.8)'
                              : 'grey.200',
                        },
                      }}
                    >
                      <ViewModuleIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="List View">
                    <IconButton
                      size="small"
                      onClick={() => setViewMode('list')}
                      sx={{
                        borderRadius: 0.75,
                        bgcolor: (theme) =>
                          viewMode === 'list'
                            ? theme.palette.mode === 'dark'
                              ? 'rgba(6, 182, 212, 0.2)'
                              : '#06b6d4'
                            : 'transparent',
                        color: (theme) =>
                          viewMode === 'list'
                            ? theme.palette.mode === 'dark'
                              ? '#67e8f9'
                              : 'white'
                            : theme.palette.mode === 'dark'
                            ? 'grey.400'
                            : 'grey.600',
                        '&:hover': {
                          bgcolor: (theme) =>
                            viewMode === 'list'
                              ? theme.palette.mode === 'dark'
                                ? 'rgba(6, 182, 212, 0.3)'
                                : '#0891b2'
                              : theme.palette.mode === 'dark'
                              ? 'rgba(51, 65, 85, 0.8)'
                              : 'grey.200',
                        },
                      }}
                    >
                      <ViewListIcon />
                    </IconButton>
                  </Tooltip>
                </Paper>

                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={() => handleOpenDialog()}
                  sx={{
                    background: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)'
                        : 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
                    textTransform: 'none',
                    borderRadius: 1.5,
                    px: 3,
                    py: 1.2,
                    fontWeight: 600,
                    '&:hover': {
                      background: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'linear-gradient(135deg, #0e7490 0%, #0891b2 100%)'
                          : 'linear-gradient(135deg, #0d9488 0%, #0891b2 100%)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Add City
                </Button>
              </Box>
            </Box>

            {/* Formal Search Bar */}
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
                      <SearchIcon
                        sx={{
                          color: (theme) =>
                            theme.palette.mode === 'dark' ? '#22d3ee' : '#14b8a6',
                          fontSize: 22,
                        }}
                      />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <Tooltip title="Clear search">
                        <IconButton
                          size="small"
                          onClick={handleReset}
                          sx={{
                            color: (theme) =>
                              theme.palette.mode === 'dark' ? '#67e8f9' : '#14b8a6',
                            '&:hover': {
                              bgcolor: (theme) =>
                                theme.palette.mode === 'dark'
                                  ? 'rgba(6, 182, 212, 0.1)'
                                  : 'rgba(20, 184, 166, 0.1)',
                            },
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
                    borderRadius: 1,
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.6)' : 'white',
                    '& fieldset': {
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(148, 163, 184, 0.2)'
                          : 'rgba(0, 0, 0, 0.12)',
                      borderWidth: 1.5,
                    },
                    '&:hover fieldset': {
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#22d3ee' : '#14b8a6',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#06b6d4' : '#0d9488',
                      borderWidth: 2,
                    },
                    '& input': {
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#e2e8f0' : 'inherit',
                    },
                    '& input::placeholder': {
                      color: (theme) =>
                        theme.palette.mode === 'dark' ? '#94a3b8' : 'inherit',
                      opacity: 1,
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
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(30, 41, 59, 0.95)'
                    : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: 2,
                p: 8,
                textAlign: 'center',
                boxShadow: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '0 8px 32px rgba(0, 0, 0, 0.5)'
                    : '0 8px 32px rgba(0, 0, 0, 0.1)',
                border: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '1px solid rgba(148, 163, 184, 0.1)'
                    : 'none',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
                }}
              >
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
                background: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(30, 41, 59, 0.95)'
                    : 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                borderRadius: 2,
                p: 8,
                textAlign: 'center',
                boxShadow: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '0 8px 32px rgba(0, 0, 0, 0.5)'
                    : '0 8px 32px rgba(0, 0, 0, 0.1)',
                border: (theme) =>
                  theme.palette.mode === 'dark'
                    ? '1px solid rgba(148, 163, 184, 0.1)'
                    : 'none',
              }}
            >
              <LocationCityIcon
                sx={{
                  fontSize: 64,
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#475569' : 'grey.300',
                  mb: 2,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#cbd5e1' : 'text.secondary',
                }}
                gutterBottom
              >
                No cities found
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
                  mb: 3,
                }}
              >
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
                    background: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)'
                        : 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
                    textTransform: 'none',
                    borderRadius: 1.5,
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
