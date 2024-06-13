import {
  CssBaseline,
  Container,
  Grid,
  Typography,
  TextField,
  Skeleton,
} from "@mui/material";
import WorkoutCard from "../components/cards/WorkoutCard";
import useGetWorkoutsRequests from "../services/get/collection/useGetWorkoutsRequest";
import { useEffect, useState } from "react";
import GeneralDialog from "../components/other/GeneralDialog";
import WorkoutInfoCard from "../components/cards/WorkoutInfoCard";

const WorkoutsPage = () => {
  const { workouts, fetchWorkouts } = useGetWorkoutsRequests();
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleDialogOpen = (workout) => {
    setSelectedWorkout(workout);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setSelectedWorkout(null);
    setOpen(false);
  };

  let content;
  console.log(workouts);
  if (workouts) {
    const filteredWorkouts = workouts.filter(
      (workout) =>
        workout.title.toLowerCase().includes(searchTerm) ||
        workout.description.toLowerCase().includes(searchTerm)
    );

    content = filteredWorkouts.map((workout) => (
      <Grid item xs={12} md={6} lg={4} key={workout.id}>
        <WorkoutCard workout={workout} onSeeMore={handleDialogOpen} />
      </Grid>
    ));
  } else if (
    workouts === null ||
    (workouts && workouts.length === 0)
  ) {
    content = (
      <Typography variant="subtitle1" sx={{ ml: 5 }}>
        No workouts available.
      </Typography>
    );
  } else {
    content = <Skeleton variant="rectangular" width={210} height={118} />;
  }

  return (
    <Container maxWidth="lg">
      <CssBaseline />
      <TextField
        fullWidth
        label="Search Workouts"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        margin="normal"
        sx={{ mb: 4 }}
      />
      <Grid container spacing={4}>
        {content}
      </Grid>
      <GeneralDialog
        open={open}
        onClose={handleDialogClose}
        title={selectedWorkout?.title}
        content={
          selectedWorkout && <WorkoutInfoCard workoutId={selectedWorkout.id} />
        }
      />
    </Container>
  );
};

export default WorkoutsPage;
