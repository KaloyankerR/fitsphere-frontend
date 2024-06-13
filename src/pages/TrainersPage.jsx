import {
  CssBaseline,
  Grid,
  CircularProgress,
  Typography,
  Container,
  TextField,
} from "@mui/material";
import TrainerCard from "../components/cards/TrainerCard";
import useGetTrainersRequest from "../services/get/collection/useGetTrainersRequest";
import { useEffect, useState } from "react";

const TrainersPage = () => {
  const [trainers, fetchTrainers] = useGetTrainersRequest();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTrainers();
  }, [fetchTrainers]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  let trainersContent;

  if (trainers === null) {
    trainersContent = <CircularProgress />;
  } else if (
    trainers &&
    trainers.trainers &&
    trainers.trainers.length > 0
  ) {
    const filteredTrainers = trainers.trainers.filter(
      (trainer) =>
        trainer.firstName.toLowerCase().includes(searchTerm) ||
        trainer.lastName.toLowerCase().includes(searchTerm) ||
        trainer.email.toLowerCase().includes(searchTerm)
    );

    trainersContent = (
      <Grid container spacing={2}>
        {filteredTrainers.map((trainer) => (
          <Grid item xs={12} sm={6} md={4} key={trainer.id}>
            <TrainerCard trainer={trainer} />
          </Grid>
        ))}
      </Grid>
    );
  } else {
    trainersContent = (
      <Typography variant="subtitle1">
        The trainers are not available.
      </Typography>
    );
  }

  return (
    <div>
      <CssBaseline />
      <Container>
        <div style={{ marginTop: 20 }}>
          <TextField
            fullWidth
            label="Search Trainers"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            margin="normal"
          />
        </div>
        <div style={{ marginTop: 30 }}>{trainersContent}</div>
      </Container>
    </div>
  );
};

export default TrainersPage;
