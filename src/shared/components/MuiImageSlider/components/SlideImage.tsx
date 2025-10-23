import { Box } from '@mui/material';

interface SlideImageProps {
  image: {
    id: number;
    src: string;
    alt: string;
  };
  isActive: boolean;
  index: number;
}

export function SlideImage({ image, isActive, index }: SlideImageProps) {
  return (
    <Box
      component="img"
      src={image.src}
      alt={image.alt}
      loading={index === 0 ? 'eager' : 'lazy'}
      sx={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        opacity: isActive ? 1 : 0,
        transform: isActive ? 'scale(1)' : 'scale(1.05)',
        transition: 'all 1s ease-in-out',
      }}
    />
  );
}
