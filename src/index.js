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
      light: '#cb475a',
      main: '#BAD7F2',
      dark: '#851122',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ffd670',
      main: '#5E54AF',
      dark: '#b28e35',
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
