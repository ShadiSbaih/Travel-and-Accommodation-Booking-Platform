import { useState, useEffect } from 'react';
import type { Hotel } from '../types';

interface HotelFormState {
    name: string;
    description: string;
    hotelType: string;
    starRating: number;
    latitude: string;
    longitude: string;
    cityId: string;
}

export const useHotelForm = (hotel: Hotel | null, isOpen: boolean) => {
    const [formState, setFormState] = useState<HotelFormState>({
        name: '',
        description: '',
        hotelType: 'Hotel',
        starRating: 3,
        latitude: '',
        longitude: '',
        cityId: '',
    });

    useEffect(() => {
        if (hotel) {
            setFormState({
                name: hotel.name || hotel.hotelName,
                description: hotel.description || '',
                hotelType: hotel.hotelType || 'Hotel',
                starRating: hotel.starRating || 3,
                latitude: hotel.latitude?.toString() || '',
                longitude: hotel.longitude?.toString() || '',
                cityId: hotel.cityId?.toString() || '',
            });
        } else {
            setFormState({
                name: '',
                description: '',
                hotelType: 'Hotel',
                starRating: 3,
                latitude: '',
                longitude: '',
                cityId: '',
            });
        }
    }, [hotel, isOpen]);

    const resetForm = () => {
        setFormState({
            name: '',
            description: '',
            hotelType: 'Hotel',
            starRating: 3,
            latitude: '',
            longitude: '',
            cityId: '',
        });
    };

    return {
        ...formState,
        setName: (name: string) => setFormState((prev) => ({ ...prev, name })),
        setDescription: (description: string) =>
            setFormState((prev) => ({ ...prev, description })),
        setHotelType: (hotelType: string) =>
            setFormState((prev) => ({ ...prev, hotelType })),
        setStarRating: (starRating: number) =>
            setFormState((prev) => ({ ...prev, starRating })),
        setLatitude: (latitude: string) =>
            setFormState((prev) => ({ ...prev, latitude })),
        setLongitude: (longitude: string) =>
            setFormState((prev) => ({ ...prev, longitude })),
        setCityId: (cityId: string) => setFormState((prev) => ({ ...prev, cityId })),
        resetForm,
    };
};
