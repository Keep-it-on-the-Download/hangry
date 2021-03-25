import React from 'react';
import { connect } from 'react-redux';

import { fade, withStyles } from '@material-ui/core/styles';

import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import InputBase from '@material-ui/core/InputBase';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import Button from '@material-ui/core/Button';

import SearchIcon from '@material-ui/icons/Search';
import CheckIcon from '@material-ui/icons/Check';

import { findUsers, clearResults } from '../reducers/searchResult';
import { sendRequest } from '../reducers/friendRequests';

const styles = (theme) => ({
  search: {
    padding: theme.spacing(0, 2),
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.primary.main, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '90%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  listText: {
    margin: theme.spacing(2),
    textAlign: 'center',
  },
  selected: {
    position: 'absolute',
    top: 16,
    left: 16,
    opacity: 0.75,
  },
});

const initialState = { query: '', selection: [] };

class InviteFriends extends React.Component {
  constructor() {
    super();
    this.state = initialState;

    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleClose() {
    this.setState(initialState);
    this.props.clearResults();
    this.props.onClose();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    this.conditonallyFindUsers();
  }

  conditonallyFindUsers() {
    if (this.state.query.length >= 2) {
      this.props.findUsers(this.state.query);
    }
  }

  handleSelect(user) {
    this.state.selection.indexOf(user) >= 0
      ? this.setState({
          selection: this.state.selection.filter(
            (selected) => selected !== user
          ),
        })
      : this.setState({ selection: [...this.state.selection, user] });
  }

  handleSubmit() {
    // if selection is empty send error message
    this.state.selection.forEach((user) => {
      this.props.sendRequest(this.props.id, user.email);
    });
    this.handleClose();
  }

  render() {
    const { query, selection } = this.state;
    const { classes, open, searchResult, resultsLoading } = this.props;

    console.log('SELECTION: ', selection);

    return (
      <Dialog
        onClose={this.handleClose}
        aria-labelledby='simple-dialog-title'
        open={open}
        scroll='paper'
      >
        <DialogTitle>
          Find your friends
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              value={query}
              name='query'
              onChange={this.handleChange}
              autoComplete='off'
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <List>
            {!resultsLoading && searchResult.length ? (
              searchResult.map((user) => {
                const selected = this.state.selection.includes(user);
                return (
                  <ListItem
                    button
                    onClick={() => this.handleSelect(user)}
                    key={user.id}
                  >
                    <ListItemAvatar>
                      <Avatar alt={user.displayName} src={user.photoURL} />
                      {selected ? (
                        <Avatar className={classes.selected}>
                          <CheckIcon />
                        </Avatar>
                      ) : (
                        ''
                      )}
                    </ListItemAvatar>
                    <ListItemText
                      primary={`${user.displayName}`}
                      secondary='Some info'
                    />
                  </ListItem>
                );
              })
            ) : (
              <Typography className={classes.listText}>
                No ones here!
              </Typography>
            )}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            variant='contained'
            color='primary'
            onClick={this.handleSubmit}
          >
            Send Request
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const mapState = (state) => {
  return {
    searchResult: state.searchResult.data,
    resultsLoading: state.searchResult.isLoading,
  };
};

const mapDispatch = (dispatch) => {
  return {
    findUsers: (query) => dispatch(findUsers(query)),
    clearResults: () => dispatch(clearResults()),
    sendRequest: (id, user) => dispatch(sendRequest(id, user)),
  };
};

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(InviteFriends));
