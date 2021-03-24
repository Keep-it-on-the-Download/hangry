import firebase from '../firebase';
import 'firebase/firestore';

const firestore = firebase.firestore();

// Action Types
const GOT_USER = 'GOT_USER';

// Action Creators
const gotUser = (user) => ({
  type: GOT_USER,
  user,
});

// Redux Thunks
/**
 * Redux Thunk for getting a user from the Firestore
 * @param {string} id - The email of the user you are getting
 * @returns An asynchronous dispatch call to the gotUser action creator. This sets the store's user object
 */
export const getUser = (id) => {
  return async (dispatch) => {
    try {
      const userReference = firestore.collection('users').doc(id);
      const doc = await userReference.get();
      dispatch(gotUser(doc.data()));
    } catch (err) {
      console.log('Error getting document:', err);
    }
  };
};

// Initial State and Reducer
const initialState = { data: {}, isLoading: true };

const user = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER:
      return { ...state, data: action.user, isLoading: false };
    default:
      return state;
  }
};

export default user;
