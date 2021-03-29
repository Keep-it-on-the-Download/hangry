import React from 'react';

import SignUpForm from './SignUpForm';
import { SignIn } from '../firebase/authentication';

function SignUp() {
  // google auth
  return (
    <div style={{ marginTop: '200px' }}>
      <h3 style={{ fontFamily: 'avenir' }}>Create an Account</h3>
      <SignUpForm />
      <SignIn />
    </div>
  );
}

export default SignUp;
