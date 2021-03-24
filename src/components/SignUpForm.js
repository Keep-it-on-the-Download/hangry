import React from 'react';
import TextField from '@material-ui/core/TextField';

import { CreateUser } from '../firebase/authentication';

const defaultState = {
  email: '',
  password: '',
};

class SignUpForm extends React.Component {
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
    const { email, password, firstName, lastName } = this.state;
    CreateUser(email, password, firstName, lastName);
    this.setState(defaultState);
  }

  render() {
    return (
      <form noValidate autoComplete='off' onSubmit={this.handleSubmit}>
        <div>
          <TextField
            label='first name'
            variant='filled'
            name='firstName'
            onChange={this.handleChange}
          />
          <TextField
            label='last name'
            variant='filled'
            name='lastName'
            onChange={this.handleChange}
          />
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

        <button type='submit'>Sign Up</button>
      </form>
    );
  }
}

export default SignUpForm;