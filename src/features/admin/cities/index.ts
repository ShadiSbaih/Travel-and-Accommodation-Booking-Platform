/**
 * Cities Feature Exports
 */

// Components
export { default as CitiesPage } from './components/CitiesPage';
export { default as CityCard } from './components/CityCard';
export { default as CityDialog } from './components/CityDialog';
export { default as CityListView } from './components/CityListView';

// Re-export from core (for backward compatibility)
export { citiesApi, useCities, useCity } from '../core';
export type { City, CityFilters, CreateCityDto, UpdateCityDto } from '../core';
