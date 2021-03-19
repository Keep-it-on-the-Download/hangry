import React from 'react';

import firebase from '../Firebase';
import 'firebase/auth';
import 'firebase/firestore';

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

// Temp Profile Pic
import AccountCircle from '@material-ui/icons/AccountCircle';

// Icons
import Settings from '@material-ui/icons/Settings';
import Notifications from '@material-ui/icons/Notifications';

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
  render() {
    const { classes } = this.props;
    const user = firebase.auth().currentUser;

    const db = firebase.firestore();
    const alanFriendsRef = db
      .collection('users')
      .doc('abielik')
      .collection('friends');

    console.log(('ALANSFRIENDSREF', alanFriendsRef));

    alanFriendsRef.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());

        const friendRef = db.doc(doc.data().ref.path);
        console.log('FriendRef', friendRef);

        friendRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              console.log('Document data:', doc.data());
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document!');
            }
          })
          .catch((error) => {
            console.log('Error getting document:', error);
          });
      });
    });

    // console.log('USER: ', user.displayName);
    // console.log('IMG: ', user.photoURL);
    return (
      <Container maxWidth='sm'>
        {user ? (
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
                {user.displayName}
              </Grid>
            </Grid>
            <List>
              <ListItem>Friends</ListItem>
              <Divider variant='fullWidth' component='li' />
              <ListItem>
                <ListItemAvatar>
                  <Avatar>
                    <AccountCircle />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary='First Last' secondary='Some info' />
              </ListItem>
            </List>
          </React.Fragment>
        ) : (
          <Typography variant='h1'>No User Found</Typography>
        )}
      </Container>
    );
  }
}

export default withStyles(styles)(Profile);
