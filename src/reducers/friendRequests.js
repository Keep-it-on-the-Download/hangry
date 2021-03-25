import firebase from '../firebase';
import 'firebase/firestore';

import { addFriend } from './friends';

const firestore = firebase.firestore();

// Action Types
const GOT_REQUESTS = 'GOT_REQUESTS';

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
    } catch (err) {
      console.error('Origin: friendRequests.listenForRequests(): ', err);
    }
  };
};

export const acceptRequest = (myId, friendId) => {
  return async (dispatch) => {
    try {
      console.log('MY ID: ', myId, ' FRIEND ID: ', friendId);
      const requestReference = firestore
        .collection('users')
        .doc(myId)
        .collection('friendRequests')
        .doc(friendId);
      await requestReference.delete();

      dispatch(addFriend(myId, friendId));
      dispatch(addFriend(friendId, myId));
    } catch (err) {
      console.error('Origin: friendRequests.acceptRequest(): ', err);
    }
  };
};

export const sendRequest = (myId, friendId) => {
  return async (dispatch) => {
    try {
      const requestReference = firestore
        .collection('users')
        .doc(friendId)
        .collection('friendRequests')
        .doc(myId);
      requestReference.set({ sender: myId }, { merge: true });
    } catch (err) {
      console.error('Origin: friendRequests.sendRequest(): ', err);
    }
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
    default:
      return state;
  }
};

export default friendRequests;
