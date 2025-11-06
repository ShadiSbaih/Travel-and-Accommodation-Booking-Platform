import * as Yup from 'yup';

export const hotelValidationSchema = Yup.object({
  name: Yup.string()
    .required('Hotel name is required')
    .min(2, 'Hotel name must be at least 2 characters')
    .max(200, 'Hotel name must not exceed 200 characters'),
  description: Yup.string()
    .max(1000, 'Description must not exceed 1000 characters')
    .nullable(),
  hotelType: Yup.string()
    .required('Hotel type is required')
    .oneOf(
      ['Resort', 'Hotel', 'Motel', 'Boutique', 'Inn', 'Lodge', 'Hostel'],
      'Invalid hotel type'
    ),
  starRating: Yup.number()
    .required('Star rating is required')
    .min(1, 'Star rating must be at least 1')
    .max(5, 'Star rating must not exceed 5')
    .integer('Star rating must be an integer'),
  cityId: Yup.string().required('City is required'),
  latitude: Yup.number()
    .required('Latitude is required')
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90'),
  longitude: Yup.number()
    .required('Longitude is required')
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180'),
});
