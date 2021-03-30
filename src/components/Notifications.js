import React from 'react';

import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import CheckIcon from '@material-ui/icons/Check';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import { acceptRequest } from '../reducers/friendRequests';
import { acceptPartyRequest } from '../reducers/partyRequests';

class Notifications extends React.Component {
  handleFriendRequest = (myId, friendId) => () => {
    this.props.acceptFriendRequest(myId, friendId);
  };
  handlePartyRequest = (partyId, memberId) => () => {
    this.props.acceptPartyRequest(partyId, memberId);
  };

  render() {
    const {
      userId,
      friendRequests,
      friendRequestsAreLoading,
      partyRequestsAreLoading,
      partyRequests,
    } = this.props;

    console.log('this.props: ', this.props);
    console.log('FRIEND REQUESTS: ', friendRequests);
    console.log('loading? ', partyRequestsAreLoading);
    console.log('FR loading??? ', friendRequestsAreLoading);
    console.log('partyRequests:: ', partyRequests);

    return (
      <div>
        <List>
          {!partyRequestsAreLoading &&
            (partyRequests.length ? (
              partyRequests.map((partyRequest) => {
                const partyId = partyRequest.id;
                console.log('partyId: ', partyId);
                console.log('userId IN NOTIFS', userId);
                return (
                  <ListItem key={partyId}>
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText
                      primary={partyId}
                      secondary='Secondary text'
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge='end'
                        aria-label='accept'
                        onClick={this.handlePartyRequest(partyId, userId)}
                      >
                        <CheckIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })
            ) : (
              <Typography>No Party Requests At This Time!</Typography>
            ))}
        </List>
        <List>
          {!friendRequestsAreLoading &&
            (friendRequests.length ? (
              friendRequests.map((friendRequest) => {
                const friendId = friendRequest.id;
                console.log('FRIEND ID: ', friendId);
                return (
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
                        onClick={this.handleFriendRequest(userId, friendId)}
                      >
                        <CheckIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })
            ) : (
              <Typography>No Friend Requests At This Time!</Typography>
            ))}
        </List>
      </div>
    );
  }
}

const mapState = (state) => ({
  userId: state.user.data.email,
  friendRequests: state.friendRequests.data,
  friendRequestsAreLoading: state.friendRequests.isLoading,

  partyRequests: state.partyRequests.data,
  partyRequestsAreLoading: state.partyRequests.isLoading,
});

const mapDispatch = (dispatch) => ({
  acceptFriendRequest: (myId, friendId) =>
    dispatch(acceptRequest(myId, friendId)),
  acceptPartyRequest: (partyId, memberId) =>
    dispatch(acceptPartyRequest(partyId, memberId)),
});

export default connect(mapState, mapDispatch)(Notifications);
