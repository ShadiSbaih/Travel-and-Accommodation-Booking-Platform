import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  IconButton,
  Popover,
  Typography,
  InputAdornment,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  CalendarToday as CalendarIcon,
  Person as PersonIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface SearchData {
  query: string;
  checkIn: Date;
  checkOut: Date;
  adults: number;
  children: number;
  rooms: number;
}

function SearchBar() {
  // Create default dates
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  // All search form states in one object
  const [searchData, setSearchData] = useState<SearchData>({
    query: '',
    checkIn: today,
    checkOut: tomorrow,
    adults: 2,
    children: 0,
    rooms: 1,
  });

  // Popover control
  const [guestButton, setGuestButton] = useState<HTMLElement | null>(null);

  // Helper functions
  const openGuestSelector = (event: React.MouseEvent<HTMLElement>) => {
    setGuestButton(event.currentTarget);
  };

  const closeGuestSelector = () => {
    setGuestButton(null);
  };

  const increaseAdults = () => {
    setSearchData(prev => ({ ...prev, adults: prev.adults + 1 }));
  };

  const decreaseAdults = () => {
    setSearchData(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }));
  };

  const increaseChildren = () => {
    setSearchData(prev => ({ ...prev, children: prev.children + 1 }));
  };

  const decreaseChildren = () => {
    setSearchData(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }));
  };

  const increaseRooms = () => {
    setSearchData(prev => ({ ...prev, rooms: prev.rooms + 1 }));
  };

  const decreaseRooms = () => {
    setSearchData(prev => ({ ...prev, rooms: Math.max(1, prev.rooms - 1) }));
  };

  const handleSearch = () => {
    // Basic validation
    if (!searchData.query.trim()) {
      alert('Please enter a destination');
      return;
    }

    if (searchData.checkOut <= searchData.checkIn) {
      alert('Check-out must be after check-in');
      return;
    }

    console.log('Search Data:', searchData);
    // Here you would typically call your search API
  };

  // Computed values
  const isGuestOpen = Boolean(guestButton);
  const totalGuests = searchData.adults + searchData.children;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper 
        elevation={3} 
        sx={{ 
          padding: 3, 
          borderRadius: 2,
          maxWidth: 1000,
          margin: '0 auto'
        }}
      >
        
        {/* Search Input */}
        <Box sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            label="Destination"
            placeholder="Search for hotels, cities..."
            value={searchData.query}
            onChange={(e) => setSearchData(prev => ({ ...prev, query: e.target.value }))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Dates Row */}
        <Box sx={{ 
          display: 'flex', 
          gap: 2, 
          marginBottom: 2,
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          <DatePicker
            label="Check-in Date"
            value={searchData.checkIn}
            onChange={(newValue) => newValue && setSearchData(prev => ({ ...prev, checkIn: newValue }))}
            minDate={today}
            slotProps={{ 
              textField: { 
                fullWidth: true,
                InputProps: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarIcon color="action" />
                    </InputAdornment>
                  ),
                }
              } 
            }}
          />
          <DatePicker
            label="Check-out Date"
            value={searchData.checkOut}
            onChange={(newValue) => newValue && setSearchData(prev => ({ ...prev, checkOut: newValue }))}
            minDate={searchData.checkIn}
            slotProps={{ 
              textField: { 
                fullWidth: true,
                InputProps: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <CalendarIcon color="action" />
                    </InputAdornment>
                  ),
                }
              } 
            }}
          />
        </Box>

        {/* Guests and Search Row */}
        <Box sx={{ 
          display: 'flex', 
          gap: 2,
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
          {/* Guests Button */}
          <Button
            variant="outlined"
            onClick={openGuestSelector}
            startIcon={<PersonIcon />}
            sx={{ 
              flex: 1,
              height: 56,
              justifyContent: 'flex-start',
              textTransform: 'none'
            }}
          >
            {totalGuests} Guest{totalGuests !== 1 ? 's' : ''}, {searchData.rooms} Room{searchData.rooms > 1 ? 's' : ''}
          </Button>

          {/* Search Button */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSearch}
            startIcon={<SearchIcon />}
            sx={{ 
              minWidth: 140,
              height: 56,
              textTransform: 'none'
            }}
          >
            Search Hotels
          </Button>
        </Box>

        {/* Guest Selector Popup */}
        <Popover
          open={isGuestOpen}
          anchorEl={guestButton}
          onClose={closeGuestSelector}
          anchorOrigin={{ 
            vertical: 'bottom', 
            horizontal: 'left' 
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          <Box sx={{ padding: 3, minWidth: 280 }}>
            
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Guests & Rooms
            </Typography>

            {/* Adults Section */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: 2 
            }}>
              <Box>
                <Typography variant="body1">Adults</Typography>
                <Typography variant="caption" color="text.secondary">
                  Ages 13+
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={decreaseAdults}
                  disabled={searchData.adults <= 1}
                  sx={{ border: '1px solid #e0e0e0' }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ 
                  minWidth: 40, 
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}>
                  {searchData.adults}
                </Typography>
                <IconButton
                  size="small"
                  onClick={increaseAdults}
                  sx={{ border: '1px solid #e0e0e0' }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>

            <Divider sx={{ marginY: 1 }} />

            {/* Children Section */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: 2 
            }}>
              <Box>
                <Typography variant="body1">Children</Typography>
                <Typography variant="caption" color="text.secondary">
                  Ages 0-12
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={decreaseChildren}
                  disabled={searchData.children <= 0}
                  sx={{ border: '1px solid #e0e0e0' }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ 
                  minWidth: 40, 
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}>
                  {searchData.children}
                </Typography>
                <IconButton
                  size="small"
                  onClick={increaseChildren}
                  sx={{ border: '1px solid #e0e0e0' }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>

            <Divider sx={{ marginY: 1 }} />

            {/* Rooms Section */}
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginBottom: 3 
            }}>
              <Box>
                <Typography variant="body1">Rooms</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={decreaseRooms}
                  disabled={searchData.rooms <= 1}
                  sx={{ border: '1px solid #e0e0e0' }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ 
                  minWidth: 40, 
                  textAlign: 'center',
                  fontWeight: 'bold'
                }}>
                  {searchData.rooms}
                </Typography>
                <IconButton
                  size="small"
                  onClick={increaseRooms}
                  sx={{ border: '1px solid #e0e0e0' }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>

            {/* Apply Button */}
            <Button
              fullWidth
              variant="contained"
              onClick={closeGuestSelector}
              sx={{ textTransform: 'none' }}
            >
              Apply Selection
            </Button>
          </Box>
        </Popover>
      </Paper>
    </LocalizationProvider>
  );
}

export default SearchBar;