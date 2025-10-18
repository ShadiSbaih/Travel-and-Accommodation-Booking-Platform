import { useContext } from 'react';
import AmenitiesFilterContext from './AmenitiesFilterContext';
import type { AmenitiesFilterContextType } from './types';

/**
 * Custom hook to access amenities filter context
 * Must be used within AmenitiesFilterProvider
 */
export const useAmenitiesFilter = (): AmenitiesFilterContextType => {
    const context = useContext(AmenitiesFilterContext);

    if (context === undefined) {
        throw new Error('useAmenitiesFilter must be used within an AmenitiesFilterProvider');
    }

    return context;
};