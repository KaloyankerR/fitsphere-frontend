import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Button,
  Box,
  CssBaseline,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import BarChartIcon from "@mui/icons-material/BarChart";
import UserList from "../components/collections/UserList";
import WorkoutList from "../components/collections/WorkoutList";
import Statistics from "./Statistics";
import TokenManager from "../auth/TokenManager";
import useGetWorkoutsRequests from "../services/get/collection/useGetWorkoutsRequest";
import useDeleteWorkoutRequest from "../services/delete/useDeleteWorkoutRequest";
import useGetUsersRequests from "../services/get/collection/useGetUsersRequest";
import useGetAllAppointments from "../services/get/collection/useGetAllAppointments";
import BusyDayChart from "../components/statistics/BusyDayChart";

const AdminDashboard = () => {
  const { workouts, fetchWorkouts } = useGetWorkoutsRequests();
  const { deleteWorkout } = useDeleteWorkoutRequest(
    TokenManager.getAccessToken()
  );
  const { users, fetchUsers } = useGetUsersRequests(
    TokenManager.getAccessToken()
  );
  const { appointments, fetchAppointments } = useGetAllAppointments(
    TokenManager.getAccessToken()
  );

  const [view, setView] = useState("users");

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchUsers("all");
        await fetchWorkouts();
        await fetchAppointments();
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const countEntitiesByDay = (workoutData) => {
    const counts = {};

    workoutData.forEach((workout) => {
      const day = new Date(workout.startTime).toLocaleString("en-US", {
        weekday: "long",
      });
      counts[day] = (counts[day] || 0) + 1;
    });

    return Object.keys(counts).map((day) => ({ day, count: counts[day] }));
  };

  const handleDeleteUser = (userId) => {
    // setUsers(users.filter((user) => user.id !== userId)); TODO: implement delete user
    fetchUsers("all");
  };

  const handleDeleteWorkout = async (workoutId) => {
    await deleteWorkout(workoutId);
    fetchWorkouts();
  };

  const handleViewChange = (newValue) => {
    setView(newValue);
  };

  let appointmentsData = [];
  let workoutsData = [];

  if (!isLoading) {
    appointmentsData = countEntitiesByDay(appointments);
    workoutsData = countEntitiesByDay(workouts);
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4, flexGrow: 1 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <Button
            variant={view === "users" ? "contained" : "outlined"}
            startIcon={<PeopleIcon />}
            onClick={() => handleViewChange("users")}
            sx={{ mx: 1 }}
          >
            Users
          </Button>
          <Button
            variant={view === "workouts" ? "contained" : "outlined"}
            startIcon={<FitnessCenterIcon />}
            onClick={() => handleViewChange("workouts")}
            sx={{ mx: 1 }}
          >
            Workouts
          </Button>
          <Button
            variant={view === "statistics" ? "contained" : "outlined"}
            startIcon={<BarChartIcon />}
            onClick={() => handleViewChange("statistics")}
            sx={{ mx: 1 }}
          >
            Statistics
          </Button>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          {isLoading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">Error: {error}</Typography>
          ) : (
            <>
              {view === "users" && (
                <UserList users={users} onDelete={handleDeleteUser} />
              )}
              {view === "workouts" && (
                <WorkoutList
                  workouts={workouts}
                  onDelete={handleDeleteWorkout}
                />
              )}
              {view === "statistics" && (
                <BusyDayChart data1={appointmentsData} data2={workoutsData} />
              )}
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default AdminDashboard;
