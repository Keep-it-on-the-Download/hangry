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
      light: '#ff8780',
      main: '#ff6961',
      dark: '#b24943',
      contrastText: '#fff',
    },
    secondary: {
      light: '#fdcb47',
      main: '#fdbf19',
      dark: '#b18511',
      contrastText: '#000',
    },
  },
  typography: {
    fontFamily: ['Avenir'].join(','),
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
