import { Card, CardContent, Typography, Grid } from "@mui/material";
import PropTypes from "prop-types";
import AuthContext from "../../auth/AuthContext";
import { useContext, useState } from "react";
import PrimaryButton from "../buttons/PrimaryButton";
import RedirectionButton from "../buttons/RedirectionButton";
import EditProfileDialog from "../dialog/EditUserDialog";

const AccountCard = ({ user }) => {
  const { logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (  
    <Card raised>
      <CardContent>
        <Typography variant="h4" component="h1" gutterBottom>
          Personal information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>First Name:</strong> {user.firstName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Last Name:</strong> {user.lastName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Email:</strong> {user.email}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Role:</strong> {user.role}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} style={{ marginTop: "20px" }}>
          <Grid item xs={12}>
            <PrimaryButton text="Edit Profile" onClick={handleOpen}/>
          </Grid>
          <Grid item xs={12}>
            <RedirectionButton
              text="Logout"
              onClick={logout}
              variant={"contained"}
              color={"error"}
            />
          </Grid>
        </Grid>
      </CardContent>
      <EditProfileDialog open={open} handleClose={handleClose} user={user} />
    </Card>
  );
};

AccountCard.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
  }),
};

export default AccountCard;
