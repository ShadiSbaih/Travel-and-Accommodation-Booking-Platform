import Navbar from '@/components/Navbar';
import SearchBar from '@/components/features/SearchBar';
import HotelCard from '@/components/common/HotelCard';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import searchApi from '@/services/api/search.api';
import type { SearchResultDTO } from '@/types/api/hotel.types';
// import { parseISO } from 'date-fns';

function SearchResultPage() {
  const [searchParams] = useSearchParams();

  // Parse all parameters from URL (single source of truth)
  const query = searchParams.get('query') || '';
  const adults = parseInt(searchParams.get('adults') || '2');
  const children = parseInt(searchParams.get('children') || '0');
  const rooms = parseInt(searchParams.get('rooms') || '1');

  // Fetch search results
  const { data, isLoading, error } = useQuery<SearchResultDTO[]>({
    queryKey: ['searchResults', query, adults, children, rooms],
    queryFn: async () => {
      return searchApi.searchHotels({
        city: query,

        adults: adults,
        children: children,
        numberOfRooms: rooms
      });
    },
    enabled: !!query, // Only fetch if we have a query
  });

  return (
    <>
      <Navbar />
      <SearchBar />
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Search Results</h1>

        <div className="bg-gray-100 p-6 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-4">Search Parameters:</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div><strong>Destination:</strong> {query || 'Any'}</div>
            <div><strong>Adults:</strong> {adults}</div>
            <div><strong>Children:</strong> {children}</div>
            <div><strong>Rooms:</strong> {rooms}</div>
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-8">
            <div className="text-lg text-gray-600">Loading results...</div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            Error loading results: {(error as Error).message}
          </div>
        )}

        {data && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Search Results</h2>
              <p className="text-gray-600">{data.length} hotels found</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.map((hotel) => (
                <HotelCard key={hotel.hotelId} hotel={hotel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchResultPage;