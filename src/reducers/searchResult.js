import firebase from '../firebase';
import 'firebase/firestore';

const firestore = firebase.firestore();

// Action Types
const FOUND_RESULTS = 'FOUND_RESULTS';
const CLEAR_RESULTS = 'CLEAR_RESULTS';

// Action Creators
const foundResults = (results) => ({
  type: FOUND_RESULTS,
  results,
});

export const clearResults = () => ({
  type: CLEAR_RESULTS,
});

// Redux Thunks
/**
 * Redux Thunk for querying Firestore users by displayName
 * @param {string} query - The string respresenting the query to be searched
 * @returns An asynchronous dispatch call to the gotUser action creator. This sets the store's searchResult object
 */
export const findUsers = (query) => {
  return async (dispatch) => {
    try {
      const [lowerBound, upperBound] = generateStringSearchBoundaries(query);

      const userCollectionReference = firestore.collection('users');

      const collectionQuery = userCollectionReference
        .where('displayName', '>=', lowerBound)
        .where('displayName', '<', upperBound);

      console.log('COLLECTION QUERY: ', collectionQuery);
      const collectionSnapshot = await collectionQuery.get();

      const users = await Promise.all(
        collectionSnapshot.docs.map((doc) => {
          return doc.data();
        })
      );

      dispatch(foundResults(users));
    } catch (err) {
      console.log('Error getting document:', err);
    }
  };
};

// TODO: move utility functions into their own folder/file
const generateStringSearchBoundaries = (str) => {
  const strlength = str.length;
  const strStart = str.slice(0, strlength - 1);
  const strEnd = str.slice(strlength - 1, str.length);

  const lowerBound = str;
  const upperBound = strStart + String.fromCharCode(strEnd.charCodeAt(0) + 1);
  return [lowerBound, upperBound];
};

// Initial State and Reducer
const initialState = { data: {}, isLoading: true };

const user = (state = initialState, action) => {
  switch (action.type) {
    case FOUND_RESULTS:
      return { ...state, data: action.results, isLoading: false };
    case CLEAR_RESULTS:
      return initialState;
    default:
      return state;
  }
};

export default user;
