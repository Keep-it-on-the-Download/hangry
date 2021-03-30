import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import {
  Box,
  Card as MaterialCard,
  CardMedia,
  Typography,
} from '@material-ui/core';

import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    marginTop: 10,
  },
  cardImage: {
    width: '90vw',
    maxWidth: '400px',
    height: '80vh',
    maxHeight: '700px',
  },
  text: {
    position: 'absolute',
    width: '100%',
    bottom: '0.5px',
    left: '0.5px',
    color: '#FFFFFF',
    fontWeight: 'bolder',
    fontStyle: 'italic',
    textAlign: 'left',
    background:
      'linear-gradient(to bottom, rgba(0,0,0,0) 0.5%, rgba(0,0,0,0.75))',
    textDecoration: 'none',
  },
  price: {
    marginTop: '5px',
  },
}));

const Card = (props) => {
  const classes = useStyles();
  const { name, price, image_url } = props;
  return (
    <MaterialCard className={classes.cardContainer}>
      <CardMedia
        component='img'
        className={classes.cardImage}
        src={image_url}
        alt='This should be pulled dynamically from the api, perhaps a description of the restaurant'
      />
      <Box className={classes.text} component={Link} to={'/restaurantDetails'}>
        <Typography variant='h3'>{name}</Typography>
        <Typography className={classes.price}>{price}</Typography>
      </Box>
    </MaterialCard>
  );
};

export default Card;
