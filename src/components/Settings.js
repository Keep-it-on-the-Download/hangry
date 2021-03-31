import React from 'react';
import { SignOut } from '../firebase/authentication';

class Settings extends React.Component {
  render() {
    return (
      <div>
        <SignOut />
      </div>
    );
  }
}

export default Settings;
