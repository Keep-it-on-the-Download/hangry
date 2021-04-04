import firebase from '../firebase';
import 'firebase/firestore';

const firestore = firebase.firestore();

// Action Types
const GOT_PARTIES = 'GOT_PARTIES';

// Action Creators
const gotParties = (parties, titles) => ({
  type: GOT_PARTIES,
  parties,
  titles,
});

export const getParties = (userId) => {
  return async (dispatch) => {
    try {
      const activePartiesCollectionRef = firestore
        .collection('users')
        .doc(userId)
        .collection('activeParties');

      const collectionSnapshot = await activePartiesCollectionRef.get();

      console.log('collectionSnapShot.docs: ', collectionSnapshot.docs);

      const parties = await Promise.all(
        collectionSnapshot.docs.map((doc) => {
          const partyReference = firestore.doc(doc.data().partyRef);
          return partyReference.get();
        })
      );

      const titles = collectionSnapshot.docs.map((doc) => {
        return doc.data().title;
      });

      dispatch(gotParties(parties, titles));
    } catch (err) {
      console.error('Origin: party.getParties(): ', err);
    }
  };
};

// Initial State and Reducer
const initialState = { data: [], isLoading: true, titles: [] };

const parties = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PARTIES:
      return {
        ...state,
        data: action.parties,
        isLoading: false,
        titles: action.titles,
      };

    default:
      return state;
  }
};

export default parties;
