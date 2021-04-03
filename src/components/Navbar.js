import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  icon: {
    color: theme.palette.secondary.main,
    borderStyle: 'solid',
    borderColor: '#000',
    borderRadius: 100,
  },
  logo: {
    height: 24,
    width: 24,
  },
  button: {
    borderRadius: 100,
  },
  location: {
    marginLeft: theme.spacing(2),
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
        <IconButton
          aria-label='Parties'
          className={classes.icon}
          component={Link}
          to='/parties'
        >
          <img
            className={classes.logo}
            src={`${process.env.PUBLIC_URL}/images/simplified_icon.svg`}
            alt='logo'
          />
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
