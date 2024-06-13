import * as Yup from 'yup';

// TODO: change the signInSchema to signUpSchema
const signUpSchema = Yup.object().shape({
  email: Yup.string()
    .min(6, 'Email must be at least 6 characters')
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 5 characters')
    .required('Password is required'),
    remember: Yup.boolean(),
});

export default signUpSchema;
