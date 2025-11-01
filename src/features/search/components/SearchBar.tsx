import { useState, useEffect } from 'react';
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
  RestartAlt as RestartAltIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { format } from 'date-fns';
import type { SearchFormData } from '../types';
import { getDefaultDates, getInitialSearchState, DEFAULT_SEARCH_VALUES } from '../utils';

function SearchBar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [searchData, setSearchData] = useState<SearchFormData>(() => getInitialSearchState(searchParams));
  const [guestButton, setGuestButton] = useState<HTMLElement | null>(null);

  // Sync state with URL when searchParams change (e.g., browser back/forward)
  useEffect(() => {
    setSearchData(getInitialSearchState(searchParams));
  }, [searchParams]);

  // Guest selector handlers
  const openGuestSelector = (event: React.MouseEvent<HTMLElement>) => {
    setGuestButton(event.currentTarget);
  };

  const closeGuestSelector = () => {
    setGuestButton(null);
  };

  const updateGuestCount = (field: 'adults' | 'children' | 'rooms', delta: number) => {
    setSearchData(prev => {
      const newValue = prev[field] + delta;
      const min = field === 'children' ? 0 : 1;
      return { ...prev, [field]: Math.max(min, newValue) };
    });
  };

  const handleSearch = () => {
    // Validation later


    // Build URL with all search parameters
    const params = new URLSearchParams({
      query: searchData.query,
      checkIn: format(searchData.checkIn, 'yyyy-MM-dd'),
      checkOut: format(searchData.checkOut, 'yyyy-MM-dd'),
      adults: searchData.adults.toString(),
      children: searchData.children.toString(),
      rooms: searchData.rooms.toString(),
    });

    navigate(`/search-results?${params.toString()}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleClear = () => {
    const { today, tomorrow } = getDefaultDates();
    setSearchData({
      query: '',
      checkIn: today,
      checkOut: tomorrow,
      adults: DEFAULT_SEARCH_VALUES.adults,
      children: DEFAULT_SEARCH_VALUES.children,
      rooms: DEFAULT_SEARCH_VALUES.rooms,
    });
  };

  const totalGuests = searchData.adults + searchData.children;
  const isGuestOpen = Boolean(guestButton);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper
        component="form"
        role="search"
        aria-label="Hotel search form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
        elevation={0}
        sx={{
          padding: { xs: 2, sm: 2.5, md: 3 },
          borderRadius: '24px !important',
          maxWidth: 1400,
          margin: '0 auto',
          background: (theme) => 
            theme.palette.mode === 'dark'
              ? 'rgba(30, 41, 59, 0.85) !important'
              : 'rgba(255, 255, 255, 0.95) !important',
          backdropFilter: 'blur(20px) saturate(180%) !important',
          WebkitBackdropFilter: 'blur(20px) saturate(180%) !important',
          width: '100%',
          border: (theme) => 
            theme.palette.mode === 'dark'
              ? '1px solid rgba(20, 184, 166, 0.3)'
              : '1px solid rgba(20, 184, 166, 0.2)',
          boxShadow: (theme) => 
            theme.palette.mode === 'dark'
              ? '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 2px rgba(20, 184, 166, 0.4) !important'
              : '0 8px 32px rgba(20, 184, 166, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1) !important',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            boxShadow: (theme) => 
              theme.palette.mode === 'dark'
                ? '0 12px 48px rgba(20, 184, 166, 0.3), 0 0 4px rgba(20, 184, 166, 0.6) !important'
                : '0 12px 48px rgba(20, 184, 166, 0.25), 0 8px 24px rgba(0, 0, 0, 0.15) !important',
            transform: 'translateY(-2px)',
            border: (theme) => 
              theme.palette.mode === 'dark'
                ? '1px solid rgba(20, 184, 166, 0.5)'
                : '1px solid rgba(20, 184, 166, 0.4)',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
            alignItems: 'stretch',
            gap: { xs: 2, md: 1.5 },
            width: '100%'
          }}
        >
          {/* Destination */}
          <Box sx={{ 
            flex: { lg: '1 1 20%' },
            minWidth: { lg: 0 }
          }}>
            <TextField
              fullWidth
              size="medium"
              label="Destination"
              placeholder="Wehere are you going?"
              value={searchData.query}
              onChange={(e) => setSearchData(prev => ({ ...prev, query: e.target.value }))}
              onKeyDown={handleKeyDown}
              required
              slotProps={{
                htmlInput: {
                  'aria-label': 'Enter destination',
                  'aria-required': 'true',
                  'autoComplete': 'off',
                },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                },
              }}
              sx={{
                '& .MuiInputBase-root': {
                  height: 56,
                  borderRadius: '16px',
                }
              }}
            />
          </Box>

          {/* Dates */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 2, md: 1.5 },
              flex: { lg: '1 1 38%' },
              minWidth: { lg: 0 }
            }}
          >
            <DatePicker
              label="Check-in"
              value={searchData.checkIn}
              onChange={(newValue) => newValue && setSearchData(prev => ({ ...prev, checkIn: newValue }))}
              minDate={new Date()}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'medium',
                  onKeyDown: handleKeyDown,
                  slotProps: {
                    htmlInput: {
                      'aria-label': 'Select check-in date',
                    },
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarIcon color="action" sx={{ fontSize: '1.25rem' }} />
                        </InputAdornment>
                      ),
                    },
                  },
                  sx: {
                    '& .MuiInputBase-root': {
                      height: 56,
                      borderRadius: '16px',
                    }
                  },
                },
              }}
            />

            <DatePicker
              label="Check-out"
              value={searchData.checkOut}
              onChange={(newValue) => newValue && setSearchData(prev => ({ ...prev, checkOut: newValue }))}
              minDate={searchData.checkIn}
              slotProps={{
                textField: {
                  fullWidth: true,
                  size: 'medium',
                  onKeyDown: handleKeyDown,
                  slotProps: {
                    htmlInput: {
                      'aria-label': 'Select check-out date',
                    },
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <CalendarIcon color="action" sx={{ fontSize: '1.25rem' }} />
                        </InputAdornment>
                      ),
                    },
                  },
                  sx: {
                    '& .MuiInputBase-root': {
                      height: 56,
                      borderRadius: '16px',
                    }
                  },
                },
              }}
            />
          </Box>

          {/* Guests */}
          <Box sx={{ 
            flex: { lg: '1 1 20%' },
            minWidth: { lg: 0 }
          }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={openGuestSelector}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isGuestOpen) {
                  openGuestSelector(e as unknown as React.MouseEvent<HTMLElement>);
                }
              }}
              startIcon={<PersonIcon />}
              aria-label="Select guests and rooms"
              aria-haspopup="true"
              aria-expanded={isGuestOpen}
              sx={{
                height: 56,
                borderRadius: '16px',
                justifyContent: 'flex-start',
                textTransform: 'none',
                fontSize: { xs: '0.875rem', md: '0.95rem' },
                px: 2,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                '& .MuiButton-startIcon': {
                  marginRight: 1
                }
              }}
            >
              <Box component="span" sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                {totalGuests} Guest{totalGuests !== 1 ? 's' : ''}, {searchData.rooms} Room{searchData.rooms > 1 ? 's' : ''}
              </Box>
            </Button>
          </Box>

          {/* Buttons */}
          <Box
            sx={{
              display: 'flex',
              gap: 1.5,
              flex: { lg: '0 0 auto' },
              flexDirection: { xs: 'column', sm: 'row', lg: 'row' },
              minWidth: { lg: 0 },
              width: { xs: '100%', sm: 'auto' }
            }}
          >
            <Button
              type="button"
              variant="contained"
              color="error"
              onClick={handleClear}
              startIcon={<RestartAltIcon />}
              aria-label="Reset search form"
              sx={{
                height: 56,
                textTransform: 'none',
                fontSize: { xs: '0.95rem', md: '0.95rem' },
                flex: { xs: 1, sm: 1, lg: 'none' },
                minWidth: { lg: 110 },
                px: { xs: 2, sm: 2, md: 2.5 },
                fontWeight: 600,
                borderRadius: '16px',
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(211, 47, 47, 0.3)',
                  transform: 'translateY(-1px)',
                  transition: 'all 0.2s ease-in-out'
                },
                '&:active': {
                  transform: 'translateY(0)',
                }
              }}
            >
              Reset
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SearchIcon />}
              aria-label="Search hotels"
              sx={{
                height: 56,
                textTransform: 'none',
                fontSize: { xs: '1rem', md: '1rem' },
                flex: { xs: 1, sm: 1, lg: 'none' },
                minWidth: { lg: 130 },
                px: { xs: 2, sm: 2, md: 3 },
                fontWeight: 600,
                borderRadius: '16px',
                boxShadow: 'none',
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #ea580c 0%, #c2410c 100%)',
                  boxShadow: '0 4px 20px rgba(249, 115, 22, 0.4)',
                  transform: 'translateY(-1px)',
                  transition: 'all 0.2s ease-in-out'
                },
                '&:active': {
                  transform: 'translateY(0)',
                }
              }}
            >
              Search
            </Button>
          </Box>
        </Box>

        {/* Guest Selector Popover */}
        <Popover
          open={isGuestOpen}
          anchorEl={guestButton}
          onClose={closeGuestSelector}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'left' }}
          aria-labelledby="guest-selector-title"
          slotProps={{
            paper: {
              sx: {
                mt: 1,
                minWidth: { xs: 280, sm: 320 },
                maxWidth: { xs: '90vw', sm: 400 },
                borderRadius: '20px',
                boxShadow: '0 8px 32px rgba(20, 184, 166, 0.15)',
              }
            }
          }}
        >
          <Box sx={{ padding: 3, minWidth: 280 }}>
            <Typography id="guest-selector-title" variant="h6" sx={{ marginBottom: 2 }}>
              Guests & Rooms
            </Typography>

            {/* Adults */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
              <Typography variant="body1" id="adults-label">
                Adults
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => updateGuestCount('adults', -1)}
                  disabled={searchData.adults <= 1}
                  aria-label="Decrease number of adults"
                  aria-describedby="adults-label"
                  sx={{ border: '1px solid #e0e0e0' }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography 
                  sx={{ minWidth: 40, textAlign: 'center', fontWeight: 'bold' }}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {searchData.adults}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => updateGuestCount('adults', 1)}
                  aria-label="Increase number of adults"
                  aria-describedby="adults-label"
                  sx={{ border: '1px solid #e0e0e0' }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>

            <Divider sx={{ marginY: 1 }} />

            {/* Children */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
              <Typography variant="body1" id="children-label">
                Children
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => updateGuestCount('children', -1)}
                  disabled={searchData.children <= 0}
                  aria-label="Decrease number of children"
                  aria-describedby="children-label"
                  sx={{ border: '1px solid #e0e0e0' }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography 
                  sx={{ minWidth: 40, textAlign: 'center', fontWeight: 'bold' }}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {searchData.children}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => updateGuestCount('children', 1)}
                  aria-label="Increase number of children"
                  aria-describedby="children-label"
                  sx={{ border: '1px solid #e0e0e0' }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>

            <Divider sx={{ marginY: 1 }} />

            {/* Rooms */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
              <Typography variant="body1" id="rooms-label">
                Rooms
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <IconButton
                  size="small"
                  onClick={() => updateGuestCount('rooms', -1)}
                  disabled={searchData.rooms <= 1}
                  aria-label="Decrease number of rooms"
                  aria-describedby="rooms-label"
                  sx={{ border: '1px solid #e0e0e0' }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography 
                  sx={{ minWidth: 40, textAlign: 'center', fontWeight: 'bold' }}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {searchData.rooms}
                </Typography>
                <IconButton
                  size="small"
                  onClick={() => updateGuestCount('rooms', 1)}
                  aria-label="Increase number of rooms"
                  aria-describedby="rooms-label"
                  sx={{ border: '1px solid #e0e0e0' }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>

            <Button
              fullWidth
              variant="contained"
              onClick={closeGuestSelector}
              aria-label="Apply guest and room selection"
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