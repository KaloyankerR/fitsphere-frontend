import { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AuthContext from "../../auth/AuthContext";
import IconButton from "@mui/material/IconButton";
import ChatIcon from "@mui/icons-material/Chat";
import { Link } from "react-router-dom";

const pages = ["Workouts", "Trainers", "About"];

export default function Navbar() {
  const { user } = useContext(AuthContext);
  const isLogged = !!user;

  const navigate = useNavigate();

  const handleRedirectToPage = (page) => {
    navigate("/" + page.toLowerCase());
  };

  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            FitSphere
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handleRedirectToPage(page)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isLogged ? (
              <>
                <IconButton
                  component={Link}
                  to="/chat"
                  sx={{ color: "white", p: 0, mr: 1.5 }}
                >
                  <ChatIcon />
                </IconButton>
                <IconButton
                  component={Link}
                  to="/account"
                  sx={{ color: "white", p: 0 }}
                >
                  <AccountCircleOutlinedIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  onClick={() => handleRedirectToPage("Signin")}
                  sx={{ color: "white" }}
                >
                  Signin
                </Button>
                <Button
                  onClick={() => handleRedirectToPage("Signup")}
                  sx={{ color: "white" }}
                >
                  Signup
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
