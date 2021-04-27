import React from 'react';
import { connect } from 'react-redux';

import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';

import CheckIcon from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';

import { handleFriendRequest } from '../reducers/friendRequests';

class FriendRequestList extends React.Component {
  handleFriendRequest = (myId, friendId, accepted) => () => {
    this.props.handleFriendRequest(myId, friendId, accepted);
  };

  render() {
    const { userId, friendRequests, friendRequestsAreLoading } = this.props;

    return (
      <React.Fragment>
        {!friendRequestsAreLoading &&
          (friendRequests.length ? (
            friendRequests.map((friendRequest) => {
              const friendId = friendRequest.id;
              return (
                <List>
                  <ListItem key={friendId}>
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText
                      primary={friendId}
                      secondary='Secondary text'
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge='end'
                        aria-label='accept'
                        onClick={this.handleFriendRequest(
                          userId,
                          friendId,
                          true
                        )}
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton
                        edge='end'
                        aria-label='reject'
                        onClick={this.handleFriendRequest(
                          userId,
                          friendId,
                          false
                        )}
                      >
                        <Close />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              );
            })
          ) : (
            <Typography>No Friend Requests At This Time!</Typography>
          ))}
      </React.Fragment>
    );
  }
}

const mapState = (state) => ({
  userId: state.user.data.email,
  friendRequests: state.friendRequests.data,
  friendRequestsAreLoading: state.friendRequests.isLoading,
});

const mapDispatch = (dispatch) => ({
  handleFriendRequest: (myId, friendId, accepted) =>
    dispatch(handleFriendRequest(myId, friendId, accepted)),
});

export default connect(mapState, mapDispatch)(FriendRequestList);
