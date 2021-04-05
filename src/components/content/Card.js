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
    marginTop: 15,
  },
  cardImage: {
    width: '90vw',
    maxWidth: '400px',
    height: '75vh',
    maxHeight: '700px',
    userDrag: 'none',
    userSelect: 'none',
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
      'linear-gradient(to bottom, rgba(0,0,0,0) 0.5%, rgba(0,0,0,0.85))',
    textDecoration: 'none',
  },
  name: {
    fontFamily: 'arial-black',
    fontStyle: 'italic',
    fontSize: '40px',
    marginBottom: '0px',
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
        <p className={classes.name}>{name}</p>
        <Typography className={classes.price}>{price}</Typography>
      </Box>
    </MaterialCard>
  );
};

export default Card;
