import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import RestaurantDetails from './components/RestaurantDetails';
import MainScreen from './components/MainScreen';
import Profile from './components/Profile';
import LoginScreen from './components/LoginScreen';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <BrowserRouter>
        <div className='App'>
          <Route exact path='/profile' component={Profile} />
          <Route exact path='/restaurants/1' component={RestaurantDetails} />
          {/* PSA: the route is temporarily /restaurants/1 so i can see it while updating*/}
          <Route exact path='/home' component={MainScreen} />
          <Route exact path='/login' component={LoginScreen} />
          <Route exact path='/signup' component={SignUp} />
          <Route exact path='/' component={MainScreen} />
        </div>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
