import { Box, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import type { AdminPageHeaderProps } from '../types';

function AdminPageHeader({
    title,
    count,
    singularLabel,
    pluralLabel,
    hasSearchQuery,
    viewMode,
    onViewModeChange,
    onAdd,
    addButtonLabel,
    addButtonShortLabel = 'Add',
    icon: IconComponent,
    addButtonIcon,
}: AdminPageHeaderProps) {
    const resolvedPluralLabel = pluralLabel || `${singularLabel}s`;
    const countLabel = `${count} ${count === 1 ? singularLabel : resolvedPluralLabel} ${hasSearchQuery ? 'found' : 'total'
        }`;

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
                flexWrap: 'wrap',
                gap: 2,
            }}
        >
            {/* Title Section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                    sx={{
                        width: 56,
                        height: 56,
                        borderRadius: 2,
                        bgcolor: (theme) =>
                            theme.palette.mode === 'dark'
                                ? 'rgba(6, 182, 212, 0.2)'
                                : 'rgba(20, 184, 166, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <IconComponent
                        sx={{
                            color: (theme) =>
                                theme.palette.mode === 'dark' ? '#22d3ee' : '#0d9488',
                            fontSize: 32,
                        }}
                    />
                </Box>
                <Box>
                    <Typography
                        variant="h4"
                        fontWeight="700"
                        sx={{
                            color: (theme) =>
                                theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
                            mb: 0.5,
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: (theme) =>
                                theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
                        }}
                    >
                        {countLabel}
                    </Typography>
                </Box>
            </Box>

            {/* Actions Section */}
            <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                {/* View Mode Toggle */}
                <Box
                    sx={{
                        display: 'flex',
                        borderRadius: 1.5,
                        overflow: 'hidden',
                        border: '1px solid',
                        borderColor: (theme) =>
                            theme.palette.mode === 'dark'
                                ? 'rgba(148, 163, 184, 0.2)'
                                : 'grey.300',
                    }}
                >
                    <Button
                        onClick={() => onViewModeChange('grid')}
                        sx={{
                            minWidth: 44,
                            height: 44,
                            borderRadius: 0,
                            bgcolor:
                                viewMode === 'grid'
                                    ? (theme) =>
                                        theme.palette.mode === 'dark'
                                            ? 'rgba(6, 182, 212, 0.2)'
                                            : 'rgba(20, 184, 166, 0.1)'
                                    : 'transparent',
                            color:
                                viewMode === 'grid'
                                    ? (theme) =>
                                        theme.palette.mode === 'dark' ? '#22d3ee' : '#0d9488'
                                    : (theme) =>
                                        theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
                            '&:hover': {
                                bgcolor:
                                    viewMode === 'grid'
                                        ? (theme) =>
                                            theme.palette.mode === 'dark'
                                                ? 'rgba(6, 182, 212, 0.3)'
                                                : 'rgba(20, 184, 166, 0.15)'
                                        : (theme) =>
                                            theme.palette.mode === 'dark'
                                                ? 'rgba(51, 65, 85, 0.3)'
                                                : 'grey.100',
                            },
                        }}
                    >
                        <ViewModuleIcon />
                    </Button>
                    <Button
                        onClick={() => onViewModeChange('list')}
                        sx={{
                            minWidth: 44,
                            height: 44,
                            borderRadius: 0,
                            bgcolor:
                                viewMode === 'list'
                                    ? (theme) =>
                                        theme.palette.mode === 'dark'
                                            ? 'rgba(6, 182, 212, 0.2)'
                                            : 'rgba(20, 184, 166, 0.1)'
                                    : 'transparent',
                            color:
                                viewMode === 'list'
                                    ? (theme) =>
                                        theme.palette.mode === 'dark' ? '#22d3ee' : '#0d9488'
                                    : (theme) =>
                                        theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
                            '&:hover': {
                                bgcolor:
                                    viewMode === 'list'
                                        ? (theme) =>
                                            theme.palette.mode === 'dark'
                                                ? 'rgba(6, 182, 212, 0.3)'
                                                : 'rgba(20, 184, 166, 0.15)'
                                        : (theme) =>
                                            theme.palette.mode === 'dark'
                                                ? 'rgba(51, 65, 85, 0.3)'
                                                : 'grey.100',
                            },
                        }}
                    >
                        <ViewListIcon />
                    </Button>
                </Box>

                {/* Add Button */}
                <Button
                    variant="contained"
                    startIcon={addButtonIcon ?? <AddIcon />}
                    onClick={onAdd}
                    sx={{
                        textTransform: 'none',
                        borderRadius: 1.5,
                        px: { xs: 2, sm: 3 },
                        py: { xs: 1, sm: 1.2 },
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        fontWeight: 600,
                        minWidth: { xs: 'auto', sm: 'auto' },
                        bgcolor: (theme) =>
                            theme.palette.mode === 'dark' ? '#0891b2' : '#14b8a6',
                        color: 'white',
                        '&:hover': {
                            bgcolor: (theme) =>
                                theme.palette.mode === 'dark' ? '#0e7490' : '#0d9488',
                        },
                        '& .MuiButton-startIcon': {
                            marginRight: { xs: 0.5, sm: 1 },
                        },
                    }}
                >
                    <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                        {addButtonLabel}
                    </Box>
                    <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                        {addButtonShortLabel}
                    </Box>
                </Button>
            </Box>
        </Box>
    );
}

export default AdminPageHeader;
