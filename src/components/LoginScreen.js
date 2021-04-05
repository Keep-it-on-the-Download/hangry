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
    // background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
    // backgroundSize: '1000% 1000%',
    // animation: 'gradient 15s ease infinite',
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
