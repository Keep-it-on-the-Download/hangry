import React from 'react';

import firebase from './index';
import 'firebase/auth';

import GoogleButton from 'react-google-button';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const auth = firebase.auth();

// create a user with email
function CreateUser(email, password) {
  auth.createUserWithEmailAndPassword(email, password).then(() => {
    window.location.href = '/';
  });
}

// Login with email/password
function LoginWithEmailAndPassword(email, password) {
  auth.signInWithEmailAndPassword(email, password).then(() => {
    window.location.href = '/';
  });
}

//Sign in using Google OAuth
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

export { SignIn, SignOut, CreateUser, LoginWithEmailAndPassword };
