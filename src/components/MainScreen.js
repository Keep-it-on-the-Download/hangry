import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';

import Controls from './content/Controls';

import { selectRestaurant } from '../reducers/selected';
import { unselectRestaurant } from '../reducers/unselected';
import { getInitialRestaurants, syncPointer } from '../reducers/restaurants';

import Deck from './content/Deck';
import MatchDialog from './MatchDialog';

const styles = (theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: '80vh',
  },
});

class MainScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    if (!this.props.inventory.length) {
      this.props.getInitialRestaurants(this.props.userId, this.props.partyRef);
    }
  }

  componentWillUnmount() {
    this.props.syncPointer(this.props.userId, this.props.partyRef);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { classes, inventory, foundMatch } = this.props;
    const cards = [...inventory].reverse();

    if (foundMatch && !this.state.open) {
      this.handleOpen();
    }

    return (
      <Container maxWidth='sm'>
        <Grid container>
          <Grid item xs={12} className={classes.container}>
            <Deck
              cards={cards}
              selectRestaurant={this.props.selectRestaurant}
              unselectRestaurant={this.props.unselectRestaurant}
            />
          </Grid>
          <Grid item xs={12} className={classes.buttonContainer}>
            <Controls />
          </Grid>
        </Grid>
        <MatchDialog open={this.state.open} onClose={this.handleClose} />
      </Container>
    );
  }
}

const mapState = (state) => ({
  inventory: state.restaurants.inventory,
  userId: state.user.data.email,
  partyRef: state.user.activeParty,
  foundMatch: state.restaurants.foundMatch,
});

const mapDispatch = (dispatch) => ({
  selectRestaurant: () => dispatch(selectRestaurant()),
  unselectRestaurant: () => dispatch(unselectRestaurant()),
  syncPointer: (userId, partyId) => dispatch(syncPointer(userId, partyId)),
  getInitialRestaurants: (userId, partyId) =>
    dispatch(getInitialRestaurants(userId, partyId)),
});

export default connect(mapState, mapDispatch)(withStyles(styles)(MainScreen));
