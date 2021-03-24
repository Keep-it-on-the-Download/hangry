import firebase from '../firebase';
import 'firebase/firestore';

const firestore = firebase.firestore();

// Action Types
const GOT_REQUESTS = 'GOT_REQUESTS';

// Action Creators
const gotRequests = (requests) => ({
  type: GOT_REQUESTS,
  requests,
});

// Redux Thunks

// Initial State and Reducer
const initialState = { data: [], isLoading: true };

const friends = (state = initialState, action) => {
  switch (action.type) {
    case GOT_REQUESTS:
      return { ...state, data: action.requests, isLoading: false };
    default:
      return state;
  }
};

export default friends;
