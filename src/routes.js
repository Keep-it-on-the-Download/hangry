import React from 'react';
import { Switch, Route } from 'react-router-dom';

import RestaurantDetails from './components/RestaurantDetails';
import MainScreen from './components/MainScreen';
import Profile from './components/Profile';
import LoginScreen from './components/LoginScreen';
import SignUp from './components/SignUp';

const Routes = () => {
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
      <Route
        exact
        path='/profile'
        render={(routeProps) => <Profile {...routeProps} />}
      />
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
