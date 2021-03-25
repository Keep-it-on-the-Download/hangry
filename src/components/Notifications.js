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
  render() {
    const { friendRequests, friendRequestsAreLoading } = this.props;

    console.log('FRIEND REQUESTS: ', friendRequests);

    return (
      <List>
        {!friendRequestsAreLoading &&
          friendRequests.length &&
          friendRequests.map((friendRequest) => {
            return (
              <ListItem>
                <ListItemAvatar>
                  <Avatar />
                </ListItemAvatar>
                <ListItemText
                  primary={friendRequest.id}
                  secondary='Secondary text'
                />
                <ListItemSecondaryAction>
                  <IconButton edge='end' aria-label='delete'>
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
  friendRequests: state.friendRequests.data,
  friendRequestsAreLoading: state.friendRequests.isLoading,
});

const mapDispatch = (dispatch) => ({
  acceptFriendRequest: (id) => dispatch(acceptRequest(id)),
});

export default connect(mapState, mapDispatch)(Notifications);
