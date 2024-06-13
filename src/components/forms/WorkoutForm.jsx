import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Alert,
} from "@mui/material";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { Formik, Form, Field, ErrorMessage } from "formik";
import createWorkoutSchema from "../../schemas/createWorkoutSchema";
import { useContext } from "react";
import AuthContext from "../../auth/AuthContext";
import usePostWorkoutRequest from "../../services/post/usePostWorkoutRequest";
import usePutWorkoutRequest from "../../services/workout/usePutWorkoutRequest";
import TokenManager from "../../auth/TokenManager";
import PropTypes from "prop-types";

const WorkoutForm = ({ existingWorkout }) => {
  const { user } = useContext(AuthContext);
  const { postData } = usePostWorkoutRequest(TokenManager.getAccessToken());
  const { putData } = usePutWorkoutRequest(TokenManager.getAccessToken());

  const handleSubmit = async (values, actions) => {
    try {
      if (existingWorkout) {
        await putData(existingWorkout.id, values);
      } else {
        await postData(values);
      }
      // Handle success messages
      actions.setStatus({ success: "Workout has been successfully " + (existingWorkout ? "updated" : "created") });
    } catch (error) {
      console.error(error);
      actions.setStatus({ error: "Failed to " + (existingWorkout ? "update" : "create") + " workout" });
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <FitnessCenterIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          {existingWorkout ? "Update Workout" : "Create Workout"}
        </Typography>
        <Formik
          initialValues={{
            title: existingWorkout ? existingWorkout.title : "",
            description: existingWorkout ? existingWorkout.description : "",
            startTime: existingWorkout ? existingWorkout.startTime : "",
            endTime: existingWorkout ? existingWorkout.endTime : "",
            trainerId: user.userId,
          }}
          validationSchema={createWorkoutSchema}
          onSubmit={handleSubmit}
        >
          {({ status }) => (
            <Form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field as={TextField} required fullWidth id="title" label="Title" name="title" autoComplete="off" />
                  <ErrorMessage name="title" component="div" className="error-message" />
                </Grid>
                <Grid item xs={12}>
                  <Field as={TextField} fullWidth multiline rows={4} id="description" label="Description" name="description" />
                  <ErrorMessage name="description" component="div" className="error-message" />
                </Grid>
                <Grid item xs={12}>
                  <Field as={TextField} required fullWidth id="startTime" label="Start Time" name="startTime" type="datetime-local" />
                  <ErrorMessage name="startTime" component="div" className="error-message" />
                </Grid>
                <Grid item xs={12}>
                  <Field as={TextField} required fullWidth id="endTime" label="End Time" name="endTime" type="datetime-local" />
                  <ErrorMessage name="endTime" component="div" className="error-message" />
                </Grid>
              </Grid>
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                {existingWorkout ? "Update Workout" : "Create Workout"}
              </Button>
              {status && status.success && (
                <Alert severity="success">{status.success}</Alert>
              )}
              {status && status.error && (
                <Alert severity="error">{status.error}</Alert>
              )}
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default WorkoutForm;

WorkoutForm.propTypes = {
  existingWorkout: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
  }),
};
