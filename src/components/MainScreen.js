import React from 'react';
import {
  Container,
  // IconButton,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Fab,
} from '@material-ui/core';
import { Close, Favorite } from '@material-ui/icons';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { getRestaurants } from '../reducers/restaurants';

const styles = (theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: '75vh',
  },
  cardContainer: {
    position: 'absolute',
    marginTop: '10vh',
    maxHeight: '450px',
    maxWidth: '350px',
  },
  dislike: {
    marginRight: '3vh',
  },
  like: {
    marginLeft: '3vh',
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
        <Container maxWidth='sm' className={classes.container}>
          {businesses.map((business) => (
            <Card key={business.id} className={classes.cardContainer}>
              <CardMedia
                component='img'
                src={business.image_url}
                alt='This should be pulled dynamically from the api, perhaps a description of the restaurant'
                style={{ width: '300px', height: '350px' }}
              />
              <CardContent>
                <Typography>{business.name}</Typography>
                <Typography>{business.price}</Typography>
              </CardContent>
            </Card>
          ))}
        </Container>
        <Container maxWidth='md' className={classes.buttonContainer}>
          <Fab className={classes.dislike} style={{ fill: 'white' }}>
            <Close aria-label='Dislike' style={{ fill: '#A2BFE4' }} />
          </Fab>
          <Fab className={classes.like}>
            <Favorite aria-label='Like' style={{ fill: '#FF919B' }} />
          </Fab>
        </Container>
        {/* assuming we will keep track of friendAdded variable */}
        {/* {friendAdded && <Container maxWidth='md' className={props.classes.addFriend}>
        <IconButton>
          <AddCircle />
          Decide with a friend
        </IconButton>
      </Container>} */}
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
