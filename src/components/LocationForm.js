import React from 'react';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InputBase from '@material-ui/core/InputBase';

import Button from '@material-ui/core/Button';

import { fade, withStyles } from '@material-ui/core/styles';

import { createParty } from '../firebase/firestoreParty';

const styles = (theme) => ({
  search: {
    padding: theme.spacing(0, 2),
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.main, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '90%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  listText: {
    margin: theme.spacing(2),
    textAlign: 'center',
  },
  selected: {
    position: 'absolute',
    top: 16,
    left: 16,
    opacity: 0.75,
  },
});

const initialState = { query: '' };

class LocationForm extends React.Component {
  constructor() {
    super();
    this.state = initialState;

    this.handleCloseLocation = this.handleCloseLocation.bind(this);
  }

  handleCloseLocation() {
    this.setState(initialState);
    this.props.onCloseLocation();
  }

  render() {
    const { query } = this.state;
    const { openLocation, email } = this.props;
    console.log('THIS IS EMAIL FROM LOCATION FORM:::', email);
    return (
      <Dialog open={openLocation} onClose={this.handleCloseLocation}>
        <DialogTitle id='simple-dialog'>
          Where would you like to eat?
          <br />
          <InputBase value={query} placeholder='Search Location...' />
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => createParty(email)}>
            Yes! This is where I want to eat
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default LocationForm;
