import firebase from '../firebase';
import 'firebase/firestore';

const firestore = firebase.firestore();

// Action Types
const GOT_USER = 'GOT_USER';
const CHANGE_PARTY = 'CHANGE_PARTY';

// Action Creators
const gotUser = (user) => ({
  type: GOT_USER,
  user,
});

const changeParty = (id) => ({
  type: CHANGE_PARTY,
  id,
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
      console.error('Origin: user.getUser(): ', err);
    }
  };
};

export const setActiveParty = (id) => {
  return async (dispatch) => {
    try {
      dispatch(changeParty(id));
    } catch (err) {
      console.error('Origin: user.setActiveParty(): ', err);
    }
  };
};

// Initial State and Reducer
const initialState = { data: {}, activeParty: '', isLoading: true };

const user = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER:
      return { ...state, data: action.user, isLoading: false };
    case CHANGE_PARTY:
      return { ...state, activeParty: action.id };
    default:
      return state;
  }
};

export default user;
