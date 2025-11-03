import filterReducer, { toggleAmenity, clearFilters, setMode } from '../filterSlice';
import type { FilterState } from '../filterSlice.types';

describe('filterSlice', () => {
  const initialState: FilterState = {
    selectedAmenities: [],
    filterMode: 'any',
  };

  it('should return initial state', () => {
    expect(filterReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('toggleAmenity', () => {
    it('should add amenity when not selected', () => {
      const state = filterReducer(initialState, toggleAmenity('wifi'));
      expect(state.selectedAmenities).toContain('wifi');
      expect(state.selectedAmenities).toHaveLength(1);
    });

    it('should remove amenity when already selected', () => {
      let state = filterReducer(initialState, toggleAmenity('wifi'));
      state = filterReducer(state, toggleAmenity('wifi'));
      expect(state.selectedAmenities).not.toContain('wifi');
      expect(state.selectedAmenities).toHaveLength(0);
    });

    it('should handle multiple amenities', () => {
      let state = filterReducer(initialState, toggleAmenity('wifi'));
      state = filterReducer(state, toggleAmenity('pool'));
      state = filterReducer(state, toggleAmenity('gym'));

      expect(state.selectedAmenities).toContain('wifi');
      expect(state.selectedAmenities).toContain('pool');
      expect(state.selectedAmenities).toContain('gym');
      expect(state.selectedAmenities).toHaveLength(3);
    });

    it('should toggle amenity multiple times', () => {
      let state = filterReducer(initialState, toggleAmenity('wifi'));
      expect(state.selectedAmenities).toContain('wifi');

      state = filterReducer(state, toggleAmenity('wifi'));
      expect(state.selectedAmenities).not.toContain('wifi');

      state = filterReducer(state, toggleAmenity('wifi'));
      expect(state.selectedAmenities).toContain('wifi');
    });
  });

  describe('clearFilters', () => {
    it('should clear all selected amenities', () => {
      let state = filterReducer(initialState, toggleAmenity('wifi'));
      state = filterReducer(state, toggleAmenity('pool'));
      state = filterReducer(state, clearFilters());

      expect(state.selectedAmenities).toHaveLength(0);
      expect(state.selectedAmenities).toEqual([]);
    });

    it('should not affect empty filters', () => {
      const state = filterReducer(initialState, clearFilters());
      expect(state.selectedAmenities).toEqual([]);
    });
  });

  describe('setMode', () => {
    it('should set filter mode to "all"', () => {
      const state = filterReducer(initialState, setMode('all'));
      expect(state.filterMode).toBe('all');
    });

    it('should set filter mode to "any"', () => {
      let state = filterReducer(initialState, setMode('all'));
      state = filterReducer(state, setMode('any'));
      expect(state.filterMode).toBe('any');
    });

    it('should update mode independently of amenities', () => {
      let state = filterReducer(initialState, toggleAmenity('wifi'));
      state = filterReducer(state, setMode('all'));

      expect(state.selectedAmenities).toContain('wifi');
      expect(state.filterMode).toBe('all');
    });
  });

  describe('combined operations', () => {
    it('should handle multiple operations correctly', () => {
      let state = filterReducer(initialState, toggleAmenity('wifi'));
      state = filterReducer(state, toggleAmenity('pool'));
      state = filterReducer(state, setMode('all'));
      state = filterReducer(state, toggleAmenity('wifi'));

      expect(state.selectedAmenities).toEqual(['pool']);
      expect(state.filterMode).toBe('all');
    });
  });
});
