import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Grid } from "@mui/material";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Sheet from "@mui/joy/Sheet";
import RoboImage from '../../services/external/roboImage';

const TrainerCard = ({ trainer }) => {
  return (
    <Grid item xs={12} sm={6} md={8}>
      <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <RoboImage input={`${trainer.firstName} ${trainer.lastName}`} style={{ width: '100%', height: 182 }} />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography level="h6" fontSize="lg" fontWeight="lg">
            {trainer.firstName} {trainer.lastName}
          </Typography>
          <Typography level="body2" fontWeight="lg" textColor="text.tertiary">
            {trainer.email}
          </Typography>
          <Sheet
            variant="outlined"
            sx={{
              bgcolor: "background.level1",
              borderRadius: "sm",
              p: 1.5,
              my: 1.5,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography level="body3" fontWeight="lg">Rating: {trainer.rating} ⭐</Typography>
          </Sheet>
          <Button variant="solid" color="primary" fullWidth component={Link} to={`/trainer/${trainer.id}`}>
            See Profile
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

TrainerCard.propTypes = {
  trainer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string,
    bio: PropTypes.string,
    igLink: PropTypes.string,
    imageUrl:  PropTypes.string,
    rating: PropTypes.number.isRequired,
  }),
};

export default TrainerCard;
