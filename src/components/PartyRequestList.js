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

import { handlePartyRequest } from '../reducers/partyRequests';

class PartyRequestList extends React.Component {
  handlePartyRequest = (myId, partyId, accepted) => () => {
    this.props.handlePartyRequest(myId, partyId, accepted);
  };

  render() {
    const { userId, partyRequests, partyRequestsAreLoading } = this.props;

    return (
      <React.Fragment>
        {!partyRequestsAreLoading &&
          (partyRequests.length ? (
            partyRequests.map((partyRequest) => {
              const partyId = partyRequest.id;
              return (
                <List>
                  <ListItem key={partyId}>
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText
                      primary={partyRequest.data().partyName}
                      secondary={partyId}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge='end'
                        aria-label='accept'
                        onClick={this.handlePartyRequest(userId, partyId, true)}
                      >
                        <CheckIcon />
                      </IconButton>
                      <IconButton
                        edge='end'
                        aria-label='reject'
                        onClick={this.handlePartyRequest(
                          userId,
                          partyId,
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
            <Typography>No Party Requests At This Time!</Typography>
          ))}
      </React.Fragment>
    );
  }
}

const mapState = (state) => ({
  userId: state.user.data.email,
  partyRequests: state.partyRequests.data,
  partyRequestsAreLoading: state.partyRequests.isLoading,
});

const mapDispatch = (dispatch) => ({
  handlePartyRequest: (myId, partyId, accepted) =>
    dispatch(handlePartyRequest(myId, partyId, accepted)),
});

export default connect(mapState, mapDispatch)(PartyRequestList);
