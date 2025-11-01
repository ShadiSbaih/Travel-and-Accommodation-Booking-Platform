import React from 'react';
import {
  Alert,
  Box,
  Chip,
  Typography,
  Stack,
  Fade,
} from '@mui/material';
import { Search, Hotel, FilterList } from '@mui/icons-material';
import { useAppSelector } from '@/core/store/hooks';
import type { FilterStatisticsProps } from './types';

/**
 * Filter Statistics Component with MUI
 * Displays filtering results and selected amenities as tags
 * Uses Redux for amenities state
 */
const FilterStatistics: React.FC<FilterStatisticsProps> = ({
  filteredCount,
  totalCount,
}) => {
  const { selectedAmenities, filterMode } = useAppSelector((state) => state.filters);

  // Don't render if no filters are active
  if (selectedAmenities.length === 0) return null;

  return (
    <Fade in={true}>
      <Alert
        severity="info"
        icon={<Search />}
        sx={{
          mb: 3,
          borderRadius: 2,
          backgroundColor: 'info.light',
          '& .MuiAlert-message': {
            width: '100%',
          },
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1 }}>
            <Hotel sx={{ fontSize: 18, color: 'white' }} />
            <Typography variant="body2" component="span" fontWeight={600}>
              Found <Box component="span" fontWeight="bold">{filteredCount}</Box> hotel
              {filteredCount !== 1 ? 's' : ''} out of{' '}
              <Box component="span" fontWeight="bold">{totalCount}</Box> total
            </Typography>
            
            {selectedAmenities.length > 1 && (
              <Typography variant="body2" component="span">
                with <Box component="span" fontWeight="bold" color="white">
                  {filterMode === 'any' ? 'any' : 'all'}
                </Box > of the selected amenities
              </Typography>
            )}
            
            {selectedAmenities.length === 1 && (
              <Typography variant="body2" component="span">
                with the selected amenity
              </Typography>
            )}
          </Box>

          {/* Selected amenities chips */}
          <Stack direction="row" spacing={0.5} flexWrap="wrap" sx={{ mt: 2, gap: 0.5 }}>
            <FilterList sx={{ fontSize: 16, color: 'text.secondary', alignSelf: 'center', mr: 0.5 }} />
            {selectedAmenities.map((amenity) => (
              <Chip
                key={amenity}
                label={amenity}
                size="small"
                variant="filled"
                color="info"
                sx={{
                  fontSize: '0.75rem',
                  height: 24,
                  backgroundColor: 'info.main',
                  color: 'info.contrastText',
                  '&:hover': {
                    backgroundColor: 'info.dark',
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
      </Alert>
    </Fade>
  );
};

export default FilterStatistics;