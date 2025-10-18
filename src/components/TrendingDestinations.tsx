import homePageApi from "@/api/home-page.api";
import { useQuery } from "@tanstack/react-query";

export interface TrendingDestinationDto {
  cityId: number;
  cityName: string;
  countryName: string;
  description: string;
  thumbnailUrl: string;
}

export type TrendingDestinationsDto = TrendingDestinationDto[];

function TrendingDestinations() {
  const { data: trendingDestinations = [], isLoading, isError } = useQuery({
    queryKey: ['trendingDestinations'],
    queryFn: () => homePageApi.getTrendingDestinations(),
  });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (isError) return <div className="text-center">Error loading trending destinations</div>;

  return (
    <div className="bg-slate-100 flex gap-4 p-4 overflow-x-auto">
      {trendingDestinations.map((destination: TrendingDestinationDto) => (
        <div key={destination.cityId} className="border-blue-700 border-2">
          <h3>{destination.cityName}, {destination.countryName}</h3>
          <p>{destination.description}</p>
          <img src={destination.thumbnailUrl} alt={destination.cityName}  className="w-36 h-36"/>
        </div>
      ))}
    </div>
  );
}

export default TrendingDestinations;