import React from 'react';
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  Tooltip
} from '@mui/material';
import { FilterAlt, CheckBox, CheckBoxOutlined } from '@mui/icons-material';
import { useAmenitiesFilter } from '@/context/AmenitiesFilter';

/**
 * Filter Mode Switch Component with MUI
 * Toggles between "Any Match" and "All Match" filtering modes
 * Uses context to avoid prop drilling
 */
const FilterModeSwitch: React.FC = () => {
  const { filterMode, setFilterMode, selectedAmenities } = useAmenitiesFilter();
  const disabled = selectedAmenities.length === 0;

  const handleModeChange = (_: React.MouseEvent<HTMLElement>, newMode: 'any' | 'all' | null) => {
    if (newMode !== null) {
      setFilterMode(newMode);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        mb: 2,
        p: 2.5,
        backgroundColor: 'grey.50',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
        <FilterAlt sx={{ mr: 1, color: 'text.secondary', fontSize: 20 }} />
        <Typography variant="body2" color="text.secondary" fontWeight={500}>
          Match Mode:
        </Typography>
      </Box>

      <ToggleButtonGroup
        value={filterMode}
        exclusive
        onChange={handleModeChange}
        disabled={disabled}
        size="small"
        sx={{
          width: '100%',
          '& .MuiToggleButtonGroup-grouped': {
            flex: 1,
            border: '1px solid',
            borderColor: 'divider',
            '&:not(:first-of-type)': {
              borderLeft: '1px solid',
              borderLeftColor: 'divider',
              marginLeft: 0,
              borderRadius: '0 8px 8px 0',
            },
            '&:first-of-type': {
              borderRadius: '8px 0 0 8px',
            },
          },
          '& .MuiToggleButton-root': {
            px: 2,
            py: 1,
            textTransform: 'none',
            fontSize: '0.875rem',
            fontWeight: 500,
            minHeight: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1,
            transition: 'all 0.2s ease',
            '&.Mui-selected': {
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
            },
            '&:not(.Mui-selected)': {
              backgroundColor: 'background.paper',
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
                color: 'text.primary',
              },
            },
            '&.Mui-disabled': {
              opacity: 0.6,
            },
          },
        }}
      >
        <Tooltip title="Hotels with at least one selected amenity" arrow>
          <ToggleButton value="any">
            <CheckBoxOutlined sx={{ mr: 1, fontSize: 18 }} />
            Any Match
          </ToggleButton>
        </Tooltip>
        
        <Tooltip title="Hotels with all selected amenities" arrow>
          <ToggleButton value="all">
            <CheckBox sx={{ mr: 1, fontSize: 18 }} />
            All Match
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>

      <Typography 
        variant="caption" 
        color="text.secondary" 
        sx={{ 
          display: 'block', 
          mt: 2, 
          fontStyle: 'italic',
          fontSize: '0.75rem',
          lineHeight: 1.3,
          textAlign: 'center'
        }}
      >
        {filterMode === 'any'
          ? 'Hotels with at least one selected amenity'
          : 'Hotels with all selected amenities'}
      </Typography>
    </Paper>
  );
};

export default FilterModeSwitch;