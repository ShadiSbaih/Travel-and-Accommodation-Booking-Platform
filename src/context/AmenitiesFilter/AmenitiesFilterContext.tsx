import { createContext } from 'react';
import type { AmenitiesFilterContextType } from './types';

// Create the context
const AmenitiesFilterContext = createContext<AmenitiesFilterContextType | undefined>(undefined);

export default AmenitiesFilterContext;