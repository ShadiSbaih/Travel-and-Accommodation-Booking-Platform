import { useState, useEffect, useRef } from 'react';
import { Box, Skeleton } from '@mui/material';
import type { OptimizedImageProps } from './types';
import { DEFAULT_FALLBACK_IMAGE } from '@/shared/constants/image.constants';
import { calculateAspectRatio, preloadImage } from '@/shared/utils';

function OptimizedImage({
    src,
    alt,
    width,
    height,
    fallbackSrc = DEFAULT_FALLBACK_IMAGE,
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
    const imgRef = useRef<HTMLImageElement>(null);

    // Reset state when src changes
    useEffect(() => {
        setImageSrc(src);
        setHasError(false);
        
        // Check if image is already cached/loaded immediately
        const checkImageLoaded = () => {
            if (imgRef.current?.complete && imgRef.current?.naturalHeight !== 0) {
                setImageLoaded(true);
            } else {
                setImageLoaded(false);
            }
        };
        
        // Check immediately
        checkImageLoaded();
        
        // Also check after a small delay to catch async-loaded cached images
        const timeoutId = setTimeout(checkImageLoaded, 0);
        
        return () => clearTimeout(timeoutId);
    }, [src]);

    // Preload priority images
    useEffect(() => {
        if (priority && src) {
            preloadImage(src);
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
    const aspectRatio = calculateAspectRatio(width, height);

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
                ref={imgRef}
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
