import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import RestaurantDetails from './components/RestaurantDetails';
import Profile from './components/Profile';
import LoginScreen from './components/LoginScreen';
import SignUpScreen from './components/SignUpScreen';
import Notifications from './components/Notifications';
import ActiveParties from './components/ActiveParties';
import MainScreen from './components/MainScreen';
import Settings from './components/Settings';

import firebase from './firebase';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import Navbar from './components/Navbar';

const auth = firebase.auth();

const Routes = () => {
  const [user] = useAuthState(auth);
  return (
    <React.Fragment>
      {user ? (
        <React.Fragment>
          <nav>
            <Navbar />
          </nav>
          <Switch>
            <Route
              exact
              path='/profile'
              render={(routeProps) => <Profile {...routeProps} />}
            />
            <Route
              exact
              path='/notifications'
              render={(routeProps) => <Notifications {...routeProps} />}
            />
            <Route
              exact
              path='/parties'
              render={(routeProps) => <ActiveParties {...routeProps} />}
            />
            <Route
              exact
              path='/party'
              render={(routeProps) => <MainScreen {...routeProps} />}
            />
            <Route
              exact
              path='/restaurantDetails'
              render={(routeProps) => <RestaurantDetails {...routeProps} />}
            />
            <Route
              exact
              path='/settings'
              render={(routeProps) => <Settings {...routeProps} />}
            />
            <Redirect from='/' to='/profile' />
          </Switch>
        </React.Fragment>
      ) : (
        <Switch>
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
          <Redirect from='/' to='/login' />
        </Switch>
      )}
    </React.Fragment>
  );
};

export default Routes;
