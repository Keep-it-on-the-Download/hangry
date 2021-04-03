import firebase from '../firebase';
import 'firebase/firestore';

import { addMember } from './partyMembers';

import createActivePartiesForUsersInFirestore from '../firebase/createActiveParties';

const firestore = firebase.firestore();

// Action type
const GOT_PARTY_REQUESTS = 'GOT_PARTY_REQUESTS';

// Action creator
const gotPartyRequests = (requests) => ({
  type: GOT_PARTY_REQUESTS,
  requests,
});

export const getPartyRequests = (userId) => {
  return async (dispatch) => {
    try {
      const partyRequestsCollectionRef = firestore
        .collection('users')
        .doc(userId)
        .collection('partyRequests');

      const collectionSnapshot = await partyRequestsCollectionRef.get();

      dispatch(gotPartyRequests(collectionSnapshot.docs));
    } catch (err) {
      console.error('Origin: partyRequests.getPartyRequests(): ', err);
    }
  };
};

export const listenForPartyRequests = (userId) => {
  return async (dispatch) => {
    try {
      firestore
        .collection('users')
        .doc(userId)
        .collection('partyRequests')
        .onSnapshot((collection) => {
          dispatch(gotPartyRequests(collection.docs));
        });
    } catch (err) {
      console.error('Origin: partyRequests.listenForPartyRequests', err);
    }
  };
};

export const acceptPartyRequest = (partyId, memberId) => {
  return async (dispatch) => {
    try {
      const requestReference = firestore
        .collection('users')
        .doc(memberId)
        .collection('partyRequests')
        .doc(partyId);

      requestReference.delete();
      // user 1 should already be in party so we're adding user2 here?
      dispatch(addMember(partyId, memberId));
      createActivePartiesForUsersInFirestore(partyId);
    } catch (err) {
      console.error('ORIGIN: partyRequests.acceptPartyRequest()', err);
    }
  };
};

export const sendPartyRequest = (partyId, memberId) => {
  return async (dispatch) => {
    try {
      const requestReference = firestore
        .collection('users')
        .doc(memberId)
        .collection('partyRequests')
        .doc(partyId);

      requestReference.set(
        {
          party: partyId,
        },
        { merge: true }
      );
    } catch (err) {
      console.error('Origin: partyRequests.sendPartyRequest()', err);
    }
  };
};

// Initial State and Reducer
const initialState = { data: [], count: 0, isLoading: true };

const partyRequests = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PARTY_REQUESTS:
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

export default partyRequests;
