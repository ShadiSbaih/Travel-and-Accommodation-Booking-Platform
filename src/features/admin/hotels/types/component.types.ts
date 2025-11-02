import type { Hotel } from './index';

export type ViewMode = 'grid' | 'list';

export interface HotelsPageHeaderProps {
  hotelsCount: number;
  hasSearchQuery: boolean;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onAddHotel: () => void;
}

export interface HotelsSearchBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onReset: () => void;
}

export interface HotelsContentProps {
  hotels: Hotel[];
  viewMode: ViewMode;
  isLoading: boolean;
  hasMore: boolean;
  loadMoreRef: React.RefObject<HTMLDivElement | null>;
  onEdit: (hotel: Hotel) => void;
}

export interface EmptyHotelsStateProps {
  hasSearchQuery: boolean;
  onAddHotel: () => void;
}
