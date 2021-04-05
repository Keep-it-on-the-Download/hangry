import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { CreateUser } from '../firebase/authentication';
import { SignIn } from '../firebase/authentication';

const defaultState = {
  email: '',
  password: '',
};

const styles = (theme) => ({
  button: {
    borderRadius: '8px',
    fontFamily: 'arial',
    backgroundColor: '#FF6961',
    border: 'none',
    fontSize: '20px',
    color: 'white',
    padding: '16px',
    marginTop: '10px',
    marginBottom: '10px',
  },
  google: {
    display: 'flex',
    justifyContent: 'center',
  },
});

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
    const { classes } = this.props;
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

        <button className={classes.button} type='submit'>
          Sign Up
        </button>
        <div className={classes.google}>
          <SignIn />
        </div>
      </form>
    );
  }
}

export default withStyles(styles)(SignUpForm);
