import type { City } from './index';

export type ViewMode = 'grid' | 'list';


export interface CitiesContentProps {
  cities: City[];
  viewMode: ViewMode;
  isLoading: boolean;
  hasMore: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
  onEdit: (city: City) => void;
}

export interface EmptyCitiesStateProps {
  hasSearchQuery: boolean;
  onAddCity: () => void;
}
