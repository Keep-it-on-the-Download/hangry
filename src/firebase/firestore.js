import firebase from './index';

import 'firebase/firestore';
import 'firebase/auth';

const firestore = firebase.firestore();
const auth = firebase.auth();

// check if user exists in firestore
async function checkUserExists(userRef) {
  // grab the user doc
  const userDoc = await userRef.get();
  return userDoc.exists;
}

// add new user to firestore
export async function addGoogleUserToFirestore() {
  const currentUser = auth.currentUser;

  // create reference from users collection to user document with email address
  const userRef = firestore.collection('users').doc(currentUser.email);
  const existingUser = await checkUserExists(userRef);
  if (!existingUser) {
    const { email, displayName, photoURL } = currentUser;
    userRef.set({
      email,
      displayName,
      photoURL,
    });
  }
}

export async function addUserToFirestore(user) {
  const currentUser = auth.currentUser;

  const userRef = firestore.collection('users').doc(currentUser.email);
  const existingUser = await checkUserExists(userRef);
  if (!existingUser) {
    console.log('user', user);
    const { email, firstName, lastName } = user;
    userRef.set({
      email,
      displayName: `${firstName} ${lastName}`,
    });
  }
}
