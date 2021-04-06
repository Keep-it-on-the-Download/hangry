import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../reducers/user';
import { listenForFriendRequests } from '../reducers/friendRequests';
import { listenForPartyRequests } from '../reducers/partyRequests';
import { SignOut } from '../firebase/authentication';
import { Link } from 'react-router-dom';

// Firebase imports
import firebase from '../firebase';
import 'firebase/auth';
import 'firebase/firestore';

// Material-UI Components
import { withStyles } from '@material-ui/core/styles';
import {
  Container,
  Grid,
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
    position: 'sticky',
  },
  name: {
    fontFamily: 'arial-black',
    fontStyle: 'italic',
    color: '#731105',
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
    this.props.listenForFriendRequests(email);
    this.props.listenForPartyRequests(email);
  }

  render() {
    const {
      classes,
      user,
      userIsLoading,
      friendRequestCount,
      partyRequestCount,
    } = this.props;

    return (
      <Container maxWidth='sm'>
        {!userIsLoading ? (
          <React.Fragment>
            <Grid container>
              <Grid container className={classes.profile}>
                <Grid item xs={6} className={classes.settings}>
                  <SignOut />
                </Grid>
                <Grid item xs={6} className={classes.notifications}>
                  <IconButton component={Link} to='/notifications'>
                    <Badge
                      badgeContent={friendRequestCount + partyRequestCount}
                      color='primary'
                    >
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
                  <h2 className={classes.name}>
                    {user.displayName.toUpperCase()}
                  </h2>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FriendsList id={user.email} />
              </Grid>
            </Grid>
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
  membersAreLoading: state.partyRequests.isLoading,
  partyRequestCount: state.partyRequests.count,
});

const mapDispatch = (dispatch) => ({
  getUser: (id) => dispatch(getUser(id)),
  listenForFriendRequests: (id) => dispatch(listenForFriendRequests(id)),
  listenForPartyRequests: (partyId) =>
    dispatch(listenForPartyRequests(partyId)),
});

export default connect(mapState, mapDispatch)(withStyles(styles)(Profile));
