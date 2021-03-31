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
    maxWidth: 345,
    padding: '30px',
    font: 'Proxima',
  },
  cardStyle: {
    display: 'block',
    width: '100',
    height: '100',
  },
  title: {
    fontFamily: 'avenir',
  },
  address: {
    color: '#888888',
  },
  media: {
    // paddingTop: '56.25%', // 16:9
    paddingTop: '60%',
    width: '100%',
    height: '100%',
  },
  category: {
    color: '#888888',
    fontFamily: 'avenir',
  },
  content: {
    fontFamily: 'avenir',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  directions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
});

class RestaurantDetails extends React.Component {
  render() {
    const { classes, restaurant } = this.props;
    return (
      <Container className={classes.root}>
        <Card className={classes.cardStyle}>
          <CardHeader title={restaurant.name} />
          <CardMedia
            className={classes.media}
            image={restaurant.image_url}
            title={restaurant.alias}
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
                <p className={classes.content}>
                  <strong>{restaurant.price}</strong>
                </p>
                <p className={classes.content}>
                  <strong>{restaurant.location.address1}</strong>
                </p>
                <p className={classes.content}>
                  <strong>{restaurant.categories[0].title}</strong>
                </p>
                <p className={classes.content}>
                  <strong>0.15 miles</strong>
                </p>
              </Grid>
              <p align='justify'>
                Here is where the reviews widget will show up
              </p>
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
          <IconButton aria-label='Go to yelp'>
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
});

export default connect(mapState)(withStyles(styles)(RestaurantDetails));
