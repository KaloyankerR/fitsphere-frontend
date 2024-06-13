import {
  CircularProgress,
  Typography,
  Paper,
  Container,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useWorkoutInfoResponse from "../../services/workout/useGetWorkoutInfoRequest";
import usePostAppointment from "../../services/post/usePostCreateAppointment";
import TokenManager from "../../auth/TokenManager";


const WorkoutInfoCard = ({ workoutId }) => {
  const { workoutInfo, fetchDataById, isLoading, error } =
    useWorkoutInfoResponse(TokenManager.getAccessToken());
  const { postData } = usePostAppointment(TokenManager.getAccessToken());

  const [appointmentValues, setAppointmentValues] = useState({
    workoutId: workoutId,
    trainerId: 0,
    clientId: 0,
  });

  useEffect(() => {
    const claims = TokenManager.getClaims();
    if (claims && claims.userId) {
      fetchDataById(workoutId);
      setAppointmentValues((prevValues) => ({
        ...prevValues,
        clientId: claims.userId,
      }));
    }
  }, [workoutId, fetchDataById]);

  useEffect(() => {
    if (workoutInfo && workoutInfo.trainerId) {
      setAppointmentValues((prevValues) => ({
        ...prevValues,
        trainerId: workoutInfo.trainerId,
      }));
    }
  }, [workoutInfo]);

  const handleMakeAppointment = async () => {
    try {
      await postData(appointmentValues);
    } catch (error) {
      console.error(error);
    }
  };

  let content;
  if (isLoading) {
    content = <CircularProgress />;
  } else if (error) {
    content = (
      <Typography color="error">Failed to load workout information.</Typography>
    );
  } else if (!workoutInfo) {
    content = <Typography>No workout information available.</Typography>;
  } else {
    content = (
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography gutterBottom>{workoutInfo.title}</Typography>
        <Typography gutterBottom>{workoutInfo.description}</Typography>
        <Typography color="textSecondary">
          Start Time: {new Date(workoutInfo.startTime).toLocaleString()}
        </Typography>
        <Typography color="textSecondary">
          End Time: {new Date(workoutInfo.endTime).toLocaleString()}
        </Typography>
        <Typography color="textSecondary">
          Trainer: {workoutInfo.trainerFirstName} {workoutInfo.trainerLastName}{" "}
          (Rating: {workoutInfo.trainerRating})
        </Typography>

        <Button
          variant="contained"
          color="info"
          fullWidth
          onClick={handleMakeAppointment}
          sx={{ mt: 2 }}
        >
          Make an appointment
        </Button>
      </Paper>
    );
  }

  return <Container maxWidth="md">{content}</Container>;
};

WorkoutInfoCard.propTypes = {
  workoutId: PropTypes.number.isRequired,
};

export default WorkoutInfoCard;
