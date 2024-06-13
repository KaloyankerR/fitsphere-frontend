import { useState } from "react";
import {
  Avatar,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  IconButton,
  InputAdornment,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Formik, Form, Field } from "formik";
import signUpSchema from "../schemas/signUpSchema";
import usePostUserRequest from "../services/post/usePostUserRequest";
import useAuthJwtToken from "../schemas/useAuthJwtToken";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../components/buttons/PrimaryButton";
import RedirectionButton from "../components/buttons/RedirectionButton";
import ErrorMessageComponent from "../components/other/ErrorMessageComponent";

const SignUpPage = () => {
  const { postData } = usePostUserRequest();
  const login = useAuthJwtToken();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [signUpError, setSignUpError] = useState(null);

  const handleSubmit = async (values) => {
    try {
      await postData(values);
      await login(values.email, values.password);
      navigate("/account");
    } catch (error) {
      setSignUpError(error.response?.data?.message || "Sign up failed, please try again.");
      console.error("Sign up error: ", error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ mb: 2 }}>
          Sign up
        </Typography>
        {signUpError && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {signUpError}
          </Alert>
        )}
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: "CLIENT",
          }}
          validationSchema={signUpSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                  />
                  <ErrorMessageComponent name="firstName" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                  />
                  <ErrorMessageComponent name="lastName" />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                  <ErrorMessageComponent name="email" />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={togglePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <ErrorMessageComponent name="password" />
                </Grid>
              </Grid>
              <PrimaryButton text="Sign Up" sx={{ mt: 3, mb: 2 }} />
              <RedirectionButton
                text="Already have an account? Sign In"
                href="/signin"
              />
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
}

export default SignUpPage;