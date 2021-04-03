import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import firebase from '../firebase';
import 'firebase/auth';
import 'firebase/firestore';

import { getUser, setActiveParty } from '../reducers/user';
import { getParties } from '../reducers/parties';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

class ActiveParties extends React.Component {
  componentDidMount() {
    const email = firebase.auth().currentUser.email;
    this.props.getUser(email);
    this.props.getParties(email);
  }

  render() {
    const { classes, parties } = this.props;

    return parties.map((party) => {
      const { foundMatch } = party.data();
      return (
        <Card className={classes.root} key={party.id}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Grid container>
                <Grid align='justify' item xs={9}>
                  <Typography
                    component='h6'
                    variant='h6'
                    className={classes.feast}
                  >
                    {`${foundMatch}`}
                  </Typography>
                </Grid>
                <Grid align='justify' item xs={3}>
                  <Button
                    className={classes.button}
                    variant='contained'
                    color='primary'
                    onClick={() => this.props.setActiveParty(party.ref.path)}
                    component={Link}
                    to='/'
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
        </Card>
      );
    });
  }
}

const mapState = (state) => ({
  user: state.user.data,
  userIsLoading: state.user.userIsLoading,
  parties: state.parties.data,
});

const mapDispatch = (dispatch) => ({
  getUser: (id) => dispatch(getUser(id)),
  setActiveParty: (id) => dispatch(setActiveParty(id)),
  getParties: (id) => dispatch(getParties(id)),
});

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(ActiveParties));
