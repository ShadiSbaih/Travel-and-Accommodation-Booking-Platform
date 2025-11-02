export const textFieldStyles = {
    '& .MuiOutlinedInput-root': {
        borderRadius: 1.5,
        bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'rgba(51, 65, 85, 0.3)' : 'white',
        '& fieldset': {
            borderColor: (theme) =>
                theme.palette.mode === 'dark'
                    ? 'rgba(148, 163, 184, 0.2)'
                    : 'rgba(0, 0, 0, 0.12)',
        },
        '&:hover fieldset': {
            borderColor: (theme) =>
                theme.palette.mode === 'dark' ? '#22d3ee' : '#14b8a6',
        },
        '&.Mui-focused fieldset': {
            borderWidth: 2,
            borderColor: (theme) =>
                theme.palette.mode === 'dark' ? '#06b6d4' : '#0d9488',
        },
        '& input, & textarea, & .MuiSelect-select': {
            color: (theme) =>
                theme.palette.mode === 'dark' ? '#e2e8f0' : 'inherit',
        },
    },
    '& .MuiInputLabel-root': {
        color: (theme) =>
            theme.palette.mode === 'dark' ? '#94a3b8' : 'inherit',
    },
    '& .MuiFormHelperText-root': {
        color: (theme) =>
            theme.palette.mode === 'dark' ? '#94a3b8' : 'inherit',
    },
};

export const dialogPaperStyles = {
    borderRadius: 2,
    background: (theme) =>
        theme.palette.mode === 'dark'
            ? 'rgba(30, 41, 59, 0.98)'
            : 'rgba(255, 255, 255, 0.98)',
    backdropFilter: 'blur(20px)',
    boxShadow: (theme) =>
        theme.palette.mode === 'dark'
            ? '0 20px 60px rgba(0, 0, 0, 0.6)'
            : '0 20px 60px rgba(0, 0, 0, 0.3)',
    overflow: 'hidden',
    border: (theme) =>
        theme.palette.mode === 'dark'
            ? '1px solid rgba(148, 163, 184, 0.1)'
            : 'none',
};
