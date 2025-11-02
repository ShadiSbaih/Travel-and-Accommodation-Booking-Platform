import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  Box,
} from '@mui/material';

function RoomListSkeleton() {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(30, 41, 59, 0.95)'
            : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderRadius: 1.5,
        overflow: 'hidden',
        border: (theme) =>
          theme.palette.mode === 'dark'
            ? '1px solid rgba(148, 163, 184, 0.1)'
            : '1px solid rgba(226, 232, 240, 0.8)',
      }}
    >
      <Table>
        <TableHead>
          <TableRow
            sx={{
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(51, 65, 85, 0.6)'
                  : 'rgba(226, 232, 240, 0.8)',
            }}
          >
            <TableCell
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
                fontWeight: 700,
                py: 2,
              }}
            >
              Room
            </TableCell>
            <TableCell
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
                fontWeight: 700,
              }}
            >
              Type
            </TableCell>
            <TableCell
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
                fontWeight: 700,
              }}
            >
              Capacity
            </TableCell>
            <TableCell
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
                fontWeight: 700,
              }}
            >
              Price
            </TableCell>
            <TableCell
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
                fontWeight: 700,
              }}
            >
              Availability
            </TableCell>
            <TableCell
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
                fontWeight: 700,
              }}
              align="right"
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow
              key={index}
              sx={{
                '&:hover': {
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(51, 65, 85, 0.3)'
                      : 'rgba(20, 184, 166, 0.05)',
                },
              }}
            >
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Skeleton
                    variant="rounded"
                    width={40}
                    height={40}
                    sx={{
                      borderRadius: 1.5,
                      bgcolor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(51, 65, 85, 0.6)'
                          : 'rgba(0, 0, 0, 0.11)',
                    }}
                  />
                  <Box>
                    <Skeleton
                      variant="text"
                      width={100}
                      height={24}
                      sx={{
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(51, 65, 85, 0.6)'
                            : 'rgba(0, 0, 0, 0.11)',
                      }}
                    />
                    <Skeleton
                      variant="text"
                      width={60}
                      height={18}
                      sx={{
                        mt: 0.5,
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(51, 65, 85, 0.6)'
                            : 'rgba(0, 0, 0, 0.11)',
                      }}
                    />
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Skeleton
                  variant="rounded"
                  width={80}
                  height={24}
                  sx={{
                    borderRadius: 1,
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(51, 65, 85, 0.6)'
                        : 'rgba(0, 0, 0, 0.11)',
                  }}
                />
              </TableCell>
              <TableCell>
                <Skeleton
                  variant="text"
                  width={100}
                  height={20}
                  sx={{
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(51, 65, 85, 0.6)'
                        : 'rgba(0, 0, 0, 0.11)',
                  }}
                />
              </TableCell>
              <TableCell>
                <Skeleton
                  variant="text"
                  width={80}
                  height={24}
                  sx={{
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(51, 65, 85, 0.6)'
                        : 'rgba(0, 0, 0, 0.11)',
                  }}
                />
              </TableCell>
              <TableCell>
                <Skeleton
                  variant="rounded"
                  width={90}
                  height={24}
                  sx={{
                    borderRadius: 1,
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(51, 65, 85, 0.6)'
                        : 'rgba(0, 0, 0, 0.11)',
                  }}
                />
              </TableCell>
              <TableCell align="right">
                <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                  <Skeleton
                    variant="rounded"
                    width={80}
                    height={32}
                    sx={{
                      borderRadius: 1.5,
                      bgcolor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(51, 65, 85, 0.6)'
                          : 'rgba(0, 0, 0, 0.11)',
                    }}
                  />
                  <Skeleton
                    variant="rounded"
                    width={80}
                    height={32}
                    sx={{
                      borderRadius: 1.5,
                      bgcolor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(51, 65, 85, 0.6)'
                          : 'rgba(0, 0, 0, 0.11)',
                    }}
                  />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default RoomListSkeleton;
