import RefreshIcon from '@mui/icons-material/Refresh';
import AdminSearchBar from '@/shared/components/AdminSearchBar';
import type { AdminSearchBarProps } from '@/shared/components/AdminSearchBar';

type CitiesSearchBarProps = Omit<
  AdminSearchBarProps,
  'placeholder' | 'variantStyle' | 'clearIcon' | 'clearTooltip'
> & {
  placeholder?: string;
  variantStyle?: AdminSearchBarProps['variantStyle'];
  clearIcon?: AdminSearchBarProps['clearIcon'];
  clearTooltip?: AdminSearchBarProps['clearTooltip'];
};

function CitiesSearchBar({
  placeholder = 'Search cities by name...',
  variantStyle = 'rounded',
  clearIcon,
  clearTooltip = 'Clear search',
  ...rest
}: CitiesSearchBarProps) {
  return (
    <AdminSearchBar
      placeholder={placeholder}
      variantStyle={variantStyle}
      clearIcon={clearIcon ?? <RefreshIcon fontSize="small" />}
      clearTooltip={clearTooltip}
      {...rest}
    />
  );
}

export default CitiesSearchBar;
