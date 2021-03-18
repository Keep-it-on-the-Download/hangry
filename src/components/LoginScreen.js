import React from 'react';

import { SignIn } from '../Authentication';
import LoginForm from './LoginForm';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const styles = (theme) => ({
  login: {
    color: 'green',
  },
});

class LoginScreen extends React.Component {
  render() {
    const { classes } = this.props;
    console.log(classes);
    return (
      <Container maxWidth='sm'>
        <p>Login or sign up below</p>

        <LoginForm />

        <SignIn />
      </Container>
    );
  }
}

export default withStyles(styles)(LoginScreen);
