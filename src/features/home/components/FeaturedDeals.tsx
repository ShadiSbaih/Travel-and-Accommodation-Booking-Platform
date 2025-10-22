import homePageApi from "../api/home-page.api";
import { useQuery } from "@tanstack/react-query";
import type { FeaturedDealDto } from '../types/home.types';

function FeaturedDeals() {
  
  const { data: featuredDeals = [], isLoading, isError } = useQuery({
    queryKey: ['featuredDeals'],
    queryFn: () => homePageApi.getFeaturedDeals(),
  });
  //show skeleton later
  if (isLoading) return <div className="text-center bg-red-500">Loading...</div>;
  if (isError) return <div className="text-center bg-red-500">Error loading featured deals</div>;

  return (
    <div className="bg-slate-100 flex gap-4 p-4 overflow-x-auto">
      {featuredDeals.map((deal: FeaturedDealDto) => (
        <div key={deal.hotelId} className="border-red-500 border-2">{deal.title}</div>
      ))}
    </div>
  );
}

export default FeaturedDeals;