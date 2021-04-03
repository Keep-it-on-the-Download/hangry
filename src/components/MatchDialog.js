import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import Button from '@material-ui/core/Button';

const styles = (theme) => ({});

const initialState = { query: '', selection: [] };

class MatchDialog extends React.Component {
  constructor() {
    super();
    this.state = initialState;

    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClose() {
    this.setState(initialState);
    this.props.onClose();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { open, matchedRestaurant } = this.props;

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby='simple-dialog-title'
        open={open}
        scroll='paper'
      >
        <DialogTitle>It's A Match!</DialogTitle>
        <DialogContent>{matchedRestaurant.name}</DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='primary'
            component={Link}
            to='/restaurantDetails'
          >
            Go To Restaurant
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapState = (state) => {
  return {
    matchedRestaurant: state.restaurants.matchedRestaurant,
  };
};

const mapDispatch = (dispatch) => {
  return {};
};

export default connect(mapState, mapDispatch)(withStyles(styles)(MatchDialog));
