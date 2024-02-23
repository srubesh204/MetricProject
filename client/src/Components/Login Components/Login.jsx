import React, { useState } from 'react'
import axios from 'axios'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';



// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login(props) {
  const navigate = useNavigate()
  const [loginData, setLoginData] = React.useState({
    employeeCode: "",
    password: ""
  })
  const [snackBarOpen, setSnackBarOpen] = useState(false)
  const [errorhandler, setErrorHandler] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  const [errors, setErrors] = useState({})
  const validateFunction = () => {
    let tempErrors = {};
    tempErrors.employeeCode = loginData.employeeCode ? "" : "Employee Code  is Required"
    tempErrors.password = loginData.password ? "" : "Passwird is Required"


    setErrors({ ...tempErrors })

    return Object.values(tempErrors).every(x => x === "")
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validateFunction()) {
        const response = await axios.post(
          `${process.env.REACT_APP_PORT}/login`, loginData
        );

        sessionStorage.setItem('employee', response.data.employee.empRole);
        sessionStorage.setItem('empId', response.data.employee._id);
        sessionStorage.setItem('loggedIn', true);
        console.log(response)
        if (props.onLoginSuccess) {
          props.onLoginSuccess();
        }
        navigate("/")
      } else {

        console.log("Error")
        setSnackBarOpen(true)
        setErrorHandler({ status: 0, message: "Fill the required fields", code: "error" })
      }

    } catch (err) {
      console.log(err)
      setSnackBarOpen(true)
      setErrorHandler({ status: 0, message: err.response.data.message, code: "error" })
    }
    console.log(loginData)
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                {...(errors.employeeCode !== "" && { helperText: errors.employeeCode, error: true })}
                fullWidth
                id="employeeCodeId"
                label="Employee Code"
                name="employeeCode"
                autoFocus
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                {...(errors.password !== "" && { helperText: errors.password, error: true })}
                id="passwordId"
                onChange={handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} open={snackBarOpen} autoHideDuration={6000} onClose={() => setSnackBarOpen(false)}>
                <Alert onClose={() => setSnackBarOpen(false)} severity={errorhandler.code} variant='filled' sx={{ width: '100%' }}>
                  {errorhandler.message}
                </Alert>
              </Snackbar>

            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}