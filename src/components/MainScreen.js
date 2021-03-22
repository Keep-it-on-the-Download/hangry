import React from 'react';
import {
  Container,
  IconButton,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Fab,
} from '@material-ui/core';
import { Close, Favorite, AddCircle } from '@material-ui/icons';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { getRestaurants } from '../reducers/restaurants';

const styles = (theme) => ({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
});

class MainScreen extends React.Component {
  componentDidMount() {
    // commented out for failing uncomment when working
    this.props.getRestaurants();
  }

  render() {
    const { classes, restaurants } = this.props;
    const businesses = restaurants.businesses || [];

    return (
      <React.Fragment>
        <Container maxWidth='sm'>
          {businesses.map((business) => (
            <Card key={business.id}>
              <CardMedia
                component='img'
                src={business.image_url}
                alt='This should be pulled dynamically from the api, perhaps a description of the restaurant'
              />
              <CardContent>
                <Typography>{business.name}</Typography>
                <Typography>{business.price}</Typography>
              </CardContent>
            </Card>
          ))}
        </Container>
        <Container maxWidth='md' className={classes.buttonContainer}>
          <Fab>
            <Close aria-label='Dislike' />
          </Fab>
          <Fab>
            <Favorite aria-label='Like' />
          </Fab>
        </Container>

        <Container maxWidth='sm' className={classes.buttonContainer}>
          <IconButton>
            <AddCircle />
            Decide with a friend
          </IconButton>
        </Container>
      </React.Fragment>
    );
  }
}

const mapState = (state) => ({
  restaurants: state.restaurants.data,
});

const mapDispatch = (dispatch) => ({
  getRestaurants: () => dispatch(getRestaurants()),
});

export default connect(mapState, mapDispatch)(withStyles(styles)(MainScreen));
