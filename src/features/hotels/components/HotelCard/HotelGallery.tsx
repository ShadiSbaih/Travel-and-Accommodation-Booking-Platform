import { Paper } from '@mui/material';
import { MuiImageSlider } from '@/shared/components/MuiImageSlider';
import type { SliderImage } from '@/shared/components/MuiImageSlider/types';

interface HotelGalleryProps {
  images: SliderImage[];
}

function HotelGallery({ images }: HotelGalleryProps) {
  if (images.length === 0) return null;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 0,
        borderRadius: 3,
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        mb: 4
      }}
    >
      <MuiImageSlider images={images} />
    </Paper>
  );
}

export default HotelGallery;
