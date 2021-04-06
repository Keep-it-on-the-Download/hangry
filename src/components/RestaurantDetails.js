import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// import statements Material-UI
import { withStyles } from '@material-ui/core/styles';
import {
  Container,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';

//icons
import IconButton from '@material-ui/core/IconButton';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import FastfoodIcon from '@material-ui/icons/Fastfood';

import { getDistance } from '../reducers/location';

const styles = (theme) => ({
  root: {
    marginTop: '35px',
    width: '93vw',
    fontFamily: 'avenir',
  },
  cardStyle: {
    width: '100',
    height: '100',
  },
  title: {
    fontStyle: 'italic',
  },
  media: {
    paddingTop: '60%',
    width: '100%',
    height: '100%',
  },
  category: {
    color: '#888888',
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  directions: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginLeft: '10px',
  },
  reviews: {
    display: 'flex',
    justifyContent: 'center',
    color: '#888888',
  },
  actions: {
    display: 'flex',
    justifyContent: 'center',
  },
});

class RestaurantDetails extends React.Component {
  constructor() {
    super();
    this.sendToMaps = this.sendToMaps.bind(this);
  }

  sendToMaps(destLongitude, destLatitude) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { longitude, latitude } = position.coords;
      window.open(
        `https://www.google.com/maps/dir/?api=1&origin=${latitude}, ${longitude}&destination=${destLatitude}, ${destLongitude}`,
        '_blank'
      );
    });
  }

  render() {
    const { classes, restaurant, matchedRestaurant, distance } = this.props;

    const displayRestaurant = Object.keys(matchedRestaurant).length
      ? matchedRestaurant
      : restaurant;

    console.log(displayRestaurant);

    const {
      name,
      image_url,
      alias,
      price,
      location,
      categories,
      coordinates,
    } = displayRestaurant;

    this.props.getDistanceTo(coordinates);

    const { longitude, latitude } = coordinates;

    return (
      <Container className={classes.root}>
        <Card className={classes.cardStyle}>
          <CardHeader className={classes.title} title={name} />
          <CardMedia
            className={classes.media}
            image={image_url}
            title={alias}
          />
          <CardContent>
            <Grid container>
              <Grid align='justify' item xs={4}>
                <p className={classes.category}>Price:</p>
                <p className={classes.category}>Address:</p>
                <p className={classes.category}>Cuisine:</p>
                <p className={classes.category}>Distance:</p>
              </Grid>
              <Grid align='justify' item xs={8}>
                {price ? (
                  <p>
                    <strong>{price}</strong>
                  </p>
                ) : (
                  <p>
                    <strong>N/A</strong>
                  </p>
                )}
                {location.address1 ? (
                  <p>
                    <strong>{location.address1}</strong>
                  </p>
                ) : (
                  <p>
                    <strong>N/A</strong>
                  </p>
                )}
                {categories[0].title ? (
                  <p>
                    <strong>{categories[0].title}</strong>
                  </p>
                ) : (
                  <p>
                    <strong>N/A</strong>
                  </p>
                )}
                {distance ? (
                  <p>
                    <strong>{`${distance} miles`}</strong>
                  </p>
                ) : (
                  <p>
                    <strong>N/A</strong>
                  </p>
                )}
              </Grid>
            </Grid>
            <Grid className={classes.reviews}>
              <Rating
                name='read-only size-medium'
                precision={0.5}
                value={displayRestaurant.rating}
                readOnly
              />
            </Grid>
            <Grid className={classes.reviews}>
              <p>({displayRestaurant.review_count} reviews)</p>
            </Grid>
          </CardContent>
        </Card>
        <CardActions className={classes.actions} disableSpacing>
          <IconButton
            aria-label='back to main screen'
            component={Link}
            to='/party'
          >
            <ArrowBackRoundedIcon />
          </IconButton>
          <IconButton
            aria-label='Go to yelp'
            onClick={() => window.open(displayRestaurant.url, '_blank')}
          >
            <FastfoodIcon style={{ fill: '#FF9E30' }} />
          </IconButton>
          <Button
            className={classes.directions}
            variant='contained'
            color='primary'
            onClick={() => this.sendToMaps(longitude, latitude)}
          >
            Directions
          </Button>
        </CardActions>
      </Container>
    );
  }
}

const mapState = (state) => ({
  restaurant: state.restaurants.inventory[0],
  matchedRestaurant: state.restaurants.matchedRestaurant,
  distance: state.location.distance,
});

const mapDispatch = (dispatch) => ({
  getDistanceTo: (destination) => dispatch(getDistance(destination)),
});

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(RestaurantDetails));
