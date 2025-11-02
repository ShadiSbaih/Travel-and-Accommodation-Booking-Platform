import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import HotelIcon from '@mui/icons-material/Hotel';
import type { HotelsPageHeaderProps } from '../types/component.types';

function HotelsPageHeader({
  hotelsCount,
  hasSearchQuery,
  viewMode,
  onViewModeChange,
  onAddHotel,
}: HotelsPageHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      {/* Title Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 2,
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)'
                : 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <HotelIcon sx={{ color: 'white', fontSize: 32 }} />
        </Box>
        <Box>
          <Typography
            variant="h4"
            fontWeight="700"
            sx={{
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
              mb: 0.5,
            }}
          >
            Hotels Management
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
            }}
          >
            {hotelsCount} {hotelsCount === 1 ? 'hotel' : 'hotels'}{' '}
            {hasSearchQuery ? 'found' : 'total'}
          </Typography>
        </Box>
      </Box>

      {/* Actions Section */}
      <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
        {/* View Mode Toggle */}
        <Box
          sx={{
            display: 'flex',
            borderRadius: 1.5,
            overflow: 'hidden',
            border: '1px solid',
            borderColor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(148, 163, 184, 0.2)'
                : 'grey.300',
          }}
        >
          <Button
            onClick={() => onViewModeChange('grid')}
            sx={{
              minWidth: 44,
              height: 44,
              borderRadius: 0,
              bgcolor: viewMode === 'grid' ? 
                (theme) => theme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(20, 184, 166, 0.1)' 
                : 'transparent',
              color: viewMode === 'grid' ?
                (theme) => theme.palette.mode === 'dark' ? '#22d3ee' : '#0d9488'
                : (theme) => theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
              '&:hover': {
                bgcolor: viewMode === 'grid' ? 
                  (theme) => theme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(20, 184, 166, 0.15)' 
                  : (theme) => theme.palette.mode === 'dark' ? 'rgba(51, 65, 85, 0.3)' : 'grey.100',
              },
            }}
          >
            <ViewModuleIcon />
          </Button>
          <Button
            onClick={() => onViewModeChange('list')}
            sx={{
              minWidth: 44,
              height: 44,
              borderRadius: 0,
              bgcolor: viewMode === 'list' ? 
                (theme) => theme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(20, 184, 166, 0.1)' 
                : 'transparent',
              color: viewMode === 'list' ?
                (theme) => theme.palette.mode === 'dark' ? '#22d3ee' : '#0d9488'
                : (theme) => theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
              '&:hover': {
                bgcolor: viewMode === 'list' ? 
                  (theme) => theme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.3)' : 'rgba(20, 184, 166, 0.15)' 
                  : (theme) => theme.palette.mode === 'dark' ? 'rgba(51, 65, 85, 0.3)' : 'grey.100',
              },
            }}
          >
            <ViewListIcon />
          </Button>
        </Box>

        {/* Add Hotel Button */}
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddHotel}
          sx={{
            textTransform: 'none',
            borderRadius: 1.5,
            px: 3,
            py: 1.2,
            fontWeight: 600,
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)'
                : 'linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)',
            '&:hover': {
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, #0e7490 0%, #0891b2 100%)'
                  : 'linear-gradient(135deg, #0d9488 0%, #0891b2 100%)',
            },
          }}
        >
          Add Hotel
        </Button>
      </Box>
    </Box>
  );
}

export default HotelsPageHeader;
