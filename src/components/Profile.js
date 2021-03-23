import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../reducers/user';
import { getFriends } from '../reducers/friends';

import firebase from '../firebase';
import 'firebase/auth';

import { SignOut } from '../firebase/authentication';

// import statements Material-UI
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Temp Profile Pic
import AccountCircle from '@material-ui/icons/AccountCircle';

// Icons
import Settings from '@material-ui/icons/Settings';
import Notifications from '@material-ui/icons/Notifications';

import InviteFriends from './InviteFriends';

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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    const email = firebase.auth().currentUser.email;
    this.props.getUser(email);
  }

  render() {
    const { classes, user, userIsLoading } = this.props;

    console.log('USER -->', user);
    console.log('USER IS LOADING -->', userIsLoading);

    return (
      <Container maxWidth='sm'>
        {!userIsLoading ? (
          <React.Fragment>
            <Grid container className={classes.profile}>
              <Grid item xs={6} className={classes.settings}>
                <IconButton>
                  <Settings />
                </IconButton>
              </Grid>
              <Grid item xs={6} className={classes.notifications}>
                <IconButton>
                  <Notifications />
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
            </Grid>
            <List>
              <ListItem className={classes.header}>
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
              <Divider variant='fullWidth' component='li' />
              {/* {user} */}
            </List>
          </React.Fragment>
        ) : (
          <Typography variant='h1'>No User Found</Typography>
        )}
        <SignOut />
        <InviteFriends open={this.state.open} onClose={this.handleClose} />
      </Container>
    );
  }
}

const mapState = (state) => ({
  user: state.user.data,
  userIsLoading: state.user.isLoading,
  friends: state.friends.data,
  friendsAreLoading: state.friends.isLoading,
});

const mapDispatch = (dispatch) => ({
  getUser: (id) => dispatch(getUser(id)),
  getFriends: (id) => dispatch(getFriends(id)),
});

export default connect(mapState, mapDispatch)(withStyles(styles)(Profile));
