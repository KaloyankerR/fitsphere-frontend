import PropTypes from "prop-types";
import { Card, Grid, Typography, CardContent, Button } from "@mui/material";

const WorkoutCard = ({ workout, onSeeMore }) => {
  const formatDateTime = (isoString, word) => {
    const options = {
      month: "long",
      day: "numeric",
    };
    const datePart = new Date(isoString).toLocaleDateString(undefined, options);
    
    const timeOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    const timePart = new Date(isoString).toLocaleTimeString(undefined, timeOptions);

    return `${datePart} ${word} ${timePart}`;
  }; 

  return (
    <Grid item md={11.5} sx={{ mb: 1 }}>
      <Card raised>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            {workout.title}
          </Typography>
          <Typography gutterBottom>
            {formatDateTime(workout.startTime, "from")} - {formatDateTime(workout.endTime, "till")}
          </Typography>
          <Button
            variant="contained"
            color="info"
            onClick={() => onSeeMore(workout)}
            fullWidth
          >
            See More
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

WorkoutCard.propTypes = {
  workout: PropTypes.shape({
    title: PropTypes.string.isRequired,
    startTime: PropTypes.string.isRequired,
    endTime: PropTypes.string.isRequired,
  }).isRequired,
  onSeeMore: PropTypes.func.isRequired,
};

export default WorkoutCard;
