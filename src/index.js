import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import App from './app';

import store from './store';
import history from './history';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#A0DFDF',
      main: '#59EBE1',
      dark: '#A0DFDF',
      contrastText: '#fff',
    },
    secondary: {
      light: '#A0DFDF',
      main: '#59EBE1',
      dark: '#A0DFDF',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: ['avenir'].join(','),
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
