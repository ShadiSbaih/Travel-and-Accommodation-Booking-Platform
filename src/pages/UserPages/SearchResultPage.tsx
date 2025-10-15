import Navbar from '@/components/Navbar'
import SearchBar from '@/components/features/SearchBar';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import searchApi from '@/services/api/search.api';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import type { SearchData } from '../../store/searchSlice';
import { useEffect } from 'react';

function SearchResultPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchData: SearchData = useSelector((state: RootState) => state.search);

  // Get search parameters directly from URL (for shared URLs)
  const query = searchParams.get('query') || 'New York';
  const adults = parseInt(searchParams.get('adults') || '2');
  const children = parseInt(searchParams.get('children') || '0');
  const rooms = parseInt(searchParams.get('rooms') || '1');

  // Update URL when Redux state changes (for new searches from SearchBar)
  useEffect(() => {
    if (searchData?.query) {
      const newParams = new URLSearchParams({
        query: searchData.query,
        adults: searchData.adults?.toString() || "2",
        children: searchData.children?.toString() || "0",
        rooms: searchData.rooms?.toString() || "1",
      });
      
      setSearchParams(newParams);
    }
  }, [searchData, setSearchParams]);

  // Use URL parameters for API call (works for both shared URLs and new searches)
  const { data, isLoading } = useQuery({
    queryKey: ['searchResults', query, adults, children, rooms],
    queryFn: async () => {
      return searchApi.searchHotels({
        city: query,
        adults: adults,
        children: children,
        numberOfRooms: rooms
      });
    },
    enabled: !!query // Only run if we have a query
  });

  console.log("search data from URL:", { query, adults, children, rooms });
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

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
          <div><strong>Query:</strong> {query}</div>
          <div><strong>Adults:</strong> {adults}</div>
          <div><strong>Children:</strong> {children}</div>
          <div><strong>Rooms:</strong> {rooms}</div>
          <br />
          <div><strong>Data from API:</strong> {JSON.stringify(data) ?? <span>No data available</span>}</div>
        </div>

      </div>
    </>
  )
}

export default SearchResultPage