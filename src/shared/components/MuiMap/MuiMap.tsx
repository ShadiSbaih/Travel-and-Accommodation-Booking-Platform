import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Box, Paper, Typography } from '@mui/material';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon issue in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MuiMapProps {
  latitude: number;
  longitude: number;
  hotelName: string;
  location?: string;
  height?: string | number;
  zoom?: number;
}

export function MuiMap({
  latitude,
  longitude,
  hotelName,
  location,
  height = 450,
  zoom = 13,
}: MuiMapProps) {
  useEffect(() => {
    // Clean up on unmount
    return () => {
      const containers = document.querySelectorAll('.leaflet-container');
      containers.forEach(container => {
        // @ts-expect-error Leaflet internal cleanup for _leaflet_id property
        if (container._leaflet_id) {
          // @ts-expect-error Deleting Leaflet internal property
          delete container._leaflet_id;
        }
      });
    };
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        overflow: 'hidden',
        borderRadius: 2,
        height: typeof height === 'number' ? `${height}px` : height,
      }}
    >
      <MapContainer
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
