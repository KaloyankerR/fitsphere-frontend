import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import { Formik, Form, Field } from "formik";
import signInSchema from "../schemas/signInSchema";
import useAuthJwtToken from "../schemas/useAuthJwtToken";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton";
import RedirectionButton from "../components/buttons/RedirectionButton";
import ErrorMessageComponent from "../components/other/ErrorMessageComponent";

const SignInPage = () => {
  const login = useAuthJwtToken();
  const [loginError, setLoginError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await login(values.email, values.password, values.remember);
      navigate("/account");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed!";
      setLoginError(errorMessage);
      console.error("Login error: ", errorMessage);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {loginError && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              {loginError}
            </Alert>
          )}
          <Formik
            initialValues={{ email: "", password: "", remember: false }}
            validationSchema={signInSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form noValidate>
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
                <ErrorMessageComponent name="email" />
                <Field
                  as={TextField}
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  InputProps={{
                    endAdornment: (
                      <Button
                        onClick={togglePasswordVisibility}
                        color="primary"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </Button>
                    ),
                  }}
                />
                <ErrorMessageComponent name="password" />
                <FormControlLabel
                  control={
                    <Field
                      as={Checkbox}
                      name="remember"
                      color="primary"
                      type="checkbox"
                    />
                  }
                  label="Remember me"
                />
                <PrimaryButton text="Sign In" sx={{ mt: 3, mb: 2 }} />
                <RedirectionButton
                  text="Don't have an account? Sign Up"
                  href="/signup"
                />
              </Form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignInPage;
