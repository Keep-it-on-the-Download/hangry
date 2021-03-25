import firebase from '../firebase';
import 'firebase/firestore';

import { addMember } from './sessionMembers';

const firestore = firebase.firestore();

// Action type
const GOT_CONNECTIONS = 'GOT_CONNECTIONS';

// Action creator
const gotConnections = (connections) => ({
  type: GOT_CONNECTIONS,
  connections,
});

export const getConnections = (sessionId) => {
  return async (dispatch) => {
    try {
      const memberConnectionsCollectionRef = firestore
        .collection('sessions')
        .doc(sessionId)
        .collection('memberConnections');

      const collectionSnapshot = await memberConnectionsCollectionRef.get();

      dispatch(gotConnections(collectionSnapshot.docs));
    } catch (err) {
      console.error('Origin: memberConnections.getConnections(): ', err);
    }
  };
};

export const listenForConnections = (sessionId) => {
  return async (dispatch) => {
    try {
      firestore
        .collection('sessions')
        .doc(sessionId)
        .collection('memberConnections')
        .onSnapshot((collection) => {
          dispatch(gotConnections(collection.docs));
        });
    } catch (err) {
      console.log('Origin: memberConnections.listenForConnections', err);
    }
  };
};

export const acceptConnection = (sessionId, memberId) => {
  return async (dispatch) => {
    try {
      const connectionReference = firestore
        .collection('sessions')
        .doc(sessionId)
        .collection('memberConnections')
        .doc(memberId);

      await connectionReference.delete();
      // user 1 should already be in session so we're adding user2 here?
      dispatch(addMember(sessionId, memberId));
    } catch (err) {
      console.log('ORIGIN: memberConnections.acceptConnection()', err);
    }
  };
};

export const sendConnection = (sessionId, memberId) => {
  return async (dispatch) => {
    try {
      const connectionReference = firestore
        .collection('sessions')
        .doc(sessionId)
        .collection('membersConnections')
        .doc(memberId);
      connectionReference.set({ party: sessionId }, { merge: true });
    } catch (err) {
      console.log('Origin: memberConnections.sendConnection()', err);
    }
  };
};

// Initial State and Reducer
const initialState = { data: [], count: 0, isLoading: true };

const memberConnections = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CONNECTIONS:
      return {
        ...state,
        data: action.connections,
        count: action.connections.length,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default memberConnections;
