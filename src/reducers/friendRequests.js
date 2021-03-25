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
/**
 * Redux Thunk for getting data from friendRequest collection.
 * @param {string} id - email used to identify logged in user
 * @returns An asynchronous dispatch call to gotRequests
 */
export const getRequests = (id) => {
  return async (dispatch) => {
    try {
      const friendRequestsCollectionReference = firestore
        .collection('users')
        .doc(id)
        .collection('friendRequests');

      const collectionSnapshot = await friendRequestsCollectionReference.get();

      dispatch(gotRequests(collectionSnapshot.docs));
    } catch (err) {
      console.error('Origin: friendRequests.getRequests(): ', err);
    }
  };
};

/**
 * Redux Thunk for listening to the Firestore friendRequest collection. Will dispatch a call to gotRequests everytime the collection updates.
 * @param {string} id - email used to identify logged in user
 * @returns An asynchronous dispatch call to gotRequests that is called everytime the firestore friendRequest collection is updated
 */
export const listenForRequests = (id) => {
  return async (dispatch) => {
    try {
      firestore
        .collection('users')
        .doc(id)
        .collection('friendRequests')
        .onSnapshot((collection) => {
          dispatch(gotRequests(collection.docs));
        });
    } catch (err) {
      console.error('Origin: friendRequests.listenForRequests(): ', err);
    }
  };
};

/**
 * Redux Thunk for accepting friend requests. Mutually adds users to each other's friend list
 * @param {string} myId - email used to identify user accepting request
 * @param {string} friendId - email used to identify user who sent the request
 * @returns Two Asynchronous dispatch calls to addFriend from the friend reducer.
 */
export const acceptRequest = (myId, friendId) => {
  return async (dispatch) => {
    try {
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

/**
 * Adds a friend request to another user. This updates that users redux store through listenForRequests
 * @param {string} myId - email used to identify user accepting request
 * @param {string} friendId - email used to identify user who sent the request
 */
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
