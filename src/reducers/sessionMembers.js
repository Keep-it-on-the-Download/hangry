import firebase from '../firebase';
import 'firebase/firestore';
import 'firebase/auth';

const firestore = firebase.firestore();

// Action types

const GOT_MEMBERS = 'GOT_MEMBERS';
const ADD_MEMBERS = 'ADD_MEMBERS';

const gotMembers = (members) => ({
  type: GOT_MEMBERS,
  members,
});

const addedMember = (newMember) => ({
  type: ADD_MEMBERS,
  newMember,
});

export const getMember = (memberId) => {
  return async (dispatch) => {
    try {
      const membersCollectionReference = firestore
        .collection('sessions')
        .doc(memberId)
        .collection('members');

      const collectionSnapshot = await membersCollectionReference.get();

      const members = await Promise.all(
        collectionSnapshot.docs.map((doc) => {
          const memberReference = firestore.doc(doc.data().ref.path);
          return memberReference.get();
        })
      );

      dispatch(gotMembers(members));
    } catch (err) {
      console.log('Origin: members.getMembers()', err);
    }
  };
};

export const addMember = (sessionId, memberId) => {
  return async (dispatch) => {
    try {
      const newMemberReference = firestore
        .collection('sessions')
        .doc(sessionId)
        .collection('members')
        .doc(memberId);

      const memberSessionsReference = firestore
        .collection('sessions')
        .doc(memberId);

      await newMemberReference.set({
        ref: memberSessionsReference,
      });

      const newMember = await memberSessionsReference.get();
      const currentUserId = firebase.auth().currentUser.email;
      if (currentUserId !== memberId) {
        dispatch(addedMember(newMember));
      }
    } catch (err) {
      console.log('Origin: members.addMember', err);
    }
  };
};

const initialState = { data: [], isLoading: true };

const members = (state = initialState, action) => {
  switch (action.type) {
    case GOT_MEMBERS:
      return { ...state, data: action.members, isLoading: false };
    case ADD_MEMBERS:
      return { ...state, data: [...state.data, action.newMember] };
    default:
      return state;
  }
};

export default members;
