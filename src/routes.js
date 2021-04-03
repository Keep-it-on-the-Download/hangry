import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import RestaurantDetails from './components/RestaurantDetails';
import Profile from './components/Profile';
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import Notifications from './components/Notifications';
import ActiveParties from './components/ActiveParties';

import firebase from './firebase';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = firebase.auth();

const Routes = () => {
  const [user] = useAuthState(auth);
  return (
    <Switch>
      <Redirect exact from='/' to='/profile' />
      <Route exact path='/login'>
        {!user ? <LoginScreen /> : <Redirect to='/profile' />}
      </Route>
      <Route exact path='/signup'>
        {!user ? <SignUpScreen /> : <Redirect to='/profile' />}
      </Route>
      <Route exact path='/profile/notifications'>
        {user ? <Notifications /> : <Redirect to='/login' />}
      </Route>
      <Route exact path='/profile'>
        {user ? <Profile /> : <Redirect to='/login' />}
      </Route>
      <Route
        exact
        path='/restaurantDetails'
        render={(routeProps) => <RestaurantDetails {...routeProps} />}
      />
      <Route
        exact
        path='/parties'
        render={(routeProps) => <ActiveParties {...routeProps} />}
      />
    </Switch>
  );
};

export default Routes;
