import React from 'react';

import firebase from './index';
import 'firebase/auth';

import GoogleButton from 'react-google-button';

import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { addGoogleUserToFirestore, addUserToFirestore } from './firestore';

const auth = firebase.auth();

// create a user with email
function CreateUser(email, password, firstName, lastName) {
  // authenticates with firebase then redirects to home screen
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      addUserToFirestore({
        email: email.toLowerCase(),
        firstName,
        lastName,
      });
    })
    .catch((error) => {
      console.error('error, ', error);
    });
}

// Login with email/password
function LoginWithEmailAndPassword(email, password) {
  // authenticates with firebase then redirects to home screen
  auth.signInWithEmailAndPassword(email, password).then(() => {
    window.location.href = '/profile';
  });
}

//Sign in using Google OAuth
function SignIn() {
  const loginWithGoogle = () => {
    // authenticates with firebase then redirects to home screen
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then(() => {
        addGoogleUserToFirestore();
      })
      .catch((error) => {
        console.error('Google error, ', error);
      });
  };

  return <GoogleButton onClick={loginWithGoogle}></GoogleButton>;
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
