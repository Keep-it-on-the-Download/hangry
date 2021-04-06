import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import App from './app';

import store from './store';
import history from './history';

const theme = createMuiTheme({
  boxShadow: 'none',
  palette: {
    primary: {
      light: '#FF817B',
      main: '#FF817B',
      dark: '#FF817B',
      contrastText: '#731105',
    },
    secondary: {
      light: '#FDDC7D',
      main: '#FDBF19',
      dark: '#FFFFFF',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: ['Raleway'].join(','),
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
