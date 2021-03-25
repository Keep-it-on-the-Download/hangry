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

import InviteFriends from './InviteFriends';

import { getFriends } from '../reducers/friends';

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
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  componentDidMount() {
    const email = firebase.auth().currentUser.email;
    this.props.getFriends(email);
  }

  render() {
    const { classes, friends, friendsAreLoading, id } = this.props;

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
