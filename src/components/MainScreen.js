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
  container: {
    display: 'flex',
    justifyContent: 'between',
  },
  icon: {
    flexGrow: 1,
  },
});

class MainScreen extends React.Component {
  componentDidMount() {
    this.props.getRestaurants();
    console.log('RESTAURANTS -->', this.props.restaurants);
  }
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Container maxWidth='md'>
          <Card>
            <CardMedia
              component='img'
              src='https://s3-media2.fl.yelpcdn.com/bphoto/CPc91bGzKBe95aM5edjhhQ/o.jpg'
            />
            <CardContent>
              <Typography>Name</Typography>
              <Typography>Price</Typography>
            </CardContent>
          </Card>
        </Container>
        <Container maxWidth='md'>
          <Fab>
            <Close />
          </Fab>
          <Fab>
            <Favorite />
          </Fab>
        </Container>

        <Container maxWidth='sm'>
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
