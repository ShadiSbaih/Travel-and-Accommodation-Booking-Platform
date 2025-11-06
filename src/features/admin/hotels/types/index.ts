/**
 * @deprecated - Use types from '@/features/admin/core' instead
 * This file is kept for backward compatibility only
 */
export type { 
  Hotel, 
  HotelFilters, 
  CreateHotelDto, 
  UpdateHotelDto,
  Amenity 
} from '../../core/types';

// Export component types (these are hotel-specific)
export * from './component.types.ts';
