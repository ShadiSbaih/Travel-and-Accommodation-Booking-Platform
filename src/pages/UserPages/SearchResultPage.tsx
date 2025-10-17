import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Navbar from '@/components/Navbar';
import SearchBar from '@/components/features/SearchBar';
import SearchParametersDisplay from '@/components/features/SearchParametersDisplay';
import SearchResultsSection from '@/components/features/SearchResultsSection';
import searchApi from '@/services/api/search.api';
import type { SearchResultDTO } from '@/types/api/hotel.types';

// 🏠 Simple Amenities Filter Component
function SimpleAmenitiesFilter({ 
  selectedAmenities, 
  onAmenitiesChange 
}: {
  selectedAmenities: string[];
  onAmenitiesChange: (amenities: string[]) => void;
}) {
  // قائمة المرافق الشائعة
  const commonAmenities = [
    'Free WiFi',
    'Swimming Pool', 
    'Fitness Center',
    'Spa',
    'Restaurant',
    'Parking',
    'Air Conditioning',
    'Room Service',
    'Business Center',
    'Pet Friendly'
  ];

  const handleAmenityToggle = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      // إزالة المرفق
      onAmenitiesChange(selectedAmenities.filter(a => a !== amenity));
    } else {
      // إضافة المرفق  
      onAmenitiesChange([...selectedAmenities, amenity]);
    }
  };

  const clearAllFilters = () => {
    onAmenitiesChange([]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">المرافق</h3>
        {selectedAmenities.length > 0 && (
          <button 
            onClick={clearAllFilters}
            className="text-sm text-blue-600 hover:underline"
          >
            مسح الكل ({selectedAmenities.length})
          </button>
        )}
      </div>

      <div className="space-y-3">
        {commonAmenities.map(amenity => (
          <label key={amenity} className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedAmenities.includes(amenity)}
              onChange={() => handleAmenityToggle(amenity)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{amenity}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

// 🏠 Main Search Results Page - SIMPLE VERSION
function SearchResultPage() {
  const [searchParams] = useSearchParams();
  
  // 📍 استخراج معاملات البحث من الـ URL
  const query = searchParams.get("query") || "";
  const adults = parseInt(searchParams.get("adults") || "2");
  const children = parseInt(searchParams.get("children") || "0");  
  const rooms = parseInt(searchParams.get("rooms") || "1");

  // 📍 حالة الفلاتر - بسيطة جداً!
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // 📍 جلب بيانات الفنادق من الـ API
  const { data: rawHotels, isLoading, error } = useQuery<SearchResultDTO[]>({
    queryKey: ["searchResults", query, adults, children, rooms],
    queryFn: async () => {
      const result = await searchApi.searchHotels({
        city: query,
        adults,
        children,
        numberOfRooms: rooms,
      });
      console.log('🏨 Hotels from API:', result?.length || 0);
      return result;
    },
    enabled: !!query,
  });

  // 📍 فلترة الفنادق - منطق بسيط وواضح!
  const filteredHotels = useMemo(() => {
    // إذا مافيه فنادق، ارجع مصفوفة فاضية
    if (!rawHotels || rawHotels.length === 0) {
      return [];
    }

    // إذا مافيه فلاتر مختارة، ارجع كل الفنادق
    if (selectedAmenities.length === 0) {
      return rawHotels;
    }

    // فلترة الفنادق اللي عندها المرافق المطلوبة
    const filtered = rawHotels.filter(hotel => {
      // تأكد إن الفندق عنده مرافق
      if (!hotel.amenities || !Array.isArray(hotel.amenities)) {
        return false;
      }

      // أسماء مرافق الفندق
      const hotelAmenityNames = hotel.amenities.map(amenity => 
        amenity.name?.toLowerCase().trim()
      );

      // تحقق إذا الفندق عنده أي مرفق من المرافق المختارة
      return selectedAmenities.some(selectedAmenity =>
        hotelAmenityNames.some(hotelAmenity =>
          hotelAmenity?.includes(selectedAmenity.toLowerCase())
        )
      );
    });

    console.log(`🔍 Filtered: ${rawHotels.length} → ${filtered.length} hotels`);
    return filtered;
  }, [rawHotels, selectedAmenities]);

  // 📍 معلومات إضافية
  const hasActiveFilters = selectedAmenities.length > 0;
  const totalHotels = rawHotels?.length || 0;
  const filteredCount = filteredHotels.length;

  return (
    <>
      <Navbar />
      <SearchBar />
      
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">نتائج البحث</h1>

        {/* عرض معاملات البحث */}
        <SearchParametersDisplay 
          query={query}
          adults={adults}
          children={children}
          rooms={rooms}
        />

        {/* عرض إحصائيات الفلترة */}
        {hasActiveFilters && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-blue-800 text-sm">
              🔍 تم العثور على <strong>{filteredCount}</strong> فندق 
              من أصل <strong>{totalHotels}</strong> فندق
              باستخدام المرافق المحددة
            </p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* الفلاتر - في الجانب */}
          <div className="lg:w-80 flex-shrink-0">
            <SimpleAmenitiesFilter 
              selectedAmenities={selectedAmenities}
              onAmenitiesChange={setSelectedAmenities}
            />
          </div>

          {/* النتائج - في المحتوى الرئيسي */}
          <div className="flex-1">
            <SearchResultsSection 
              data={filteredHotels}
              rawData={rawHotels}
              isLoading={isLoading}
              error={error}
              hasActiveFilters={hasActiveFilters}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchResultPage;