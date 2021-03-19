import React from 'react';
//import firebase from '../Firebase';
import { SignIn } from '../Authentication';

// const auth = firebase.auth();
//const db = firebase.firestore();
//const usersRef = db.collection('users');

// const addUserToFirestore = (name, email) => {
//   usersRef.doc(email).set({
//     firstName: name.firstName,
//     lastName: name.lastName,
//     email,
//   });
// };

function SignUp() {
  // google auth
  return (
    <div>
      <h3>Create an Account</h3>
      <SignIn />
    </div>
  );
  // add details to firestore
}

export default SignUp;
