import React from "react";
import {
  Card,
  Container,
  CssBaseline,
  CardContent,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import RoboImage from "../../services/external/roboImage";
import RatingForm from "../forms/RatingForm";

function TrainerCardInfo({ trainer }) {
  return (
    <React.Fragment>
      <CssBaseline />

      <Container>
        <Card
          raised
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <RoboImage input={`${trainer.firstName} ${trainer.lastName}`} />
          <CardContent sx={{ flexGrow: 1, width: "100%" }}>
            <Typography
              sx={{ fontSize: 16 }}
              color="text.secondary"
              gutterBottom
            >
              Trainer Profile
            </Typography>
            <Typography variant="h4" component="div">
              {trainer.firstName} {trainer.lastName}
            </Typography>
            <Typography sx={{ mt: 1 }} color="primary">
              Email: {trainer.email}
            </Typography>
            {trainer.phoneNumber && (
              <Typography color="text.secondary">
                Phone: {trainer.phoneNumber}
              </Typography>
            )}
            <RatingForm
              trainerId={trainer.id}
              clientId={2}
              onSubmit={(values) => console.log("Form values:", values)}
            />
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
}

TrainerCardInfo.propTypes = {
  trainer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string,
  }),
};

export default TrainerCardInfo;
