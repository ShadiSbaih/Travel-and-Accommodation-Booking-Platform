import React from 'react';
import {
  List,
  ListItem,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Tooltip,
  Fade
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
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f1f5f9',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#cbd5e1',
          borderRadius: '3px',
        },
      }}
    >
      <List
        dense
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
            disablePadding
            sx={{
              borderRadius: 1.5,
              mx: 0.5,
              my: 0.25,
              overflow: 'hidden',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
              transition: 'background-color 0.2s ease',
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
                        fontSize: '1.125rem',
                      },
                      '&:hover': {
                        backgroundColor: 'primary.light',
                        opacity: 0.1,
                      },
                    }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: 'text.primary',
                      lineHeight: 1.4,
                      fontSize: '0.875rem',
                      ml: 0.5,
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

      {/* Scroll indicator for more content */}
      <Fade in={amenities.length > 8}>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 16,
            background: 'linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))',
            pointerEvents: 'none',
            borderRadius: '0 0 8px 8px',
          }}
        />
      </Fade>
    </Box>
  );
};

export default AmenitiesList;