import homePageApi from "@/api/home-page.api";
import { useQuery } from "@tanstack/react-query";

export interface FeaturedDealDto {
  hotelId: number;
  originalRoomPrice: number;
  discount: number;
  finalPrice: number;
  cityName: string;
  hotelName: string;
  hotelStarRating: number;
  title: string;
  description: string;
  roomPhotoUrl: string;
}

export type FeaturedDealsDto = FeaturedDealDto[];

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