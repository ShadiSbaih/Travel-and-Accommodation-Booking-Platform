import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Grid,
  InputAdornment,
  IconButton,
  Popover,
  Typography,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Hotel as HotelIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface SearchParams {
  query: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  rooms: number;
}

function SearchBar() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [search, setSearch] = useState<SearchParams>({
    query: '',
    checkIn: today,
    checkOut: tomorrow,
    adults: 2,
    children: 0,
    rooms: 1,
  });

  const [guestAnchor, setGuestAnchor] = useState<HTMLButtonElement | null>(null);

  const handleGuestClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setGuestAnchor(event.currentTarget);
  };

  const handleGuestClose = () => {
    setGuestAnchor(null);
  };

  const updateGuests = (field: 'adults' | 'children' | 'rooms', increment: boolean) => {
    setSearch((prev) => ({
      ...prev,
      [field]: increment ? prev[field] + 1 : Math.max(field === 'adults' || field === 'rooms' ? 1 : 0, prev[field] - 1),
    }));
  };

  const handleSearch = () => {
    console.log('Search params:', search);
    // Add your search logic here
  };

  const guestOpen = Boolean(guestAnchor);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Search Input */}
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              placeholder="Search for hotels, cities..."
              value={search.query}
              onChange={(e) => setSearch({ ...search, query: e.target.value })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Check-in Date */}
          <Grid item xs={12} md={2.5}>
            <DatePicker
              label="Check-in"
              value={search.checkIn}
              onChange={(newValue) => newValue && setSearch({ ...search, checkIn: newValue })}
              slotProps={{
                textField: {
                  fullWidth: true,
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                },
              }}
            />
          </Grid>

          {/* Check-out Date */}
          <Grid item xs={12} md={2.5}>
            <DatePicker
              label="Check-out"
              value={search.checkOut}
              onChange={(newValue) => newValue && setSearch({ ...search, checkOut: newValue })}
              minDate={search.checkIn}
              slotProps={{
                textField: {
                  fullWidth: true,
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                },
              }}
            />
          </Grid>

          {/* Guests & Rooms */}
          <Grid item xs={12} md={2.5}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleGuestClick}
              startIcon={<PersonIcon />}
              sx={{ height: '56px', justifyContent: 'flex-start', textTransform: 'none' }}
            >
              {search.adults + search.children} Guests, {search.rooms} Room{search.rooms > 1 ? 's' : ''}
            </Button>
          </Grid>

          {/* Search Button */}
          <Grid item xs={12} md={1.5}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSearch}
              sx={{ height: '56px' }}
            >
              Search
            </Button>
          </Grid>
        </Grid>

        {/* Guest Selector Popover */}
        <Popover
          open={guestOpen}
          anchorEl={guestAnchor}
          onClose={handleGuestClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        >
          <Box sx={{ p: 3, minWidth: 300 }}>
            {/* Adults */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonIcon color="action" />
                <Typography>Adults</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => updateGuests('adults', false)}
                  disabled={search.adults <= 1}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ minWidth: 30, textAlign: 'center' }}>{search.adults}</Typography>
                <IconButton size="small" onClick={() => updateGuests('adults', true)}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Children */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PersonIcon color="action" fontSize="small" />
                <Typography>Children</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => updateGuests('children', false)}
                  disabled={search.children <= 0}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ minWidth: 30, textAlign: 'center' }}>{search.children}</Typography>
                <IconButton size="small" onClick={() => updateGuests('children', true)}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Rooms */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <HotelIcon color="action" />
                <Typography>Rooms</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => updateGuests('rooms', false)}
                  disabled={search.rooms <= 1}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ minWidth: 30, textAlign: 'center' }}>{search.rooms}</Typography>
                <IconButton size="small" onClick={() => updateGuests('rooms', true)}>
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>

            <Button
              fullWidth
              variant="contained"
              onClick={handleGuestClose}
              sx={{ mt: 2 }}
            >
              Done
            </Button>
          </Box>
        </Popover>
      </Paper>
    </LocalizationProvider>
  );
}

export default SearchBar;