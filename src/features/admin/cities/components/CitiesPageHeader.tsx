import { Box, Typography, Button, Paper, Chip, Stack, IconButton, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import type { CitiesPageHeaderProps } from '../types/component.types';

function CitiesPageHeader({
  citiesCount,
  hasSearchQuery,
  viewMode,
  onViewModeChange,
  onAddCity,
}: CitiesPageHeaderProps) {
  return (
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
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 } }}>
        <Box
          sx={{
            width: { xs: 48, sm: 56 },
            height: { xs: 48, sm: 56 },
            borderRadius: 1.5,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(6, 182, 212, 0.2)'
                : 'rgba(20, 184, 166, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <LocationCityIcon
            sx={{
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#22d3ee' : '#0d9488',
              fontSize: { xs: 28, sm: 32 },
            }}
          />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography
            variant="h4"
            component="h1"
            fontWeight="700"
            sx={{
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#67e8f9' : '#14b8a6',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' },
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
                fontSize: { xs: '0.75rem', sm: '0.8125rem' },
              }}
            />
          </Stack>
        </Box>
      </Box>

      {/* Action Buttons */}
      <Box
        sx={{
          display: 'flex',
          gap: { xs: 1.5, sm: 2 },
          alignItems: 'center',
          justifyContent: { xs: 'space-between', md: 'flex-end' },
        }}
      >
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
              size="medium"
              onClick={() => onViewModeChange('grid')}
              sx={{
                borderRadius: 0.75,
                px: 1.5,
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
              <ViewModuleIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="List View">
            <IconButton
              size="medium"
              onClick={() => onViewModeChange('list')}
              sx={{
                borderRadius: 0.75,
                px: 1.5,
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
              <ViewListIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Paper>

        <Button
          variant="contained"
          startIcon={<AddIcon sx={{ display: { xs: 'none', sm: 'block' } }} />}
          onClick={onAddCity}
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? '#0891b2' : '#14b8a6',
            color: 'white',
            textTransform: 'none',
            borderRadius: 1.5,
            px: { xs: 2, sm: 3 },
            py: 1.2,
            fontWeight: 600,
            fontSize: { xs: '0.875rem', sm: '1rem' },
            minWidth: { xs: 'auto', sm: 'auto' },
            '&:hover': {
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? '#0e7490' : '#0d9488',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          <Box
            component="span"
            sx={{
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Add City
          </Box>
          <AddIcon
            sx={{
              display: { xs: 'block', sm: 'none' },
            }}
          />
        </Button>
      </Box>
    </Box>
  );
}

export default CitiesPageHeader;
