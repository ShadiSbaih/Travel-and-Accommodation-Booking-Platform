import React, { Suspense } from 'react';
import { Box } from '@mui/material';
import { useInView } from 'react-intersection-observer';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  minHeight?: number | string;
}

const LazySection = React.memo(({ children, fallback, minHeight = 400 }: LazySectionProps) => {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '200px', // Load content 200px before it comes into view
    triggerOnce: true, // Only trigger once when it comes into view
  });

  return (
    <Box
      ref={ref}
      sx={{
        minHeight: inView ? 'auto' : minHeight,
      }}
    >
      {inView && <Suspense fallback={fallback}>{children}</Suspense>}
      {!inView && fallback}
    </Box>
  );
});

LazySection.displayName = 'LazySection';

export default LazySection;
