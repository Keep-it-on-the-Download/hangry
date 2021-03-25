import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../reducers/user';
import { listenForRequests, getRequests } from '../reducers/friendRequests';

import { Link } from 'react-router-dom';

// Firebase imports
import { SignOut } from '../firebase/authentication';
import firebase from '../firebase';
import 'firebase/auth';

// Material-UI Components
import { withStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
  Typography,
  Avatar,
  IconButton,
  CircularProgress,
} from '@material-ui/core';

import Badge from '@material-ui/core/Badge';

// Material-UI Icons
import { Settings, Notifications } from '@material-ui/icons';

import FriendsList from './FriendsList';

const styles = (theme) => ({
  profile: {
    marginBottom: theme.spacing(3),
  },
  settings: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-start',
  },
  notifications: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
  },
  imageContainer: {
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center',
  },
  profileImage: {
    width: theme.spacing(13),
    height: theme.spacing(13),
  },
});

class Profile extends React.Component {
  componentDidMount() {
    const email = firebase.auth().currentUser.email;
    this.props.getUser(email);
    this.props.getRequests(email);
    this.props.listenForRequests(email);
  }

  render() {
    const { classes, user, userIsLoading, friendRequestCount } = this.props;

    return (
      <Container maxWidth='sm'>
        {!userIsLoading ? (
          <React.Fragment>
            <Grid container position='fixed' className={classes.profile}>
              <Grid item xs={6} className={classes.settings}>
                <IconButton>
                  <Settings />
                </IconButton>
              </Grid>
              <Grid item xs={6} className={classes.notifications}>
                <IconButton component={Link} to='/profile/notifications'>
                  <Badge badgeContent={friendRequestCount} color='primary'>
                    <Notifications />
                  </Badge>
                </IconButton>
              </Grid>
              <Grid item xs={12} className={classes.imageContainer}>
                <Avatar
                  alt='Name'
                  src={user.photoURL}
                  className={classes.profileImage}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography>{user.displayName}</Typography>
              </Grid>
              <Grid item xs={12}>
                <FriendsList id={user.email} />
              </Grid>
            </Grid>
            <SignOut />
          </React.Fragment>
        ) : (
          <CircularProgress />
        )}
      </Container>
    );
  }
}

const mapState = (state) => ({
  user: state.user.data,
  userIsLoading: state.user.isLoading,
  friends: state.friends.data,
  friendsAreLoading: state.friends.isLoading,
  friendRequestCount: state.friendRequests.count,
});

const mapDispatch = (dispatch) => ({
  getUser: (id) => dispatch(getUser(id)),
  getRequests: (id) => dispatch(getRequests(id)),
  listenForRequests: (id) => dispatch(listenForRequests(id)),
});

export default connect(mapState, mapDispatch)(withStyles(styles)(Profile));
