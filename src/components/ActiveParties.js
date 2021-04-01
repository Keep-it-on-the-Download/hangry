import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// import List from '@material-ui/core/List';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItem from '@material-ui/core/ListItem';
// import ListItemText from '@material-ui/core/ListItemText';
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import firebase from '../firebase';
import 'firebase/auth';
import 'firebase/firestore';

import { getUser } from '../reducers/user';
import { connect } from 'react-redux';

const styles = (theme) => ({
  root: {
    display: 'flex',
    marginTop: '20px',
    backgroundColor: '#FBF3F0',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  button: {
    display: 'flex',
    alignContent: 'flex-end',
    width: 200,
    marginTop: '5px',
  },
  feast: {
    fontStyle: 'bold',
  },
});

const dummy = [{ friend: 'Alan' }, { friend: 'Charles' }, { friend: 'Jason' }];

class ActiveParties extends React.Component {
  componentDidMount() {
    const email = firebase.auth().currentUser.email;

    this.props.getUser(email);
  }

  render() {
    const { classes, user } = this.props;

    console.log('PROPS FROM ACTIVE PARTIES', this.props);
    console.log('USERSSSS', user);

    return dummy.map((party) => {
      return (
        <Card className={classes.root}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Grid container>
                <Grid align='justify' item xs={9}>
                  <Typography
                    component='h6'
                    variant='h6'
                    className={classes.feast}
                  >
                    Feast with {party.friend}
                  </Typography>
                </Grid>
                <Grid align='justify' item xs={3}>
                  <Button
                    className={classes.button}
                    variant='contained'
                    color='primary'
                  >
                    Start Swiping
                  </Button>
                  <Button
                    className={classes.button}
                    variant='contained'
                    color='primary'
                  >
                    Edit Preferences
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </div>
          <CardMedia
            className={classes.cover}
            image='/static/images/cards/live-from-space.jpg'
            title='Live from space album cover'
          />
        </Card>
      );
    });
  }
}

const mapState = (state) => ({
  user: state.user.data,
  userIsLoading: state.user.userIsLoading,
});

const mapDispatch = (dispatch) => ({
  getUser: (id) => dispatch(getUser(id)),
});

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(ActiveParties));
