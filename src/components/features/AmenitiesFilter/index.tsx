import React from 'react';
import { useQuery } from '@tanstack/react-query';
import amenitiesApi from '@/services/api/amenities.api';
import type { Amenity } from '@/types/api/amenities';
import { useAmenitiesFilter } from '@/context/AmenitiesFilter';
import FilterModeSwitch from '@/components/common/FilterModeSwitch';
import AmenitiesList from '@/components/features/AmenitiesList';

/**
 * Complete Amenities Filter Component  
 * Uses context to manage state, eliminating prop drilling
 */
const AmenitiesFilter: React.FC = () => {
    const { selectedAmenities, clearAllAmenities } = useAmenitiesFilter();

    // Fetch amenities from API
    const { data: amenities, isLoading, error } = useQuery<Amenity[]>({
        queryKey: ['amenities'],
        queryFn: amenitiesApi.getAmenities,
    });

    // Loading state
    if (isLoading) {
        return (
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <p className="text-sm text-gray-600 mt-2">Loading amenities...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                    <div className="text-center py-8">
                        <p className="text-sm text-red-600">Failed to load amenities</p>
                        <p className="text-xs text-gray-500 mt-1">Please try again later</p>
                    </div>
                </div>
            </div>
        );
    }

    // No amenities state
    if (!amenities?.length) {
        return (
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Amenities</h3>
                    <p className="text-sm text-gray-600 text-center py-8">No amenities available</p>
                </div>
            </div>
        );
    }

    // Main render
    return (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-6 pb-4">
                {/* Header with clear button */}
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Amenities</h3>
                    {selectedAmenities.length > 0 && (
                        <button
                            onClick={clearAllAmenities}
                            className="text-sm text-blue-600 hover:underline transition-colors"
                        >
                            Clear All ({selectedAmenities.length})
                        </button>
                    )}
                </div>

                {/* Filter Mode Switch - Always visible */}
                <FilterModeSwitch />

                {/* Scrollable Amenities List */}
                <AmenitiesList amenities={amenities} />
            </div>
        </div>
    );
};

export default AmenitiesFilter;