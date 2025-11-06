/**
 * Hotels Feature Exports
 */

// Components
export { default as HotelsPage } from './components/HotelsPage';
export * from './components';

// Re-export from core (for backward compatibility)
export { hotelsApi, useHotels, useHotel } from '../core';
export * from './types';
