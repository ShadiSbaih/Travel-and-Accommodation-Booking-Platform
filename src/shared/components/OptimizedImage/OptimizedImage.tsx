import { useState, useEffect } from 'react';
import { Box, Skeleton } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';

interface OptimizedImageProps {
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

const DEFAULT_FALLBACK = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23e0e0e0"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%23757575"%3ENo Image%3C/text%3E%3C/svg%3E';

function OptimizedImage({
    src,
    alt,
    width,
    height,
    fallbackSrc = DEFAULT_FALLBACK,
    sx,
    loading = 'lazy',
    objectFit = 'cover',
    priority = false,
    onLoad,
    onError,
}: OptimizedImageProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState(src);
    const [hasError, setHasError] = useState(false);

    // Reset state when src changes
    useEffect(() => {
        setImageSrc(src);
        setImageLoaded(false);
        setHasError(false);
    }, [src]);

    // Preload priority images
    useEffect(() => {
        if (priority && src) {
            const img = new Image();
            img.src = src;
        }
    }, [priority, src]);

    const handleLoad = () => {
        setImageLoaded(true);
        onLoad?.();
    };

    const handleError = () => {
        if (!hasError) {
            setHasError(true);
            setImageSrc(fallbackSrc);
            onError?.();
        }
    };

    // Calculate aspect ratio for skeleton
    const aspectRatio = (height / width) * 100;

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                paddingBottom: `${aspectRatio}%`,
                overflow: 'hidden',
                bgcolor: 'grey.200',
                ...sx,
            }}
        >
            {/* Skeleton loader */}
            {!imageLoaded && (
                <Skeleton
                    variant="rectangular"
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                    animation="wave"
                />
            )}

            {/* Actual image */}
            <Box
                component="img"
                src={imageSrc}
                alt={alt}
                width={width}
                height={height}
                loading={priority ? 'eager' : loading}
                onLoad={handleLoad}
                onError={handleError}
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit,
                    opacity: imageLoaded ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out',
                    display: 'block',
                }}
            />
        </Box>
    );
}

export default OptimizedImage;
