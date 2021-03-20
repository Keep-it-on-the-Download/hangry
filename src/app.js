import React from 'react';

import Navbar from './components/Navbar';
import Routes from './routes';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(7),
    textAlign: 'center',
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <nav>
        <Navbar />
      </nav>
      <main className={classes.root}>
        <Routes />
      </main>
    </React.Fragment>
  );
};

export default App;
