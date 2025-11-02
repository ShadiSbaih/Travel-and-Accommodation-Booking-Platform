import { Paper, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import type { EmptyCitiesStateProps } from '../types/component.types';

function EmptyCitiesState({ hasSearchQuery, onAddCity }: EmptyCitiesStateProps) {
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
        {hasSearchQuery
          ? 'Try adjusting your search query'
          : 'Start by adding your first city'}
      </Typography>
      {!hasSearchQuery && (
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={onAddCity}
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? '#0891b2' : '#14b8a6',
            color: 'white',
            textTransform: 'none',
            borderRadius: 1.5,
            px: 3,
            py: 1.2,
            fontWeight: 600,
            '&:hover': {
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? '#0e7490' : '#0d9488',
            },
          }}
        >
          Add Your First City
        </Button>
      )}
    </Paper>
  );
}

export default EmptyCitiesState;
