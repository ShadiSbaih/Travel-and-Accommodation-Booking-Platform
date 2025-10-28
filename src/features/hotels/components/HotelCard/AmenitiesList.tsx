import { Paper, Box, Typography, Chip, Tooltip } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import type { AmenitiesListProps } from '../../types';



function AmenitiesList({ amenities, showTitle = true }: AmenitiesListProps) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider'
      }}
    >
      {showTitle && (
        <Typography
          variant="subtitle2"
          component="h2"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 2,
            fontSize: '0.95rem'
          }}
        >
          Amenities & Services
        </Typography>
      )}
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1.5
      }}>
        {amenities.map((amenity) => (
          <Tooltip
            key={amenity.id}
            title={amenity.description}
            arrow
            placement="top"
            enterDelay={200}
            leaveDelay={0}
            slotProps={{
              tooltip: {
                sx: {
                  bgcolor: 'background.paper',
                  color: 'text.primary',
                  border: '1px solid',
                  borderColor: 'divider',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                  fontSize: '0.875rem',
                  padding: '8px 12px',
                  maxWidth: 300
                }
              },
              arrow: {
                sx: {
                  color: 'background.paper',
                  '&::before': {
                    border: '1px solid',
                    borderColor: 'divider',
                  }
                }
              }
            }}
          >
            <Chip
              icon={<CheckCircle />}
              label={amenity.name}
              sx={{
                bgcolor: 'background.paper',
                border: '1px solid',
                borderColor: 'divider',
                fontWeight: 600,
                fontSize: '0.875rem',
                px: 0.5,
                '& .MuiChip-icon': {
                  color: 'success.main',
                  fontSize: '1.1rem'
                },
                '&:hover': {
                  bgcolor: 'primary.main',
                  borderColor: 'primary.main',
                  color: 'primary.contrastText',
                  boxShadow: '0 2px 8px rgba(25, 118, 210, 0.25)',
                  transform: 'translateY(-2px)',
                  '& .MuiChip-icon': {
                    color: 'primary.contrastText'
                  }
                },
                transition: 'all 0.2s ease-in-out',
                cursor: 'default'
              }}
            />
          </Tooltip>
        ))}
      </Box>
    </Paper>
  );
}

export default AmenitiesList;
