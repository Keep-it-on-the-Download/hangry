import firebase from './index';
import 'firebase/firestore';
import 'firebase/auth';

const auth = firebase.auth();
const firestore = firebase.firestore();

// check if session doc exists in "sessions" collection
async function checkSessionExists(sessionRef) {
  // grab the session doc
  const sessionDoc = await sessionRef.get();
  //return true/false
  return sessionDoc.exists;
}

// add user to a session
export async function createSession() {
  // using AUTH, grab current user
  const currentUser = auth.currentUser;
  // using FIRESTORE, grab currentUser's email address to use as reference
  const sessionRef = firestore
    .collection('sessions')
    .doc(`${currentUser.displayName}'s Party`);

  //check if session exists as a doc in "sessions" collection
  const existingDoc = await checkSessionExists(sessionRef);
  if (!existingDoc) {
    // since session doc doesn't exist, set up the fields in the collection
    sessionRef.set({
      sentBatches: [],
      preferences: '',
      liked: [],
    });
    // add members collection to session doc. The first user doc will be added to the subcollection with user's displayName
    sessionRef
      .collection('members')
      .doc(currentUser.displayName)
      .set({
        user1: firestore.doc(`users/${currentUser.email}`),
      })
      .then(console.log('session started'));
  }
}
