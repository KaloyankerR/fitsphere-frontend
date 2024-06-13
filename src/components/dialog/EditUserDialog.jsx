import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  Alert,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import updateUserSchema from "../../schemas/updateUserSchema";
import useUpdateUserData from "../../services/put/useUpdateUserData";
import TokenManager from "../../auth/TokenManager";

const EditProfileDialog = ({ open, handleClose, user }) => {
  const { updateUser } = useUpdateUserData(TokenManager.getAccessToken());

  const handleSubmit = async (values, actions) => {
    try {
        console.log(values);
      await updateUser(values);
      actions.setStatus({ success: "Profile updated successfully!" });
      handleClose();
    } catch (error) {
      console.error("Failed to update user:", error);
      actions.setStatus({ error: "Failed to update profile. Please try again." });
    }
    actions.setSubmitting(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Profile</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          }}
          validationSchema={updateUserSchema}
          onSubmit={handleSubmit}
        >
          {({ status }) => (
            <Form noValidate>
              <Box sx={{ my: 2 }}>
                <Field
                  as={TextField}
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  fullWidth
                  required
                />
                <ErrorMessage name="firstName" component="div" className="error-message" />
              </Box>
              <Box sx={{ my: 2 }}>
                <Field
                  as={TextField}
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  required
                />
                <ErrorMessage name="lastName" component="div" className="error-message" />
              </Box>
              <Box sx={{ my: 2 }}>
                <Field
                  as={TextField}
                  id="email"
                  name="email"
                  label="Email"
                  type="email"
                  fullWidth
                  required
                />
                <ErrorMessage name="email" component="div" className="error-message" />
              </Box>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button type="submit" color="primary">
                  Save
                </Button>
              </DialogActions>
              {status && status.success && (
                <Alert severity="success">{status.success}</Alert>
              )}
              {status && status.error && (
                <Alert severity="error">{status.error}</Alert>
              )}
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

EditProfileDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default EditProfileDialog;
