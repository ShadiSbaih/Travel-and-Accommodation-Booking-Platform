import type { FormHTMLAttributes, ReactNode } from 'react';
import { Box, Paper, Typography, Alert, Stack } from '@mui/material';

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    children: ReactNode;
    title?: string;
    subtitle?: string;
    error?: string;
    footer?: ReactNode;
}

function Form({
    children,
    title,
    subtitle,
    error,
    footer,
    ...props
}: FormProps) {
    return (
        <Box sx={{ width: '100%', maxWidth: 448 }}>
            <Paper
                component="form"
                elevation={3}
                sx={{ p: 4, borderRadius: 2 }}
                {...props}
            >
                {(title || subtitle) && (
                    <Box sx={{ mb: 3 }}>
                        {title && (
                            <Typography
                                variant="h4"
                                component="h1"
                                align="center"
                                fontWeight="bold"
                                sx={{ mb: 1 }}
                            >
                                {title}
                            </Typography>
                        )}
                        {subtitle && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                align="center"
                            >
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                )}

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Stack spacing={2}>{children}</Stack>

                {footer && <Box sx={{ mt: 3 }}>{footer}</Box>}
            </Paper>
        </Box>
    );
}

export default Form;