import firebase from '../firebase';
import 'firebase/firestore';

import { addMember } from './partyMembers';

const firestore = firebase.firestore();

// Action type
const GOT_PARTY_REQUESTS = 'GOT_PARTY_REQUESTS';

// Action creator
const gotRequests = (requests) => ({
  type: GOT_PARTY_REQUESTS,
  requests,
});

export const getRequests = (userId) => {
  return async (dispatch) => {
    try {
      console.log('userID::::: , ', userId);
      const partyRequestsCollectionRef = firestore
        .collection('users')
        .doc(userId)
        .collection('partyRequests');

      console.log('partyRequestsRef before: ', partyRequestsCollectionRef);

      const collectionSnapshot = await partyRequestsCollectionRef.get();
      console.log('collection snapshot:: , ', collectionSnapshot.docs);
      dispatch(gotRequests(collectionSnapshot.docs));
    } catch (err) {
      console.error('Origin: partyRequests.getRequests(): ', err);
    }
  };
};

export const listenForRequests = (userId) => {
  return async (dispatch) => {
    try {
      firestore
        .collection('users')
        .doc(userId)
        .collection('partyRequests')
        .onSnapshot((collection) => {
          dispatch(gotRequests(collection.docs));
        });
    } catch (err) {
      console.log('Origin: partyRequests.listenForRequests', err);
    }
  };
};

export const acceptRequest = (partyId, memberId) => {
  return async (dispatch) => {
    try {
      const requestReference = firestore
        .collection('parties')
        .doc(partyId)
        .collection('partyRequests')
        .doc(memberId);

      await requestReference.delete();
      // user 1 should already be in party so we're adding user2 here?
      dispatch(addMember(partyId, memberId));
    } catch (err) {
      console.log('ORIGIN: partyRequests.acceptRequest()', err);
    }
  };
};

export const sendRequest = (partyId, memberId) => {
  return async (dispatch) => {
    try {
      console.log('runnign here?');
      const requestReference = firestore
        .collection('users')
        .doc(memberId)
        .collection('partyRequests')
        .doc(partyId);
      console.log('requestReference: ', requestReference);
      requestReference.set(
        {
          party: partyId,
        },
        { merge: true }
      );
    } catch (err) {
      console.log('Origin: partyRequests.sendRequest()', err);
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
