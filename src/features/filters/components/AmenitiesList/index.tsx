import React from 'react';
import {
  List,
  ListItem,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Tooltip,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/core/store/hooks';
import { toggleAmenity } from '@/features/filters/store/filterSlice';
import type { AmenitiesListProps } from './types';

/**
 * Scrollable Amenities List Component with MUI
 * Displays a list of amenities with checkboxes in a scrollable container
 * Uses Redux for selection state
 */
const AmenitiesList: React.FC<AmenitiesListProps> = ({ amenities }) => {
  const selectedAmenities = useAppSelector((state) => state.filters.selectedAmenities);
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        position: 'relative',
        maxHeight: 320,
        overflowY: 'auto',
        overflowX: 'hidden',
        '&::-webkit-scrollbar': {
          width: '8px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
          borderRadius: '4px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(25, 118, 210, 0.3)',
          borderRadius: '4px',
          '&:hover': {
            backgroundColor: 'rgba(25, 118, 210, 0.5)',
          },
        },
      }}
    >
      <List
        
        sx={{
          py: 1,
          px: 0.5,
          '& .MuiListItem-root:first-of-type': {
            mt: 0,
          },
          '& .MuiListItem-root:last-of-type': {
            mb: 0,
          },
        }}
      >
        {amenities.map((amenity) => (
          <ListItem
            key={amenity.id}
            sx={{
              borderRadius: 2,
              mx: 0.5,
              my: 0.5,
              overflow: 'hidden',
              border: '1px solid transparent',
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
                borderColor: 'rgba(25, 118, 210, 0.2)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <Tooltip title={amenity.description || amenity.name} arrow placement="right">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={selectedAmenities.includes(amenity.name)}
                    onChange={() => dispatch(toggleAmenity(amenity.name))}
                    size="small"
                    color="primary"
                    sx={{
                      p: 1.25,
                      '& .MuiSvgIcon-root': {
                        fontSize: '1.2rem',
                      },
                      '&.Mui-checked': {
                        color: 'primary.main',
                      },
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: selectedAmenities.includes(amenity.name) ? 600 : 500,
                      color: selectedAmenities.includes(amenity.name) ? 'primary.main' : 'text.primary',
                      lineHeight: 1.4,
                      fontSize: '0.875rem',
                      ml: 0.5,
                      transition: 'all 0.2s ease',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {amenity.name}
                  </Typography>
                }
                sx={{
                  margin: 0,
                  width: '100%',
                  alignItems: 'center',
                  display: 'flex',
                  px: 1,
                  py: 0.75,
                  overflow: 'hidden',
                  '& .MuiFormControlLabel-label': {
                    flex: 1,
                    minWidth: 0,
                    overflow: 'hidden',
                  },
                }}
              />
            </Tooltip>
          </ListItem>
        ))}
      </List>

     
    </Box>
  );
};

export default AmenitiesList;