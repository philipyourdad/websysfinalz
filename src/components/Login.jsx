import { Button, Container, Grid, Paper, TextField, Typography, Box, IconButton, InputAdornment } from "@mui/material";
import React, { useState } from "react";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { makeStyles } from "@mui/styles";
import { Link } from "react-router-dom";

import supabase from "../Client"

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(4),
        marginTop: theme.spacing(4),
        backgroundColor: "primary",  
        borderRadius: theme.spacing(10), 
       
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
        backgroundColor: "#fff",  
    },
    submit: {
        marginTop: theme.spacing(4),
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main,  
    },
    title: {
        marginBottom: theme.spacing(4),
        color: theme.palette.primary.dark,  
    },
    error: {
        color: theme.palette.error.main,
        marginBottom: theme.spacing(2),
        textAlign: 'center',  // Centered error message
    },
}))

export default function Login() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const login = async (e) => {
        e.preventDefault();
        try {
            const { user, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            });

            if (error) {
                setErrorMessage('Invalid Credentials');
            } else {
                window.location.href = '/Dashboard';  // Redirect on successful login
            }
        } catch (error) {
            setErrorMessage(error.message);
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

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    return (
        <Container maxWidth='xs'>
            <Paper className={classes.paper} elevation={3}>
                <Typography variant="h5" align="center" className={classes.title}>
                    Log In
                </Typography>
                {errorMessage && (
                    <Typography className={classes.error}>
                        {errorMessage}
                    </Typography>
                )}
                <form className={classes.form}>
                    <TextField 
                        label='Email' 
                        variant="outlined" 
                        fullWidth 
                        value={email} 
                        onChange={handleEmailChange} 
                        error={Boolean(emailError)} 
                        helperText={emailError} 
                    />
                    <TextField 
                        label='Password' 
                        variant="outlined" 
                        fullWidth 
                        type={showPassword ? 'text' : 'password'} 
                        value={password} 
                        onChange={handlePasswordChange} 
                        error={Boolean(passwordError)} 
                        helperText={passwordError} 
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button className={classes.submit} variant="contained" color="primary" type="submit" onClick={login}>
                        Log in
                    </Button>
             
                </form>
                        <br />
                <Grid container justifyContent="center">
      <Grid item>
        <Button component={Link} to="/signup" variant="contained" color="primary" className={classes.button}>
          Sign up
        </Button>
      </Grid>
    </Grid>
            </Paper>
        </Container>
    )
}
