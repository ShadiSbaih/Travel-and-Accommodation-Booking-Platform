/**
 * Map-related constants for Leaflet integration
 */

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';

/**
 * Default Leaflet marker icon configuration
 * This fixes the default marker icon issue in React Leaflet
 */
export const DEFAULT_MARKER_ICON = L.icon({
  iconUrl: icon,
  iconRetinaUrl: iconRetina,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

/**
 * Default map zoom level
 */
export const DEFAULT_MAP_ZOOM = 13;

/**
 * Default map height in pixels
 */
export const DEFAULT_MAP_HEIGHT = 450;
