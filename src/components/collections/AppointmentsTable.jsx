import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';

const AppointmentsTable = ({ appointments }) => {
  const formatDateTime = (isoString) => {
    const options = {
      // year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Date(isoString).toLocaleDateString(undefined, options);
  }; 

  const generateGoogleCalendarUrl = (appointment) => {
    const startDate = new Date(appointment.startTime).toISOString().replace(/-|:|\.\d\d\d/g,"");
    const endDate = new Date(appointment.endTime).toISOString().replace(/-|:|\.\d\d\d/g,"");
    const details = `${appointment.workoutTitle} with Trainer ${appointment.trainerFirstName} ${appointment.trainerLastName}`;
    const location = ""; // Add location if available
    const url = `https://calendar.google.com/calendar/r/eventedit?text=${encodeURIComponent(
      appointment.workoutTitle
    )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
      details
    )}&location=${encodeURIComponent(location)}`;
    return url;
  };

  return (
    <TableContainer
      component={Paper}
      elevation={3}
      sx={{ maxWidth: "100%"}}
    >
      <Table aria-label="appointments table">
        <TableHead>
        <TableRow sx={{ backgroundColor: "primary.main" }}>
            <TableCell colSpan={6} align="center">
              <Typography variant="h6" sx={{ color: "white" }}>Appointments</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Workout</TableCell>
            <TableCell align="right">Start Time</TableCell>
            <TableCell align="right">End Time</TableCell>
            <TableCell align="right">Trainer</TableCell>
            <TableCell align="right">Client</TableCell>
            <TableCell align="right">Calendar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell component="th" scope="row">
                {appointment.workoutTitle}
              </TableCell>
              <TableCell align="right">
                {formatDateTime(appointment.startTime)}
              </TableCell>
              <TableCell align="right">
                {formatDateTime(appointment.endTime)}
              </TableCell>
              <TableCell align="right">
                {appointment.trainerFirstName} {appointment.trainerLastName}
              </TableCell>
              <TableCell align="right">
                {appointment.clientFirstName} {appointment.clientLastName}
              </TableCell>
              <TableCell align="right">
                <IconButton
                  color="primary"
                  href={generateGoogleCalendarUrl(appointment)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GoogleIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

AppointmentsTable.propTypes = {
  appointments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
      trainerId: PropTypes.number.isRequired,
      trainerFirstName: PropTypes.string.isRequired,
      trainerLastName: PropTypes.string.isRequired,
      clientId: PropTypes.number.isRequired,
      clientFirstName: PropTypes.string.isRequired,
      clientLastName: PropTypes.string.isRequired,
      workoutTitle: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default AppointmentsTable;
