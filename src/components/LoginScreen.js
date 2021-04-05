import React from 'react';

import { SignIn } from '../firebase/authentication';
import LoginForm from './LoginForm';
import SignUpScreen from './SignUpScreen';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Link from '@material-ui/core/Link';
import { Link as RouterLink } from 'react-router-dom';
import pizzaicon from './icon/pizzaicon.png';

const styles = (theme) => ({
  loginScreen: {
    marginTop: '30px',
  },
  login: {
    color: 'green',
  },
  loginOrCreate: {
    fontFamily: 'avenir',
  },
  google: {
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

class LoginScreen extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Container className={classes.loginScreen} maxWidth='sm'>
        <img className={classes.logo} alt='logo' src={pizzaicon} />
        <p className={classes.loginOrCreate}>
          Login below or{' '}
          <Link onClick={SignUpScreen} component={RouterLink} to='/signup'>
            Create An Account
          </Link>
        </p>

        <LoginForm />
        <div className={classes.google}>
          <SignIn />
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(LoginScreen);
