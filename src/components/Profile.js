import React from 'react';

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
    return (
      <Container maxWidth='sm'>
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
            <Avatar alt='Name' className={classes.profileImage}>
              <AccountCircle />
            </Avatar>
          </Grid>
          <Grid item xs={12}>
            First Last
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
      </Container>
    );
  }
}

export default withStyles(styles)(Profile);
