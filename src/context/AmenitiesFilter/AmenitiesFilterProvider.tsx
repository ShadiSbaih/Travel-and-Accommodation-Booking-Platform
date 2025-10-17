import React, { useState, useCallback } from 'react';
import AmenitiesFilterContext from './AmenitiesFilterContext';
import type { AmenitiesFilterContextType } from './types';

interface AmenitiesFilterProviderProps {
  children: React.ReactNode;
}

/**
 * Provider component that manages amenities filter state
 * Eliminates prop drilling by providing context to child components
 */
const AmenitiesFilterProvider: React.FC<AmenitiesFilterProviderProps> = ({ children }) => {
  // State management
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [filterMode, setFilterMode] = useState<'any' | 'all'>('any');

  // Actions
  const toggleAmenity = useCallback((amenity: string) => {
    setSelectedAmenities((prev) => {
      const newAmenities = prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity];

      // Auto-reset to 'any' mode when ≤1 amenities (all mode doesn't make sense)
      if (newAmenities.length <= 1 && filterMode === 'all') {
        setFilterMode('any');
      }

      return newAmenities;
    });
  }, [filterMode]);

  const clearAllAmenities = useCallback(() => {
    setSelectedAmenities([]);
    setFilterMode('any');
  }, []);

  const handleSetFilterMode = useCallback((mode: 'any' | 'all') => {
    setFilterMode(mode);
  }, []);

  // Context value
  const contextValue: AmenitiesFilterContextType = {
    // State
    selectedAmenities,
    filterMode,
    
    // Actions
    setSelectedAmenities,
    setFilterMode: handleSetFilterMode,
    toggleAmenity,
    clearAllAmenities,
  };

  return (
    <AmenitiesFilterContext.Provider value={contextValue}>
      {children}
    </AmenitiesFilterContext.Provider>
  );
};

export default AmenitiesFilterProvider;