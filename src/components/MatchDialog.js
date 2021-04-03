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

class MatchDialog extends React.Component {
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

export default connect(mapState, null)(withStyles(styles)(MatchDialog));
