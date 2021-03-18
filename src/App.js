import './App.css';

import Profile from './components/Profile';
import { BrowserRouter, Route } from 'react-router-dom';
import RestaurantDetails from './components/RestaurantDetails';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/restaurants/1' component={RestaurantDetails} />
        {/* PSA: the route is temporarily /restaurants/1 so i can see it while updating*/}
      </div>
    </BrowserRouter>
  );
}

export default App;
