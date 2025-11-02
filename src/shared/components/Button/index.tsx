import { forwardRef } from "react";
import { Button as MuiButton, type ButtonProps as MuiButtonProps } from "@mui/material";

export interface ButtonProps extends Omit<MuiButtonProps, 'color' | 'size' | 'variant'> {
    variant?: 'contained' | 'outlined' | 'ghost';
    colorScheme?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'info' | 'light' | 'dark';
    size?: 'sm' | 'md' | 'lg' | 'xl';
}

const colorSchemeMap = {
    primary: 'primary',
    secondary: 'secondary',
    danger: 'error',
    success: 'success',
    warning: 'warning',
    info: 'info',
    light: 'inherit',
    dark: 'inherit',
} as const;

const sizeMap = {
    sm: 'small',
    md: 'medium',
    lg: 'large',
    xl: 'large',
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = 'contained', size = 'md', colorScheme = 'primary', ...props }, ref) => {
        const muiColor = colorSchemeMap[colorScheme] as MuiButtonProps['color'];
        const muiSize = sizeMap[size] as MuiButtonProps['size'];
        const muiVariant: MuiButtonProps['variant'] = variant === 'ghost' ? 'text' : variant;

        return (
            <MuiButton
                ref={ref}
                variant={muiVariant}
                color={muiColor}
                size={muiSize}
                sx={{
                    ...(size === 'xl' && {
                        px: 4,
                        py: 1.5,
                        fontSize: '1.25rem',
                    }),
                }}
                {...props}
            />
        );
    }
);

Button.displayName = "Button";

export default Button;
