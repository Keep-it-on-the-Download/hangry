import firebase from '../firebase';
import 'firebase/firestore';

import { addFriend } from './friends';

const firestore = firebase.firestore();

// Action Types
const GOT_FRIEND_REQUESTS = 'GOT_FRIEND_REQUESTS';

// Action Creators
const gotFriendRequests = (requests) => ({
  type: GOT_FRIEND_REQUESTS,
  requests,
});

// Redux Thunks
/**
 * Redux Thunk for getting data from friendRequest collection.
 * @param {string} id - email used to identify logged in user
 * @returns An asynchronous dispatch call to gotRequests
 */
export const getFriendRequests = (id) => {
  return async (dispatch) => {
    try {
      const friendRequestsCollectionReference = firestore
        .collection('users')
        .doc(id)
        .collection('friendRequests');

      const collectionSnapshot = await friendRequestsCollectionReference.get();

      dispatch(gotFriendRequests(collectionSnapshot.docs));
    } catch (err) {
      console.error('Origin: friendRequests.getFriendRequests(): ', err);
    }
  };
};

/**
 * Redux Thunk for listening to the Firestore friendRequest collection. Will dispatch a call to gotRequests everytime the collection updates.
 * @param {string} id - email used to identify logged in user
 * @returns An asynchronous dispatch call to gotRequests that is called everytime the firestore friendRequest collection is updated
 */
export const listenForFriendRequests = (id) => {
  return async (dispatch) => {
    try {
      firestore
        .collection('users')
        .doc(id)
        .collection('friendRequests')
        .onSnapshot((collection) => {
          dispatch(gotFriendRequests(collection.docs));
        });
    } catch (err) {
      console.error('Origin: friendRequests.listenForRequests(): ', err);
    }
  };
};

/**
 * Handles friend requests. based on boolean value either accepts or rejects request
 * @param {string} myId - email used to identify user accepting request
 * @param {string} friendId - email used to identify user who sent the request
 * @param {bool} accepted - True if accepted, False is rejected
 * @returns Asynchronous function that removes the friend request and conditionally makes dispatch calls to addFriend from the friend reducer.
 */
export const handleFriendRequest = (myId, friendId, accepted) => {
  return async (dispatch) => {
    try {
      const requestReference = firestore
        .collection('users')
        .doc(myId)
        .collection('friendRequests')
        .doc(friendId);
      await requestReference.delete();

      if (accepted) {
        dispatch(addFriend(myId, friendId));
        dispatch(addFriend(friendId, myId));
      }
    } catch (err) {
      console.error('Origin: friendRequests.handleFriendRequest(): ', err);
    }
  };
};

/**
 * Adds a friend request to another user. This updates that users redux store through listenForRequests
 * @param {string} myId - email used to identify user accepting request
 * @param {string} friendId - email used to identify user who sent the request
 * @returns Asynchronous function that updates the users redux store
 */
export const sendFriendRequest = (myId, friendId) => {
  return async (dispatch) => {
    try {
      const requestReference = firestore
        .collection('users')
        .doc(friendId)
        .collection('friendRequests')
        .doc(myId);
      requestReference.set({ sender: myId }, { merge: true });
    } catch (err) {
      console.error('Origin: friendRequests.sendFriendRequest(): ', err);
    }
  };
};

// Initial State and Reducer
const initialState = { data: [], count: 0, isLoading: true };

const friendRequests = (state = initialState, action) => {
  switch (action.type) {
    case GOT_FRIEND_REQUESTS:
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
