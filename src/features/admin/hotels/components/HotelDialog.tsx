import { Dialog, DialogContent } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useHotels } from '../hooks/useHotels';
import { useHotelForm } from '../hooks/useHotelForm';
import { citiesApi } from '@/features/admin/cities/api/cities.api';
import HotelDialogHeader from './HotelDialogHeader';
import HotelDialogForm from './HotelDialogForm';
import HotelDialogActions from './HotelDialogActions';
import { textFieldStyles, dialogPaperStyles } from './hotelDialog.styles';
import type { Hotel } from '../types';

interface HotelDialogProps {
  open: boolean;
  onClose: () => void;
  hotel: Hotel | null;
}

function HotelDialog({ open, onClose, hotel }: HotelDialogProps) {
  const { createHotel, updateHotel, isCreating, isUpdating } = useHotels();

  // Fetch cities for dropdown
  const { data: cities } = useQuery({
    queryKey: ['cities'],
    queryFn: () => citiesApi.getCities(),
  });

  // Form state management
  const formState = useHotelForm(hotel, open);

  // Get current city name for display
  const currentCity = cities?.find((city) => city.id === Number(formState.cityId));

  const handleSubmit = () => {
    if (!formState.name.trim() || !formState.cityId) return;

    const hotelData = {
      name: formState.name,
      description: formState.description,
      hotelType: formState.hotelType,
      starRating: Number(formState.starRating),
      latitude: parseFloat(formState.latitude) || 0,
      longitude: parseFloat(formState.longitude) || 0,
      cityId: Number(formState.cityId),
    };

    if (hotel) {
      updateHotel(
        { hotelId: hotel.id, data: hotelData },
        {
          onSuccess: () => {
            onClose();
          },
        }
      );
    } else {
      createHotel(hotelData, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const handleCancel = () => {
    formState.resetForm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      maxWidth="md"
      fullWidth
      PaperProps={{ sx: dialogPaperStyles }}
    >
      <HotelDialogHeader isEditMode={!!hotel} onClose={handleCancel} />

      <DialogContent sx={{ p: 4 }}>
        <HotelDialogForm
          name={formState.name}
          setName={formState.setName}
          hotelType={formState.hotelType}
          setHotelType={formState.setHotelType}
          starRating={formState.starRating}
          setStarRating={formState.setStarRating}
          cityId={formState.cityId}
          setCityId={formState.setCityId}
          latitude={formState.latitude}
          setLatitude={formState.setLatitude}
          longitude={formState.longitude}
          setLongitude={formState.setLongitude}
          description={formState.description}
          setDescription={formState.setDescription}
          cities={cities}
          currentCity={currentCity}
          textFieldSx={textFieldStyles}
        />

        <HotelDialogActions
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          isEditMode={!!hotel}
          isLoading={isCreating || isUpdating}
          isDisabled={isCreating || isUpdating || !formState.name.trim() || !formState.cityId}
        />
      </DialogContent>
    </Dialog>
  );
}

export default HotelDialog;
