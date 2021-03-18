import React from 'react';

// import statements Material-UI
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

// Temp Profile Pic
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = (theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  profileImage: {
    width: theme.spacing(11),
    height: theme.spacing(11),
  },
});

class Profile extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Container maxWidth='sm' className={classes.root}>
        <Avatar alt='Name' className={classes.profileImage}>
          <AccountCircle />
        </Avatar>
      </Container>
    );
  }
}

export default withStyles(styles)(Profile);
