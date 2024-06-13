import { useState } from "react";
import { Typography, Grid, Card, CardContent } from "@mui/material";
import PropTypes from "prop-types";
import WorkoutCard from "../cards/WorkoutCard";
import GeneralDialog from "../other/GeneralDialog";
import WorkoutInfoCard from "../cards/WorkoutInfoCard";

const WorkoutsList = ({ workoutsData }) => {
  console.log(workoutsData);
  const [open, setOpen] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const handleDialogOpen = (workout) => {
    setSelectedWorkout(workout);
    setOpen(true);
  };

  const handleDialogClose = () => {
    setOpen(false);
    setSelectedWorkout(null);
  };

  let content;
  if (!workoutsData || workoutsData.length === 0) {
    content = <Typography>No workouts to return.</Typography>;
  } else {
    content = workoutsData.map((workout) => (
      <WorkoutCard
        key={workout.id}
        workout={workout}
        onSeeMore={handleDialogOpen}
      />
    ));
  }

  return (
    <Card raised sx={{height: '100%'}}>
      <CardContent>
        <Typography variant="h4" component="h1" gutterBottom>
          Workouts
        </Typography>

        <Grid
          container
          spacing={2}
          sx={{ maxHeight: '100%', overflowY: "auto", mb: 3 }}
        >
          {content}
        </Grid>
        
        <GeneralDialog
          open={open}
          onClose={handleDialogClose}
          title={selectedWorkout?.title}
          content={
            selectedWorkout && (
              <WorkoutInfoCard workoutId={selectedWorkout.id} />
            )
          }
        />
      </CardContent>
    </Card>
  );
};

WorkoutsList.propTypes = {
  workoutsData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default WorkoutsList;
