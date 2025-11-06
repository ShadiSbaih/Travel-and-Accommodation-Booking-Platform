import * as Yup from 'yup';

export const cityValidationSchema = Yup.object({
  name: Yup.string()
    .required('City name is required')
    .min(2, 'City name must be at least 2 characters')
    .max(100, 'City name must not exceed 100 characters'),
  description: Yup.string()
    .max(500, 'Description must not exceed 500 characters')
    .nullable(),
});
