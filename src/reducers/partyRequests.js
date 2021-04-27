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

/**
 * Handles party requests. Based on boolean value either accepts or rejects request
 * @param {string} myId - email used to identify user accepting request
 * @param {string} partyId - UID assigned to party
 * @param {bool} accepted - True if accepted, False is rejected
 * @returns Asynchronous function that removes the party request and conditionally makes dispatch calls to addMember fand createActivePartiesForUsersInFirestore
 */
export const handlePartyRequest = (myId, partyId, accepted) => {
  return async (dispatch) => {
    try {
      const requestReference = firestore
        .collection('users')
        .doc(myId)
        .collection('partyRequests')
        .doc(partyId);
      requestReference.delete();

      if (accepted) {
        dispatch(addMember(partyId, myId));
        createActivePartiesForUsersInFirestore(partyId);
      }
    } catch (err) {
      console.error('Origin: partyRequests.handlePartyRequest(): ', err);
    }
  };
};

export const sendPartyRequest = (partyId, memberId) => {
  return async (dispatch) => {
    try {
      const membersCollectionRef = firestore
        .collection('parties')
        .doc(partyId)
        .collection('members');

      const membersDocRef = await membersCollectionRef.get();
      console.log('membersDocRef: ', membersDocRef);
      const partySenderId = membersDocRef.docs[0].id;

      //const senderId = membersDocRef.doc.data();

      const requestReference = firestore
        .collection('users')
        .doc(memberId)
        .collection('partyRequests')
        .doc(partyId);

      requestReference.set(
        {
          party: partyId,
          partyName: `${partySenderId}'s Party`,
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
