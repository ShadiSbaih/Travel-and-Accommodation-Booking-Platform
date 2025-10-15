import Navbar from '@/components/Navbar'
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import type { SearchData } from '../../store/searchSlice';
import SearchBar from '@/components/features/SearchBar';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import searchApi from '@/services/api/search.api';

function SearchResultPage() {

  // Get search data from Redux store
  const searchData: SearchData = useSelector((state: RootState) => state.search);

  const { data, isLoading } = useQuery({
    queryKey: ['searchResults', searchData],
    queryFn: async () => {
      const response = searchApi.searchHotels({
        city: searchData?.query || "New York",
        adults: searchData?.adults || 2,
        children: searchData?.children || 0,
        numberOfRooms: searchData?.rooms || 1
      });
      return response;
    },
    enabled: !!searchData?.query // Only run query if we have search data
  })

  console.log("search data from result search page:", searchData);

  const [searchParams, setSearchParams] = useSearchParams();

  // make url object from search data
  useEffect(() => {
    if (searchData?.query) {
      const url = new URLSearchParams({
        query: searchData.query,
        adults: searchData.adults?.toString() || "2",
        children: searchData.children?.toString() || "0",
        rooms: searchData.rooms?.toString() || "1",
      });
      setSearchParams(url);
    }
  }, [searchData, setSearchParams]);
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <SearchBar />
      <div style={{ padding: '20px' }}>
        <h1>Search Results</h1>

        {/* Display Redux State Values */}
        <div style={{
          background: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h2>Redux State Values:</h2>
          <div><strong>Query:</strong> {searchParams.get('query')}</div>
          <div><strong>Adults:</strong> {searchParams.get('adults')}</div>
          <div><strong>Children:</strong> {searchParams.get('children')}</div>
          <div><strong>Rooms:</strong> {searchParams.get('rooms')}</div>
          <br />
          <div><strong>Data from API:</strong> {JSON.stringify(data) ?? <span>No data available</span>}</div>
        </div>

        <div>Hotels will be displayed here...</div>
      </div>
    </>
  )
}

export default SearchResultPage