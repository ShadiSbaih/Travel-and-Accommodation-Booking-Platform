import React from 'react';
import {
  ToggleButtonGroup,
  ToggleButton,
  Tooltip
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/core/store/hooks';
import { setMode } from '@/features/filters/store/filterSlice';
import type { FilterMode } from '@/features/filters/store/filterSlice.types';

/**
 * Filter Mode Switch Component with MUI
 * Toggles between "Any Match" and "All Match" filtering modes
 * Uses Redux to manage state
 */
const FilterModeSwitch: React.FC = () => {
  const { filterMode, selectedAmenities } = useAppSelector((state) => state.filters);
  const dispatch = useAppDispatch();
  const disabled = selectedAmenities.length === 0;

  const handleModeChange = (_: React.MouseEvent<HTMLElement>, newMode: FilterMode | null) => {
    if (newMode !== null) {
      dispatch(setMode(newMode));
    }
  };

  return (
    <ToggleButtonGroup
      value={filterMode}
      exclusive
      onChange={handleModeChange}
      disabled={disabled}
      fullWidth
      sx={{
        mb: 2,
        height: 48,
        backgroundColor: 'background.paper',
        borderRadius: '24px',
        border: '2px solid',
        borderColor: 'divider',
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        '& .MuiToggleButtonGroup-grouped': {
          border: 'none',
          borderRadius: '20px !important',
          margin: '4px',
          '&:not(:first-of-type)': {
            borderLeft: 'none',
            marginLeft: '4px',
          },
          '&:first-of-type': {
            marginLeft: '4px',
          },
        },
        '& .MuiToggleButton-root': {
          flex: 1,
          px: 2,
          py: 1.5,
          textTransform: 'none',
          fontSize: '0.9375rem',
          fontWeight: 600,
          color: 'text.secondary',
          backgroundColor: 'transparent',
          border: 'none',
          transition: 'all 0.2s ease',
          whiteSpace: 'nowrap',
          '&:hover': {
            backgroundColor: 'action.hover',
          },
          '&.Mui-selected': {
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            borderColor: 'transparent',
            boxShadow: '0 2px 6px rgba(25, 118, 210, 0.3)',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          },
          '&.Mui-disabled': {
            opacity: 0.5,
            color: 'text.disabled',
          },
        },
      }}
    >
      <Tooltip title="Hotels with at least one selected amenity" arrow>
        <ToggleButton value="any">
          Any match
        </ToggleButton>
      </Tooltip>

      <Tooltip title="Hotels with all selected amenities" arrow>
        <ToggleButton value="all">
          All Match
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );
};

export default FilterModeSwitch;