import firebase from '../firebase';
import 'firebase/firestore';

const db = firebase.firestore();

const GOT_FRIENDS = 'GOT_FRIENDS';

const gotUser = (friends) => ({
  type: GOT_FRIENDS,
  friends,
});

export const getFriends = (id) => {
  return async (dispatch) => {
    try {
      const userFriendsRef = db
        .collection('users')
        .doc('abielik')
        .collection('friends');
      const doc = await userFriendsRef.get();
      dispatch(gotUser(doc.data()));
    } catch (err) {
      console.log('Error getting document:', err);
    }
  };
};

const initialState = { data: [], isLoading: true };

const friends = (state = initialState, action) => {
  switch (action.type) {
    case GOT_FRIENDS:
      return { ...state, data: action.friends, isLoading: false };
    default:
      return state;
  }
};

export default friends;
