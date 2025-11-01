import React, { Suspense } from 'react';
import { Box } from '@mui/material';
import { useIntersectionObserver } from '@/shared/hooks/useIntersectionObserver';

interface LazySectionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  minHeight?: number | string;
}

const LazySection = React.memo(({ children, fallback, minHeight = 400 }: LazySectionProps) => {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0,
    rootMargin: '200px', // Load content 200px before it comes into view
    freezeOnceVisible: true,
  });

  return (
    <Box
      ref={ref}
      sx={{
        minHeight: isVisible ? 'auto' : minHeight,
      }}
    >
      {isVisible && <Suspense fallback={fallback}>{children}</Suspense>}
      {!isVisible && fallback}
    </Box>
  );
});

LazySection.displayName = 'LazySection';

export default LazySection;
