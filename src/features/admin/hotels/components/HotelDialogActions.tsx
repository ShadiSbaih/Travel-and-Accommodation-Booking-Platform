import { Box, Button } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

interface HotelDialogActionsProps {
    onCancel: () => void;
    onSubmit: () => void;
    isEditMode: boolean;
    isLoading: boolean;
    isDisabled: boolean;
}

function HotelDialogActions({
    onCancel,
    onSubmit,
    isEditMode,
    isLoading,
    isDisabled,
}: HotelDialogActionsProps) {
    return (
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 1 }}>
            <Button
                variant="outlined"
                onClick={onCancel}
                disabled={isLoading}
                sx={{
                    textTransform: 'none',
                    borderRadius: 1.5,
                    px: 4,
                    py: 1.2,
                    fontWeight: 600,
                    borderColor: (theme) =>
                        theme.palette.mode === 'dark'
                            ? 'rgba(148, 163, 184, 0.3)'
                            : 'grey.400',
                    color: (theme) =>
                        theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
                    '&:hover': {
                        borderColor: (theme) =>
                            theme.palette.mode === 'dark' ? '#475569' : 'grey.600',
                        bgcolor: (theme) =>
                            theme.palette.mode === 'dark'
                                ? 'rgba(51, 65, 85, 0.3)'
                                : 'grey.50',
                    },
                }}
            >
                Cancel
            </Button>
            <Button
                variant="contained"
                onClick={onSubmit}
                disabled={isDisabled}
                startIcon={<SaveIcon />}
                sx={{
                    textTransform: 'none',
                    borderRadius: 1.5,
                    px: 4,
                    py: 1.2,
                    fontWeight: 600,
                    bgcolor: (theme) =>
                        theme.palette.mode === 'dark' ? '#0891b2' : '#14b8a6',
                    color: 'white',
                    '&:hover': {
                        bgcolor: (theme) =>
                            theme.palette.mode === 'dark' ? '#0e7490' : '#0d9488',
                    },
                    '&:disabled': {
                        bgcolor: (theme) =>
                            theme.palette.mode === 'dark'
                                ? 'rgba(100, 116, 139, 0.3)'
                                : 'grey.300',
                        color: (theme) =>
                            theme.palette.mode === 'dark'
                                ? 'rgba(148, 163, 184, 0.5)'
                                : 'rgba(0, 0, 0, 0.26)',
                        boxShadow: 'none',
                    },
                }}
            >
                {isEditMode ? 'Update Hotel' : 'Add Hotel'}
            </Button>
        </Box>
    );
}

export default HotelDialogActions;
