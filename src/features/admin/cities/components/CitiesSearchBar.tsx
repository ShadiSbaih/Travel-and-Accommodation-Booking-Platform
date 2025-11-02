import { Box, TextField, InputAdornment, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import type { CitiesSearchBarProps } from '../types/component.types';

function CitiesSearchBar({ searchQuery, onSearchChange, onReset }: CitiesSearchBarProps) {
  return (
    <Box sx={{ mt: { xs: 2, sm: 3 } }}>
      <TextField
        fullWidth
        placeholder="Search cities by name..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        variant="outlined"
        size="medium"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#22d3ee' : '#14b8a6',
                  fontSize: { xs: 20, sm: 22 },
                }}
              />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <Tooltip title="Clear search">
                <IconButton
                  size="small"
                  onClick={onReset}
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
            fontSize: { xs: '0.875rem', sm: '1rem' },
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
              py: { xs: 1.5, sm: 1.75 },
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
  );
}

export default CitiesSearchBar;
