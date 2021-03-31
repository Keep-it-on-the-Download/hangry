import React from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import CheckIcon from '@material-ui/icons/Check';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import { acceptRequest } from '../reducers/friendRequests';
import { acceptPartyRequest } from '../reducers/partyRequests';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const styles = (theme) => ({
  root: {
    backgroundColor: '#F7F6F4',
  },
});

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }
  handleFriendRequest = (myId, friendId) => () => {
    this.props.acceptFriendRequest(myId, friendId);
  };
  handlePartyRequest = (partyId, memberId) => () => {
    this.props.acceptPartyRequest(partyId, memberId);
  };
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    const {
      userId,
      friendRequests,
      friendRequestsAreLoading,
      partyRequestsAreLoading,
      partyRequests,
    } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position='static' color='default'>
          <Tabs
            value={value}
            onChange={this.handleChange}
            variant='fullWidth'
            aria-label='notifications'
          >
            <Tab label='party requests' {...a11yProps(0)} />
            <Tab label='friend requests' {...a11yProps(1)} />
          </Tabs>
        </AppBar>

        <TabPanel value={value} index={0}>
          <List>
            {!partyRequestsAreLoading &&
              (partyRequests.length ? (
                partyRequests.map((partyRequest) => {
                  const partyId = partyRequest.id;
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
        </TabPanel>
        <TabPanel value={value} index={1}>
          <List>
            {!friendRequestsAreLoading &&
              (friendRequests.length ? (
                friendRequests.map((friendRequest) => {
                  const friendId = friendRequest.id;
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
        </TabPanel>
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

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(Notifications));
