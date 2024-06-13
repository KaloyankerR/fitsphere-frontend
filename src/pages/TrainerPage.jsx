import {
  Container,
  CssBaseline,
  Grid,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import TrainerCardInfo from "../components/cards/TrainerCardInfo";
import { useEffect } from "react";
import TokenManager from "../auth/TokenManager";
import useGetUserByIdRequest from "../services/get/useGetUserById";
import useGetWorkoutsByTrainerRequest from "../services/workout/useGetWorkoutsByTrainerRequest";
import WorkoutsList from "../components/collections/WorkoutsList";

const TrainerPage = () => {
  const { id } = useParams();
  const { user, fetchDataById, isLoadingUser } = useGetUserByIdRequest(
    TokenManager.getAccessToken()
  );
  const { workoutsData, fetchDataByTrainer, isLoadingWorkouts } =
    useGetWorkoutsByTrainerRequest(TokenManager.getAccessToken());

  console.log(TokenManager.getAccessToken());
    
    useEffect(() => {
    fetchDataById(id);
    fetchDataByTrainer(id);
  }, [fetchDataById, fetchDataByTrainer, id]);

  let trainerContent;
  if (isLoadingUser) {
    trainerContent = <CircularProgress />;
  } else if (user) {
    trainerContent = <TrainerCardInfo trainer={user} />;
  } else {
    trainerContent = (
      <Typography variant="subtitle1">The trainer is not available.</Typography>
    );
  }

  let workoutsContent;
  if (isLoadingWorkouts) {
    workoutsContent = <CircularProgress />;
  } else if (!workoutsData || workoutsData.length === 0) {
    workoutsContent = <Typography>No workouts to return.</Typography>;
  } else {
    workoutsContent = <WorkoutsList workoutsData={workoutsData.workouts} />;
  }

  return (
    <div>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container spacing={2} sx={{ marginTop: 1 }}>
          <Grid item xs={12} md={6}>
            {trainerContent}
          </Grid>
          <Grid item xs={12} md={6}>
            {workoutsContent}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default TrainerPage;
