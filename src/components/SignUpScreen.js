import React from 'react';

import SignUpForm from './SignUpForm';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';
import pizzaicon from './icon/pizzaicon.png';

function SignUp() {
  // google auth
  return (
    <div style={{ marginTop: '30px' }}>
      <img style={{ width: 200, height: 200 }} alt='logo' src={pizzaicon} />
      <p></p>
      <IconButton aria-label='Profile' component={Link} to='/login'>
        <ArrowBackIosIcon />
      </IconButton>

      <h3 style={{ fontFamily: 'avenir' }}>Create an Account</h3>
      <SignUpForm />
    </div>
  );
}

export default SignUp;
