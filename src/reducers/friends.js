import firebase from '../firebase';
import 'firebase/firestore';

const firestore = firebase.firestore();

// Action Types
const GOT_FRIENDS = 'GOT_FRIENDS';
const ADD_FRIEND = 'ADD_FRIEND';

// Action Creators
const gotFriends = (friends) => ({
  type: GOT_FRIENDS,
  friends,
});

const addedFriend = (newFriend) => ({
  type: ADD_FRIEND,
  newFriend,
});

// Redux Thunks
/**
 * Redux Thunk for getting all of a user's friends from the Firestore
 * @param {string} id - The email of the user who's friends you are getting
 * @returns An asynchronous dispatch call to the gotFriends action creator. This sets the store's friends object
 */
export const getFriends = (id) => {
  return async (dispatch) => {
    try {
      const friendsCollectionReference = firestore
        .collection('users')
        .doc(id)
        .collection('friends');

      const collectionSnapshot = await friendsCollectionReference.get();

      const friends = await Promise.all(
        collectionSnapshot.docs.map((doc) => {
          const friendReference = firestore.doc(doc.data().ref.path);
          return friendReference.get();
        })
      );

      dispatch(gotFriends(friends));
    } catch (err) {
      console.error('Origin: friends.getFriends(): ', err);
    }
  };
};

/**
 * Redux Thunk for adding a new friend to users Firestore collection and local store. In practice this should only be done as the result of accepting a freind request made by another user.
 * @param {string} myId - The email of the user adding a new friend (accepting the request)
 * @param {object} friendId - The user object of the new friend to be added to the (sender of the request)
 * @returns An asynchronous dispatch call to the addedFriend action creator. This pushes onto the store's friends data object
 */
export const addFriend = (myId, friendId) => {
  return async (dispatch) => {
    try {
      const newFriendReference = firestore
        .collection('users')
        .doc(myId)
        .collection('friends')
        .doc(friendId);

      const friendUsersReference = firestore.collection('users').doc(friendId);

      await newFriendReference.set({
        ref: friendUsersReference,
      });

      const newFriend = await friendUsersReference.get();

      console.log('NEW FRIEND: ', newFriend);

      dispatch(addedFriend(newFriend));
    } catch (err) {
      console.error('Origin: friends.addFriend(): ', err);
    }
  };
};

// Initial State and Reducer
const initialState = { data: [], isLoading: true };

const friends = (state = initialState, action) => {
  switch (action.type) {
    case GOT_FRIENDS:
      return { ...state, data: action.friends, isLoading: false };
    case ADD_FRIEND:
      return { ...state, data: [...state.data, action.newFriend] };
    default:
      return state;
  }
};

export default friends;
