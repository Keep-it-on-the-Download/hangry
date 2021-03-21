import React from 'react';

import SignUpForm from './SignUpForm';
import { SignIn } from '../firebase/authentication';

function SignUp() {
  // google auth
  return (
    <div>
      <h3>Create an Account</h3>
      <SignUpForm />
      <SignIn />
    </div>
  );
  // add details to firestore
}

export default SignUp;
