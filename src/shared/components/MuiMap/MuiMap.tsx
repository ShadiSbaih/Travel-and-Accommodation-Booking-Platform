import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box, Paper, Typography } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { MuiMapProps } from './types';
import { DEFAULT_MARKER_ICON, DEFAULT_MAP_ZOOM, DEFAULT_MAP_HEIGHT } from '@/shared/constants/map.constants';

// Set default marker icon for Leaflet
L.Marker.prototype.options.icon = DEFAULT_MARKER_ICON;

export function MuiMap({
  latitude,
  longitude,
  hotelName,
  location,
  height = DEFAULT_MAP_HEIGHT,
  zoom = DEFAULT_MAP_ZOOM,
}: MuiMapProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        overflow: 'hidden',
        borderRadius: 0.5,
        height: typeof height === 'number' ? `${height}px` : height,
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <MapContainer
        key={`${latitude}-${longitude}`}
        center={[latitude, longitude]}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            <Box sx={{ p: 1, minWidth: 200 }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 600, mb: 0.5 }}>
                {hotelName}
              </Typography>
              {location && (
                <Typography variant="body2" color="text.secondary">
                  {location}
                </Typography>
              )}
            </Box>
          </Popup>
        </Marker>
      </MapContainer>
    </Paper>
  );
}

export default MuiMap;
