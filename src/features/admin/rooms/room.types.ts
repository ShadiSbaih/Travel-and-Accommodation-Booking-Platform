export interface Room {
  id: number;
  name: string;
  type: string;
  price: number;
  available: boolean;
  maxOccupancy: number;
}

export interface RoomFilters {
  name?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  available?: boolean;
}
