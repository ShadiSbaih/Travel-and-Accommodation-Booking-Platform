import { Box, Typography, Button, Paper, Chip, Stack, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';

interface CitiesPageHeaderProps {
  citiesCount: number;
  hasSearchQuery: boolean;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onAddCity: () => void;
}

function CitiesPageHeader({
  citiesCount,
  hasSearchQuery,
  viewMode,
  onViewModeChange,
  onAddCity,
}: CitiesPageHeaderProps) {
  return (
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
                label={`${citiesCount} ${hasSearchQuery ? 'Results' : 'Cities'}`}
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
                onClick={() => onViewModeChange('grid')}
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
                onClick={() => onViewModeChange('list')}
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
            onClick={onAddCity}
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
    </Paper>
  );
}

export default CitiesPageHeader;
