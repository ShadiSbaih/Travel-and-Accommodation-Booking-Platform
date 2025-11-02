import AdminSearchBar from '@/shared/components/AdminSearchBar';

interface RoomsSearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onReset: () => void;
}

function RoomsSearchBar({ value, onChange, onReset }: RoomsSearchBarProps) {
  return (
    <AdminSearchBar
      value={value}
      placeholder="Search rooms by number, type, or hotel..."
      onChange={onChange}
      onReset={onReset}
      clearTooltip="Clear search"
      variantStyle="rounded"
    />
  );
}

export default RoomsSearchBar;
