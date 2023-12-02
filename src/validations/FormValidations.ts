import * as yup from 'yup';

export const userSchema = yup.object().shape({
  name: yup
    .string()
    .required('Required')
    .matches(/^[A-Z]/, 'Name must start with a capital letter'),
  age: yup.number()
  .required('this field is required')
  .positive('Only positive number')
  .integer('Only whole numbers are allowed')
  .typeError('Only numbers are allowed'),
  country: yup.string().required('is required'),
  email: yup
    .string()
    .required('this field is required')
    .email('invalid email format'),
  password: yup
    .string()
    .required('password is required')
    .matches(/^(?=.*[!@#%&$^*()?><|+=])/, 'one special character')
    .matches(/^(?=.*[0-9])/, 'one digit is required')
    .matches(/^(?=.*[a-z])/, 'one lower case letter is required')
    .matches(/^(?=.*[A-Z])/, 'one upper case letter is required'),
  password2: yup
    .string()
    .required('confirm password is required')
    .oneOf([yup.ref('password')], 'password not correct'),
  acceptTerm: yup.boolean().required('this field is required').oneOf([true]),
  gender: yup.string().required('gender is required'),
  picture: yup
    .mixed<FileList>()
    .required('Picture is required')
    .test('extension', 'Image required', (value) => {
      return value.length >= 1;
    })
    .test(
      'extension',
      'Only the following formats are accepted: .jpeg, .png',
      (value) => {
        if (!value.length) return false;
        return (
          value &&
          (value[0].type === 'image/jpeg' || value[0].type === 'image/png')
        );
      }
    )
    .test('pictureSize', 'This file is too large', (value) => {
      if (!value.length) return false;

      return value && value[0].size <= 200000;
    }),
});
