import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { CreateUser } from '../firebase/authentication';

const defaultState = {
  email: '',
  password: '',
};

const styles = (theme) => ({
  button: {
    boxShadow:
      '0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    borderRadius: '8px',
    fontFamily: 'avenir',
    backgroundColor: 'rgb(129, 163, 238)',
    border: 'none',
    fontSize: '20px',
    color: 'white',
    padding: '16px',
    marginTop: '10px',
    marginBottom: '10px',
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
      </form>
    );
  }
}

export default withStyles(styles)(SignUpForm);
