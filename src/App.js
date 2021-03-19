import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';

import RestaurantDetails from './components/RestaurantDetails';
import MainScreen from './components/MainScreen';
import Profile from './components/Profile';
import LoginScreen from './components/LoginScreen';
import SignUp from './components/SignUp';

import LoginScreen from './components/LoginScreen';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Route exact path='/login' component={LoginScreen} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/restaurants/1' component={RestaurantDetails} />
        {/* PSA: the route is temporarily /restaurants/1 so i can see it while updating*/}
<<<<<<< HEAD
        <Route exact path='/home' component={MainScreen} />
        <Route exact path='/login' component={LoginScreen} />
        <Route exact path='/signup' component={SignUp} />
=======
        <Route exact path='/' component={MainScreen} />
>>>>>>> master
      </div>
    </BrowserRouter>
  );
}

export default App;
