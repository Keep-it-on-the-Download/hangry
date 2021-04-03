import React from 'react';

import SignUpForm from './SignUpForm';
import { SignIn } from '../firebase/authentication';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   icon: {
//     color: theme.palette.secondary.main,
//     borderStyle: 'solid',
//     borderColor: '#000',
//     borderRadius: 100,
//   },
// }));

function SignUp() {
  // google auth
  return (
    <div style={{ marginTop: '200px' }}>
      <IconButton aria-label='Profile' component={Link} to='/login'>
        <ArrowBackIosIcon />
      </IconButton>

      <h3 style={{ fontFamily: 'avenir' }}>Create an Account</h3>
      <SignUpForm />
    </div>
  );
}

export default SignUp;
