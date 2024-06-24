import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";
import supabase from "../Client"; // Assuming you have Supabase client configured
import {
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  Box,
} from "@mui/material";

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

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { usersz, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        setLoginError(error.message);
      } else {
        // Redirect to dashboard or home page upon successful login
        window.location.href = '/dashboard'; // Change to appropriate page
      }
    } catch (error) {
      setLoginError(error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper className={classes.paper} elevation={3}>
        <Typography variant="h3" className={classes.title}>
          Wellmeadows
        </Typography>
        <br />
        <Typography variant="h5" className={classes.subtitle}>
          Login
        </Typography>
        <br />
        <form className={classes.form} onSubmit={handleLogin}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            className={classes.submit}
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
          >
            Login
          </Button>
          {loginError && (
            <Box mt={2}>
              <Typography color="error" align="center">
                {loginError}
              </Typography>
            </Box>
          )}
        </form>
        <br />
        <Grid container justifyContent="center">
          <Grid item>
            <Button component={Link} to="/signup" variant="contained" color="primary"  className={classes.button}>
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Login;
