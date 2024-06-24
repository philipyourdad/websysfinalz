import React from 'react';
import { makeStyles } from '@mui/styles';
import { AppBar, Toolbar } from '@mui/material';


const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: '#03395f', 
    height: theme.spacing(15), 
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: theme.spacing(0), 
    backgroundColor: '#86B6F6', 
  },
  
  titleContainer: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    left: 0,
    textAlign: 'center', 
  },
  title: {
    fontSize: '2.5rem', 
    fontWeight: 'bold', 
    display: 'flex',
    alignItems: 'center',
    color: '#FFFFFF', 
    textTransform: 'uppercase',
  },
  wellmeadows: {
    marginRight: theme.spacing(1), 
  },
  hospital: {
    color: '#fff', 
    fontWeight: 'bold', 
  },
}));

export default function Header() {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.titleContainer}>
          <div className={classes.title}>
            <span className={classes.wellmeadows}></span>
            <span className={classes.hospital}></span>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
}
