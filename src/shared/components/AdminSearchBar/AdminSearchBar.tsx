import { Box, TextField, InputAdornment, IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import type { SxProps, Theme } from '@mui/material/styles';
import type { AdminSearchBarProps, AdminSearchBarVariant } from './types';

const variantStyles: Record<AdminSearchBarVariant, { container?: SxProps<Theme>; textField: SxProps<Theme> }> = {
  rounded: {
    container: {
      mt: { xs: 2, sm: 3 },
    },
    textField: {
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
        '& input': {
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#e2e8f0' : 'inherit',
          '&::placeholder': {
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#64748b' : 'inherit',
            opacity: 1,
          },
        },
      },
    },
  },
  compact: {
    container: {
      mt: { xs: 2, sm: 3 },
    },
    textField: {
      '& .MuiOutlinedInput-root': {
        borderRadius: 1,
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.6)' : 'white',
        fontSize: { xs: '0.875rem', sm: '1rem' },
        '& fieldset': {
          borderColor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(148, 163, 184, 0.2)'
              : 'rgba(0, 0, 0, 0.12)',
          borderWidth: 1.5,
        },
        '&:hover fieldset': {
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? '#22d3ee' : '#14b8a6',
        },
        '&.Mui-focused fieldset': {
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? '#06b6d4' : '#0d9488',
          borderWidth: 2,
        },
        '& input': {
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#e2e8f0' : 'inherit',
          py: { xs: 1.5, sm: 1.75 },
        },
        '& input::placeholder': {
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#94a3b8' : 'inherit',
          opacity: 1,
        },
      },
    },
  },
};

function AdminSearchBar({
  value,
  placeholder,
  onChange,
  onReset,
  clearTooltip,
  clearIcon,
  startAdornment,
  endAdornment,
  containerSx,
  textFieldSx,
  variantStyle = 'rounded',
  InputProps: inputPropsProp,
  sx,
  fullWidth = true,
  type = 'search',
  ...rest
}: AdminSearchBarProps) {
  const defaultStartAdornment = (
    <InputAdornment position="start">
      <SearchIcon
        sx={{
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#22d3ee' : '#14b8a6',
        }}
      />
    </InputAdornment>
  );

  let resolvedEndAdornment = endAdornment;
  if (!resolvedEndAdornment && onReset && value) {
    const clearButton = (
      <IconButton
        size="small"
        onClick={onReset}
        sx={{
          color: (theme) =>
            theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
        }}
      >
        {clearIcon ?? <ClearIcon />}
      </IconButton>
    );

    resolvedEndAdornment = (
      <InputAdornment position="end">
        {clearTooltip ? (
          <Tooltip title={clearTooltip}>
            {clearButton}
          </Tooltip>
        ) : (
          clearButton
        )}
      </InputAdornment>
    );
  }

  const mergedInputProps = {
    ...inputPropsProp,
    startAdornment:
      inputPropsProp?.startAdornment ?? startAdornment ?? defaultStartAdornment,
    endAdornment: inputPropsProp?.endAdornment ?? resolvedEndAdornment,
  };

  const variantConfig = variantStyles[variantStyle];

  const containerStyles = [variantConfig.container, containerSx].filter(Boolean) as SxProps<Theme>;
  const textFieldStyles = [variantConfig.textField, textFieldSx, sx].filter(Boolean) as SxProps<Theme>;

  return (
    <Box sx={containerStyles}>
      <TextField
        {...rest}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        InputProps={mergedInputProps}
        fullWidth={fullWidth}
        type={type}
        sx={textFieldStyles}
      />
    </Box>
  );
}

export default AdminSearchBar;
