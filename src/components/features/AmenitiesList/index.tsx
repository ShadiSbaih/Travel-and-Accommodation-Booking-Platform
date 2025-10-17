import React from 'react';
import type { AmenitiesListProps } from './types';

/**
 * Scrollable Amenities List Component
 * Displays a list of amenities with checkboxes in a scrollable container
 */
const AmenitiesList: React.FC<AmenitiesListProps> = ({
  amenities,
  selectedAmenities,
  onAmenityToggle
}) => {
  return (
    <div className="relative">
      <div 
        className="max-h-80 overflow-y-auto space-y-2 pr-2" 
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: '#cbd5e1 #f1f5f9'
        }}
      >
        {amenities.map(amenity => (
          <label 
            key={amenity.id} 
            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors"
            title={amenity.description || amenity.name}
          >
            <input
              type="checkbox"
              checked={selectedAmenities.includes(amenity.name)}
              onChange={() => onAmenityToggle(amenity.name)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 flex-shrink-0"
            />
            <div className="flex-1">
              <span className="text-sm text-gray-700">{amenity.name}</span>
              {amenity.description && (
                <p className="text-xs text-gray-500 mt-0.5">{amenity.description}</p>
              )}
            </div>
          </label>
        ))}
      </div>
      
      {/* Scroll indicator - shows when there are many amenities */}
      {amenities.length > 8 && (
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none rounded-b-lg"></div>
      )}
    </div>
  );
};

export default AmenitiesList;