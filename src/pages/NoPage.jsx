import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

export default function NoPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          404: Not Found
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {"The page you are looking for might have been removed had its name changed or is temporarily unavailable."}
        </Typography>
        <Typography variant="body1">Sticky footer placeholder.</Typography>
      </Container>
      
    </Box>
  );
}
