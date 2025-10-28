import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
  Alert,
  Divider,
} from '@mui/material';
import { Clear, Hotel, ErrorOutline } from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import amenitiesApi from '@/core/api/amenities.api';
import type { Amenity } from '@/features/hotels/types';
import { useAppSelector, useAppDispatch } from '@/core/store/hooks';
import { clearFilters } from '@/features/filters/store/filterSlice';
import FilterModeSwitch from '../FilterModeSwitch';
import AmenitiesList from '../AmenitiesList';

/**
 * Complete Amenities Filter Component with MUI
 * Uses Redux to manage state
 */
const AmenitiesFilter: React.FC = () => {
  const selectedAmenities = useAppSelector((state) => state.filters.selectedAmenities);
  const dispatch = useAppDispatch();

  // Fetch amenities from API
  const { data: amenities, isLoading, error } = useQuery<Amenity[]>({
    queryKey: ['amenities'],
    queryFn: amenitiesApi.getAmenities,
  });

  // Loading state
  if (isLoading) {
    return (
      <Card elevation={1} sx={{ overflow: 'hidden' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Hotel sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Amenities
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}>
            <CircularProgress size={24} sx={{ mb: 2 }} />
            <Typography variant="body2" color="text.secondary">
              Loading amenities...
            </Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  // Error state
  if (error) {
    return (
      <Card elevation={1} sx={{ overflow: 'hidden' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Hotel sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Amenities
            </Typography>
          </Box>

          <Alert severity="error" icon={<ErrorOutline />}>
            <Typography variant="body2">Failed to load amenities</Typography>
            <Typography variant="caption" color="text.secondary">
              Please try refreshing the page
            </Typography>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // No amenities state
  if (!amenities?.length) {
    return (
      <Card elevation={1} sx={{ overflow: 'hidden' }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <Hotel sx={{ mr: 1, color: 'primary.main' }} />
            <Typography variant="h6" fontWeight={600}>
              Amenities
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ py: 4 }}>
            No amenities available
          </Typography>
        </CardContent>
      </Card>
    );
  }

  // Main render
  return (
    <Card
      elevation={0}
      sx={{
        overflow: 'hidden',
        position: 'sticky',
        top: 24,
        borderRadius: 3,
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
      <CardContent sx={{ p: 0 }}>
        {/* Header with clear button */}
        <Box 
          sx={{ 
            p: 2, 
            pb: 2,
            background: 'linear-gradient(135deg, rgba(25, 118, 210, 0.05) 0%, rgba(25, 118, 210, 0.02) 100%)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
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

            {selectedAmenities.length > 0 && (
              <Button
                size="small"
                onClick={() => dispatch(clearFilters())}
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