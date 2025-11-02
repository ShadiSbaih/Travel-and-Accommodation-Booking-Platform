import { memo } from 'react';
import { TextField, InputAdornment, IconButton, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import type { HotelsSearchBarProps } from '../types/component.types';

function HotelsSearchBar({ searchQuery, onSearchChange, onReset }: HotelsSearchBarProps) {
  return (
    <Box>
      <TextField
        fullWidth
        placeholder="Search hotels by name, location, or type..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#22d3ee' : '#14b8a6',
                }}
              />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={onReset}
                sx={{
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
                }}
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 1.5,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(51, 65, 85, 0.3)' : 'white',
            '& fieldset': {
              borderColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(148, 163, 184, 0.2)'
                  : 'rgba(0, 0, 0, 0.12)',
            },
            '&:hover fieldset': {
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? '#22d3ee' : '#14b8a6',
            },
            '&.Mui-focused fieldset': {
              borderWidth: 2,
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? '#06b6d4' : '#0d9488',
            },
            '& input': {
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#e2e8f0' : 'inherit',
              '&::placeholder': {
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#64748b' : 'inherit',
                opacity: 1,
              },
            },
          },
        }}
      />
    </Box>
  );
}

export default memo(HotelsSearchBar);
