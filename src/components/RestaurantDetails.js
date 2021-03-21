import React from 'react';
import { Link } from 'react-router-dom';
// import statements Material-UI
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import Typography from '@material-ui/core/Typography';
// import { sizing } from '@material-ui/system';
// import { spacing } from '@material-ui/system';
// // import Card from '@material-ui/core/Card';
// import { makeStyles } from '@material-ui/core/styles';
// import clsx from 'clsx';
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
    const { classes } = this.props;
    return (
      <body className={classes.body}>
        <Container className={classes.root} maxWidthLg>
          <Card className={classes.cardStyle}>
            <CardHeader title='Poke Parlor' />
            <CardMedia
              className={classes.media}
              image='https://raster-static.postmates.com/?url=com.postmates.img.prod.s3.amazonaws.com/a8bf805d-1aff-4863-82ee-bfdac151f41e/orig.jpg&quality=90&w=1500&h=900&mode=crop&format=jpg&v=4'
              title='Paella dish'
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
                    <strong>$</strong>
                  </p>
                  <p className={classes.content}>
                    <strong>2485 Telegraph Ave</strong>
                  </p>
                  <p className={classes.content}>
                    <strong>Hawaiian</strong>
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
            <IconButton
              aria-label='back to main screen'
              component={Link}
              to='/'
            >
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
      </body>
    );
  }
}

export default withStyles(styles)(RestaurantDetails);
