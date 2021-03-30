import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { createParty } from '../firebase/firestoreParty';
import { Container, Grid, IconButton } from '@material-ui/core';

import Controls from './content/Controls';

import { selectRestaurant } from '../reducers/selected';
import { unselectRestaurant } from '../reducers/unselected';
import { getInitialRestaurants } from '../reducers/restaurants';
import { AddCircle } from '@material-ui/icons';

import Deck from './content/Deck';

const styles = (theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
});

class MainScreen extends React.Component {
  componentDidMount() {
    if (!this.props.inventory.length) {
      this.props.getInitialRestaurants();
    }
  }

  render() {
    const { classes, inventory } = this.props;
    const cards = [...inventory].reverse();

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
          <Grid item xs={12} className={classes.container}>
            <Controls />
          </Grid>
          <Grid>
            <IconButton onClick={createParty}>
              <AddCircle />
              Decide with a friend
            </IconButton>
          </Grid>
        </Grid>
      </Container>
    );
  }
}

const mapState = (state) => ({
  inventory: state.restaurants.inventory,
});

const mapDispatch = (dispatch) => ({
  selectRestaurant: () => dispatch(selectRestaurant()),
  unselectRestaurant: () => dispatch(unselectRestaurant()),
  getInitialRestaurants: () => dispatch(getInitialRestaurants()),
});

export default connect(mapState, mapDispatch)(withStyles(styles)(MainScreen));
