import React from 'react';
import TextField from '@material-ui/core/TextField';

class LoginForm extends React.Component {
  render() {
    return (
      <form noValidate autoComplete='off'>
        <TextField label='email' variant='filled' />
        <TextField type='password' label='password' variant='filled' />
      </form>
    );
  }
}

export default LoginForm;
