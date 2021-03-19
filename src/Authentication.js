import React from 'react';
import firebase from './Firebase';
import 'firebase/auth';

const auth = firebase.auth();

function SignIn() {
  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return <button onClick={loginWithGoogle}>Login With Google</button>;
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

export { SignIn, SignOut };
