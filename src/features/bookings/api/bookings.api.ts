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

// Mock function for development (currently returns fixed backend response)
export const createBookingMock = async (
  data: CreateBookingRequest
): Promise<CreateBookingResponse> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Debug: Log cart items
  console.log('Creating booking with data:', data);

  // Return fixed backend response (as specified by backend team)
  const fixedResponse: BookingReceipt = {
    customerName: data.customerName, // Use actual customer name from form
    hotelName: 'Sunset Resort',
    roomNumber: '102',
    roomType: 'Ocean View Suite',
    bookingDateTime: new Date().toISOString(), // Use current time
    totalCost: data.totalCost, // Use actual total cost
    paymentMethod: data.paymentMethod, // Use actual payment method
    bookingStatus: 'Confirmed',
    confirmationNumber: 'ABC123XYZ',
  };

  console.log('Returning fixed backend response:', fixedResponse);

  return {
    receipt: fixedResponse,
  };
};
