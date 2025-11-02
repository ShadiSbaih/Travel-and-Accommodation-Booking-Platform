import { Box, TextField, MenuItem } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import type { City } from '@/features/admin/cities/types';

interface HotelDialogFormProps {
    name: string;
    setName: (value: string) => void;
    hotelType: string;
    setHotelType: (value: string) => void;
    starRating: number;
    setStarRating: (value: number) => void;
    cityId: string;
    setCityId: (value: string) => void;
    latitude: string;
    setLatitude: (value: string) => void;
    longitude: string;
    setLongitude: (value: string) => void;
    description: string;
    setDescription: (value: string) => void;
    cities?: City[];
    currentCity?: City;
    textFieldSx: SxProps<Theme>;
}

const hotelTypes = ['Resort', 'Hotel', 'Motel', 'Boutique', 'Inn', 'Lodge', 'Hostel'];

function HotelDialogForm({
    name,
    setName,
    hotelType,
    setHotelType,
    starRating,
    setStarRating,
    cityId,
    setCityId,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    description,
    setDescription,
    cities,
    currentCity,
    textFieldSx,
}: HotelDialogFormProps) {
    return (
        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Hotel Name */}
            <TextField
                label="Hotel Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                required
                sx={textFieldSx}
                placeholder="Enter hotel name..."
            />

            {/* Hotel Type and Star Rating - Grid */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 3,
                }}
            >
                <TextField
                    select
                    label="Hotel Type"
                    value={hotelType}
                    onChange={(e) => setHotelType(e.target.value)}
                    fullWidth
                    required
                    sx={textFieldSx}
                >
                    {hotelTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    type="number"
                    label="Star Rating"
                    value={starRating}
                    onChange={(e) => setStarRating(Number(e.target.value))}
                    fullWidth
                    required
                    slotProps={{ htmlInput: { min: 1, max: 5 } }}
                    sx={textFieldSx}
                />
            </Box>

            {/* Location (City) */}
            <TextField
                select
                label="Location"
                value={cityId}
                onChange={(e) => setCityId(e.target.value)}
                fullWidth
                required
                sx={textFieldSx}
                helperText={currentCity ? `Current: ${currentCity.name}` : 'Select a city/location'}
            >
                {cities?.map((city) => (
                    <MenuItem key={city.id} value={city.id.toString()}>
                        {city.name}
                    </MenuItem>
                ))}
            </TextField>

            {/* Latitude and Longitude - Grid */}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                    gap: 3,
                }}
            >
                <TextField
                    type="number"
                    label="Latitude"
                    value={latitude}
                    onChange={(e) => setLatitude(e.target.value)}
                    fullWidth
                    slotProps={{ htmlInput: { step: 'any' } }}
                    sx={textFieldSx}
                    placeholder="e.g., -8.3405"
                />

                <TextField
                    type="number"
                    label="Longitude"
                    value={longitude}
                    onChange={(e) => setLongitude(e.target.value)}
                    fullWidth
                    slotProps={{ htmlInput: { step: 'any' } }}
                    sx={textFieldSx}
                    placeholder="e.g., 115.0915"
                />
            </Box>

            {/* Description */}
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                multiline
                rows={4}
                sx={textFieldSx}
                placeholder="Describe the hotel..."
            />
        </Box>
    );
}

export default HotelDialogForm;
