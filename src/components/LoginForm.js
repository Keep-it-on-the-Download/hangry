import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { LoginWithEmailAndPassword } from '../firebase/authentication';

const styles = (theme) => ({
  login: {
    color: 'green',
  },
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
  input: {
    fontSize: '20px',
  },
});

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
    const { classes } = this.props;
    return (
      <form noValidate autoComplete='off' onSubmit={this.handleSubmit}>
        <div>
          <TextField
            type='email'
            label='email'
            variant='filled'
            name='email'
            onChange={this.handleChange}
            className={classes.input}
          />
          <TextField
            type='password'
            label='password'
            variant='filled'
            name='password'
            onChange={this.handleChange}
            className={classes.input}
          />
        </div>

        <button className={classes.button} type='submit'>
          Login
        </button>
      </form>
    );
  }
}

export default withStyles(styles)(LoginForm);
