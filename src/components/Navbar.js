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

  // const getLocation = () => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const { longitude, latitude } = position.coords;
  //     console.log(
  //       `%cLongitude: ${longitude} --- Latitude: ${latitude}`,
  //       'color: blue'
  //     );
  //   });
  //   // Link to redirect to google maps
  //   // https://www.google.com/maps/dir/?api=1&origin={orgn.lon,orgn.lat}&destination={dest.lon, dest.lat}
  // };

  // const getContacts = async () => {
  //   const props = ['name', 'email', 'tel', 'address', 'icon'];
  //   const opts = { multiple: true };
  //   const supported = 'contacts' in navigator && 'ContactsManager' in window;

  //   if (supported) {
  //     const contacts = await navigator.contacts.select(props, opts);
  //     console.table(contacts);
  //   } else {
  //     console.log('%cContacts Unsupported', 'color: #FF8C00');
  //   }
  // };

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
        {/* <ButtonGroup
          color='secondary'
          aria-label='outlined secondary button group'
        >
          <Button
            variant='outlined'
            color='secondary'
            className={classes.button}
            startIcon={<LocationOn />}
            onClick={() => getLocation()}
          >
            Get Location
          </Button>
          <Button
            variant='outlined'
            color='secondary'
            className={classes.button}
            startIcon={<ContactsIcon />}
            onClick={() => getContacts()}
          >
            Get Contacts
          </Button>
        </ButtonGroup> */}
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
