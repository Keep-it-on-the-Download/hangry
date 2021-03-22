import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import { HomeRounded, AccountCircle, LocationOn } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  icon: {
    color: theme.palette.secondary.main,
  },
  filler: {
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const classes = useStyles();

  const getPosition = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude, heading, speed, accuracy } = position.coords;
      console.log(
        `lon: ${longitude}, lat: ${latitude}, hdg: ${heading}, spd: ${speed}, acc: ${accuracy}`
      );
    });
  };

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <IconButton
          aria-label='Home'
          className={classes.icon}
          component={Link}
          to='/'
        >
          <HomeRounded />
        </IconButton>
        <div className={classes.filler} />
        <IconButton
          aria-label='Location'
          className={classes.icon}
          onClick={() => getPosition()}
        >
          <LocationOn />
        </IconButton>
        <div className={classes.filler} />
        <IconButton
          aria-label='Profile'
          className={classes.icon}
          component={Link}
          to='/profile'
        >
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
