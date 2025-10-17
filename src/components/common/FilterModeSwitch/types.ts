export interface FilterModeSwitchProps {
  filterMode: 'any' | 'all';
  onFilterModeChange: (mode: 'any' | 'all') => void;
  disabled?: boolean;
}