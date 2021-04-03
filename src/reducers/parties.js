import firebase from '../firebase';
import 'firebase/firestore';

const firestore = firebase.firestore();

// Action Types
const GOT_PARTIES = 'GOT_PARTIES';

// Action Creators
const gotParties = (parties) => ({
  type: GOT_PARTIES,
  parties,
});

export const getParties = (userId) => {
  return async (dispatch) => {
    try {
      const activePartiesCollectionRef = firestore
        .collection('users')
        .doc(userId)
        .collection('activeParties');

      const collectionSnapshot = await activePartiesCollectionRef.get();

      const parties = await Promise.all(
        collectionSnapshot.docs.map((doc) => {
          const partyReference = firestore.doc(doc.data().partyRef);
          return partyReference.get();
        })
      );

      if (Array.isArray(parties)) {
        dispatch(gotParties(parties));
      } else {
        dispatch(gotParties([parties]));
      }
    } catch (err) {
      console.error('Origin: party.getParties(): ', err);
    }
  };
};

// Initial State and Reducer
const initialState = { data: [], isLoading: true };

const parties = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PARTIES:
      return { ...state, data: action.parties, isLoading: false };

    default:
      return state;
  }
};

export default parties;
