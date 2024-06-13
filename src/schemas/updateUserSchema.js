import * as Yup from 'yup';

const updateUserSchema = Yup.object().shape({
    userId: Yup.number().required('Id is required'),
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
});

export default updateUserSchema;