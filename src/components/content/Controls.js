import React from 'react';
import { connect } from 'react-redux';

import { selectRestaurant } from '../../reducers/selected';
import { unselectRestaurant } from '../../reducers/unselected';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import { Close, Favorite } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  dislike: {
    marginRight: '6vh',
    boxShadow: 'none',
  },
  like: {
    marginLeft: '6vh',
    boxShadow: 'none',
    color: '#ff817b',
  },
}));

const Controls = (props) => {
  const classes = useStyles();

  const handleLikeClick = () => {
    props.selectRestaurant();
  };

  const handleDislikeClick = () => {
    props.unselectRestaurant();
  };

  return (
    <React.Fragment>
      <Fab
        id='dislike'
        onClick={handleDislikeClick}
        className={classes.dislike}
      >
        <Close fontSize='large' aria-label='Dislike' />
      </Fab>
      <Fab id='like' onClick={handleLikeClick} className={classes.like}>
        <Favorite fontSize='large' aria-label='Like' />
      </Fab>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  selectRestaurant: () => dispatch(selectRestaurant()),
  unselectRestaurant: () => dispatch(unselectRestaurant()),
});

export default connect(null, mapDispatchToProps)(Controls);
