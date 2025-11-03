import type { Meta, StoryObj } from '@storybook/react';
import { Box } from '@mui/material';
import HotelGallery from './HotelCard/HotelGallery';
import HotelSidebar from './HotelCard/HotelSidebar';
import RoomsList from './RoomCard/RoomsList';
import type { SliderImage } from '@/shared/components/MuiImageSlider/types';
import type { Hotel, AvailableRoom } from '../types';
import type { Review } from '@/shared/components/MuiReviewsSlider';

// Mock Data
const mockHotel: Hotel = {
  id: 3,
  name: 'Grand Luxury Resort',
  hotelName: 'Grand Luxury Resort',
  location: 'Maldives',
  description: 'Experience paradise at our stunning beachfront resort. Featuring world-class amenities, pristine beaches, and exceptional service that will make your stay unforgettable.',
  hotelType: 'Resort',
  starRating: 5,
  latitude: 4.1755,
  longitude: 73.5093,
  imageUrl: 'https://cf.bstatic.com/xdata/images/hotel/max1280x900/457524210.jpg?k=7b680e7009b3fcdec99ae79d91decd52bcb7bb9ac0de30d1a5925f27834fe6bb&o=&hp=1',
  availableRooms: 15,
  cityId: 1,
  amenities: [
    {
      id: 1,
      name: 'Free Wi-Fi',
      description: 'High-speed internet access throughout the property',
    },
    {
      id: 2,
      name: 'Swimming Pool',
      description: 'Olympic-size outdoor pool with ocean views',
    },
    {
      id: 3,
      name: 'Spa',
      description: 'Full-service spa with massage and beauty treatments',
    },
    {
      id: 4,
      name: 'Fitness Center',
      description: '24/7 state-of-the-art fitness facility',
    },
    {
      id: 5,
      name: 'Restaurant',
      description: 'Fine dining with international and local cuisine',
    },
  ],
};

const mockGalleryImages: SliderImage[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    alt: 'Luxury Hotel Exterior',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
    alt: 'Hotel Pool Area',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    alt: 'Hotel Room',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    alt: 'Hotel Beach',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    alt: 'Hotel Restaurant',
  },
];

const mockRooms: AvailableRoom[] = [
  {
    roomId: 1,
    roomNumber: '101',
    roomPhotoUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=600',
    roomType: 'Deluxe Ocean View',
    capacityOfAdults: 2,
    capacityOfChildren: 2,
    roomAmenities: [
      { id: 1, name: 'King Bed', description: 'Luxury king-size bed' },
      { id: 2, name: 'Ocean View', description: 'Stunning ocean views' },
      { id: 3, name: 'Mini Bar', description: 'Complimentary mini bar' },
    ],
    price: 450,
    availability: true,
  },
  {
    roomId: 2,
    roomNumber: '201',
    roomPhotoUrl: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=600',
    roomType: 'Presidential Suite',
    capacityOfAdults: 4,
    capacityOfChildren: 2,
    roomAmenities: [
      { id: 1, name: 'Master Suite', description: 'Separate master bedroom' },
      { id: 2, name: 'Private Pool', description: 'Private infinity pool' },
      { id: 3, name: 'Butler Service', description: '24/7 personal butler' },
    ],
    price: 1200,
    availability: true,
  },
  {
    roomId: 3,
    roomNumber: '102',
    roomPhotoUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600',
    roomType: 'Garden Villa',
    capacityOfAdults: 3,
    capacityOfChildren: 2,
    roomAmenities: [
      { id: 1, name: 'Private Garden', description: 'Tropical garden access' },
      { id: 2, name: 'Outdoor Shower', description: 'Luxury outdoor shower' },
    ],
    price: 650,
    availability: true,
  },
  {
    roomId: 4,
    roomNumber: '103',
    roomPhotoUrl: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600',
    roomType: 'Standard Room',
    capacityOfAdults: 2,
    capacityOfChildren: 1,
    roomAmenities: [
      { id: 1, name: 'Queen Bed', description: 'Comfortable queen bed' },
      { id: 2, name: 'City View', description: 'City skyline views' },
    ],
    price: 280,
    availability: false,
  },
];

const mockReviews: Review[] = [
  {
    reviewId: 1,
    customerName: 'John Doe',
    rating: 5.0,
    description: 'Absolutely amazing experience! The service was impeccable and the views were breathtaking.',
  },
  {
    reviewId: 2,
    customerName: 'Jane Smith',
    rating: 4.5,
    description: 'Beautiful resort with excellent amenities. The pool area was fantastic and staff were very friendly.',
  },
  {
    reviewId: 3,
    customerName: 'Michael Johnson',
    rating: 5.0,
    description: 'Best vacation ever! The room was spotless and the food at the restaurant was incredible.',
  },
  {
    reviewId: 4,
    customerName: 'Emily White',
    rating: 4.0,
    description: 'Great location and beautiful property. The spa services were top-notch.',
  },
];

const meta: Meta = {
  title: 'Features/Hotels/HotelDetails/Complete Page',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', pb: 6 }}>
      <Box sx={{ maxWidth: 1536, mx: 'auto', mt: 3, px: { xs: 2, md: 3 } }}>
        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', lg: 'row' } }}>
          {/* Left Column */}
          <Box sx={{ flex: { xs: '1 1 100%', lg: '0 0 65%' } }}>
            <HotelGallery images={mockGalleryImages} />
            <RoomsList rooms={mockRooms} onRoomSelect={(id: number) => console.log('Room selected:', id)} cartItems={[]} />
          </Box>

          {/* Right Column */}
          <Box sx={{ flex: { xs: '1 1 100%', lg: '0 0 calc(35% - 32px)' } }}>
            <HotelSidebar hotel={mockHotel} reviews={mockReviews} />
          </Box>
        </Box>
      </Box>
    </Box>
  ),
};
