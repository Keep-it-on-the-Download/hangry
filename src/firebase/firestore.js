import firebase from './index';

import 'firebase/firestore';
import 'firebase/auth';

const firestore = firebase.firestore();

// check if user exists in firestore
async function checkUserExists(userRef) {
  // grab the user doc
  const userDoc = await userRef.get();
  return userDoc.exists;
}

// add new user to firestore
export async function addGoogleUserToFirestore() {
  const currentUser = firebase.auth().currentUser;

  // create reference from users collection to user document with email address
  const userRef = firestore.collection('users').doc(currentUser.email);
  const user = await checkUserExists(userRef);
  if (!user) {
    const { email, displayName, photoURL } = currentUser;
    userRef.set({
      email,
      displayName,
      photoURL,
    });
  }
}
