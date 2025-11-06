import React, { useMemo } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Divider,
} from '@mui/material';
import { Clear, Hotel } from '@mui/icons-material';
import { useAppSelector, useAppDispatch } from '@/core/store/hooks';
import { clearFilters } from '@/features/filters/store/filterSlice';
import { useAmenities } from '../../hooks';
import FilterModeSwitch from '../FilterModeSwitch';
import AmenitiesList from '../AmenitiesList';
import AmenitiesFilterSkeleton from './AmenitiesFilterSkeleton';
import AmenitiesFilterError from './AmenitiesFilterError';
import AmenitiesFilterEmpty from './AmenitiesFilterEmpty';


const AmenitiesFilter: React.FC = () => {
  const selectedAmenities = useAppSelector((state) => state.filters.selectedAmenities);
  const dispatch = useAppDispatch();

  // Fetch amenities from API with longer staleTime for better caching
  const { data: amenities, isLoading, error } = useAmenities();

  // Memoize clear filter handler
  const handleClearFilters = useMemo(
    () => () => dispatch(clearFilters()),
    [dispatch]
  );

  // Memoize has selected amenities check
  const hasSelectedAmenities = useMemo(
    () => selectedAmenities.length > 0,
    [selectedAmenities.length]
  );

  // Loading state
  if (isLoading) {
    return <AmenitiesFilterSkeleton />;
  }

  // Error state
  if (error) {
    return <AmenitiesFilterError />;
  }

  // No amenities state
  if (!amenities?.length) {
    return <AmenitiesFilterEmpty />;
  }

  // Main render
  return (
    <Card
      elevation={0}
      sx={{
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.3s ease',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        '&:hover': {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.12)',
          borderColor: 'primary.light',
        },
      }}
    >
      <CardContent sx={{ p: 0, mt: 2 }}>
        {/* Header with clear button */}
        <Box
          sx={{
            p: 2,
            pb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  backgroundColor: 'primary.main',
                  mr: 1.5,
                }}
              >
                <Hotel sx={{ color: 'white', fontSize: 20 }} />
              </Box>
              <Typography variant="h6" fontWeight={700} color="text.primary">
                Amenities
              </Typography>
            </Box>

            {hasSelectedAmenities && (
              <Button
                size="small"
                onClick={handleClearFilters}
                startIcon={<Clear sx={{ fontSize: 16 }} />}
                color="error"
                variant="contained"
                sx={{
                  minWidth: 'auto',
                  fontSize: '0.75rem',
                  px: 1.5,
                  py: 0.75,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  boxShadow: 'none',
                  '&:hover': {
                    boxShadow: '0 2px 8px rgba(211, 47, 47, 0.3)',
                  },
                }}
              >
                Clear ({selectedAmenities.length})
              </Button>
            )}
          </Box>
        </Box>

        <Divider />

        <Box sx={{ p: 3, pt: 2.5 }}>
          {/* Filter Mode Switch */}
          <FilterModeSwitch />

          {/* Scrollable Amenities List */}
          <Box sx={{ mt: 1 }}>
            <AmenitiesList amenities={amenities} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AmenitiesFilter;