import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';

import Controls from './content/Controls';

import { selectRestaurant } from '../reducers/selected';
import { unselectRestaurant } from '../reducers/unselected';
import { getMoreRestaurants } from '../reducers/restaurants';

const styles = (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
});

class MainScreen extends React.Component {
  componentDidMount() {
    this.props.fetchMoreWorkers(10);
  }

  render() {
    const { classes, inventory } = this.props;

    return (
      <Container maxWidth='sm' className={classes.root}>
        <Grid container>
          <Grid item xs={12}>
            {/* <Deck /> */}
            <Controls />
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
  getMoreRestaurants: () => dispatch(getMoreRestaurants()),
});

export default connect(mapState, mapDispatch)(withStyles(styles)(MainScreen));
