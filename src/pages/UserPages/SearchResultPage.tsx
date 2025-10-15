import Navbar from '@/components/Navbar';
import SearchBar from '@/components/features/SearchBar';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import searchApi from '@/services/api/search.api';
// import { parseISO } from 'date-fns';

function SearchResultPage() {
  const [searchParams] = useSearchParams();

  // Parse all parameters from URL (single source of truth)
  const query = searchParams.get('query') || '';
  const adults = parseInt(searchParams.get('adults') || '2');
  const children = parseInt(searchParams.get('children') || '0');
  const rooms = parseInt(searchParams.get('rooms') || '1');

  // Fetch search results
  const { data, isLoading, error } = useQuery({
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
      <div style={{ padding: '20px' }}>
        <h1>Search Results</h1>

        <div style={{
          background: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h2>Search Parameters:</h2>
          <div><strong>Query:</strong> {query || 'No query'}</div>
          <div><strong>Adults:</strong> {adults}</div>
          <div><strong>Children:</strong> {children}</div>
          <div><strong>Rooms:</strong> {rooms}</div>
        </div>

        {isLoading && <div>Loading results...</div>}

        {error && (
          <div style={{ color: 'red', padding: '20px', background: '#fee' }}>
            Error loading results: {(error as Error).message}
          </div>
        )}

        {data && (
          <div style={{
            background: '#fff',
            padding: '20px',
            borderRadius: '8px'
          }}>
            <h2>Results:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchResultPage;