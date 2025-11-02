import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  Box,
} from '@mui/material';

function HotelListSkeleton() {
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
        borderRadius: 2,
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
              }}
            >
              Hotel
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
              Location
            </TableCell>
            <TableCell
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
                fontWeight: 700,
              }}
            >
              Rating
            </TableCell>
            <TableCell
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
                fontWeight: 700,
              }}
            >
              Rooms
            </TableCell>
            <TableCell
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
                fontWeight: 700,
              }}
            >
              Description
            </TableCell>
            <TableCell
              align="center"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
                fontWeight: 700,
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                  <Skeleton
                    variant="rounded"
                    width={40}
                    height={40}
                    sx={{
                      bgcolor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(51, 65, 85, 0.5)'
                          : 'grey.200',
                    }}
                  />
                  <Box>
                    <Skeleton
                      variant="text"
                      width={120}
                      sx={{
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(51, 65, 85, 0.5)'
                            : 'grey.200',
                      }}
                    />
                    <Skeleton
                      variant="text"
                      width={60}
                      sx={{
                        bgcolor: (theme) =>
                          theme.palette.mode === 'dark'
                            ? 'rgba(51, 65, 85, 0.5)'
                            : 'grey.200',
                      }}
                    />
                  </Box>
                </Box>
              </TableCell>
              <TableCell>
                <Skeleton
                  variant="text"
                  width={80}
                  sx={{
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(51, 65, 85, 0.5)'
                        : 'grey.200',
                  }}
                />
              </TableCell>
              <TableCell>
                <Skeleton
                  variant="text"
                  width={150}
                  sx={{
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(51, 65, 85, 0.5)'
                        : 'grey.200',
                  }}
                />
              </TableCell>
              <TableCell>
                <Skeleton
                  variant="text"
                  width={100}
                  sx={{
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(51, 65, 85, 0.5)'
                        : 'grey.200',
                  }}
                />
              </TableCell>
              <TableCell>
                <Skeleton
                  variant="text"
                  width={80}
                  sx={{
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(51, 65, 85, 0.5)'
                        : 'grey.200',
                  }}
                />
              </TableCell>
              <TableCell>
                <Skeleton
                  variant="text"
                  width={200}
                  sx={{
                    bgcolor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? 'rgba(51, 65, 85, 0.5)'
                        : 'grey.200',
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
                  <Skeleton
                    variant="circular"
                    width={32}
                    height={32}
                    sx={{
                      bgcolor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(51, 65, 85, 0.5)'
                          : 'grey.200',
                    }}
                  />
                  <Skeleton
                    variant="circular"
                    width={32}
                    height={32}
                    sx={{
                      bgcolor: (theme) =>
                        theme.palette.mode === 'dark'
                          ? 'rgba(51, 65, 85, 0.5)'
                          : 'grey.200',
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

export default HotelListSkeleton;
