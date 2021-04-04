import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import statements Material-UI
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';

//icons
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import FastfoodIcon from '@material-ui/icons/Fastfood';

const styles = (theme) => ({
  body: {
    background: '#FFFFFF',
  },
  root: {
    marginTop: '50px',
    width: '90vw',
    maxWidth: '350px',
    fontFamily: 'avenir',
  },
  title: {
    color: '#888888',
  },
  cardStyle: {
    display: 'block',
    width: '100',
    height: '100',
  },
  address: {
    color: '#888888',
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
    marginLeft: '15px',
  },
  reviews: {
    display: 'flex',
    justifyContent: 'center',
    color: '#888888',
  },
});

class RestaurantDetails extends React.Component {
  render() {
    const { classes, restaurant, matchedRestaurant } = this.props;
    console.log('RESTAURANT', restaurant);

    const displayRestaurant = Object.keys(matchedRestaurant).length
      ? matchedRestaurant
      : restaurant;
    return (
      <Container className={classes.root}>
        <Card className={classes.cardStyle}>
          <CardHeader
            className={classes.title}
            title={displayRestaurant.name}
          />
          <CardMedia
            className={classes.media}
            image={displayRestaurant.image_url}
            title={displayRestaurant.alias}
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
                <p>
                  <strong>{displayRestaurant.price}</strong>
                </p>
                <p>
                  <strong>{displayRestaurant.location.address1}</strong>
                </p>
                <p>
                  <strong>{displayRestaurant.categories[0].title}</strong>
                </p>
                <p>
                  <strong>0.15 miles</strong>
                </p>
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
        <CardActions disableSpacing>
          <IconButton aria-label='back to main screen' component={Link} to='/'>
            <ArrowBackRoundedIcon />
          </IconButton>
          <IconButton aria-label='add to favorites'>
            <FavoriteIcon style={{ fill: '#FF85A6' }} />
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
});

export default connect(mapState)(withStyles(styles)(RestaurantDetails));
