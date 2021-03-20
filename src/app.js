import React from 'react';

import Navbar from './components/Navbar';
import Routes from './routes';

const App = () => {
  return (
    <React.Fragment>
      <nav>
        <Navbar />
      </nav>
      <main>
        <Routes />
      </main>
    </React.Fragment>
  );
};

export default App;
