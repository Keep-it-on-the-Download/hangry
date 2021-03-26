import firebase from './index';
import 'firebase/firestore';
import 'firebase/auth';

import { sendConnection } from '../reducers/memberConnections';

import store from '../store';

const auth = firebase.auth();
const firestore = firebase.firestore();

// add user to a session
export async function createSession(user2) {
  // using AUTH, grab current user
  const currentUser = auth.currentUser;
  // using FIRESTORE, grab currentUser's email address to use as reference
  const sessionRef = firestore.collection('sessions');

  // since session doc doesn't exist, set up the fields in the collection
  const docRef = await sessionRef.add({
    sentBatches: [],
    preferences: {
      cuisine: ['italian', 'sushi'],
      distance: '5 miles',
    },
    liked: [],
  });
  console.log('docref: ', docRef);
  // add members collection to session doc. The first user doc will be added to the subcollection with user's displayName
  docRef
    .collection('members')
    .doc(currentUser.displayName)
    .set({
      user1: firestore.doc(`users/${currentUser.email}`),
    })
    .then(console.log('session started'))
    .then(store.dispatch(sendConnection(docRef.id, user2)))
    .finally(console.log('send success'));
}
