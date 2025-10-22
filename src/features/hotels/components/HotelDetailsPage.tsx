import Navbar from '@/shared/components/Navbar';
import { useParams } from 'react-router-dom';
import { useHotel, useHotelGallery } from '../hooks/useHotels';
import { ImageSlider } from '@/shared/components/ImageSlider';
import type { SliderImage } from '@/shared/components/ImageSlider/types';
import LoadingState from '@/shared/components/LoadingState';
import ErrorState from '@/shared/components/ErrorState';

function HotelDetailsPage() {
  const { id } = useParams();
  const hotelId = Number(id);

  // Fetch hotel data and gallery
  const { data: hotel, isLoading: isLoadingHotel, error: hotelError } = useHotel(hotelId);
  const { data: gallery, isLoading: isLoadingGallery, error: galleryError } = useHotelGallery(hotelId);

  // Show loading state
  if (isLoadingHotel || isLoadingGallery) {
    return (
      <>
        <Navbar />
        <LoadingState message="Loading hotel details..." />
      </>
    );
  }

  // Show error state
  if (hotelError || galleryError) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <ErrorState
            message="Failed to load hotel details. Please try again later."
            variant="error"
          />
        </div>
      </>
    );
  }

  // Transform gallery images to slider format
  const sliderImages: SliderImage[] = gallery?.map((img, index) => ({
    id: img.id,
    src: img.url,
    alt: `${hotel?.name} - Image ${index + 1}`,
    title: hotel?.name,
    description: hotel?.description,
    rating: hotel?.starRating,
  })) || [];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Image Slider */}
        {sliderImages.length > 0 && (
          <ImageSlider
            images={sliderImages}
            className="w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto"
            config={{
              autoplay: {
                enabled: true,
                delay: 5000,
                pauseOnHover: true,
              },
              navigation: {
                enabled: true,
              },
              pagination: {
                enabled: true,
                type: 'thumbnails',
                clickable: true,
              },
            }}
          />
        )}

        {/* Hotel Details Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {hotel?.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
              {hotel?.description}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <span className="text-yellow-500 font-semibold text-xl">
                  {'⭐'.repeat(hotel?.starRating || 0)}
                </span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  {hotel?.starRating} Star Hotel
                </span>
              </div>
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          { hotel?.location }</h2>
      </div>
    </>
  );
}

export default HotelDetailsPage;