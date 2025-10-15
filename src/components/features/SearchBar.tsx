import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  Stack,
  InputAdornment,
  IconButton,
  Popover,
  Typography,
  Divider,
  Chip,
} from '@mui/material';
import {
  Search as SearchIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Hotel as HotelIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  LocationOn as LocationIcon,
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

interface GuestControlProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  minValue?: number;
}

const GuestControl = ({ icon, label, value, onIncrement, onDecrement, minValue = 0 }: GuestControlProps) => (
  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      {icon}
      <Typography variant="body1">{label}</Typography>
    </Box>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <IconButton
        size="small"
        onClick={onDecrement}
        disabled={value <= minValue}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          '&:hover': { backgroundColor: 'action.hover' }
        }}
      >
        <RemoveIcon fontSize="small" />
      </IconButton>
      <Typography
        variant="body1"
        sx={{
          minWidth: 40,
          textAlign: 'center',
          fontWeight: 'medium'
        }}
      >
        {value}
      </Typography>
      <IconButton
        size="small"
        onClick={onIncrement}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          '&:hover': { backgroundColor: 'action.hover' }
        }}
      >
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  </Box>
);

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

  const [guestAnchor, setGuestAnchor] = useState<HTMLElement | null>(null);

  const handleGuestClick = (event: React.MouseEvent<HTMLElement>) => {
    setGuestAnchor(event.currentTarget);
  };

  const handleGuestClose = () => {
    setGuestAnchor(null);
  };

  const updateGuests = (field: keyof Pick<SearchParams, 'adults' | 'children' | 'rooms'>, increment: boolean) => {
    setSearch((prev) => {
      const minValue = field === 'adults' || field === 'rooms' ? 1 : 0;
      const newValue = increment ? prev[field] + 1 : Math.max(minValue, prev[field] - 1);
      return { ...prev, [field]: newValue };
    });
  };

  const handleSearch = () => {
    // Validate search params
    if (!search.query.trim()) {
      alert('Please enter a destination');
      return;
    }

    if (search.checkOut <= search.checkIn) {
      alert('Check-out date must be after check-in date');
      return;
    }

    console.log('Search params:', search);
    // Add your search logic here
  };

  const handleDateChange = (field: 'checkIn' | 'checkOut', newValue: Date | null) => {
    if (!newValue) return;

    if (field === 'checkIn' && newValue >= search.checkOut) {
      const nextDay = new Date(newValue);
      nextDay.setDate(nextDay.getDate() + 1);
      setSearch(prev => ({ ...prev, checkIn: newValue, checkOut: nextDay }));
    } else {
      setSearch(prev => ({ ...prev, [field]: newValue }));
    }
  };

  const guestOpen = Boolean(guestAnchor);
  const totalGuests = search.adults + search.children;

  const formatGuestText = () => {
    const guestText = totalGuests === 1 ? '1 Guest' : `${totalGuests} Guests`;
    const roomText = search.rooms === 1 ? '1 Room' : `${search.rooms} Rooms`;
    return `${guestText}, ${roomText}`;
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 3,
          background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
          border: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          alignItems="stretch"
        >
          {/* Search Input */}
          <Box sx={{ flex: { md: 3 } }}>
            <TextField
              fullWidth
              placeholder="Search for hotels, cities..."
              value={search.query}
              onChange={(e) => setSearch(prev => ({ ...prev, query: e.target.value }))}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: 56,
                  borderRadius: 2,
                }
              }}
            />
          </Box>

          {/* Date Inputs */}
          <Box sx={{ flex: { md: 2 } }}>
            <DatePicker
              label="Check-in"
              value={search.checkIn}
              onChange={(newValue) => handleDateChange('checkIn', newValue)}
              minDate={today}
              slotProps={{
                textField: {
                  fullWidth: true,
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarIcon color="primary" />
                      </InputAdornment>
                    ),
                  },
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      height: 56,
                      borderRadius: 2,
                    }
                  }
                },
              }}
            />
          </Box>

          <Box sx={{ flex: { md: 2 } }}>
            <DatePicker
              label="Check-out"
              value={search.checkOut}
              onChange={(newValue) => handleDateChange('checkOut', newValue)}
              minDate={search.checkIn}
              slotProps={{
                textField: {
                  fullWidth: true,
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarIcon color="primary" />
                      </InputAdornment>
                    ),
                  },
                  sx: {
                    '& .MuiOutlinedInput-root': {
                      height: 56,
                      borderRadius: 2,
                    }
                  }
                },
              }}
            />
          </Box>

          {/* Guests & Rooms Selector */}
          <Box sx={{ flex: { md: 2.5 } }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleGuestClick}
              startIcon={<PersonIcon />}
              sx={{
                height: 56,
                justifyContent: 'flex-start',
                textTransform: 'none',
                borderRadius: 2,
                color: 'text.primary',
                borderColor: 'divider',
                '&:hover': {
                  borderColor: 'primary.main',
                  backgroundColor: 'action.hover'
                }
              }}
            >
              <Typography variant="body2" sx={{ fontSize: '0.875rem' }}>
                {formatGuestText()}
              </Typography>
            </Button>
          </Box>

          {/* Search Button */}
          <Box sx={{ flex: { md: 1.5 } }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              onClick={handleSearch}
              startIcon={<SearchIcon />}
              sx={{
                height: 56,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #1976D2 30%, #1E88E5 90%)',
                }
              }}
            >
              Search
            </Button>
          </Box>
        </Stack>

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
          PaperProps={{
            sx: {
              borderRadius: 2,
              mt: 1,
              boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
            }
          }}
        >
          <Box sx={{ p: 3, minWidth: 320 }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Guests & Rooms
            </Typography>

            <GuestControl
              icon={<PersonIcon color="primary" />}
              label="Adults"
              value={search.adults}
              onIncrement={() => updateGuests('adults', true)}
              onDecrement={() => updateGuests('adults', false)}
              minValue={1}
            />

            <Divider sx={{ my: 2 }} />

            <GuestControl
              icon={<PersonIcon color="primary" fontSize="small" />}
              label="Children"
              value={search.children}
              onIncrement={() => updateGuests('children', true)}
              onDecrement={() => updateGuests('children', false)}
              minValue={0}
            />

            <Divider sx={{ my: 2 }} />

            <GuestControl
              icon={<HotelIcon color="primary" />}
              label="Rooms"
              value={search.rooms}
              onIncrement={() => updateGuests('rooms', true)}
              onDecrement={() => updateGuests('rooms', false)}
              minValue={1}
            />

            <Box sx={{ mt: 3, display: 'flex', gap: 1 }}>
              <Chip
                label={`${totalGuests} Guest${totalGuests !== 1 ? 's' : ''}`}
                size="small"
                color="primary"
                variant="outlined"
              />
              <Chip
                label={`${search.rooms} Room${search.rooms !== 1 ? 's' : ''}`}
                size="small"
                color="primary"
                variant="outlined"
              />
            </Box>

            <Button
              fullWidth
              variant="contained"
              onClick={handleGuestClose}
              sx={{ mt: 3, borderRadius: 2 }}
            >
              Apply
            </Button>
          </Box>
        </Popover>
      </Paper>
    </LocalizationProvider>
  );
}

export default SearchBar;