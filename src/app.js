import React from 'react';

import Routes from './routes';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    textAlign: 'center',
    overflow: 'hidden',
  },
}));

const App = () => {
  const classes = useStyles();

  return (
    <main className={classes.root}>
      <Routes />
    </main>
  );
};

export default App;
