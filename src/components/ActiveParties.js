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
    justifyContent: 'center',
    position: 'relative',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    width: '90vw',
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
    justifyContent: 'center',
  },
  feast: {
    display: 'flex',
    fontDirection: 'row',
    justifyContent: 'flex-start',
    fontStyle: 'italic',
    fontFamily: 'arial-black',
    fontSize: '17px',
    color: '#FFFFFF',
    textShadow: '1px 1px #000000',
  },
});

class ActiveParties extends React.Component {
  componentDidMount() {
    const email = firebase.auth().currentUser.email;
    this.props.getUser(email);
    this.props.getParties(email);
  }

  render() {
    const { classes, parties, titles } = this.props;

    return parties.map((party, index) => {
      const { foundMatch } = party.data();
      console.log(foundMatch);

      return (
        <Card className={classes.root} key={party.id}>
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Grid container>
                <Grid item xs={9}>
                  <p className={classes.feast}>{`${titles[index]}`}</p>
                  {/* <Typography component='p' variant='h6'>
                    {`${titles[index]}`}
                  </Typography> */}
                </Grid>
                <Grid className={classes.button} item xs={3}>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={() => this.props.setActiveParty(party.ref.path)}
                    component={Link}
                    to='/party'
                  >
                    SWIPE!
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
  titles: state.parties.titles,
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
