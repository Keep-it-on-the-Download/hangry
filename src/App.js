import './App.css';
import { CssBaseline } from '@material-ui/core';

import Profile from './components/Profile';
import MainScreen from './components/MainScreen';

function App() {
  return (
    <div className='App'>
      <CssBaseline />
      {/* <Profile /> */}
      <MainScreen />
    </div>
  );
}

export default App;
