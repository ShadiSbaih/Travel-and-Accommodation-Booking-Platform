import type { SearchResultDTO } from '@/features/hotels/types/hotel.types';
import { NavLink } from 'react-router-dom';

interface HotelCardProps {
  hotel: SearchResultDTO;
}

function HotelCard({ hotel }: HotelCardProps) {
  const discountedPrice = hotel.roomPrice * (1 - hotel.discount / 100);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img 
          src={hotel.roomPhotoUrl} 
          alt={hotel.hotelName}
          className="w-full h-48 object-cover"
        />
        {hotel.discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            {hotel.discount}% OFF
          </div>
        )}
        <div className="absolute top-2 right-2 flex">
          {[...Array(hotel.starRating)].map((_, i) => (
            <span key={i} className="text-yellow-400">★</span>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800 mb-1">{hotel.hotelName}</h3>
        <p className="text-gray-600 mb-2">{hotel.cityName}</p>
        <p className="text-gray-700 mb-3">{hotel.roomType}</p>
        
        <div className="flex justify-between items-center mb-3">
          <div>
            {hotel.discount > 0 ? (
              <div>
                <span className="text-lg text-gray-500 line-through">${hotel.roomPrice}</span>
                <span className="text-xl font-bold text-green-600 ml-2">${discountedPrice.toFixed(2)}</span>
              </div>
            ) : (
              <span className="text-xl font-bold text-gray-800">${hotel.roomPrice}</span>
            )}
            <span className="text-gray-600 text-sm ml-1">/ night</span>
          </div>
        </div>

        <div className="mb-3">
          <p className="text-sm text-gray-600">
            {hotel.numberOfAdults} Adults{hotel.numberOfChildren > 0 && `, ${hotel.numberOfChildren} Children`} • {hotel.numberOfRooms} Room{hotel.numberOfRooms > 1 ? 's' : ''}
          </p>
          <p className="text-sm text-gray-600">
            {hotel.checkInDate} - {hotel.checkOutDate}
          </p>
        </div>

        {hotel.amenities.length > 0 && (
          <div className="mb-3">
            <p className="text-sm font-semibold text-gray-700 mb-1">Amenities:</p>
            <div className="flex flex-wrap gap-1">
              {hotel.amenities.slice(0, 3).map((amenity) => (
                <span 
                  key={amenity.id} 
                  className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                >
                  {amenity.name}
                </span>
              ))}
              {hotel.amenities.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{hotel.amenities.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        <NavLink to={`/hotels/${hotel.hotelId}`} className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200">
          View Details
        </NavLink>
      </div>
    </div>
  );
}

export default HotelCard;