import type { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import type { TextFieldProps } from '@mui/material/TextField';

export type AdminSearchBarVariant = 'rounded' | 'compact';

export interface AdminSearchBarProps
  extends Omit<TextFieldProps, 'value' | 'onChange' | 'placeholder'> {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onReset?: () => void;
  clearTooltip?: string;
  clearIcon?: ReactNode;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  containerSx?: SxProps<Theme>;
  textFieldSx?: SxProps<Theme>;
  variantStyle?: AdminSearchBarVariant;
}
