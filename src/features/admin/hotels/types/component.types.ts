import type { Hotel } from './index';

export type ViewMode = 'grid' | 'list';

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
