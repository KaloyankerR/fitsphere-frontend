import { Box, Button, Typography, TextField } from '@mui/material';
import Rating from '@mui/material/Rating';
import { Formik, Form, Field } from 'formik';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import AuthContext from '../../auth/AuthContext';
import TokenManager from '../../auth/TokenManager';
import createRatingSchema from '../../schemas/createRatingSchema';
import usePostTrainerRatingRequest from '../../services/post/usePostTrainerRatingRequest';

const RatingForm = ({ trainerId }) => {
    const { user } = useContext(AuthContext);
    const { postData } = usePostTrainerRatingRequest(TokenManager.getAccessToken());

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        console.log(values); 
        try {
            await postData(values);
            alert('Rating submitted successfully!');
            resetForm();
        } catch (error) {
            alert('Failed to submit rating. Please try again.');
        }
        setSubmitting(false);
    };

    return (
        <Box>
            <Typography variant="h6">Leave a rating</Typography>
            <Formik
                initialValues={{
                    rating: 0,
                    comment: "",
                    trainerId: trainerId,
                    clientId: user.userId,
                }}
                validationSchema={createRatingSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, errors, touched, isSubmitting }) => (
                    <Form>
                        <Box
                            sx={{
                                my: 2,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Rating
                                name="rating"
                                value={Number(values.rating)}
                                onChange={(event) => {setFieldValue("rating", event.target.value)}}
                                precision={1}
                                max={5}
                            />
                            {errors.rating && touched.rating && (
                                <Typography color="error" variant="body2">
                                    {errors.rating}
                                </Typography>
                            )}
                        </Box>
                        <Box sx={{ my: 1 }}>
                            <Field
                                component={TextField}
                                name="comment"
                                value={values.comment}
                                onChange={(event) => setFieldValue("comment", event.target.value)}
                                fullWidth
                                multiline
                                rows={3}
                            />
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting}
                        >
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

RatingForm.propTypes = {
    trainerId: PropTypes.number.isRequired,
    clientId: PropTypes.number.isRequired,
};

export default RatingForm;
