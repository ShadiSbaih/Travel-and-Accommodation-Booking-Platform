import type { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import type { TableCellProps } from '@mui/material/TableCell';

export interface AdminEntityTableColumn<T> {
  id: string;
  header: string;
  align?: TableCellProps['align'];
  headerSx?: SxProps<Theme>;
  cellSx?: SxProps<Theme>;
  getCellSx?: (row: T, index: number) => SxProps<Theme>;
  minWidth?: number | string;
  maxWidth?: number | string;
  width?: number | string;
  render: (row: T, index: number) => ReactNode;
}

export interface AdminEntityTableProps<T> {
  rows: T[];
  columns: AdminEntityTableColumn<T>[];
  getRowKey: (row: T, index: number) => React.Key;
  emptyMessage?: string;
  containerSx?: SxProps<Theme>;
  headRowSx?: SxProps<Theme>;
  bodyRowSx?: (row: T, index: number) => SxProps<Theme>;
  size?: 'small' | 'medium';
}
