import { createContext } from 'react';
import type { FilterContextType } from './types';

// Create the context
export const FilterContext = createContext<FilterContextType | undefined>(undefined);