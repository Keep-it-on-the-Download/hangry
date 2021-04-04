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
import partyRequests from '../reducers/partyRequests';
import members from '../reducers/partyMembers';
import parties from '../reducers/parties';

const reducer = combineReducers({
  user,
  restaurants,
  searchResult,
  friends,
  friendRequests,
  members,
  partyRequests,
  parties,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
