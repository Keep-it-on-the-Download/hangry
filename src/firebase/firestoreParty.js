import firebase from './index';
import 'firebase/firestore';
import 'firebase/auth';

import { sendPartyRequest } from '../reducers/partyRequests';

import store from '../store';

const auth = firebase.auth();
const firestore = firebase.firestore();

// add user to a party
export async function createParty(user2) {
  // using AUTH, grab current user
  const currentUser = auth.currentUser;
  // using FIRESTORE, grab currentUser's email address to use as reference
  const partyRef = firestore.collection('parties');

  // since party doc doesn't exist, set up the fields in the collection
  const docRef = await partyRef.add({
    sharedRestaurants: [],
    preferences: {
      cuisine: ['italian', 'sushi'],
      distance: '5 miles',
    },
    liked: [],
  });

  // add members collection to party doc. The first user doc will be added to the subcollection with user's displayName
  docRef
    .collection('members')
    .doc(currentUser.email)
    .set({
      ref: firestore.doc(`users/${currentUser.email}`),
      pointer: 0,
    })
    .then(store.dispatch(sendPartyRequest(docRef.id, user2)));
}
