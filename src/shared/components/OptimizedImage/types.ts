import type { SxProps, Theme } from '@mui/material';

export interface OptimizedImageProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    fallbackSrc?: string;
    sx?: SxProps<Theme>;
    loading?: 'lazy' | 'eager';
    objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    priority?: boolean;
    onLoad?: () => void;
    onError?: () => void;
}
