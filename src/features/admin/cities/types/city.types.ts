export interface City {
  id: number;
  name: string;
  description?: string;
  thumbnailUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CityFilters {
  searchQuery?: string;
  pageNumber?: number;
  pageSize?: number;
}
