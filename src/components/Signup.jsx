import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import supabase from "../Client";
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Box,
  MenuItem,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5),
    marginTop: theme.spacing(2),
    backgroundColor: '#729762', 
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    
  },
  submit: {
    marginTop: theme.spacing(2),
  },
  link: {
    textDecoration: 'none',
  },
  title: {
    marginBottom: theme.spacing(10),
    fontSize: '2rem', 
    fontWeight: 'bold', 
    color: theme.palette.primary.main, 
    textAlign: 'center', 
  },

}));

export default function Signup() {
  const classes = useStyles();
  const [firstname, setFirstname] = useState('');
  const [surname, setSurname] = useState('');
  const [address, setAddress] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [confirmpasswordError, setConfirmPasswordError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const signup = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (error) {
        setSignupError(error.message);
      } else {
        window.location.href = '/login';
      }
    } catch (error) {
      setSignupError(error.message);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!validateEmail(e.target.value)) {
      setEmailError('Please enter a valid email');
    } else {
      setEmailError('');
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordError('Password must be at least 6 characters');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value.length < 6) {
      setConfirmPasswordError('Password must be at least 6 characters');
    } else if (e.target.value !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Container maxWidth="sm">
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h3" className={classes.title}>
          Wellmeadows Hospital
        </Typography>
        <br />
        <Typography variant="h5" className={classes.subtitle}>
          Sign Up
        </Typography>
        <br />
        <form className={classes.form} onSubmit={signup}>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
          <TextField
            label="Surname"
            variant="outlined"
            fullWidth
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
          <TextField
            label="Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <TextField
            label="Birthday"
            variant="outlined"
            fullWidth
            type="date"
            InputLabelProps={{ shrink: true }}
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            required
          />
          <TextField
            label="Gender"
            variant="outlined"
            fullWidth
            select
            value={gender}
            onChange={handleGenderChange}
            required
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            error={Boolean(emailError)}
            helperText={emailError}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={handlePasswordChange}
            error={Boolean(passwordError)}
            helperText={passwordError}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            fullWidth
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmpassword}
            onChange={handleConfirmPasswordChange}
            error={Boolean(confirmpasswordError)}
            helperText={confirmpasswordError}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowConfirmPassword}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            className={classes.submit}
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Sign Up
          </Button>
          {signupError && (
            <Box mt={2}>
              <Typography color="error" align="center">
                {signupError}
              </Typography>
            </Box>
          )}
        </form>
        <br />
        <Grid container justifyContent="center">
        <Grid item>
        <Button component={Link} to="/login" variant="contained" color="primary" className={classes.button}>
          Login 
        </Button>
      </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
