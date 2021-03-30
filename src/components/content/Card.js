import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Card as MaterialCard, CardMedia } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  cardContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: '85vw',
    maxHeight: '400px',
    width: '90vh',
    maxWidth: '500px',
  },
  cardImage: {
    height: '85vw',
    maxHeight: '400px',
    width: '90vh',
    maxWidth: '500px',
  },
  text: {
    position: 'absolute',
    bottom: '0.5px',
    left: '0.5px',
    fontFamily: 'avenir',
    fontSize: '35px',
    color: '#FFFFFF',
    fontWeight: 'bolder',
    fontStyle: 'italic',
    textAlign: 'left',
  },
  price: {
    marginTop: '5px',
    position: 'absolute',
    bottom: '0.5px',
    fontSize: '15px',
  },
}));

const Card = (props) => {
  const classes = useStyles();
  const { id, name, price, image_url } = props;
  return (
    <Container key={id} maxWidth='sm' className={classes.cardContainer}>
      <MaterialCard>
        <CardMedia
          component='img'
          className={classes.cardImage}
          src={image_url}
          alt='This should be pulled dynamically from the api, perhaps a description of the restaurant'
        />
      </MaterialCard>
      <div className={classes.text}>
        <p>{name}</p>
        <p className={classes.price}>{price}</p>
      </div>
    </Container>
  );
};

export default Card;
