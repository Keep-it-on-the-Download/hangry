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
    sentBatches: [],
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
    })
    .then(store.dispatch(sendPartyRequest(docRef.id, user2)));
}

export function createActivePartiesForUsersInFirestore(partyId) {
  const partyMembersRef = firestore
    .collection('parties')
    .doc(partyId)
    .collection('members');

  partyMembersRef
    .where('ref', '!=', false)
    .get()
    .then((querySnapshot) => {
      console.log('querysnapshot.docs.length: ', querySnapshot.docs.length);
      querySnapshot.forEach((doc) => {
        const userRef = firestore.collection('users').doc(doc.id);
        const activePartiesRef = userRef.collection('activeParties');
        activePartiesRef
          .add({
            partyRef: `/parties/${partyId}`,
          })
          .then(console.log('DOC DATA ,', doc.data()));
      });
    });
}
