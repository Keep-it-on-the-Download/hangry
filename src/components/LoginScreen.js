import React from 'react';

import { SignIn } from '../firebase/authentication';
import LoginForm from './LoginForm';
import SignUp from './SignUp';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

const styles = (theme) => ({
  login: {
    color: 'green',
  },
});

class LoginScreen extends React.Component {
  render() {
    //const { classes } = this.props;

    return (
      <Container maxWidth='sm'>
        <p>
          Login below or{' '}
          <Link href='/signup' onClick={SignUp}>
            Create An Account
          </Link>
        </p>

        <LoginForm />

        <SignIn />
      </Container>
    );
  }
}

export default withStyles(styles)(LoginScreen);
