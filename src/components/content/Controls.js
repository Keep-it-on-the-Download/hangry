import React from 'react';
import { connect } from 'react-redux';

import { selectRestaurant } from '../../reducers/selected';
import { unselectRestaurant } from '../../reducers/unselected';

import Fab from '@material-ui/core/Fab';
import { Close, Favorite } from '@material-ui/icons';

const Controls = (props) => {
  const handleLikeClick = () => {
    props.selectWorker();
  };

  const handleDislikeClick = () => {
    props.unselectWorker();
  };

  return (
    <React.Fragment>
      <Fab color='primary' id='dislike' onClick={handleDislikeClick}>
        <Close aria-label='Dislike' />
      </Fab>
      <Fab color='primary' id='like' onClick={handleLikeClick}>
        <Favorite aria-label='Like' />
      </Fab>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => ({
  selectRestaurant: () => dispatch(selectRestaurant()),
  unselectRestaurant: () => dispatch(unselectRestaurant()),
});

export default connect(null, mapDispatchToProps)(Controls);
