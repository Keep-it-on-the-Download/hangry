import React from 'react';
import { SignOut } from '../firebase/authentication';
import { IconButton } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = (theme) => ({
  icon: {
    display: 'flex',
    justifyContent: 'left',
    fontSize: '20px',
  },
});

class Settings extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <div>
          <IconButton
            aria-label='Profile'
            className={classes.icon}
            component={Link}
            to='/profile'
          >
            <ArrowBackIosIcon />
            <Typography className={classes.icon}>Back to profile</Typography>
          </IconButton>
        </div>
        <div>
          <SignOut />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
