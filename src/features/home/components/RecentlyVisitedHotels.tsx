import { useUserInfo } from "@/shared/hooks/useUserInfo";
import homePageApi from "../api/home-page.api";
import { useQuery } from "@tanstack/react-query";
import type { RecentlyVisitedHotelDto } from '../types/home.types';

function RecentlyVisitedHotels() {
  const { userId } = useUserInfo();

  const { data: recentlyVisitedHotels = [], isLoading, isError } = useQuery({
    queryKey: ['recentlyVisitedHotels'],
    queryFn: () => homePageApi.getRecentlyVisitedHotels(userId as string),
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError) return <div className="text-center">Error loading recently visited hotels</div>;

  return (
    <div className="bg-slate-100 flex gap-4 p-4 overflow-x-auto">
      {recentlyVisitedHotels.map((hotel: RecentlyVisitedHotelDto) => (
        <div key={hotel.hotelId} className="border-red-500 border-2">
          <img src={hotel.thumbnailUrl} alt={hotel.hotelName} className="w-36 h-36" />
          <h3>{hotel.hotelName}</h3>
          <p>{hotel.cityName} - {hotel.starRating} Stars</p>
          <p>Price: ${hotel.priceLowerBound} - ${hotel.priceUpperBound}</p>
          <p>Visited: {new Date(hotel.visitDate).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
}

export default RecentlyVisitedHotels;