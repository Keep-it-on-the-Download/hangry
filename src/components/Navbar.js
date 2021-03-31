import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import { HomeRounded, AccountCircle } from '@material-ui/icons';
// import LocationOn from '@material-ui/icons';
// import ButtonGroup from '@material-ui/core/ButtonGroup';
// import Button from '@material-ui/core/Button';

// import ContactsIcon from '@material-ui/icons/Contacts';

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
          aria-label='Home'
          className={classes.icon}
          component={Link}
          to='/'
        >
          <HomeRounded />
        </IconButton>
        <IconButton
          aria-label='Home'
          className={classes.icon}
          component={Link}
          to='/parties'
        >
          <HomeRounded />
        </IconButton>
        <div className={classes.filler} />
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
