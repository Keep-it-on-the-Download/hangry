import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import firebase from '../firebase';
import 'firebase/auth';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Fastfood from '@material-ui/icons/Fastfood';

import InviteFriends from './InviteFriends';

import { getFriends } from '../reducers/friends';

import LocationForm from './LocationForm';

const styles = (theme) => ({
  listHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'sticky',
  },
  listText: {
    margin: theme.spacing(2),
  },
});

class FriendsList extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      openLocation: false,
      selectedFriendId: '',
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.handleOpenLocation = this.handleOpenLocation.bind(this);
    this.handleCloseLocation = this.handleCloseLocation.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  handleOpenLocation(friendId) {
    console.log('PRESSED HANDLE OPEN LOCATION 11111');
    this.setState({ openLocation: true, selectedFriendId: friendId });
    console.log('PRESSED HANDLE OPEN LOCATION 22222');
    console.log('THIS IS FRIEND ID IN HANDLE OPEN LOCATION', friendId);
  }

  handleCloseLocation() {
    this.setState({ openLocation: false });
  }

  componentDidMount() {
    const email = firebase.auth().currentUser.email;
    this.props.getFriends(email);
  }

  render() {
    const { classes, friends, friendsAreLoading, id } = this.props;
    console.log('FRIENDS ????::::', friends);

    return (
      <React.Fragment>
        <List>
          <ListItem id='header' className={classes.listHeader} key='header'>
            <Typography>Friends</Typography>
            <Button
              variant='contained'
              size='small'
              color='primary'
              onClick={this.handleOpen}
            >
              Add Friends
            </Button>
          </ListItem>
          <Divider variant='fullWidth' component='li' key='divider' />
          {!friendsAreLoading && friends.length ? (
            friends.map((friend) => {
              const { email, photoURL, displayName } = friend.data();
              return (
                <ListItem key={email}>
                  <ListItemAvatar>
                    <Avatar alt={displayName} src={photoURL} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${displayName}`}
                    secondary='Some info'
                  />
                  <ListItemSecondaryAction>
                    {/* <IconButton
                      edge='end'
                      aria-label='create party'
                      onClick={() => createParty(email)}
                    >
                      <Fastfood />
                      Start party
                    </IconButton> */}
                    <Button
                      variant='contained'
                      size='small'
                      color='primary'
                      onClick={() => this.handleOpenLocation(email)}
                    >
                      START PARTY!!
                    </Button>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })
          ) : (
            <Typography className={classes.listText} key='empty text'>
              Major Oof, you don't have any friends
            </Typography>
          )}
        </List>
        <InviteFriends
          id={id}
          open={this.state.open}
          onClose={this.handleClose}
        />
        <LocationForm
          email={this.state.selectedFriendId}
          openLocation={this.state.openLocation}
          onCloseLocation={this.handleCloseLocation}
        />
      </React.Fragment>
    );
  }
}

const mapState = (state) => ({
  friends: state.friends.data,
  friendsAreLoading: state.friends.isLoading,
});

const mapDispatch = (dispatch) => ({
  getFriends: (id) => dispatch(getFriends(id)),
});

export default connect(mapState, mapDispatch)(withStyles(styles)(FriendsList));
