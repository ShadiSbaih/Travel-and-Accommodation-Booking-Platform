import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
} from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import type { AdminEntityTableProps } from './types';

const defaultContainerSx: SxProps<Theme> = {
  background: (theme) =>
    theme.palette.mode === 'dark'
      ? 'rgba(30, 41, 59, 0.95)'
      : 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  borderRadius: 2,
  overflow: 'hidden',
  boxShadow: (theme) =>
    theme.palette.mode === 'dark'
      ? '0 6px 24px rgba(0, 0, 0, 0.35)'
      : '0 6px 24px rgba(15, 23, 42, 0.08)',
  border: (theme) =>
    theme.palette.mode === 'dark' ? '1px solid rgba(148, 163, 184, 0.12)' : 'none',
};

const defaultHeadRowSx: SxProps<Theme> = {
  bgcolor: (theme) =>
    theme.palette.mode === 'dark'
      ? 'rgba(51, 65, 85, 0.6)'
      : 'rgba(226, 232, 240, 0.8)',
};

const defaultHeadCellSx: SxProps<Theme> = {
  color: (theme) =>
    theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
  fontWeight: 700,
  fontSize: '0.875rem',
  textTransform: 'capitalize',
};

const defaultBodyRowSx: SxProps<Theme> = {
  '&:nth-of-type(odd)': {
    bgcolor: (theme) =>
      theme.palette.mode === 'dark' ? 'rgba(51, 65, 85, 0.3)' : 'grey.50',
  },
  '&:hover': {
    bgcolor: (theme) =>
      theme.palette.mode === 'dark' ? 'rgba(6, 182, 212, 0.1)' : 'rgba(20, 184, 166, 0.05)',
  },
};

const defaultEmptyCellSx: SxProps<Theme> = {
  py: 4,
  textAlign: 'center',
  color: (theme) =>
    theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
};

const mergeSx = (
  ...styles: Array<SxProps<Theme> | undefined>
): SxProps<Theme> => styles.filter(Boolean) as SxProps<Theme>;

function AdminEntityTable<T>({
  rows,
  columns,
  getRowKey,
  emptyMessage,
  containerSx,
  headRowSx,
  bodyRowSx,
  size = 'medium',
}: AdminEntityTableProps<T>) {
  return (
    <TableContainer component={Paper} elevation={0} sx={mergeSx(defaultContainerSx, containerSx)}>
      <Table size={size}>
        <TableHead>
          <TableRow sx={mergeSx(defaultHeadRowSx, headRowSx)}>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
                sx={mergeSx(defaultHeadCellSx, column.headerSx)}
              >
                {column.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.length === 0 && emptyMessage ? (
            <TableRow>
              <TableCell colSpan={columns.length} sx={defaultEmptyCellSx}>
                <Typography variant="body2">{emptyMessage}</Typography>
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, index) => (
              <TableRow
                key={getRowKey(row, index)}
                sx={mergeSx(defaultBodyRowSx, bodyRowSx ? bodyRowSx(row, index) : undefined)}
              >
                {columns.map((column) => (
                  <TableCell
                    key={`${column.id}-${index}`}
                    align={column.align}
                    sx={mergeSx(
                      column.minWidth ? { minWidth: column.minWidth } : undefined,
                      column.maxWidth ? { maxWidth: column.maxWidth } : undefined,
                      column.width ? { width: column.width } : undefined,
                      column.cellSx,
                      column.getCellSx ? column.getCellSx(row, index) : undefined,
                    )}
                  >
                    {column.render(row, index)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdminEntityTable;
