import React from 'react';

import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';

import CheckIcon from '@material-ui/icons/Check';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import { acceptRequest } from '../reducers/friendRequests';

class Notifications extends React.Component {
  handleFriendRequest = (myId, friendId) => () => {
    this.props.acceptFriendRequest(myId, friendId);
  };

  render() {
    const { userId, friendRequests, friendRequestsAreLoading } = this.props;

    console.log('FRIEND REQUESTS: ', friendRequests);

    return (
      <List>
        {!friendRequestsAreLoading &&
          friendRequests.length &&
          friendRequests.map((friendRequest) => {
            const friendId = friendRequest.id;
            console.log('FRIEND ID: ', friendId);
            return (
              <ListItem>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText primary={friendId} secondary='Secondary text' />
                <ListItemSecondaryAction>
                  <IconButton
                    edge='end'
                    aria-label='accept'
                    onClick={this.handleFriendRequest(userId, friendId)}
                  >
                    <CheckIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
      </List>
    );
  }
}

const mapState = (state) => ({
  userId: state.user.data.email,
  friendRequests: state.friendRequests.data,
  friendRequestsAreLoading: state.friendRequests.isLoading,
});

const mapDispatch = (dispatch) => ({
  acceptFriendRequest: (myId, friendId) =>
    dispatch(acceptRequest(myId, friendId)),
});

export default connect(mapState, mapDispatch)(Notifications);
