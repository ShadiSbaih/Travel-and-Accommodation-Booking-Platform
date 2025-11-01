import axios from '@/core/api/axios';
import type { BookingReceipt } from '../types';
import type { CartItem } from '@/features/cart';

export interface CreateBookingRequest {
  customerName: string;
  items: CartItem[];
  paymentMethod: string;
  totalCost: number;
}

export interface CreateBookingResponse {
  receipt: BookingReceipt;
}

export const createBooking = async (
  data: CreateBookingRequest
): Promise<CreateBookingResponse> => {
  const response = await axios.post<CreateBookingResponse>('/bookings', data);
  return response.data;
};

// Mock function for development (remove when API is ready)
export const createBookingMock = async (
  data: CreateBookingRequest
): Promise<CreateBookingResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Generate mock confirmation number
  const confirmationNumber = `BK${Date.now().toString().slice(-6)}`;

  // Use the first item for receipt details
  const firstItem = data.items[0];

  return {
    receipt: {
      customerName: data.customerName,
      hotelName: firstItem.hotelName,
      roomNumber: firstItem.room.id.toString(),
      roomType: firstItem.room.type,
      bookingDateTime: new Date().toISOString(),
      totalCost: data.totalCost,
      paymentMethod: data.paymentMethod,
      bookingStatus: 'Confirmed',
      confirmationNumber,
    },
  };
};
