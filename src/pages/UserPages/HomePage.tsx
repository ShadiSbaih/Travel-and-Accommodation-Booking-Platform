import FeaturedDeals from "@/components/FeaturedDeals";
import RecentlyVisitedHotels from "@/components/RecentlyVisitedHotels";
import SearchBar from "@/components/SearchBar";
import TrendingDestinations from "@/components/TrendingDestinations";
import Navbar from "@/components/Navbar";
import { useUserInfo } from '@/hooks/useUserInfo';


function HomePage() {

  const { userInfo, fullName } = useUserInfo();
  console.table(userInfo);

  return (
    <div className="min-h-screen bg-teal-100 dark:bg-teal-700">
      <Navbar />
      <h1>HomePage</h1>
      {userInfo && <p className="p-4 bg-orange-400 inline-block">Welcome, {fullName}!</p>}
      <p>Your type is: {userInfo?.userType}</p>
      <SearchBar />
      <FeaturedDeals />
      <TrendingDestinations />
      <RecentlyVisitedHotels />
    </div>
  );
}

export default HomePage;