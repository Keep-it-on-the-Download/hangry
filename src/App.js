import { BrowserRouter, Route } from 'react-router-dom';

import RestaurantDetails from './components/RestaurantDetails';
import MainScreen from './components/MainScreen';
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/restaurants/1' component={RestaurantDetails} />
        {/* PSA: the route is temporarily /restaurants/1 so i can see it while updating*/}
        <Route exact path='/home' component={MainScreen} />
      </div>
    </BrowserRouter>
  );
}

export default App;
