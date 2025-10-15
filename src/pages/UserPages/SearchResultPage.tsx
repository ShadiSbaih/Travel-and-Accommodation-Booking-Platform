import Navbar from '@/components/Navbar'
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../../store';
import type { SearchData } from '../../store/searchSlice';
import { setSearchData } from '../../store/searchSlice'; // Import the action
import SearchBar from '@/components/features/SearchBar';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import searchApi from '@/services/api/search.api';

function SearchResultPage() {
  const dispatch = useDispatch();
  
  // Get search data from Redux store
  const searchData: SearchData = useSelector((state: RootState) => state.search);
  
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize Redux state from URL parameters on component mount
  useEffect(() => {
    const queryParam = searchParams.get('query');
    const adultsParam = searchParams.get('adults');
    const childrenParam = searchParams.get('children');
    const roomsParam = searchParams.get('rooms');

    // If URL has parameters but Redux state is empty/different, update Redux
    if (queryParam && (!searchData?.query || 
        searchData.query !== queryParam ||
        searchData.adults?.toString() !== adultsParam ||
        searchData.children?.toString() !== childrenParam ||
        searchData.rooms?.toString() !== roomsParam)) {
      
      dispatch(setSearchData({
        query: queryParam,
        adults: parseInt(adultsParam || "2"),
        children: parseInt(childrenParam || "0"),
        rooms: parseInt(roomsParam || "1"),
      }));
    }
  }, [searchParams, searchData, dispatch]);

  // Update URL when Redux state changes (existing functionality)
  useEffect(() => {
    if (searchData?.query) {
      const currentParams = new URLSearchParams(searchParams);
      const newParams = new URLSearchParams({
        query: searchData.query,
        adults: searchData.adults?.toString() || "2",
        children: searchData.children?.toString() || "0",
        rooms: searchData.rooms?.toString() || "1",
      });

      // Only update if parameters are different
      if (currentParams.toString() !== newParams.toString()) {
        setSearchParams(newParams);
      }
    }
  }, [searchData, setSearchParams]);

  const { data, isLoading } = useQuery({
    queryKey: ['searchResults', searchData],
    queryFn: async () => {
      const response = searchApi.searchHotels({
        city: searchData?.query || searchParams.get('query') || "New York",
        adults: searchData?.adults || parseInt(searchParams.get('adults') || "2"),
        children: searchData?.children || parseInt(searchParams.get('children') || "0"),
        numberOfRooms: searchData?.rooms || parseInt(searchParams.get('rooms') || "1")
      });
      return response;
    },
    enabled: !!(searchData?.query || searchParams.get('query')) // Run if we have query from either source
  });

  console.log("search data from result search page:", searchData);
  
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

      </div>
    </>
  )
}

export default SearchResultPage