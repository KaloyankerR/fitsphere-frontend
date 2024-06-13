import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Typography,
  Button,
  Card,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import TokenManager from "../../auth/TokenManager";
import PrimaryButton from "../buttons/PrimaryButton";
import WorkoutForm from "../forms/WorkoutForm";
import useGetWorkoutsByTrainerRequest from "../../services/workout/useGetWorkoutsByTrainerRequest";
import useDeleteWorkoutRequest from "../../services/delete/useDeleteWorkoutRequest";

const WorkoutsTable = () => {
  const [open, setOpen] = useState(false);
  const [updateFormId, setUpdateFormId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { workoutsData, fetchDataByTrainer, isLoading } =
    useGetWorkoutsByTrainerRequest(TokenManager.getAccessToken());
  const { deleteWorkout } = useDeleteWorkoutRequest(TokenManager.getAccessToken());

  useEffect(() => {
    const claims = TokenManager.getClaims();
    if (claims && claims.userId) {
      fetchDataByTrainer(claims.userId);
    }
  }, [fetchDataByTrainer]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSnackbarClose = () => setSnackbarOpen(false);

  const handleUpdateFormOpen = (id) => setUpdateFormId(id);
  const handleUpdateFormClose = () => setUpdateFormId(null);

  const handleDelete = async (id) => {
    await deleteWorkout(id);
    fetchDataByTrainer(TokenManager.getClaims().userId);
    setSnackbarMessage("Workout deleted successfully.");
    setSnackbarOpen(true);
  };

  let content;
  if (isLoading) {
    content = (
      <TableRow>
        <TableCell align="center">
          <CircularProgress />
        </TableCell>
      </TableRow>
    );
  } else if (!workoutsData || workoutsData.length === 0) {
    content = (
      <TableRow>
        <TableCell align="center">
          <Typography>No workouts to return.</Typography>
        </TableCell>
      </TableRow>
    );
  } else {
    content = workoutsData.workouts.map((workout) => (
      <TableRow key={workout.id}>
        <TableCell align="left">{workout.title}</TableCell>
        <TableCell align="center">
          <Button
            color="warning"
            variant="contained"
            sx={{ margin: 0.5 }}
            onClick={() => handleUpdateFormOpen(workout.id)}
          >
            Update
          </Button>

          {updateFormId === workout.id && (
            <Dialog
              open={updateFormId === workout.id}
              onClose={handleUpdateFormClose}
              maxWidth="xs"
              fullWidth
            >
              <DialogTitle>
                Update Workout
                <IconButton
                  aria-label="close"
                  onClick={handleUpdateFormClose}
                  sx={{ position: "absolute", right: 8, top: 8 }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent>
                <WorkoutForm existingWorkout={workout} />
              </DialogContent>
            </Dialog>
          )}

          <Button
            color="error"
            variant="contained"
            sx={{ margin: 0.5 }}
            onClick={() => handleDelete(workout.id)}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
    ));
  }

  return (
    <>
      <Card raised>
        <Box sx={{ height: "51vh", overflow: "auto" }}>
          <TableContainer>
            <Table aria-label="workouts table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "primary.main" }}>
                  <TableCell colSpan={4} align="center">
                    <Typography variant="h6" sx={{ color: "white" }}>
                      Workouts
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                
                <TableRow>
                  <TableCell colSpan={4} align="right">
                    <PrimaryButton text="Add Workout" onClick={handleOpen} />
                    <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
                      <DialogTitle>
                        Create Workout
                        <IconButton
                          onClick={handleClose}
                          sx={{ position: "absolute", right: 8, top: 8 }}
                        >
                          <CloseIcon />
                        </IconButton>
                      </DialogTitle>
                      <DialogContent>
                        <WorkoutForm />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
                
                {content}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default WorkoutsTable;
