import AdminSearchBar from '@/shared/components/AdminSearchBar';
import type { AdminSearchBarProps } from '@/shared/components/AdminSearchBar';

type HotelsSearchBarProps = Omit<
  AdminSearchBarProps,
  'placeholder' | 'variantStyle'
> & {
  placeholder?: string;
  variantStyle?: AdminSearchBarProps['variantStyle'];
};

function HotelsSearchBar({
  placeholder = 'Search hotels by name, location, or type...',
  variantStyle = 'rounded',
  ...rest
}: HotelsSearchBarProps) {
  return (
    <AdminSearchBar
      placeholder={placeholder}
      variantStyle={variantStyle}
      {...rest}
    />
  );
}

export default HotelsSearchBar;
