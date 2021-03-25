import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

// Reducers
import user from '../reducers/user';
import friends from '../reducers/friends';
import restaurants from '../reducers/restaurants';
import searchResult from '../reducers/searchResult';
import friendRequests from '../reducers/friendRequests';
import memberConnections from '../reducers/memberConnections';
import members from '../reducers/sessionMembers';

const reducer = combineReducers({
  user,
  restaurants,
  searchResult,
  friends,
  friendRequests,
  members,
  memberConnections,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
