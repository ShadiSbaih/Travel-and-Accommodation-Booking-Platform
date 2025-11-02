import { forwardRef } from 'react';
import { TextField, type TextFieldProps, InputAdornment } from '@mui/material';

export interface InputProps extends Omit<TextFieldProps, 'variant' | 'size'> {
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    variant?: 'outline' | 'filled' | 'flushed';
    size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
    sm: 'small',
    md: 'medium',
    lg: 'medium',
} as const;

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            variant = 'outline',
            size = 'md',
            leftIcon,
            rightIcon,
            ...props
        },
        ref
    ) => {
        const muiVariant = variant === 'outline' ? 'outlined' : variant === 'flushed' ? 'standard' : 'filled';
        const muiSize = sizeMap[size];

        return (
            <TextField
                inputRef={ref}
                variant={muiVariant}
                size={muiSize}
                fullWidth
                slotProps={{
                    input: {
                        startAdornment: leftIcon ? (
                            <InputAdornment position="start">{leftIcon}</InputAdornment>
                        ) : undefined,
                        endAdornment: rightIcon ? (
                            <InputAdornment position="end">{rightIcon}</InputAdornment>
                        ) : undefined,
                    },
                }}
                sx={{
                    ...(size === 'lg' && {
                        '& .MuiInputBase-input': {
                            fontSize: '1.125rem',
                            py: 1.5,
                        },
                    }),
                }}
                {...props}
            />
        );
    }
);

Input.displayName = 'Input';

export default Input;