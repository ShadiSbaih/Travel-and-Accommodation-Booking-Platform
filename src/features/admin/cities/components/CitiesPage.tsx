import { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useCities } from '../hooks/useCities';
import CityCard from './CityCard';
import CityDialog from './CityDialog';
import type { City } from '../types/city.types';

function CitiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  // Use 'name' filter as per API requirements (GET /cities?name=...)
  const { cities, isLoading } = useCities({ name: searchQuery });

  const handleOpenDialog = (city?: City) => {
    setSelectedCity(city || null);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedCity(null);
    setDialogOpen(false);
  };

  const handleSearch = () => {
    // Search is handled automatically by the hook through searchQuery state
  };

  const handleReset = () => {
    setSearchQuery('');
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          Cities
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{
            textTransform: 'none',
            borderRadius: 2,
            px: 3,
          }}
        >
          Add City
        </Button>
      </Box>

      {/* Search Section */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          label="City"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          sx={{ flexGrow: 1, maxWidth: 300 }}
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{ textTransform: 'none', px: 4 }}
        >
          Search
        </Button>
        <Button
          variant="outlined"
          onClick={handleReset}
          sx={{ textTransform: 'none', px: 4 }}
        >
          Reset
        </Button>
      </Box>

      {/* Cities Grid */}
      {isLoading ? (
        <Typography>Loading cities...</Typography>
      ) : (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            gap: 3,
          }}
        >
          {cities?.map((city) => (
            <CityCard key={city.id} city={city} onEdit={handleOpenDialog} />
          ))}
        </Box>
      )}

      {/* Add/Edit Dialog */}
      <CityDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        city={selectedCity}
      />
    </Box>
  );
}

export default CitiesPage;
