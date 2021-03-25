import firebase from '../firebase';
import 'firebase/firestore';

const firestore = firebase.firestore();

// Action Types
const GOT_REQUESTS = 'GOT_REQUESTS';
const ACCEPT_REQUEST = 'ACCEPT_REQUEST';

// Action Creators
const gotRequests = (requests) => ({
  type: GOT_REQUESTS,
  requests,
});

// Redux Thunks
export const listenForRequests = (id) => {
  return async (dispatch) => {
    try {
      firestore
        .collection('users')
        .doc(id)
        .collection('friendRequests')
        .onSnapshot((collection) => {
          console.log('CHANGE: ', collection);
          dispatch(gotRequests(collection.docs));
        });
    } catch (err) {}
  };
};

export const acceptRequest = () => {};

export const sendRequest = (myId, friendId) => {
  return async (dispatch) => {
    try {
      const requestReference = firestore
        .collection('users')
        .doc(friendId)
        .collection('friendRequests')
        .doc(myId);

      console.log('REQ REF: ', requestReference);

      requestReference.set({ sender: myId }, { merge: true });
    } catch (err) {}
  };
};

// Initial State and Reducer
const initialState = { data: [], count: 0, isLoading: true };

const friendRequests = (state = initialState, action) => {
  switch (action.type) {
    case GOT_REQUESTS:
      return {
        ...state,
        data: action.requests,
        count: action.requests.length,
        isLoading: false,
      };
    case ACCEPT_REQUEST:
      const newData = state.data.filter((request) => true);
      return { ...state, data: newData, count: state.count-- };
    default:
      return state;
  }
};

export default friendRequests;
