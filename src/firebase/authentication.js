import React from 'react';

import firebase from './index';
import 'firebase/auth';

import GoogleButton from 'react-google-button';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const auth = firebase.auth();

function CreateUser(email, password) {
  auth.createUserWithEmailAndPassword(email, password).then(() => {
    window.location.href = '/';
  });
}

function SignIn() {
  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider).then(() => {
      window.location.href = '/';
    });
  };

  return (
    <GoogleButton onClick={loginWithGoogle}>Login With Google</GoogleButton>
  );
}

function SignOut() {
  return (
    auth.currentUser && (
      <Button
        onClick={() => auth.signOut()}
        component={Link}
        to='/login'
        variant='contained'
        color='primary'
      >
        Sign Out
      </Button>
    )
  );
}

export { SignIn, SignOut, CreateUser };
