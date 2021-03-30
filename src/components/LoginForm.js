import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { LoginWithEmailAndPassword } from '../firebase/authentication';

const defaultState = {
  email: '',
  password: '',
};

class LoginForm extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    LoginWithEmailAndPassword(this.state.email, this.state.password);
    this.setState(defaultState);
  }

  render() {
    return (
      <form noValidate autoComplete='off' onSubmit={this.handleSubmit}>
        <div>
          <TextField
            type='email'
            label='email'
            variant='filled'
            name='email'
            onChange={this.handleChange}
          />
          <TextField
            type='password'
            label='password'
            variant='filled'
            name='password'
            onChange={this.handleChange}
          />
        </div>

        <Button type='submit' variant='contained' color='primary'>
          Login
        </Button>
      </form>
    );
  }
}

export default LoginForm;
