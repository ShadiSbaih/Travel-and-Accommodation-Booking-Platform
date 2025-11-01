import React from 'react';
import { Box, Typography } from '@mui/material';
import type { SectionHeaderProps } from '../types';

const SectionHeader = React.memo(({ title, subtitle, icon }: SectionHeaderProps) => {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
        {icon}
        <Typography
          variant="h4"
          component="h2"
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
            color: 'text.primary',
          }}
        >
          {title}
        </Typography>
      </Box>
      {subtitle && (
        <Typography
          variant="body1"
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '0.875rem', sm: '1rem' },
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
});

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;
