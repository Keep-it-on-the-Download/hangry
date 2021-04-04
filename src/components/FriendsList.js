import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import {
  Avatar,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
} from '@material-ui/core';

import Fastfood from '@material-ui/icons/Fastfood';

import InviteFriends from './InviteFriends';

import { getFriends } from '../reducers/friends';
import { createParty } from '../firebase/firestoreParty';

const styles = (theme) => ({
  listContainer: {
    maxHeight: '36vh',
    overflow: 'auto',
  },
  listHeader: {
    display: 'flex',
    justifyContent: 'space-between',
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
    this.props.getFriends(this.props.id);
  }

  render() {
    const { classes, friends, friendsAreLoading, id } = this.props;

    return (
      <React.Fragment>
        <List>
          <ListItem className={classes.listHeader}>
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
          <Divider
            variant='fullWidth'
            component='li'
            className={classes.listDivider}
          />
        </List>
        <List className={classes.listContainer}>
          {!friendsAreLoading ? (
            friends.length ? (
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
                      <IconButton
                        edge='end'
                        aria-label='create party'
                        onClick={() => createParty(email)}
                      >
                        <Fastfood />
                        Start party
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })
            ) : (
              <Typography className={classes.listText} key='empty text'>
                Major Oof, you don't have any friends
              </Typography>
            )
          ) : (
            <CircularProgress />
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
