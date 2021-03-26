import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectWorker, unselectWorker } from '../actions';

import { Close, Favorite } from '@material-ui/icons';

const Controls = (props) => {
  const handleLikeClick = () => {
    props.selectWorker();
  };
  const handleDislikeClick = () => {
    props.unselectWorker();
  };

  return (
    <div className='controls'>
      <div id='dislike' onClick={handleDislikeClick}>
        <Close />
      </div>
      <div id='like' onClick={handleLikeClick}>
        <Favorite />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      selectWorker,
      unselectWorker,
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(Controls);
