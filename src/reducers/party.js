import firebase from '../firebase';
import 'firebase/firestore';

const firestore = firebase.firestore();

// Action Types
const GOT_PARTY = 'GOT_PARTY';

// Action Creators
const gotParty = (party) => ({
  type: GOT_PARTY,
  party,
});

export const getParty = (partyId) => {
  return async (dispatch) => {
    try {
      const partyReference = firestore.collection('parties').doc(partyId);
      const doc = await partyReference.get();
      dispatch(gotParty(doc));
    } catch (err) {
      console.error('Origin: party.getParty(): ', err);
    }
  };
};

// Initial State and Reducer
const initialState = { data: {}, isLoading: true };

const party = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PARTY:
      return { ...state, data: action.party, isLoading: false };
    default:
      return state;
  }
};

export default party;
