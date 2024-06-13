import * as Yup from 'yup';

const signUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(3, 'First name must be at least 3 characters')
    .required('First name is required'),
  lastName: Yup.string()
    .min(3, 'Last name must be at least 3 characters')
    .required('Last name is required'),
  email: Yup.string()
    .min(6, 'Email must be at least 6 characters')
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters')
    .required('Password is required'),
});

export default signUpSchema;
