import { Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HotelIcon from '@mui/icons-material/Hotel';

interface HotelDialogHeaderProps {
    isEditMode: boolean;
    onClose: () => void;
}

function HotelDialogHeader({ isEditMode, onClose }: HotelDialogHeaderProps) {
    return (
        <Box
            sx={{
                bgcolor: (theme) =>
                    theme.palette.mode === 'dark'
                        ? 'rgba(51, 65, 85, 0.6)'
                        : 'rgba(226, 232, 240, 0.8)',
                p: 3,
                position: 'relative',
            }}
        >
            <IconButton
                onClick={onClose}
                aria-label="Close dialog"
                sx={{
                    position: 'absolute',
                    right: 16,
                    top: 16,
                    color: (theme) =>
                        theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
                    bgcolor: (theme) =>
                        theme.palette.mode === 'dark'
                            ? 'rgba(71, 85, 105, 0.5)'
                            : 'rgba(148, 163, 184, 0.2)',
                    '&:hover': {
                        bgcolor: (theme) =>
                            theme.palette.mode === 'dark'
                                ? 'rgba(71, 85, 105, 0.7)'
                                : 'rgba(148, 163, 184, 0.3)',
                    },
                }}
            >
                <CloseIcon />
            </IconButton>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                    sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 1.5,
                        bgcolor: (theme) =>
                            theme.palette.mode === 'dark'
                                ? 'rgba(6, 182, 212, 0.2)'
                                : 'rgba(20, 184, 166, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <HotelIcon
                        sx={{
                            color: (theme) =>
                                theme.palette.mode === 'dark' ? '#22d3ee' : '#0d9488',
                            fontSize: 32,
                        }}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="h5"
                        fontWeight="700"
                        sx={{
                            color: (theme) =>
                                theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
                        }}
                    >
                        {isEditMode ? 'Edit Hotel' : 'Add New Hotel'}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: (theme) =>
                                theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
                            mt: 0.5,
                        }}
                    >
                        {isEditMode
                            ? 'Update hotel information below'
                            : 'Fill in the details to create a new hotel'}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default HotelDialogHeader;
