import React from 'react';
import TextField from '@material-ui/core/TextField';

class LoginForm extends React.Component {
  render() {
    return (
      <form noValidate autoComplete='off'>
        <div>
          <TextField label='email' variant='filled' />
          <TextField type='password' label='password' variant='filled' />
        </div>

        <button>Submit</button>
      </form>
    );
  }
}

export default LoginForm;
