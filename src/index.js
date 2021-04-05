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
      light: '#FF6961',
      main: '#FF6961',
      dark: '#FF6961',
      contrastText: '#fff',
    },
    secondary: {
      light: '#FFF3D9',
      main: '#FFF3D9',
      dark: '#FF35B4',
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
