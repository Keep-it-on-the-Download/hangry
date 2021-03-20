import React from 'react';

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

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <IconButton className={classes.icon} href='/'>
          <HomeRounded />
        </IconButton>
        <div className={classes.filler} />
        <IconButton className={classes.icon}>
          <LocationOn />
        </IconButton>
        <div className={classes.filler} />
        <IconButton className={classes.icon} href='/profile'>
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
