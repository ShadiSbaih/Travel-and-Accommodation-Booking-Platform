import HotelCard from '@/features/hotels/components/HotelCard';
import LoadingState from '@/shared/components/LoadingState';
import ErrorState from '@/shared/components/ErrorState';
import EmptyState from '@/shared/components/EmptyState';
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import type { SearchResultsSectionProps } from '../types/search.types';

function SearchResultsSection({ 
  data, 
  rawData,
  isLoading, 
  error, 
  hasActiveFilters 
}: SearchResultsSectionProps) {
  if (isLoading) {
    return <LoadingState message="Loading results..." />;
  }

  if (error) {
    return <ErrorState message="Error loading results. Please try again." />;
  }

  if (!rawData || rawData.length === 0) {
    return <EmptyState title="No hotels found for your search." />;
  }

  if (hasActiveFilters && (!data || data.length === 0)) {
    return (
      <EmptyState 
        title="No hotels match your selected filters."
        subtitle="Try removing some filters to see more results."
        icon={<ErrorOutlineIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />}
      />
    );
  }

  const resultCount = data?.length || 0;
  const totalCount = rawData?.length || 0;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Search Results</h2>
        <div className="text-right">
          <p className="text-gray-600">
            {resultCount} hotel{resultCount !== 1 ? 's' : ''} 
            {hasActiveFilters && totalCount !== resultCount && (
              <span className="text-sm text-gray-500 block">
                of {totalCount} total
              </span>
            )}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data?.map((hotel) => (
          <HotelCard key={hotel.hotelId} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

export default SearchResultsSection;