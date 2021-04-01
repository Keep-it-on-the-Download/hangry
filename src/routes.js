import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import RestaurantDetails from './components/RestaurantDetails';
import MainScreen from './components/MainScreen';
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
      <Route
        exact
        path='/'
        render={(routeProps) => <MainScreen {...routeProps} />}
      />
      <Route
        exact
        path='/login'
        render={(routeProps) => <LoginScreen {...routeProps} />}
      />
      <Route
        exact
        path='/signup'
        render={(routeProps) => <SignUpScreen {...routeProps} />}
      />
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
