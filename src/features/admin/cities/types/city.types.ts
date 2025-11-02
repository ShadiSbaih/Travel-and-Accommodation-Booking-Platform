export interface City {
  id: number;
  name: string;
  description: string;
  thumbnailUrl?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CityFilters {
  name?: string;
  country?: string;
  pageNumber?: number;
  pageSize?: number;
}

export interface CreateCityDto {
  name: string;
  description: string;
}

export interface UpdateCityDto {
  name?: string;
  description?: string;
}
