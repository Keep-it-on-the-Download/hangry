import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import firebase from '../firebase';
import 'firebase/auth';
import 'firebase/firestore';

import { getUser, setActiveParty } from '../reducers/user';
import { getParties } from '../reducers/parties';
import { clearMatch } from '../reducers/restaurants';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const styles = (theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20,
    width: '90vw',
    backgroundColor: '#f8f8ff',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
  },
  cover: {
    width: 151,
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    fontFamily: 'arial-black',
    color: theme.palette.primary.contrastText,
  },
  feast: {
    display: 'flex',
    fontDirection: 'row',
    justifyContent: 'flex-start',
    fontStyle: 'italic',
    fontFamily: 'arial-black',
    fontSize: '17px',
    color: '#731105',
  },
});

class ActiveParties extends React.Component {
  componentDidMount() {
    const email = firebase.auth().currentUser.email;
    this.props.getUser(email);
    this.props.getParties(email);
    this.props.clearMatch();
  }

  render() {
    const { classes, parties, titles } = this.props;

    return !parties.length ? (
      <h2>
        We know you're gettin hangry, but you don't have any active parties!
      </h2>
    ) : (
      parties.map((party, index) => {
        const { foundMatch } = party.data();
        console.log(foundMatch);

        return (
          <Container className={classes.container}>
            <Card className={classes.root} key={party.id}>
              <CardContent className={classes.content}>
                <Grid container>
                  <Grid item xs={9}>
                    <p className={classes.feast}>{`${titles[index]}`}</p>
                  </Grid>
                  <Grid className={classes.button} item xs={3}>
                    <Button
                      variant='contained'
                      color='primary'
                      onClick={() => this.props.setActiveParty(party.ref.path)}
                      component={Link}
                      to='/party'
                    >
                      <p className={classes.button}>SWIPE!</p>
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Container>
        );
      })
    );
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
  clearMatch: () => dispatch(clearMatch()),
});

export default connect(
  mapState,
  mapDispatch
)(withStyles(styles)(ActiveParties));
