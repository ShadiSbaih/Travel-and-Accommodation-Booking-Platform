import * as Yup from 'yup';

export const roomValidationSchema = Yup.object({
  roomNumber: Yup.number()
    .required('Room number is required')
    .positive('Room number must be positive')
    .integer('Room number must be an integer'),
  roomType: Yup.string()
    .required('Room type is required')
    .min(2, 'Room type must be at least 2 characters'),
  capacityOfAdults: Yup.number()
    .required('Adults capacity is required')
    .min(1, 'At least 1 adult capacity is required')
    .integer('Adults capacity must be an integer'),
  capacityOfChildren: Yup.number()
    .required('Children capacity is required')
    .min(0, 'Children capacity cannot be negative')
    .integer('Children capacity must be an integer'),
  price: Yup.number()
    .required('Price is required')
    .positive('Price must be positive')
    .test('decimal', 'Price must have at most 2 decimal places', (value) => {
      if (!value) return true;
      return /^\d+(\.\d{1,2})?$/.test(value.toString());
    }),
  availability: Yup.boolean().required(),
  roomPhotoUrl: Yup.string().url('Must be a valid URL').nullable(),
  amenities: Yup.array().nullable(),
});
