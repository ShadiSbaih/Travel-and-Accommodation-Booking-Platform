import { Box, Typography, Button } from '@mui/material';
import { Inbox as InboxIcon } from '@mui/icons-material';
import type { EmptyStateProps } from '@/shared/types/common.types';

function EmptyState({ title, subtitle, icon, className = '', action }: EmptyStateProps) {
  const defaultIcon = <InboxIcon sx={{ fontSize: '3rem', color: 'text.secondary' }} />;

  return (
    <Box
      className={className}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        py: { xs: 6, sm: 8, md: 12 },
        px: { xs: 2, sm: 3 },
        minHeight: '200px',
      }}
    >
      <Box sx={{ mb: 3 }}>{icon || defaultIcon}</Box>

      <Typography
        variant="h5"
        sx={{
          mb: 1,
          fontWeight: 600,
          color: 'text.primary',
          fontSize: { xs: '1.25rem', sm: '1.5rem' },
        }}
      >
        {title}
      </Typography>

      {subtitle && (
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            maxWidth: '600px',
            mb: action ? 3 : 0,
            fontSize: { xs: '0.875rem', sm: '1rem' },
          }}
        >
          {subtitle}
        </Typography>
      )}

      {action && (
        <Button
          variant="contained"
          onClick={action.onClick}
          sx={{
            textTransform: 'none',
            fontWeight: 500,
            px: 3,
          }}
        >
          {action.label}
        </Button>
      )}
    </Box>
  );
}

export default EmptyState;