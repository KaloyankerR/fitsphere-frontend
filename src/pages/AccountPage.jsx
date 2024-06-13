import { useEffect, useState } from "react";
import {
  CircularProgress,
  Container,
  CssBaseline,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";
import TokenManager from "../auth/TokenManager";
import AccountCard from "../components/cards/AccountCard";
import useGetUserByIdRequest from "../services/get/useGetUserById";
import AppointmentsTable from "../components/collections/AppointmentsTable";
import WorkoutsTable from "../components/collections/WorkoutsTable";
import { db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Link } from "react-router-dom";

const AccountPage = () => {
  const { user, fetchDataById, isLoading } = useGetUserByIdRequest(
    TokenManager.getAccessToken()
  );
  const [claims, setClaims] = useState(null);

  useEffect(() => {
    const claims = TokenManager.getClaims();
    setClaims(claims);
    if (claims && claims.userId) {
      fetchDataById(claims.userId);
    }
  }, [fetchDataById]);

  useEffect(() => {
    if (claims && claims.userId && user) {
      checkAndAddUser(claims.sub);
    }
  }, [claims, user]);

  const checkAndAddUser = async (userEmail) => {
    try {
      const userRef = doc(db, "users", userEmail);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists() && user) {
        const newUser = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        };

        await setDoc(userRef, newUser);
        console.log("User added successfully.");
      } else {
        console.log("User already exists.");
      }
    } catch (error) {
      console.error("Error checking or adding user: ", error);
    }
  };

  let content;
  if (isLoading || !user) {
    content = (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  } else {
    content =
      user.role === "CLIENT" ? (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <AccountCard user={user} />
          </Grid>
          <Grid item xs={6}>
            <AppointmentsTable appointments={user.appointmentList} />
          </Grid>
        </Grid>
      ) : user.role === "ADMIN" ? (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <AccountCard user={user} />
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ height: "100%" }}>
              <CardActionArea
                component={Link}
                to="/admin"
                sx={{ height: "100%" }}
              >
                <CardContent
                  sx={{
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item>
                      <DashboardIcon fontSize="large" />
                    </Grid>
                    <Grid item>
                      <Typography variant="h6">Admin Dashboard</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <AccountCard user={user} />
          </Grid>
          <Grid item xs={6}>
            <WorkoutsTable />
          </Grid>
          <Grid item xs={12}>
            <AppointmentsTable appointments={user.appointmentList} />
          </Grid>
        </Grid>
      );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 3 }}>
      <CssBaseline />
      {content}
    </Container>
  );
};

export default AccountPage;
