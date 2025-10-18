import React from 'react';
import {
  ToggleButtonGroup,
  ToggleButton,
  Tooltip
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setMode } from '@/store/slices/filterSlice';
import type { FilterMode } from '@/store/slices/filterSlice.types';

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
        backgroundColor: 'rgba(45, 55, 72, 0.9)',
        borderRadius: '8px',
        border: '1px solid rgba(66, 153, 225, 0.5)',
        overflow: 'hidden',
        '& .MuiToggleButtonGroup-grouped': {
          border: 'none',
          borderRadius: '8px !important',
          margin: 0,
          '&:not(:first-of-type)': {
            borderLeft: '1px solid rgba(66, 153, 225, 0.3)',
            marginLeft: 0,
          },
        },
        '& .MuiToggleButton-root': {
          flex: 1,
          px: 3,
          py: 1.5,
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 500,
          color: 'rgba(255, 255, 255, 0.9)',
          backgroundColor: 'transparent',
          border: 'none',
          transition: 'all 0.3s ease',
          '&.Mui-selected': {
            backgroundColor: 'rgb(3,169,244)',
            color: 'rgb(255, 255, 255)',
            borderColor: 'transparent',

          },

          '&.Mui-disabled': {
            opacity: 0.6,
            color: 'rgba(255, 255, 255)',
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