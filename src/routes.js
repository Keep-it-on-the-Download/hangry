import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import RestaurantDetails from './components/RestaurantDetails';
import MainScreen from './components/MainScreen';
import Profile from './components/Profile';
import LoginScreen from './components/LoginScreen';
import SignUp from './components/SignUp';

import firebase from './firebase';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

const auth = firebase.auth();

const Routes = () => {
  const [user] = useAuthState(auth);
  console.log('user: ', user);

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
        render={(routeProps) => <SignUp {...routeProps} />}
      />
      <Route exact path='/profile'>
        {user ? <Profile /> : <Redirect to='/login' />}
      </Route>
      <Route
        exact
        path='/restaurants/1'
        render={(routeProps) => <RestaurantDetails {...routeProps} />}
      />
      {/* PSA: the route is temporarily /restaurants/1 so i can see it while updating*/}
    </Switch>
  );
};

export default Routes;
